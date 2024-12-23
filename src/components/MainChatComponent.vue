<template>
  <div class="chat-content">
    <!--    <h1>Chat Page</h1>-->
    <!-- Chat -->


    <div class="chat chat-messages show" id="middle">
      <div>
        <div class="chat-header">
          <div v-if="userinfo.is_active===1" class="user-details">
            <div class="d-xl-none">
              <a class="text-muted chat-close me-2" href="#" @click.prevent="goBack">
                <i class="fas fa-arrow-left"></i> 
              </a>
            </div>
            <div class="avatar avatar-lg online flex-shrink-0">
              <img :src="getprofileFileUrl(userinfo.avatar)" class="rounded-circle" alt="image">
            </div>
            <div class="ms-2 overflow-hidden">
              <h6>{{userinfo.name}}</h6>
              <span class="last-seen">Online</span>
            </div>
          </div>
          <div class="user-details">
            <div class="d-xl-none">
              <a class="text-muted chat-close me-2" href="#" @click.prevent="goBack">
                <i class="fas fa-arrow-left"></i> 
              </a>
            </div>
            <div class="avatar avatar-lg flex-shrink-0">
              <img :src="getprofileFileUrl(userinfo.avatar)" class="rounded-circle" alt="image">
            </div>
            <div class="ms-2 overflow-hidden">
              <h6>{{userinfo.name}}</h6>
              <span class="last-seen">Offline</span>
            </div>
          </div>
          <div class="chat-options">
            <ul>
              <li>
                <a href="javascript:void(0)" class="btn chat-search-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
                  <i class="ti ti-search"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="bottom" title="Video Call">
                <a href="javascript:void(0)" class="btn" data-bs-toggle="modal" data-bs-target="#video-call">
                  <i class="ti ti-video"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="bottom" title="Voice Call">
                <a href="javascript:void(0)" class="btn" data-bs-toggle="modal" data-bs-target="#voice_call">
                  <i class="ti ti-phone"></i>
                </a>
              </li>
              <li title="Contact Info" data-bs-toggle="tooltip" data-bs-placement="bottom">
                <a href="javascript:void(0)" class="btn" data-bs-toggle="offcanvas" data-bs-target="#contact-profile">
                  <i class="ti ti-info-circle"></i>
                </a>
              </li>
              <li>
                <a class="btn no-bg" href="#" data-bs-toggle="dropdown">
                  <i class="ti ti-dots-vertical"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end p-3">
                  <li><a href="index.html" class="dropdown-item"><i class="ti ti-x me-2"></i>Close Chat</a></li>
                  <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><i class="ti ti-volume-off me-2"></i>Mute Notification</a></li>
                  <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#disappearing-messages"><i class="ti ti-clock-hour-4 me-2"></i>Disappearing Message</a></li>
                  <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#clear-chat"><i class="ti ti-clear-all me-2"></i>Clear Message</a></li>
                  <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete Chat</a></li>
                  <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#report-user"><i class="ti ti-thumb-down me-2"></i>Report</a></li>
                  <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#block-user"><i class="ti ti-ban me-2"></i>Block</a></li>
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
        <div ref="chatContainer" style="overflow-y: auto; max-height: 100%;" class="chat-body chat-page-group " >
          <div class="row" v-for="(messageGroup, index) in groupedMessagesByDate" :key="index">
            <div class="chat-line">
              <span class="chat-date">{{ formatDate(messageGroup.date) }}</span>
            </div>
            <div class="messages" v-for="message in messageGroup.messages" :key="message.id">

              <div v-if="message.sender_id === userinfo.id" class="chats">
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
                        <audio :src="getFileUrl(message.file_url)" controls="">

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
              <div v-else class="chats chats-right">
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
                        <audio :src="getFileUrl(message.file_url)"  controls="">

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
    </div>
    <!-- Insert HTML for main chat area, modals for group chat, voice call, video call -->
  </div>
  <!-- Contact Info -->
  <div class="chat-offcanvas offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="contact-profile" aria-labelledby="chatUserMoreLabel">
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" id="chatUserMoreLabel">Contact Info</h4>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i class="ti ti-x"></i></button>
    </div>
    <div class="offcanvas-body">
      <div class="chat-contact-info">
        <div class="profile-content">
          <div class="contact-profile-info">
            <div class="avatar avatar-xxl online mb-2">
              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="img">
            </div>
            <h6>{{userinfo.name}}</h6>
            <p>Last seen at 07:15 PM</p>
          </div>
          <div class="row gx-3">
            <div class="col">
              <a class="action-wrap">
                <i class="ti ti-phone"></i>
                <p>Audio</p>
              </a>
            </div>
            <div class="col">
              <a class="action-wrap">
                <i class="ti ti-video"></i>
                <p>Video</p>
              </a>
            </div>
            <div class="col">
              <a class="action-wrap">
                <i class="ti ti-brand-hipchat"></i>
                <p>Chat</p>
              </a>
            </div>
            <div class="col">
              <a class="action-wrap">
                <i class="ti ti-search"></i>
                <p>Search</p>
              </a>
            </div>
          </div>
          <div class="content-wrapper">
            <h5 class="sub-title">Profile Info</h5>
            <div class="card">
              <div class="card-body">
                <ul class="list-group profile-item">
                  <li class="list-group-item">
                    <div class="profile-info">
                      <h6>Name</h6>
                      <p>{{userinfo.name}}</p>
                    </div>
                    <div class="profile-icon">
                      <i class="ti ti-user-circle"></i>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="info">
                      <h6>Email Address</h6>
                      <p><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0c65626a634c69746d617c6069226f6361">{{userinfo.email}}</a></p>
                    </div>
                    <div class="icon">
                      <i class="ti ti-mail-heart"></i>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="info">
                      <h6>Phone</h6>
                      <p>{{userinfo.phone}}</p>
                    </div>
                    <div class="icon">
                      <i class="ti ti-phone-check"></i>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="info">
                      <h6>Bio</h6>
                      <p>Hello, I am using DreamsChat</p>
                    </div>
                    <div class="icon">
                      <i class="ti ti-user-check"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="content-wrapper">
            <h5 class="sub-title">Social Profiles</h5>
            <div class="card">
              <div class="card-body">
                <div class="social-icon">
                  <a href="javascript:void(0);"><i class="ti ti-brand-facebook"></i></a>
                  <a href="javascript:void(0);"><i class="ti ti-brand-twitter"></i></a>
                  <a href="javascript:void(0);"><i class="ti ti-brand-instagram"></i></a>
                  <a href="javascript:void(0);"><i class="ti ti-brand-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>
          <div class="content-wrapper">
            <h5 class="sub-title">Media Details</h5>
            <div class="chat-file">
              <div class="file-item action-wrap">
                <div class="accordion accordion-flush chat-accordion" id="mediafile">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse1" aria-expanded="false" aria-controls="chatuser-collapse1">
                        <i class="ti ti-photo-shield me-2"></i>Photos
                      </a>
                    </h2>
                    <div id="chatuser-collapse1" class="accordion-collapse collapse" data-bs-parent="#mediafile">
                      <div class="accordion-body">
                        <div class="chat-user-photo">
                          <div class="chat-img contact-gallery">
                            <div class="img-wrap">
                              <img src="/assets/img/gallery/gallery-01.jpg" alt="img">
                              <div class="img-overlay">
                                <a class="gallery-img" data-fancybox="gallery-img" href="/assets/imggallery/gallery-01.jpg" title="Demo 01"><i class="ti ti-eye"></i></a>
                                <a href="#"><i class="ti ti-download"></i></a>
                              </div>
                            </div>
                            <div class="img-wrap">
                              <img src="/assets/img/gallery/gallery-02.jpg" alt="img">
                              <div class="img-overlay">
                                <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-02.jpg" title="Demo 02"><i class="ti ti-eye"></i></a>
                                <a href="#"><i class="ti ti-download"></i></a>
                              </div>
                            </div>
                            <div class="img-wrap">
                              <img src="/assets/img/gallery/gallery-03.jpg" alt="img">
                              <div class="img-overlay">
                                <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-03.jpg" title="Demo 03"><i class="ti ti-eye"></i></a>
                                <a href="#"><i class="ti ti-download"></i></a>
                              </div>
                            </div>
                            <div class="img-wrap">
                              <img src="/assets/img/gallery/gallery-04.jpg" alt="img">
                              <div class="img-overlay">
                                <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-04.jpg" title="Demo 04"><i class="ti ti-eye"></i></a>
                                <a href="#"><i class="ti ti-download"></i></a>
                              </div>
                            </div>
                            <div class="img-wrap">
                              <img src="/assets/img/gallery/gallery-05.jpg" alt="img">
                              <div class="img-overlay">
                                <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-05.jpg" title="Demo     04"><i class="ti ti-eye"></i></a>
                                <a href="#"><i class="ti ti-download"></i></a>
                              </div>
                            </div>
                          </div>
                          <div class="text-center">
                            <a class="gallery-img view-all link-primary d-inline-flex align-items-center justify-content-center mt-3" href="/assets/img/gallery/gallery-05.jpg" data-fancybox="gallery-img">
                              All Images<i class="ti ti-arrow-right ms-2"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#media-video" aria-expanded="false" aria-controls="media-video">
                        <i class="ti ti-video me-2"></i>Videos
                      </a>
                    </h2>
                    <div id="media-video" class="accordion-collapse collapse" data-bs-parent="#mediafile">
                      <div class="accordion-body">
                        <div class="chat-video">
                          <a href="https://www.youtube.com/embed/Mj9WJJNp5wA" data-fancybox="" class="fancybox video-img">
                            <img src="/assets/img/video/video.jpg" alt="img">
                            <span><i class="ti ti-player-play-filled"></i></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#media-links" aria-expanded="false" aria-controls="media-links">
                        <i class="ti ti-unlink me-2"></i>Links
                      </a>
                    </h2>
                    <div id="media-links" class="accordion-collapse collapse" data-bs-parent="#mediafile">
                      <div class="accordion-body">
                        <div class="link-item">
                                                            <span class="link-icon">
                                                                <img src="/assets/img/icons/github-icon.svg" alt="icon">
                                                            </span>
                          <div class="ms-2">
                            <p>https://segmentfault.com/u/ans</p>
                          </div>
                        </div>
                        <div class="link-item">
                                                            <span class="link-icon">
                                                                <img src="/assets/img/icons/info-icon.svg" alt="icon">
                                                            </span>
                          <div class="ms-2">
                            <p>https://segmentfault.com/u/ans</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#media-document" aria-expanded="false" aria-controls="media-document">
                        <i class="ti ti-unlink me-2"></i>Documents
                      </a>
                    </h2>
                    <div id="media-document" class="accordion-collapse collapse" data-bs-parent="#mediafile">
                      <div class="accordion-body">
                        <div class="document-item">
                          <div class="d-flex align-items-center">
                                                                <span class="document-icon">
                                                                    <i class="ti ti-file-zip"></i>
                                                                </span>
                            <div class="ms-2">
                              <h6>Ecommerce.zip</h6>
                              <p>10.25 MB zip file</p>
                            </div>
                          </div>
                          <a href="javascript:void(0);" class="download-icon">
                            <i class="ti ti-download"></i>
                          </a>
                        </div>
                        <div class="document-item">
                          <div class="d-flex align-items-center">
                                                                <span class="document-icon">
                                                                    <i class="ti ti-video"></i>
                                                                </span>
                            <div class="ms-2">
                              <h6>video-1.mp4</h6>
                              <p>20.50 MB video file</p>
                            </div>
                          </div>
                          <a href="javascript:void(0);" class="download-icon">
                            <i class="ti ti-download"></i>
                          </a>
                        </div>
                        <div class="document-item">
                          <div class="d-flex align-items-center">
                                                                <span class="document-icon">
                                                                    <i class="ti ti-music"></i>
                                                                </span>
                            <div class="ms-2">
                              <h6>Ecommerce.zip</h6>
                              <p>6.25 MB audio file</p>
                            </div>
                          </div>
                          <a href="javascript:void(0);" class="download-icon">
                            <i class="ti ti-download"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-wrapper other-info">
            <h5 class="sub-title">Common in 4 Groups</h5>
            <div class="card">
              <div class="card-body list-group profile-item">
                <a href="javascript:void(0);" class="list-group-item">
                  <div class="d-flex align-items-center">
                    <div class="avatar avatar-lg bg-skyblue rounded-circle me-2">
                      GU
                    </div>
                    <div class="chat-user-info">
                      <h6>Gustov _family</h6>
                      <p>Mark, Elizabeth, Aaron, <span class="text-primary">More...</span></p>
                    </div>
                  </div>
                  <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                </a>
                <a href="javascript:void(0);" class="list-group-item border-0">
                  <div class="d-flex align-items-center">
                    <div class="avatar avatar-lg bg-info rounded-circle me-2">
                      AM
                    </div>
                    <div class="chat-user-info">
                      <h6>AM Technology</h6>
                      <p>Roper, Deborah, David, <span class="text-primary">More..


                                                        .</span></p>
                    </div>
                  </div>
                  <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                </a>
                <div class="text-center">
                  <a href="javascript:void(0);" class="view-all link-primary d-inline-flex align-items-center justify-content-center">
                    More Groups<i class="ti ti-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="content-wrapper other-info mb-0">
            <h5 class="sub-title">Others</h5>
            <div class="card mb-0">
              <div class="card-body list-group profile-item">
                <a href="javascript:void(0);" class="list-group-item" data-bs-toggle="offcanvas" data-bs-target="#contact-favourite">
                  <div class="profile-info">
                    <h6><i class="ti ti-graph me-2 text-default"></i>Favorites</h6>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="badge badge-danger count-message me-1">12</span>
                    <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                  </div>
                </a>
                <a href="javascript:void(0);" class="list-group-item">
                  <div class="profile-info">
                    <h6><i class="ti ti-volume-off me-2 text-warning"></i>Mute Notifications</h6>
                  </div>
                  <div>
                    <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                  </div>
                </a>
                <a href="javascript:void(0);" class="list-group-item">
                  <div class="profile-info">
                    <h6><i class="ti ti-user-off me-2 text-info"></i>Block Users</h6>
                  </div>
                  <div>
                    <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                  </div>
                </a>
                <a href="javascript:void(0);" class="list-group-item">
                  <div class="profile-info">
                    <h6><i class="ti ti-user-x me-2 text-purple"></i>Report Users</h6>
                  </div>
                  <div>
                    <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                  </div>
                </a>
                <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#delete-chat" class="list-group-item">
                  <div class="profile-info">
                    <h6><i class="ti ti-trash me-2 text-danger"></i>Delete Chat</h6>
                  </div>
                  <div>
                    <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- /Contact Info -->

</template>

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
  name: "MainChatComponent",
  props: {
    userId: {
        type: Number, // Accept both
        required: true,
    },
},
  data() {
    return {
      messages: [],
      newMessage: "",
      userinfo:{},
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
    };
  },
  watch: {
    userId(newId) {
        console.log("Updated id", newId);
        this.initializeComponent(); // Re-run initialization for the new id
    },
},
beforeRouteUpdate(to, from, next) {
    const newUserId = Number(to.params.userId);
    if (newUserId !== this.userId) {
        console.log("Route updated to new userId:", newUserId);
        this.initializeComponent();
    }
    next();
},
  mounted() {
    // Fetch messages when the component is first loaded
    this.getMessages();
    this.scrollToBottom();
    this.listenForMessages();
    this.getUserInfo();
    this.activeUserListner();
    console.log('Sended id',this.userId);

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
    initializeComponent() {
        console.log("Sended id", this.userId);
        this.getMessages();
        this.scrollToBottom();
        this.listenForMessages();
        this.getUserInfo();
        this.activeUserListner();
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
    getMessages() {
      axios
          .get(`/messages/${this.userId}`)
          .then((response) => {
            this.messages = response.data || [];
            console.log('messages:', response.data);
            this.scrollToBottom();
          })
          .catch((error) => {
            console.error("Error fetching messages:", error);
          });
    },
    listenForMessages() {
      const receiverId = localStorage.getItem("userId");
      const senderId = this.userId;
      echo
          .private(`chatboard.${senderId}.${receiverId}`)
          .listen("MessageSent", (event) => {
            const newMessage = {
              ...event.message,
              user: event.message.user || {},
            };
            this.messages.push(newMessage);
            this.scrollToBottom();
          });
    },
    activeUserListner() {
    const userId = localStorage.getItem('userId');

    if (userId) {
        echo.join('presence.friends') // Global channel for all users
            .listen('UserStatusUpdated', (event) => {
                    if (this.userinfo?.id === Number(event.user_id)) {
                        this.userinfo.is_active = event.is_active; // Update status
                    }
            });
    } else {
        console.error("User ID not found in localStorage.");
    }
},
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    sendMessage(type = 'text') {
      const formData = new FormData();

      // Send text message
      if (type === 'text' && this.newMessage.trim()) {
        formData.append('message', this.newMessage);
        formData.append("receiver_id", this.userId);
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
          .post("/message/send", formData)
          .then((response) => {
            this.messages.push(response.data.messages);
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
      formData.append('receiver_id',this.userId);
      formData.append('type','image');
      this.selectedFile = null;
      axios.post('/message/send',formData)
          .then((response) => {
            this.messages.push(response.data.messages);
            this.scrollToBottom();
          })
    },
    scrollToBottom() {
      const container = this.$refs.chatContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
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
      formData.append('receiver_id', this.userId);
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
  },
};
</script>
<style>
.chat {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full height of the viewport */
}
.chat-header {
  position: fixed; /* Fix the header at the top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it appears above other content */
  background-color: white; /* Set background to prevent content overlap */
}

.chat-footer {
  position: fixed; /* Fix the footer at the bottom */
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Ensure it appears above other content */
  background-color: white; /* Set background to prevent content overlap */
}

.chat-body {
  align-content: center;
  padding-top: 40px; /* Adjust according to your header height */
  padding-bottom: 40px; /* Adjust according to your footer height */
  overflow-y: auto; /* Enable vertical scrolling */
  height: calc(100vh - 100px); /* Set height to fill the viewport minus header and footer */
}

</style>
