import instance from '../axios.js';  // Import the axios instance

export default {
    // Create transport for sending and receiving streams
    async createTransport() {
        const response = await instance.post('/create-transport');
        return response.data;
    },

    // Connect transport to Mediasoup server
    async connectTransport(transportId, dtlsParameters) {
        const response = await instance.post('/connect-transport', {
            transportId,
            dtlsParameters,
        });
        return response.data;
    },

    // Produce media stream (send media to server)
    async produce(transportId, kind, rtpParameters) {
        const response = await instance.post('/produce', {
            transportId,
            kind,
            rtpParameters,
        });
        return response.data;
    },

    // Consume media stream (receive media from server)
    async consume(transportId, rtpCapabilities) {
        const response = await instance.post('/consume', {
            transportId,
            rtpCapabilities,
        });
        return response.data;
    },

    // Fetch router RTP capabilities (used for device loading)
    async getRouterRtpCapabilities() {
        const response = await instance.get('/router-rtp-capabilities');
        return response.data;
    },
};
