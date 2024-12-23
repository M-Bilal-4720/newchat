import io from 'socket.io-client';

class MediaStreamSDK {
    constructor(serverUrl) {
        this.socket = io(serverUrl);
        this.roomName = '';
        this.localStream = null;
        this.peerConnections = {};
    }


    connect() {
        this.socket.on('connection-success', data => {
            console.log('Connected to server with socket id: ', data.socketId);
        });
    }

    joinRoom(roomName) {
        this.roomName = roomName;
        this.socket.emit('joinRoom', { roomName }, response => {
            console.log('Room joined. RTP Capabilities:', response.rtpCapabilities);
            // Initialize WebRTC transport and streaming logic
        });
    }

    startStream(stream) {
        // Start stream production logic
        this.localStream = stream;
        this.socket.emit('transport-produce', { kind: 'video', rtpParameters: { /* rtp parameters here */ } }, response => {
            console.log('Stream started with producer ID: ', response.id);
        });
    }

    joinStream(producerId) {
        // Join stream and consume logic
        this.socket.emit('consume', { rtpCapabilities: capabilities, remoteProducerId: producerId }, response => {
            console.log('Joined stream with consumer ID: ', response.id);
        });
    }
}

export default MediaStreamSDK;
