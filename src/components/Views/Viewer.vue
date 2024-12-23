<template>
  <div>
    <h3>Live Stream</h3>
    <video ref="videoElement" autoplay playsinline></video>
  </div>
</template>

<script>
import * as mediasoupClient from 'mediasoup-client';
import axios from '../axios'; // Update this path as necessary
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "socketkey",
  cluster: "mt1",
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  authEndpoint: "http://localhost:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
});

export default {
  data() {
    return {
      device: null,
      consumer: null,
      receiveTransport: null,
    };
  },
  methods: {
    async startViewing() {
      try {
        const response = await axios.post('/api/stream/view');
        const {routerRtpCapabilities, recvTransportParams} = response.data;

        // Initialize Mediasoup device with router capabilities
        this.device = new mediasoupClient.Device();
        await this.device.load({routerRtpCapabilities});

        // Create a receive transport
        this.createReceiveTransport(recvTransportParams);

        // Listen for stream-start events to receive the producer ID
        echo.channel('stream-channel').listen('stream-start', async (event) => {
          if (event.producerId) {
            await this.consumeStream(event.producerId);
          }
        });
      } catch (error) {
        console.error("Error starting viewing", error);
      }
    },

    async createReceiveTransport(params) {
      this.receiveTransport = this.device.createRecvTransport(params);

      this.receiveTransport.on("connect", async ({dtlsParameters}, callback, errback) => {
        try {
          await axios.post('/api/transport/connect', {dtlsParameters});
          callback();
        } catch (error) {
          errback(error);
        }
      });

      this.receiveTransport.on("connectionstatechange", (state) => {
        if (state === 'connected') {
          console.log("Connected to receive transport");
        }
      });
    },

    async consumeStream(producerId) {
      try {
        const {rtpCapabilities} = this.device;

        const response = await axios.post('/api/stream/consume', {
          producerId,
          rtpCapabilities,
        });

        const {id, kind, rtpParameters} = response.data;

        // Create a consumer to receive the stream
        this.consumer = await this.receiveTransport.consume({
          id,
          producerId,
          kind,
          rtpParameters,
        });

        const videoElement = this.$refs.videoElement;
        videoElement.srcObject = new MediaStream([this.consumer.track]);
        videoElement.play();
      } catch (error) {
        console.error("Error consuming stream", error);
      }
    },
  },

  mounted() {
    this.startViewing();
  },
};
</script>
