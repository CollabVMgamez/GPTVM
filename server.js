const WebSocket = require('ws');
const { spawn } = require('child_process');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });

let users = new Map(); // socket -> { username }
let queue = [];
let currentController = null;
let turnTimer = null;
let remainingSeconds = 0;

function broadcast(type, data) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type, ...data }));
    }
  }
}

function updateTurnCountdown() {
  if (!currentController) return;

  remainingSeconds--;

  if (remainingSeconds <= 0) {
    endTurn();
  } else {
    broadcastTurnStatus();
  }
}

function broadcastTurnStatus() {
  for (const client of wss.clients) {
    if (client.readyState !== WebSocket.OPEN) continue;

    const user = users.get(client);
    const isController = client === currentController;

    let waitTime = remainingSeconds;
    if (!isController && queue.includes(client)) {
      const index = queue.indexOf(client);
      waitTime = remainingSeconds + index * 18;
    }

    client.send(
      JSON.stringify({
        type: 'turn_update',
        allowed: isController,
        seconds: isController ? remainingSeconds : waitTime,
      })
    );
  }
}

function startTurn() {
  if (queue.length === 0) {
    currentController = null;
    broadcastTurnStatus();
    return;
  }

  currentController = queue.shift();
  remainingSeconds = 18;

  currentController.send(
    JSON.stringify({
      type: 'control',
      allowed: true,
      seconds: 18,
    })
  );

  broadcast({
    type: 'chat',
    username: 'System',
    message: `${users.get(currentController).username} has control for 18 seconds.`,
  });

  broadcastTurnStatus();

  if (turnTimer) clearInterval(turnTimer);
  turnTimer = setInterval(updateTurnCountdown, 1000);
}

function endTurn() {
  if (turnTimer) clearInterval(turnTimer);
  turnTimer = null;
  remainingSeconds = 0;

  if (currentController && currentController.readyState === WebSocket.OPEN) {
    currentController.send(
      JSON.stringify({
        type: 'control',
        allowed: false,
      })
    );
  }

  currentController = null;
  startTurn();
}

// Start QEMU from qemu.txt
const qemuCmd = fs.readFileSync('qemu.txt', 'utf-8').trim();
if (!qemuCmd) {
  console.error('Error: qemu.txt is empty or not found.');
  process.exit(1);
}

const qemuParts = qemuCmd.split(/\s+/);
const qemuProcess = spawn(qemuParts[0], qemuParts.slice(1), { stdio: 'inherit' });

qemuProcess.on('exit', (code) => {
  console.log(`QEMU exited with code ${code}`);
});

// Start websockify
const websockify = spawn('websockify', ['--web', 'public/noVNC', '5901', 'localhost:5900'], { stdio: 'inherit' });

websockify.on('exit', (code) => {
  console.log(`Websockify exited with code ${code}`);
});

wss.on('connection', (ws) => {
  users.set(ws, { username: null });

  ws.on('message', (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch {
      return;
    }

    switch (data.type) {
      case 'set_username':
        users.get(ws).username = data.username;
        broadcast('user_joined', { username: data.username });
        break;

      case 'chat':
        const username = users.get(ws)?.username || 'Unknown';
        broadcast('chat', { username, message: data.message });
        break;

      case 'request_turn':
        if (ws === currentController || queue.includes(ws)) return;
        queue.push(ws);
        if (!currentController) {
          startTurn();
        } else {
          ws.send(JSON.stringify({
            type: 'chat',
            username: 'System',
            message: `You are in queue for control.`,
          }));
          broadcastTurnStatus();
        }
        break;

      case 'end_turn':
        if (ws === currentController) {
          endTurn();
        }
        break;
    }
  });

  ws.on('close', () => {
    const user = users.get(ws);
    users.delete(ws);
    queue = queue.filter(c => c !== ws);
    if (ws === currentController) {
      endTurn();
    }
    if (user?.username) {
      broadcast('user_left', { username: user.username });
    }
  });
});

console.log('WebSocket server running on ws://localhost:8080');
