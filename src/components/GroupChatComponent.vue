<script>
import axios from '../axios';
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
  name: "GroupChatComponent",
  props: {
   groupId: {
      type: Number, // Or String, depending on your ID type
      required: true
    }
  },

  data() {
    return {
      messages: [],
      newMessage: "",
      userinfo:{},
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      userInfo: {},
      groupInfo:[],
    };
  },
  mounted() {
    this.loadUser();
    this.getMessages();
    this.getGroupInfo();
    this.scrollToBottom();
    this.activeUserListner();
    this.listenForMessages();
    this.getUserInfo();
  },
  computed: {
    imageUrls() {
      // Parse JSON only if it's a gallery type and file_url is present
      return this.message.type === 'gallery' && this.message.file_url
          ? JSON.parse(this.message.file_url)
          : [];
    },
    groupedMessagesByDate() {
      return this.messages.reduce((groups, message) => {
        const messageDate = new Date(message.created_at).toDateString();
        let group = groups.find(g => g.date === messageDate);
        if (!group) {
          group = { date: messageDate, messages: [] };
          groups.push(group);
        }
        group.messages.push(message);
        return groups;
      }, []);
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  },
  methods: {
    goBack() {
      this.$emit('navigate-back'); // Emit an event to the parent
    },
    loadUser() {
      // Retrieve user object from localStorage
      return this.userInfo = JSON.parse(localStorage.getItem('User'));
    },
    getprofileFileUrl(avatar) {
      return avatar ? `http://127.0.0.1:8000/${avatar}` : '/assets/img/profiles/avatar-06.jpg';
    },
    isImageFile(fileName) {
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
      return imageExtensions.includes(fileName.split(".").pop().toLowerCase());
    },
    getFileUrl(fileUrl) {
      return `http://127.0.0.1:8000/${fileUrl}`;
    },
    formatDate(date) {
      // Format date as "Today, Month Day" or similar format
      return new Date(date).toLocaleDateString('en-US', {
        weekday: 'long', month: 'short', day: 'numeric'
      });
    },
    formatTime(timestamp) {
      // Format timestamp as "HH:MM AM/PM"
      return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
      });
    },
    getMessages() {'9'
      axios
          .get(`/group/messages/${this.groupId}`)
          .then((response) => {
            this.messages = response.data || [];
            console.log('messages:', response.data);
            this.scrollToBottom();
          })
          .catch((error) => {
            console.error("Error fetching messages:", error);
          });
    },
    getGroupInfo(){
      axios.get(`group/users/${this.groupId}`)
          .then((response) => {
            this.groupInfo = response.data.data || [];
            console.log('Group info:',response.data.data);
          })
          .catch((error) => {
            console.error("Error fetching group info:", error);
          });
    },
    listenForMessages() {
      echo.private(`group.${this.groupId}`)
          .listen("GroupMessageSent", (event) => {
            console.log('group massege',event.message);
            // const newMessage = {
            //   ...event.message,
            //   user: event.message.user || {},
            // };
            // console.log('Group id', this.groupId);
            // this.messages.push(newMessage);
            // console.log('Pusher Message:',newMessage);
            // this.scrollToBottom();
          });
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    sendMessage(type = 'text') {
      const formData = new FormData();
      if (type === 'text' && this.newMessage.trim()) {
        formData.append('message', this.newMessage);
        formData.append("group_id", this.groupId);
        formData.append('type', 'text');

        // Handle file input (single file)
      } else if (this.selectedFile) {
        formData.append('file', this.selectedFile);
        formData.append('type', 'file');

        // Handle audio recording
      } else if (type === 'audio' && this.recordedAudio) {
        formData.append('file', this.recordedAudio);
        formData.append('type', 'audio');

        // Handle image (taken with camera or selected)
      } else if (type === 'image' && this.selectedImage) {
        formData.append('file', this.selectedImage);
        formData.append('type', 'image');

        // Handle image gallery (multiple images selected)
      } else if (type === 'gallery' && this.selectedImages.length > 0) {
        this.selectedImages.forEach((image) => {
          formData.append('files[]', image);  // Using 'files[]' for multiple files
        });
        formData.append('type', 'gallery');

        // Handle video (recorded video or selected from gallery)
      } else if (type === 'video' && (this.recordedVideo || this.selectedVideo)) {
        formData.append('file', this.recordedVideo || this.selectedVideo);
        formData.append('type', 'video');

        // Handle location
      } else if (type === 'location') {
        formData.append('type', 'location');
        // Add any additional location data here if needed

        // Handle contact
      } else if (type === 'contact') {
        formData.append('type', 'contact');
        // Add any contact data here if needed

      } else {
        return; // Prevent sending if no valid message type
      }

      // Send data via axios
      axios
          .post("/group/message/sent", formData)
          .then((response) => {
            console.log("Message Sent:", response.data.message);
            const userInfo = JSON.parse(localStorage.getItem("User"));
            const messageWithUser = {
              ...response.data.message,
              user: userInfo, // Add the user information
            };
            this.messages.push(messageWithUser);
            this.newMessage = "";
            this.selectedFile = null;
            this.selectedImage = null;
            this.selectedImages = [];
            this.recordedAudio = null;
            this.recordedVideo = null;
            this.selectedVideo = null;
            this.scrollToBottom();
          })
          .catch((error) => {
            console.error(error);
          });
    },
    sendImageMessage() {
      const formData = new FormData();
      formData.append('file',this.selectedImage);
      formData.append('group_id',this.groupId);
      formData.append('type','image');
      this.selectedFile = null;
      axios.post('/message/send',formData)
          .then((response) => {
            this.messages.push(response.data.messages);
            this.scrollToBottom();
          })
    },
    scrollToBottom() {
      // Locate the chat container by its ref and scroll it to the bottom
      const chatContainer = this.$refs.chatscroller;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    },

    toggleRecording() {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },
    startRecording() {
      navigator.mediaDevices.getUserMedia({audio: true})
          .then(stream => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = event => {
              this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
              const audioBlob = new Blob(this.audioChunks, {type: 'audio/wav'});
              const audioUrl = URL.createObjectURL(audioBlob);
              this.sendVoiceMessage(audioBlob, audioUrl);
            };
            this.mediaRecorder.start();
            this.isRecording = true;
          })
          .catch(error => {
            console.error('Error accessing audio devices:', error);
          });
    },
    stopRecording() {
      this.mediaRecorder.stop();
      this.isRecording = false;
    },
    sendVoiceMessage(audioBlob) {
      const formData = new FormData();
      formData.append('file', audioBlob);
      formData.append('group_id', this.groupId);
      formData.append('type', 'audio'); // Indicate the type of message
      alert(formData || 'Send Voice Message');
      axios.post('/message/send', formData)
          .then(response => {
            this.messages.push(response.data.messages);
            this.scrollToBottom();
          })
          .catch(error => {
            console.error('Error sending voice message:', error);
          });
    },
    getUserInfo() {
      const chatId = this.userId;
      axios
          .get(`/user/${chatId}`)
          .then((response) => {
            this.userinfo = response.data.user;
            console.log('useinfo:',response.data.user);
          })
          .catch((error) => {
            console.error("Error fetching user info:", error);
          });
    },
    selectedImage(event) {
      this.selectedImage = event.target.files[0];
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    activeUserListner() {
    const userId = localStorage.getItem('userId');

     if (userId) {
        console.log('Listening for status updates...');
        echo.join('presence.friends') // Global channel for all users
            .listen('UserStatusUpdated', (event) => {
                if (Array.isArray(this.groupInfo.users)) {
                    this.groupInfo.users.forEach((user) => {
                        if (user.user && user.user?.id === event.user_id) {
                            console.log(`Updating status for user ID: ${user.user.id}`);
                            if (event.is_active === 1) {
                                this.groupInfo.activeusers += 1;
                            } else if (event.is_active === 0) {
                                this.groupInfo.activeusers -= 1;
                            }
                            this.$set(this.groupInfo, 'activeusers', this.groupInfo.activeusers);
                        }
                    });
                }
            });
    } else {
        console.error("User ID not found in localStorage.");
    }
    },
  },
};
</script>

<template>

  <div class="chat  show" id="middle">
    <div>
      <div class="chat-header">
        <div class="user-details">
          <div class="d-xl-none">
            <a class="text-muted chat-close me-2" href="#"
              @click.prevent="goBack">
              <i class="fas fa-arrow-left"></i>
            </a>
          </div>
          <div class="avatar avatar-lg online flex-shrink-0">
            <img src="/assets/img/groups/group-01.jpg" class="rounded-circle" alt="image">
          </div>
          <div class="ms-2 overflow-hidden">
            <h6>{{groupInfo.name}}</h6>
            <p class="last-seen text-truncate">{{groupInfo.totalusers}} Member, <span class="text-success">{{ groupInfo.activeusers }} Online</span></p>
          </div>
        </div>
        <div class="chat-options">
          <ul>
            <li>
              <div class="avatar-list-stacked avatar-group-md d-flex">
                <!-- Loop through the users array -->
                <span v-for="user in groupInfo.users" :key="user.id" class="avatar avatar-rounded">
          <img :src="getprofileFileUrl(user.avatar)" :alt="user.name"/>
        </span>
                <!-- Display the remaining user count -->
                <a v-if="groupInfo && groupInfo.totalusers > (groupInfo.users?.length || 0)"
                   class="avatar bg-primary avatar-rounded text-fixed-white"
                   href="javascript:void(0);">
                  {{ groupInfo.totalusers - (groupInfo.users?.length || 0) }}+
                </a>
              </div>
            </li>
            <li>
              <a href="javascript:void(0)" class="btn chat-search-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
                <i class="ti ti-search"></i>
              </a>
            </li>
            <li title="Group Info" data-bs-toggle="tooltip" data-bs-placement="bottom">
              <a href="javascript:void(0)" class="btn" data-bs-toggle="offcanvas" data-bs-target="#contact-profile">
                <i class="ti ti-info-circle"></i>
              </a>
            </li>
            <li>
              <a class="btn no-bg" href="#" data-bs-toggle="dropdown">
                <i class="ti ti-dots-vertical"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="index.html" class="dropdown-item">
                    <i class="ti ti-x me-2"></i>Close Group
                  </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification">
                    <i class="ti ti-volume-off me-2"></i>Mute Notification
                  </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#disappearing-messages">
                    <i class="ti ti-clock-hour-4 me-2"></i>Disappearing Message
                  </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#clear-chat">
                    <i class="ti ti-clear-all me-2"></i>Clear Message
                  </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-chat">
                    <i class="ti ti-trash me-2"></i>Delete Group
                  </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user">
                    <i class="ti ti-thumb-down me-2"></i>Report
                  </a>
                </li>
                <li>
                  <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user">
                    <i class="ti ti-ban me-2"></i>Block
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <!-- Chat Search -->
        <div class="chat-search search-wrap contact-search">
          <form>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search Contacts">
              <span class="input-group-text"><i class="ti ti-search"></i></span>
            </div>
          </form>
        </div>
        <!-- /Chat Search -->
      </div>
      <div class="chat-body ">
        <div ref="chatContainer" style="overflow-y: auto; max-height: 100%;" class="chat-body chat-page-group " >
          <div class="row" v-for="(messageGroup, index) in groupedMessagesByDate" :key="index">
            <div class="chat-line">
              <span class="chat-date">{{ formatDate(messageGroup.date) }}</span>
            </div>
            <div class="messages" v-for="message in messageGroup.messages" :key="message.id">

              <div v-if="message.user_id === (userInfo.id)" class="chats chats-right">
                <div class="chat-content">
                  <div class="chat-profile-name text-end">
                    <h6>You<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">{{ formatTime(message.created_at) }}</span><span class="msg-read success"><i class="ti ti-checks"></i></span></h6>
                  </div>
                  <div class="chat-info">
                    <div class="chat-actions">
                      <a class="#" href="#" data-bs-toggle="dropdown">
                        <i class="ti ti-dots-vertical"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li><a class="dropdown-item reply-btn" href="#"><i class="ti ti-corner-up-left me-2"></i>Reply</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                        <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#message-delete"><i class="ti ti-trash me-2"></i>Delete</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                      </ul>
                    </div>
                    <div v-if="message.type==='text'" class="message-content">
                      {{message.message}}
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='audio'" class="message-content bg-transparent p-0">
                      <div class="message-audio">
                        <audio :src="getFileUrl(message.file_url)" controls>

                        </audio>
                      </div>
                    </div>
                    <div v-if="message.type === 'image' && isImageFile(message.file_name)" class="message-content">
                      <div class="chat-img">
                        <div class="img-wrap">
                          <!-- Displaying the image -->
                          <img :src="getFileUrl(message.file_url)" :alt="message.file_name">
                          <div class="img-overlay">
                            <a class="gallery-img" data-fancybox="gallery-img" :href="getFileUrl(message.file_url)" title="View Image">
                              <i class="ti ti-eye"></i>
                            </a>
                            <a :href="getFileUrl(message.file_url)" download>
                              <i class="ti ti-download"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <!-- Fancybox Link to View Full Image -->
                      <a class="gallery-img view-all d-flex align-items-center justify-content-center mt-3"
                         :href="getFileUrl(message.file_url)"
                         data-fancybox="gallery-img">
                        View Full Image<i class="ti ti-arrow-right ms-2"></i>
                      </a>

                      <!-- Emoji and Other Actions -->
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type === 'gallery'" class="message-content">
                      <div class="chat-img">
                        <!-- Loop through gallery images -->
                        <div v-for="(image, index) in JSON.parse(message.file_url)" :key="index" class="img-wrap">
                          <img :src="getFileUrl(image)" :alt="'Gallery Image ' + index">
                          <div class="img-overlay">
                            <a class="gallery-img" data-fancybox="gallery-img" :href="getFileUrl(image)" :title="'Image ' + (index + 1)">
                              <i class="ti ti-eye"></i>
                            </a>
                            <a :href="getFileUrl(image)" download>
                              <i class="ti ti-download"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <!-- Fancybox Link to View Full Image (optional) -->
                      <a class="gallery-img view-all d-flex align-items-center justify-content-center mt-3"
                         :href="getFileUrl(JSON.parse(message.file_url)[JSON.parse(message.file_url).length - 1])"
                         data-fancybox="gallery-img">
                        View Full Gallery<i class="ti ti-arrow-right ms-2"></i>
                      </a>

                      <!-- Emoji and Other Actions -->
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='file'" class="message-content">
                      <div class="file-attach">
                      <span class="file-icon">
                        <i class="ti ti-files"></i>
                      </span>
                        <div class="ms-2 overflow-hidden">
                          <h6 class="mb-1"> {{ message.file_name }}</h6>
                          <p>14.23 KB</p>
                        </div>
                        <a :href="getFileUrl(message.file_url)" :class="download-icon">
                          <i class="ti ti-download"></i>
                        </a>
                      </div>
                      <div class="emoj-group wrap-emoji-group ">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='link'" class="message-content">
                      <div class="message-link">
                        <div class="link-img">
                          <img src="/assets/img/icons/github.svg" alt="Icon">
                        </div>
                        <a href="javascript:void(0);" class="link-primary mt-2">https://segmentfault.com/u/guanguans/articles</a>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='video'" class="message-content">
                      <div class="message-video">
                        <video width="400" controls="">
                          <source src="/assets/img/video/video.mp4" type="video/mp4">
                          Your browser does not support HTML5 video.
                        </video>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='miss-call'" class="message-content">
                      <div class="file-attach">
                        <div class="d-flex align-items-center">
                                                    <span class="file-icon bg-danger text-white">
                                                        <i class="ti ti-phone-call"></i>
                                                    </span>
                          <div class="ms-2 overflow-hidden">
                            <h6 class="mb-1 text-truncate">Missed Audio Call</h6>
                            <p>10 Min 23 Sec</p>
                          </div>
                        </div>
                        <a href="javascript:void(0);" class="download-icon">
                          <i class="ti ti-download"></i>
                        </a>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='audio-call'" class="message-content">
                      <div class="file-attach">
                                                <span class="file-icon bg-success text-white">
                                                    <i class="ti ti-phone-incoming"></i>
                                                </span>
                        <div class="ms-2 overflow-hidden">
                          <h6 class="mb-1">Audio Call Ended</h6>
                          <p>07 Min 34 Sec</p>
                        </div>
                        <a href="javascript:void(0);" class="download-icon">
                          <i class="ti ti-download"></i>
                        </a>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='typing'" class="message-content">
                                        <span class="animate-typing">is typing
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            </span>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                  <div class="emonji-wrap">
                    <a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" class="me-2" alt="icon">24</a>
                    <a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" class="me-2" alt="icon">15</a>
                    <a href="javascript:void(0);"><img src="/assets/img/icons/emonji-04.svg" class="me-2" alt="icon">15</a>
                  </div>
                </div>
                <div class="chat-avatar">
                  <img :src="getprofileFileUrl(message.user.avatar)" class="rounded-circle dreams_chat" alt="image">
                </div>
              </div>
              <div v-else class="chats">
                <div class="chat-avatar">
                  <img :src="getprofileFileUrl(message.user.avatar)" class="rounded-circle" alt="image">
                </div>
                <div class="chat-content">
                  <div class="chat-profile-name">
                    <h6>{{message.user.name}}<i class="ti ti-circle-filled fs-7 mx-2"></i>
                      <span class="chat-time">{{ formatTime(message.created_at) }}</span>
                      <span class="msg-read success"><i class="ti ti-checks"></i></span>
                    </h6>
                  </div>
                  <div class="chat-info">

                    <div v-if="message.type==='text'" class="message-content">
                      {{message.message}}
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='audio'" class="message-content bg-transparent p-0">
                      <div class="message-audio">
                        <audio :src="getFileUrl(message.file_url)" controls>

                        </audio>
                      </div>
                    </div>
                    <div v-if="message.type === 'image' && isImageFile(message.file_name)" class="message-content">
                      <div class="chat-img">
                        <div class="img-wrap">
                          <!-- Displaying the image -->
                          <img :src="getFileUrl(message.file_url)" :alt="message.file_name">
                          <div class="img-overlay">
                            <a class="gallery-img" data-fancybox="gallery-img" :href="getFileUrl(message.file_url)" title="View Image">
                              <i class="ti ti-eye"></i>
                            </a>
                            <a :href="getFileUrl(message.file_url)" download>
                              <i class="ti ti-download"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <!-- Fancybox Link to View Full Image -->
                      <a class="gallery-img view-all d-flex align-items-center justify-content-center mt-3"
                         :href="getFileUrl(message.file_url)"
                         data-fancybox="gallery-img">
                        View Full Image<i class="ti ti-arrow-right ms-2"></i>
                      </a>

                      <!-- Emoji and Other Actions -->
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type === 'gallery'" class="message-content">
                      <div class="chat-img">
                        <!-- Loop through gallery images -->
                        <div v-for="(image, index) in JSON.parse(message.file_url)" :key="index" class="img-wrap">
                          <img :src="getFileUrl(image)" :alt="'Gallery Image ' + index">
                          <div class="img-overlay">
                            <a class="gallery-img" data-fancybox="gallery-img" :href="getFileUrl(image)" :title="'Image ' + (index + 1)">
                              <i class="ti ti-eye"></i>
                            </a>
                            <a :href="getFileUrl(image)" download>
                              <i class="ti ti-download"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <!-- Fancybox Link to View Full Image (optional) -->
                      <a class="gallery-img view-all d-flex align-items-center justify-content-center mt-3"
                         :href="getFileUrl(JSON.parse(message.file_url)[JSON.parse(message.file_url).length - 1])"
                         data-fancybox="gallery-img">
                        View Full Gallery<i class="ti ti-arrow-right ms-2"></i>
                      </a>

                      <!-- Emoji and Other Actions -->
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='file'" class="message-content">
                      <div class="file-attach">
                      <span class="file-icon">
                        <i class="ti ti-files"></i>
                      </span>
                        <div class="ms-2 overflow-hidden">
                          <h6 class="mb-1"> {{ message.file_name }}</h6>
                          <p>14.23 KB</p>
                        </div>
                        <a :href="getFileUrl(message.file_url)" :class="download-icon">
                          <i class="ti ti-download"></i>
                        </a>
                      </div>
                      <div class="emoj-group wrap-emoji-group ">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='link'" class="message-content">
                      <div class="message-link">
                        <div class="link-img">
                          <img src="/assets/img/icons/github.svg" alt="Icon">
                        </div>
                        <a href="javascript:void(0);" class="link-primary mt-2">https://segmentfault.com/u/guanguans/articles</a>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='video'" class="message-content">
                      <div class="message-video">
                        <video width="400" controls="">
                          <source src="/assets/img/video/video.mp4" type="video/mp4">
                          Your browser does not support HTML5 video.
                        </video>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='miss-call'" class="message-content">
                      <div class="file-attach">
                        <div class="d-flex align-items-center">
                                                    <span class="file-icon bg-danger text-white">
                                                        <i class="ti ti-phone-call"></i>
                                                    </span>
                          <div class="ms-2 overflow-hidden">
                            <h6 class="mb-1 text-truncate">Missed Audio Call</h6>
                            <p>10 Min 23 Sec</p>
                          </div>
                        </div>
                        <a href="javascript:void(0);" class="download-icon">
                          <i class="ti ti-download"></i>
                        </a>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='audio-call'" class="message-content">
                      <div class="file-attach">
                                                <span class="file-icon bg-success text-white">
                                                    <i class="ti ti-phone-incoming"></i>
                                                </span>
                        <div class="ms-2 overflow-hidden">
                          <h6 class="mb-1">Audio Call Ended</h6>
                          <p>07 Min 34 Sec</p>
                        </div>
                        <a href="javascript:void(0);" class="download-icon">
                          <i class="ti ti-download"></i>
                        </a>
                      </div>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-03.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-10.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-09.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>
                    <div v-if="message.type==='typing'" class="message-content">
                                        <span class="animate-typing">is typing
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            <span class="dot"></span>
                                            </span>
                      <div class="emoj-group">
                        <ul>
                          <li class="emoj-action"><a href="javascript:void(0);"><i class="ti ti-mood-smile"></i></a>
                            <div class="emoj-group-list">
                              <ul>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                                <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                                <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                              </ul>
                            </div>
                          </li>
                          <li><a href="#" data-bs-toggle="modal" data-bs-target="#forward-message"><i class="ti ti-arrow-forward-up"></i></a></li>
                        </ul>
                      </div>
                    </div>

                    <div class="chat-actions">
                      <a class="#" href="#" data-bs-toggle="dropdown">
                        <i class="ti ti-dots-vertical"></i>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li><a class="dropdown-item reply-btn" href="#"><i class="ti ti-corner-up-left me-2"></i>Reply</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                        <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#message-delete"><i class="ti ti-trash me-2"></i>Delete</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                        <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <form class="footer-form" @submit.prevent="sendMessage">
        <div class="chats reply-chat reply-div" id="reply-div">
          <div class="chat-avatar">
            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
          </div>
          <div class="chat-content">
            <div class="chat-profile-name">
              <h6>Edward Lietz<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"><i class="ti ti-checks"></i></span></h6>
            </div>
            <div class="chat-info">
              <div class="message-content">
                <div class="message-reply reply-content">Thank you for your support</div>
              </div>
            </div>
          </div>
          <a href="#" class="close-replay"><i class="ti ti-x"></i></a>
        </div>

        <div class="chat-footer-wrap">
          <div class="form-item">
            <a href="#" class="action-circle" @click="toggleRecording">
              <i v-if="isRecording" class="ti ti-macro-off"></i>
              <i v-else class="ti ti-microphone">
              </i></a>
          </div>
          <div class="form-wrap">
            <input class="form-control" v-model="newMessage" @keyup.enter="sendMessage('text')" placeholder="Type a message..." />
          </div>
          <div class="form-item emoj-action-foot">
            <a href="#" class="action-circle"><i class="ti ti-mood-smile"></i></a>
            <div class="emoj-group-list-foot down-emoji-circle">
              <!-- Emoji list here -->
            </div>
          </div>
          <div class="form-item position-relative d-flex align-items-center justify-content-center">
            <a href="#" class="action-circle file-action position-absolute"><i class="ti ti-folder"></i></a>
            <input  class="open-file position-relative" name="files" id="files" type="file" @change="selectedImage" hidden ref="fileInput">
          </div>
          <div class="form-item">
            <a href="#" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></a>
            <div class="dropdown-menu dropdown-menu-end p-3">
              <a href="#" class="dropdown-item" @click="sendImageMessage()" type="file" @change="selectedImage" hidden ref="fileInput" ><i class="ti ti-camera-selfie me-2"></i>Camera</a>
              <a href="#" class="dropdown-item" @click="sendMessage('gallery')"><i class="ti ti-photo-up me-2"></i>Gallery</a>
              <a href="#" class="dropdown-item" @click="sendMessage('audio')"><i class="ti ti-music me-2"></i>Audio</a>
              <a href="#" class="dropdown-item" @click="sendMessage('location')"><i class="ti ti-map-pin-share me-2"></i>Location</a>
              <a href="#" class="dropdown-item" @click="sendMessage('contact')"><i class="ti ti-user-check me-2"></i>Contact</a>
            </div>
          </div>
          <div class="form-btn">
            <button class="btn btn-primary"  type="submit"><i class="ti ti-send"></i></button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
/* General styling */
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height for entire chat area */
}

.chat-header,
.chat-footer {
  background: #f5f5f5; /* Background color for header and footer */
  padding: 1rem;
  z-index: 1;
}

.chat-header {
  flex-shrink: 0; /* Prevent header from shrinking */
  border-bottom: 1px solid #ddd;
}

.chat-footer {
  flex-shrink: 0; /* Prevent footer from shrinking */
  border-top: 1px solid #ddd;
}

/* Chat messages scrollable section */
.chat-messages {
  overflow-y: auto;
  flex-grow: 1;
  padding: 1rem;
  background: #fff;
}

/* Additional optional styles */
.chat-content-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Custom scrollbar styling (optional) */
.chat-messages::-webkit-scrollbar {
  width: 8px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}


</style>