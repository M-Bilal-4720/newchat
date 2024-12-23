<template>
  <!-- Insert HTML for sidebar with links to models like group chat, voice, and video call -->
  <!-- Chat -->
  <div class="welcome-content d-flex align-items-center justify-content-center">
    <div class="welcome-info text-center">
      <div class="welcome-box bg-white d-inline-flex align-items-center">
                        <span class="avatar avatar-md me-2">
                            <img :src="getFileUrl(userInfo.avatar)" alt="img" class="rounded-circle">
                        </span>
        <h6>Welcome! {{userInfo.name}}<img src="/assets/img/icons/emoji-01.svg" alt="Image" class="ms-2"></h6>
      </div>
      <p>Choose a person or group to start chat with them.</p>
      <a href="javascript:void(0);" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#new-chat"><i class="ti ti-location me-2"></i>Invite Contacts</a>
    </div>
  </div>
  <!-- /Chat -->
</template>

<script>
// import axios from "../axios.js";
export default {
  name: "DefualtChatComponent",
  mounted() {
    this.loadUser();
  },
  data() {
    return {
      userInfo: {},
    }
  },
  methods: {
    getFileUrl(avatar) {
      return avatar ? `http://127.0.0.1:8000/${avatar}` : '/assets/img/profiles/avatar-16.jpg';
    },
    loadUser() {
      // Retrieve user object from localStorage
      return this.userInfo = JSON.parse(localStorage.getItem('User'));
    },
  },
};

</script>
<style>

</style>