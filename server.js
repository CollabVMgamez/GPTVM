// backend.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const TURN_DURATION = 18000; // 18 seconds
let clients = new Map();
let queue = [];
let currentTurn = null;

app.use(express.static(path.join(__dirname, 'public')));

function broadcast(obj) {
  const msg = JSON.stringify(obj);
  for (const [, ws] of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  }
}

function assignNextTurn() {
  if (queue.length === 0) {
    currentTurn = null;
    return;
  }

  const nextUsername = queue.shift();
  const ws = clients.get(nextUsername);

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    assignNextTurn();
    return;
  }

  currentTurn = nextUsername;
  broadcast({ type: 'control', allowed: false });
  ws.send(JSON.stringify({ type: 'control', allowed: true }));

  setTimeout(() => {
    if (currentTurn === nextUsername) {
      currentTurn = null;
      assignNextTurn();
    }
  }, TURN_DURATION);
}

wss.on('connection', (ws) => {
  let username = '';

  ws.on('message', (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch (e) {
      return;
    }

    switch (data.type) {
      case 'set_username': {
        username = data.username;
        if (!username || clients.has(username)) {
          ws.close();
          return;
        }
        clients.set(username, ws);
        broadcast({ type: 'user_joined', username });
        queue.push(username);
        if (!currentTurn) assignNextTurn();
        break;
      }

      case 'chat': {
        if (username) {
          broadcast({ type: 'chat', username, message: data.message });
        }
        break;
      }
    }
  });

  ws.on('close', () => {
    if (username) {
      clients.delete(username);
      queue = queue.filter(u => u !== username);
      if (currentTurn === username) {
        currentTurn = null;
        assignNextTurn();
      }
      broadcast({ type: 'user_left', username });
    }
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
