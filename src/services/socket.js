// src/services/socket.js
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:3000/mediasoup'); // Backend URL

socket.on('connection-success', ({ socketId }) => {
    console.log(`Connected with Socket ID: ${socketId}`);
});

export default socket;
