let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}let ws;
let pc;
let username = '';

function setUsername() {
  const input = document.getElementById('username-input');
  username = input.value.trim();
  if (!username) return;

  document.getElementById('username-prompt').style.display = 'none';

  startWebSocket();
}

function startWebSocket() {
  ws = new WebSocket('ws://localhost:8080');

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: 'set_username', username }));
    ws.send(JSON.stringify({ type: 'webrtc_start' }));
  };

  ws.onmessage = async (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case 'chat':
        appendChat(`${data.username}: ${data.message}`);
        break;

      case 'user_joined':
        appendChat(`🟢 ${data.username} joined`);
        break;

      case 'user_left':
        appendChat(`🔴 ${data.username} left`);
        break;

      case 'webrtc_offer':
        setupWebRTC(data.offer);
        break;

      case 'webrtc_ice':
        if (pc) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
        break;
    }
  };
}

function sendMessage() {
  const input = document.getElementById('chat-message');
  const msg = input.value.trim();
  if (msg && ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'chat', message: msg }));
    input.value = '';
  }
}

function appendChat(msg) {
  const log = document.getElementById('chat-log');
  const div = document.createElement('div');
  div.textContent = msg;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

async function setupWebRTC(offer) {
  pc = new RTCPeerConnection();

  pc.ontrack = (event) => {
    const stream = event.streams[0];
    document.getElementById('screen').srcObject = stream;
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ type: 'webrtc_ice', candidate: e.candidate }));
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  ws.send(JSON.stringify({ type: 'webrtc_answer', answer }));
}
