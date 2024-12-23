<template>
  <div>
    <button @click="joinRoom('exampleRoom')">Join Room</button>
    <button @click="startStream">Start Stream</button>
    <!-- Video element for local stream display -->
    <video ref="localVideo" autoplay muted></video>
  </div>
</template>

<script>
import MediaStreamSDK from '/src/services/mediasoup.js';

export default {
  data() {
    return {
      mediaSDK: null,
    };
  },
  methods: {
    joinRoom(roomName) {
      this.mediaSDK.joinRoom(roomName);
    },
    startStream() {
      // Get user media and start stream
      navigator.mediaDevices.getUserMedia({video: true, audio: true})
          .then(stream => {
            // Display the local stream in a video element
            const videoElement = this.$refs.localVideo;
            videoElement.srcObject = stream;

            // Start streaming
            this.mediaSDK.startStream(stream);
          })
          .catch(error => {
            console.error('Error getting user media:', error);
          });
    },
  },
  mounted() {
    // Initialize MediaStreamSDK with the server URL
    this.mediaSDK = new MediaStreamSDK('http://127.0.0.1:3000/mediasoup');
    this.mediaSDK.connect();
  },
};
</script>

<style scoped>
video {
  width: 100%;
  height: auto;
}
</style>
