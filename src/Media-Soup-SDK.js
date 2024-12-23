import io from 'socket.io-client';

const socket = io('http://localhost:3000/');
socket.on('connect', () => {
  console.log('Connected to signaling server');
});


class MediasoupSDK {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.socket = null;
    this.roomName = null;
    this.device = null;
    this.producerTransport = null;
    this.consumerTransport = null;
    this.producers = [];
    this.consumers = [];
  }

  /**
   * Connect to the mediasoup server
   */
  async connect() {
    this.socket = io(this.serverUrl, { path: '/mediasoup' });

    return new Promise((resolve, reject) => {
      this.socket.on('connection-success', ({ socketId }) => {
        console.log(`Connected: ${socketId}`);
        resolve(socketId);
      });

      this.socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
        reject(err);
      });
    });
  }

  /**
   * Join a specific room
   * @param {string} roomName
   */
  async joinRoom(roomName) {
    this.roomName = roomName;

    return new Promise((resolve, reject) => {
      this.socket.emit('joinRoom', { roomName }, async ({ rtpCapabilities }) => {
        try {
          console.log('Joined room:', roomName);
          resolve(rtpCapabilities);
        } catch (error) {
          console.error('Error joining room:', error);
          reject(error);
        }
      });
    });
  }

  /**
   * Create a device instance using RTP capabilities
   * @param {object} rtpCapabilities
   */
  async createDevice(rtpCapabilities) {
    try {
      const { Device } = await import('mediasoup-client');
      this.device = new Device();
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device loaded:', this.device);
    } catch (error) {
      console.error('Error creating device:', error);
      throw error;
    }
  }

  /**
   * Create WebRTC transport
   * @param {boolean} consumer - True if creating a consumer transport
   */
  async createTransport(consumer = false) {
    return new Promise((resolve, reject) => {
      this.socket.emit('createWebRtcTransport', { consumer }, async ({ params }) => {
        try {
          const transport = consumer
            ? this.device.createRecvTransport(params)
            : this.device.createSendTransport(params);

          transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            this.socket.emit('transport-connect', { dtlsParameters });
            callback();
          });

          if (!consumer) {
            transport.on('produce', async ({ kind, rtpParameters }, callback, errback) => {
              this.socket.emit('transport-produce', { kind, rtpParameters }, ({ id }) => {
                callback({ id });
              });
            });
          }

          console.log(`Transport created: ${consumer ? 'consumer' : 'producer'}`);
          if (consumer) {
            this.consumerTransport = transport;
          } else {
            this.producerTransport = transport;
          }
          resolve(transport);
        } catch (error) {
          console.error('Error creating transport:', error);
          reject(error);
        }
      });
    });
  }

  /**
   * Produce media stream
   * @param {MediaStreamTrack} track - Media track to send
   * @param {string} kind - Media type (audio or video)
   */
  async produce(track, kind) {
    if (!this.producerTransport) {
      throw new Error('Producer transport not created yet');
    }

    const producer = await this.producerTransport.produce({ track, kind });
    this.producers.push(producer);

    producer.on('transportclose', () => {
      console.log('Producer transport closed');
    });

    console.log(`Producer created for ${kind}`);
    return producer;
  }

  /**
   * Consume media stream
   * @param {object} producerId - ID of the producer to consume
   */
  async consume(producerId) {
    if (!this.consumerTransport) {
      throw new Error('Consumer transport not created yet');
    }

    return new Promise((resolve, reject) => {
      this.socket.emit('consume', { producerId, rtpCapabilities: this.device.rtpCapabilities }, async ({ params }) => {
        try {
          const consumer = await this.consumerTransport.consume(params);
          this.consumers.push(consumer);

          consumer.on('transportclose', () => {
            console.log('Consumer transport closed');
          });

          console.log(`Consumer created for producer: ${producerId}`);
          resolve(consumer);
        } catch (error) {
          console.error('Error consuming media:', error);
          reject(error);
        }
      });
    });
  }

  /**
   * Disconnect and clean up
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from server');
    }
  }
}

export default MediasoupSDK;
