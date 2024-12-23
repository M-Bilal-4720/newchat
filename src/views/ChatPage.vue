<template>

    <!-- content -->
    <div class="content main_content">

      <!-- Left Sidebar Menu -->
      <div class="sidebar-menu">
        <div class="logo">
          <a href="#" class="logo-normal"><img src="/assets/img/logo.svg" alt="Logo"></a>
        </div>
        <div class="menu-wrap">
          <div class="main-menu">
            <ul class="nav">
              <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Chats" data-bs-custom-class="tooltip-primary">
                <a href="#" class="active" @click="setActiveComponent('DefualtChatComponent')" data-bs-toggle="tab" data-bs-target="#chat-menu">
                  <i class="ti ti-message-2-heart"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Contacts" data-bs-custom-class="tooltip-primary">
                <a href="#" @click="setActiveComponent('DefualtChatComponent')" data-bs-toggle="tab" data-bs-target="#contact-menu">
                  <i class="ti ti-user-shield"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Groups" data-bs-custom-class="tooltip-primary">
                <a href="#" class="" @click="setActiveComponent('DefualtChatComponent')" data-bs-toggle="tab" data-bs-target="#group-menu">
                  <i class="ti ti-users-group"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Status" data-bs-custom-class="tooltip-primary">
                <a href="#" class="" @click="setActiveComponent('DefualtStatusComponent')" data-bs-toggle="tab" data-bs-target="#status-menu">
                  <i class="ti ti-circle-dot"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Calls" data-bs-custom-class="tooltip-primary">
                <a href="#" data-bs-toggle="tab" data-bs-target="#call-menu">
                  <i class="ti ti-phone-call"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Profile" data-bs-custom-class="tooltip-primary">
                <a href="#" data-bs-toggle="tab" data-bs-target="#profile-menu">
                  <i class="ti ti-user-circle"></i>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Settings" data-bs-custom-class="tooltip-primary">
                <a href="#" data-bs-toggle="tab" data-bs-target="#setting-menu">
                  <i class="ti ti-settings"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="profile-menu">
            <ul>
              <li>
                <a href="#" id="dark-mode-toggle" class="dark-mode-toggle active">
                  <i class="ti ti-moon"></i>
                </a>
                <a href="#" id="light-mode-toggle" class="dark-mode-toggle">
                  <i class="ti ti-sun"></i>
                </a>
              </li>
              <li>
                <div class="dropdown" @mouseover="openDropdownLG" @mouseleave="closeDropdownLG">
                  <a href="#" class="avatar avatar-md" :class="{ show: dropdownVisibleLG }">
                    <img :src="getFileUrl(userInfo.avatar)" alt="img" class="rounded-circle">
                  </a>
                  <div class="dropdown-menu dropdown-menu-end p-3" :class="{ show: dropdownVisibleLG }">
                    <a href="#" v-on:click="userLogout" class="dropdown-item">
                      <i class="ti ti-logout-2 me-2"></i>Logout
                    </a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <!-- /Left Sidebar Menu -->

      <!-- sidebar group -->
      <div class="sidebar-group">

        <div class="tab-content">
          <div class="tab-pane fade active show" id="chat-menu">

            <!-- Chats sidebar -->
            <div id="chats" class="sidebar-content active slimscroll">

              <div class="slimscroll">

                <div class="chat-search-header">
                  <div class="header-title d-flex align-items-center justify-content-between">
                    <h4 class="mb-3">Chats</h4>
                    <div class="d-flex align-items-center mb-3">
                      <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#new-chat" class="add-icon btn btn-primary p-0 d-flex align-items-center justify-content-center fs-16 me-2"><i class="ti ti-plus"></i></a>
                      <div class="dropdown" @click="openDropdown2" @mouseleave="closeDropdown2">
                        <a href="javascript:void(0);" data-bs-toggle="dropdown" class="fs-16 text-default" :class="{ show: dropdownVisible2 }">
                          <i class="ti ti-dots-vertical"></i>
                        </a>
                        <ul class="dropdown-menu p-3" :class="{ show: dropdownVisible2 }">
                          <li><a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#invite"><i class="ti ti-send me-2"></i>Invite Others</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Chat Search -->
                  <div class="search-wrap">
                    <form action="#">
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="searchQuery"
                               @input="searchUsers" placeholder="Search For Contacts ">
                        <span class="input-group-text"><i class="ti ti-search"></i></span>
                      </div>
                    </form>
                  </div>
                  <!-- /Chat Search -->
                </div>

                <!-- Online Contacts -->
                <div class="top-online-contacts sidebar-body" id="chatsidebar">
                  <!-- Left Chat Title -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="chat-title">All Chats</h5>
                    <div class="dropdown" @click="openDropdownAC()" @mouseleave="closeDropdownAC">
                      <a href="#" class="text-default fs-16" data-bs-toggle="dropdown" aria-expanded="false" :class="{ show: dropdownVisibleAC }"><i class="ti ti-filter"></i></a>
                      <ul class=" dropdown-menu dropdown-menu-end p-3" id="innerTab" role="tablist" :class="{ show: dropdownVisibleAC }">
                        <li role="presentation">
                          <a class="dropdown-item active" id="all-chats-tab" data-bs-toggle="tab" href="#all-chats" role="tab" aria-controls="all-chats" aria-selected="true" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat('All Chats')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">All Chats</a>
                        </li>
                        <li role="presentation">
                          <a class="dropdown-item" id="favourites-chat-tab" data-bs-toggle="tab" href="#favourites-chat" role="tab" aria-controls="favourites-chat" aria-selected="false" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat('Favourite Chats')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">Favourite Chats</a>
                        </li>
                        <li role="presentation">
                          <a class="dropdown-item" id="pinned-chats-tab" data-bs-toggle="tab" href="#pinned-chats" role="tab" aria-controls="pinned-chats" aria-selected="false" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat('Pinned Chats')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">Pinned Chats</a>
                        </li>
                        <li role="presentation">
                          <a class="dropdown-item" id="archive-chats-tab" data-bs-toggle="tab" href="#archive-chats" role="tab" aria-controls="archive-chats" aria-selected="false" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat('Archive Chats')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">Archive Chats</a>
                        </li>
                        <li role="presentation">
                          <a class="dropdown-item" id="trash-chats-tab" data-bs-toggle="tab" href="#trash-chats" role="tab" aria-controls="trash-chats" aria-selected="false" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat('Trash')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">Trash</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /Left Chat Title -->
                  <div class="tab-content" id="innerTabContent" >
                    <div class="tab-pane fade show active" id="all-chats" role="tabpanel" aria-labelledby="all-chats-tab">
                      <div class="chat-users-wrap">
                        <div class="chat-list"  v-for="friend in friends" :key="friend.user.id">
                          <a href="#" @click="openChat(friend.user.id)" class="chat-user-list">
                            <div v-if="friend.user.is_active==1" class="avatar avatar-lg online me-2">
                              <img :src="getFileUrl(friend.user.avatar)" class="rounded-circle border border-warning border-2" alt="image">
                            </div>
                            <div v-else class="avatar avatar-lg bg-pink avatar-rounded me-2">
                              <img :src="getFileUrl(friend.user.avatar)" class="rounded-circle border border-warning border-2" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>{{ friend.user.name }}</h6>
                                <div >
                                  <p v-if="friend.messages?.type === 'typing'">
                                  <span class="animate-typing">is typing
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                  </span>
                                  </p>
                                  <p v-if="friend.messages?.type === 'text'">{{ friend.messages?.message }}</p>
                                  <p v-if="friend.messages?.type === 'file'">
                                    <i class="ti ti-photo me-2"></i>Photo
                                  </p>
                                  <p v-if="friend.messages?.type === 'document'">
                                    <i class="ti ti-file me-2"></i>Document
                                  </p>
                                  <p v-if="friend.messages?.type === 'audio'">
                                    <i class="ti ti-volume me-2"></i>Voice
                                  </p>
                                  <p v-if="friend.messages?.type === 'location'">
                                    Please Check <span class="text-primary ms-1">@rev</span>
                                  </p>
                                  <p v-if="friend.messages?.type === 'in-call'" class="text-success">
                                    <i class="ti ti-video-plus me-2"></i>Incoming Video Call
                                  </p>
                                  <p v-if="friend.messages?.type === 'miss-call'">
                                    <i class="ti ti-video me-2"></i>Missed Video Call
                                  </p>
                                  <p v-if="friend.messages ===null ">Start your chat</p>
                                </div>
                              </div>
                              <div class="chat-user-time">
                                <span class="time" v-if="friend.messages">{{ formatTime(friend.messages.created_at) }}</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                </div>
                              </div>
                            </div>

                          </a>
                          <div class="chat-dropdown" @click="openDropdown1" @mouseleave="closeDropdown1">
                            <a class="#" href="#" data-bs-toggle="dropdown" :class="{ show: dropdownVisible1 }">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3" :class="{ show: dropdownVisible1 }">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li>
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat">
                                <i class="ti ti-trash me-2"></i>Delete</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="tab-pane fade" id="favourites-chat" role="tabpanel" aria-labelledby="favourites-chat-tab">
                      <div class="chat-users-wrap">

                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Clyde Smith</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">03:15 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">55</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-pink avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">AG</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Amfr_boys_Group</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Yesterday</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">5</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Carla Jenkins</h6>
                                <p class="text-success"><i class="ti ti-video-plus me-2"></i>Incoming Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Sunday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Federico Wells</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Wednesday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                  <i class="bx bx-check-double"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle border border-warning border-2" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Mark Villiamss</h6>
                                <p><span class="animate-typing">is typing
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    </span>
                                </p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sarika Jain</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">06:12 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Edward Lietz</h6>
                                <p><i class="ti ti-file me-2"></i>Document</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-skyblue online avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">GU</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Gustov_family</h6>
                                <p>Please Check<span class="text-primary ms-1">@rev</span></p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">24 Jul 2024</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-07.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Estell Gibson</h6>
                                <p class="text-danger"><i class="ti ti-video-off me-2"></i>Missed Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-08.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sharon Ford</h6>
                                <p>Hi How are you 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-09.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Thomas Rethman</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Wilbur Martinez</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-11.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Danielle Baker</h6>
                                <p><i class="ti ti-map-pin-plus me-2"></i>Location</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-13.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Morkel Jerrin</h6>
                                <p><i class="ti ti-video me-2"></i>Video</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="pinned-chats" role="tabpanel" aria-labelledby="pinned-chats-tab">
                      <div class="chat-users-wrap">
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Carla Jenkins</h6>
                                <p class="text-success"><i class="ti ti-video-plus me-2"></i>Incoming Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Sunday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Federico Wells</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Wednesday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                  <i class="bx bx-check-double"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Clyde Smith</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">03:15 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">55</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-pink avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">AG</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Amfr_boys_Group</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Yesterday</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">5</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle border border-warning border-2" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Mark Villiamss</h6>
                                <p><span class="animate-typing">is typing
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    </span>
                                </p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sarika Jain</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">06:12 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Edward Lietz</h6>
                                <p><i class="ti ti-file me-2"></i>Document</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-skyblue online avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">GU</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Gustov_family</h6>
                                <p>Please Check<span class="text-primary ms-1">@rev</span></p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">24 Jul 2024</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-07.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Estell Gibson</h6>
                                <p class="text-danger"><i class="ti ti-video-off me-2"></i>Missed Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-08.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sharon Ford</h6>
                                <p>Hi How are you 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-09.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Thomas Rethman</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Wilbur Martinez</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-11.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Danielle Baker</h6>
                                <p><i class="ti ti-map-pin-plus me-2"></i>Location</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-13.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Morkel Jerrin</h6>
                                <p><i class="ti ti-video me-2"></i>Video</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="archive-chats" role="tabpanel" aria-labelledby="archive-chats-tab">
                      <div class="chat-users-wrap">
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Clyde Smith</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">03:15 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">55</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-pink avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">AG</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Amfr_boys_Group</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Yesterday</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">5</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Carla Jenkins</h6>
                                <p class="text-success"><i class="ti ti-video-plus me-2"></i>Incoming Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Sunday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Federico Wells</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Wednesday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                  <i class="bx bx-check-double"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle border border-warning border-2" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Mark Villiamss</h6>
                                <p><span class="animate-typing">is typing
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    </span>
                                </p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sarika Jain</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">06:12 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Edward Lietz</h6>
                                <p><i class="ti ti-file me-2"></i>Document</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-skyblue online avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">GU</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Gustov_family</h6>
                                <p>Please Check<span class="text-primary ms-1">@rev</span></p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">24 Jul 2024</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-07.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Estell Gibson</h6>
                                <p class="text-danger"><i class="ti ti-video-off me-2"></i>Missed Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-08.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sharon Ford</h6>
                                <p>Hi How are you 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-09.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Thomas Rethman</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Wilbur Martinez</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-11.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Danielle Baker</h6>
                                <p><i class="ti ti-map-pin-plus me-2"></i>Location</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-13.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Morkel Jerrin</h6>
                                <p><i class="ti ti-video me-2"></i>Video</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="trash-chats" role="tabpanel" aria-labelledby="trash-chats-tab">
                      <div class="chat-users-wrap">
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sarika Jain</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">06:12 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Clyde Smith</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">03:15 AM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">55</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle border border-warning border-2" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Mark Villiamss</h6>
                                <p><span class="animate-typing">is typing
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    </span>
                                </p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle border border-warning border-2" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Mark Villiamss</h6>
                                <p><span class="animate-typing">is typing
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    <span class="dot"></span>
                                                                    </span>
                                </p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-pink avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">AG</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Amfr_boys_Group</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Yesterday</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">5</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Carla Jenkins</h6>
                                <p class="text-success"><i class="ti ti-video-plus me-2"></i>Incoming Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Sunday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Federico Wells</h6>
                                <p><i class="ti ti-photo me-2"></i>Photo</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">Wednesday</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">12</span>
                                  <i class="bx bx-check-double"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Edward Lietz</h6>
                                <p><i class="ti ti-file me-2"></i>Document</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-skyblue online avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">GU</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Gustov_family</h6>
                                <p>Please Check<span class="text-primary ms-1">@rev</span></p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">24 Jul 2024</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-07.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Estell Gibson</h6>
                                <p class="text-danger"><i class="ti ti-video-off me-2"></i>Missed Video Call</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-08.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sharon Ford</h6>
                                <p>Hi How are you 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-09.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Thomas Rethman</h6>
                                <p>Do you know which...</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Wilbur Martinez</h6>
                                <p>Haha oh man 🔥</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-pin me-2"></i>
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-11.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Danielle Baker</h6>
                                <p><i class="ti ti-map-pin-plus me-2"></i>Location</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-checks text-success"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-13.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Morkel Jerrin</h6>
                                <p><i class="ti ti-video me-2"></i>Video</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">02:40 PM</span>
                                <div class="chat-pin">
                                  <i class="ti ti-heart-filled text-warning me-2"></i>
                                  <span class="count-message fs-12 fw-semibold">25</span>
                                </div>
                              </div>
                            </div>
                          </a>
                          <div class="chat-dropdown">
                            <a class="#" href="#" data-bs-toggle="dropdown">
                              <i class="ti ti-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end p-3">
                              <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Chat</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                              <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chats</a></li>
                              <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#delete-chat"><i class="ti ti-trash me-2"></i>Delete</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Online Contacts -->



              </div>

            </div>
            <!-- / Chats sidebar -->

          </div>

          <!-- Contact -->
          <div class="tab-pane fade" id="contact-menu">
            <!-- Chats sidebar -->
            <div class="sidebar-content active slimscroll">

              <div class="slimscroll">

                <div class="chat-search-header">
                  <div class="header-title d-flex align-items-center justify-content-between">
                    <h4 class="mb-3">Contacts</h4>
                    <div class="d-flex align-items-center mb-3">
                      <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#add-contact" class="add-icon btn btn-primary p-0 d-flex align-items-center justify-content-center fs-16 me-2"><i class="ti ti-plus"></i></a>
                    </div>
                  </div>

                  <!-- Chat Search -->
                  <div class="search-wrap">
                    <form action="#">
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="searchQuery"
                               @input="searchUsers" placeholder="Search For Contacts ">
                        <span class="input-group-text"><i class="ti ti-search"></i></span>
                      </div>
                    </form>
                  </div>
                  <!-- /Chat Search -->
                </div>

                <div class="sidebar-body chat-body">

                  <!-- Left Chat Title -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5>All Contacts</h5>
                  </div>
                  <!-- /Left Chat Title -->

                  <div class="chat-users-wrap">
                    <div class="mb-4" v-for="(users, initial) in groupedUsers" :key="initial">
                      <h6 class="mb-2">{{ initial }}</h6>
                      <div class="chat-list" v-for="user in users" :key="user.id">
                        <a href="javascript:void(0);" data-bs-toggle="modal"  @click="selectUser(user)" data-bs-target="#contact-details" class="chat-user-list">
                          <div class="avatar avatar-lg online me-2">
                            <img :src="getFileUrl(user.avatar)" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>{{user.name}}</h6>
                              <p>last seen 5 days ago</p>
                            </div>
                            <div>
                              <a v-if="user.friend==true" href="#" @click="openChat(user.id)" class="me-3"><i class="ti ti-message"></i></a>
                              <a v-else href="#" @click="addFriend(user.id)" class="me-2"><i class="ti ti-user-plus"></i></a>

                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
            <!-- / Chats sidebar -->
          </div>
          <!-- /Contact -->

          <!-- Group -->
          <div class="tab-pane fade" id="group-menu">

            <!-- Chats sidebar -->
            <div class="sidebar-content active slimscroll">

              <div class="slimscroll">

                <div class="chat-search-header">
                  <div class="header-title d-flex align-items-center justify-content-between">
                    <h4 class="mb-3">Group</h4>
                    <div class="d-flex align-items-center mb-3">
                      <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#new-chat" class="add-icon btn btn-primary p-0 d-flex align-items-center justify-content-center fs-16 me-2"><i class="ti ti-plus"></i></a>
                      <div class="dropdown">
                        <a href="javascript:void(0);" data-bs-toggle="dropdown" class="fs-16 text-default">
                          <i class="ti ti-dots-vertical"></i>
                        </a>
                        <ul class="dropdown-menu p-3">
                          <li><a class="dropdown-item" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#invite"><i class="ti ti-send me-2"></i>Invite Others</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Chat Search -->
                  <div class="search-wrap">
                    <form action="#">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search For Contacts or Messages">
                        <span class="input-group-text"><i class="ti ti-search"></i></span>
                      </div>
                    </form>
                  </div>
                  <!-- /Chat Search -->
                </div>

                <div class="sidebar-body ">

                  <!-- Left Chat Title -->
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5>All Groups</h5>
                  </div>
                  <!-- /Left Chat Title -->

                  <div class="chat-users-wrap">

                    <div class="chat-list" v-for="data in Groups" :key="data.group.id">
                      <a href="#" @click="openGroup(data.group.id)" class="chat-user-list">
                        <div class="avatar avatar-lg online me-2">
                          <img src="/assets/img/groups/group-02.jpg" class="rounded-circle" alt="image">
                        </div>
                        <div class="chat-user-info">
                          <div class="chat-user-msg">
                            <h6>{{data.group.name}}</h6>
                            <p>Do you know which...</p>
                          </div>
                          <div class="chat-user-time">
                            <span class="time">06:12 AM</span>
                            <div class="chat-pin">
                              <i class="ti ti-pin me-2"></i>
                              <i class="ti ti-checks text-success"></i>
                            </div>
                          </div>
                        </div>
                      </a>
                      <div class="chat-dropdown">
                        <a class="#" href="#" data-bs-toggle="dropdown">
                          <i class="ti ti-dots-vertical"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end p-3">
                          <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archive Group</a></li>
                          <li><a class="dropdown-item" href="#"><i class="ti ti-volume-off me-2"></i>Mute Notification</a></li>
                          <li><a class="dropdown-item" href="#"><i class="ti ti-logout-2 me-2"></i>Exit Group</a></li>
                          <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Group</a></li>
                          <li><a class="dropdown-item" href="#"><i class="ti ti-square-check me-2"></i>Mark as Unread</a></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
            <!-- / Chats sidebar -->

          </div>
          <!-- /Group -->

          <!-- Status -->
          <div class="tab-pane fade " id="status-menu">
            <div class="sidebar-content active slimscroll">

              <div class="slimscroll">

                <div class="chat-search-header">
                  <div class="header-title d-flex align-items-center justify-content-between">
                    <h4 class="mb-3">Status</h4>
                    <div class="d-flex align-items-center mb-3">
                      <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#new-status" class="add-icon text-white bg-primary fs-16 d-flex justify-content-center align-items-center">
                        <i class="ti ti-plus"></i>
                      </a>
                    </div>
                  </div>

                  <!-- Chat Search -->
                  <div class="search-wrap">
                    <form action="#">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Contacts">
                        <span class="input-group-text"><i class="ti ti-search"></i></span>
                      </div>
                    </form>
                  </div>
                  <!-- /Chat Search -->
                </div>


                <div class="sidebar-body chat-body" id="chatsidebar">
                  <div class="status-list">
                    <!-- Left Chat Title -->
                    <div class="d-flex  mb-3">
                      <h5>My Status</h5>

                    </div>
                    <!-- /Left Chat Title -->

                    <div class="chat-users-wrap">
                      <div class="position-relative">
                        <a href="#" @click="setActiveComponent('MainStatusComponent')" class="chat-user-list mb-0">
                          <div class="avatar avatar-lg idle me-2">
                            <img src="/assets/img/profiles/avatar-17.jpg" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>Rabino Desilva</h6>
                              <p>Today at 06:25 AM</p>
                            </div>

                          </div>
                        </a>
                        <div class="chats-dropdown">
                          <a class="#" href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end p-3">
                            <li><a class="dropdown-item" href="#"><i class="ti ti-share-3 me-2"></i>Share Status</a></li>
                            <li><a class="dropdown-item" href="#"><i class="ti ti-arrow-forward-up-double me-2"></i>Forward</a></li>
                            <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="status-list">
                    <!-- Left Chat Title -->
                    <div class="d-flex  mb-3">
                      <h5>Recent Updates</h5>

                    </div>
                    <!-- /Left Chat Title -->

                    <div class="chat-users-wrap">
                      <div class="position-relative">
                        <a href="#" @click="setActiveComponent('MainStatusComponent')" class="chat-user-list">
                          <div class="avatar avatar-lg online me-2">
                            <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>Federico Wells</h6>
                              <p>4 hrs ago</p>
                            </div>

                          </div>
                        </a>
                        <div class="chats-dropdown">
                          <a class="#" href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end p-3">
                            <li><a class="dropdown-item" href="#"><i class="ti ti-volume-off me-2"></i>Mute</a></li>
                          </ul>
                        </div>
                      </div>
                      <div class="position-relative">
                        <a href="user-status.html" class="chat-user-list mb-0">
                          <div class="avatar avatar-lg online me-2">
                            <img src="/assets/img/profiles/avatar-13.jpg" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>Morkel Jerrin</h6>
                              <p>Today at 7:15 AM</p>
                            </div>

                          </div>
                        </a>
                        <div class="chats-dropdown">
                          <a class="#" href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end p-3">
                            <li><a class="dropdown-item" href="#"><i class="ti ti-volume-off me-2"></i>Mute</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="status-list">
                    <!-- Left Chat Title -->
                    <div class="d-flex  mb-3">
                      <h5>Already Seen</h5>

                    </div>
                    <!-- /Left Chat Title -->

                    <div class="chat-users-wrap">
                      <div class="position-relative">
                        <a href="user-status.html" class="chat-user-list">
                          <div class="avatar avatar-lg online me-2">
                            <img src="/assets/img/profiles/avatar-07.jpg" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>Danielle Baker</h6>
                              <p>Just Now</p>
                            </div>

                          </div>
                        </a>
                        <div class="chats-dropdown">
                          <a class="#" href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end p-3">
                            <li><a class="dropdown-item" href="#"><i class="ti ti-volume-off me-2"></i>Mute</a></li>
                          </ul>
                        </div>
                      </div>
                      <div class="position-relative">
                        <a href="user-status.html" class="chat-user-list">
                          <div class="avatar avatar-lg online me-2">
                            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>Edward Lietz</h6>
                              <p>2 hrs ago</p>
                            </div>

                          </div>
                        </a>
                        <div class="chats-dropdown">
                          <a class="#" href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end p-3">
                            <li><a class="dropdown-item" href="#"><i class="ti ti-volume-off me-2"></i>Mute</a></li>
                          </ul>
                        </div>
                      </div>
                      <div class="position-relative">
                        <a href="user-status.html" class="chat-user-list">
                          <div class="avatar avatar-lg offline me-2">
                            <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>Sarika Jain</h6>
                              <p>Today at 06:15 AM</p>
                            </div>

                          </div>
                        </a>
                        <div class="chats-dropdown">
                          <a class="#" href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end p-3">
                            <li><a class="dropdown-item" href="#"><i class="ti ti-volume-off me-2"></i>Mute</a></li>
                          </ul>
                        </div>
                      </div>
                      <div class="position-relative">
                        <a href="user-status.html" class="chat-user-list mb-0">
                          <div class="avatar avatar-lg online me-2">
                            <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                          </div>
                          <div class="chat-user-info">
                            <div class="chat-user-msg">
                              <h6>Wilbur Martinez</h6>
                              <p>Today at 04:20 AM</p>
                            </div>

                          </div>
                        </a>
                        <div class="chats-dropdown">
                          <a class="#" href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <ul class="dropdown-menu dropdown-menu-end p-3">
                            <li><a class="dropdown-item" href="#"><i class="ti ti-volume-off me-2"></i>Mute</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
          <!-- /Status -->

          <!-- Add Status -->
          <div class="modal fade" id="new-status">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Add New Status</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <i class="ti ti-x"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="file-drop mb-4">
                    <form action="#" class="dropzone dz-clickable drag-and-drop-block  d-flex align-items-center justify-content-center mb-3">
                      <div class="text-center">
                        <img src="/assets/img/icons/drag-file.svg" class="mb-2" alt="upload">
                        <p class="text-gray-9 mb-2 fw-semibold">Drag & drop your files here or choose file</p>
                        <span class="text-gray-9 d-block">Maximum size: 50MB</span>
                      </div>
                    </form>
                  </div>
                  <div class="row g-3">
                    <div class="col-6">
                      <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                    </div>
                    <div class="col-6">
                      <button type="button" data-bs-toggle="modal" data-bs-target="#upload-file-image" class="btn btn-primary w-100">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Add Status -->


          <!-- Status -->
          <div class="modal fade" id="upload-file-image">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Add New Status</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <i class="ti ti-x"></i>
                  </button>
                </div>
                <div class="modal-body chat">

                  <div class="row">
                    <div class="col-md-12">
                      <div class="drag-and-drop-block status-view p-3 mb-3">
                        <img src="/assets/img/status/status-01.jpg" class="status-preview" alt="upload">
                      </div>

                    </div>

                  </div>
                  <div class="chat-footer">
                    <div class="footer-form">
                      <div class="chat-footer-wrap">
                        <div class="form-item">
                          <a href="#" class="action-circle"><i class="ti ti-microphone"></i></a>
                        </div>
                        <div class="form-wrap">
                          <input type="text" class="form-control" placeholder="Type Your Message">
                        </div>
                        <div class="form-item emoj-action-foot">
                          <a href="#" class="action-circle"><i class="ti ti-mood-smile"></i></a>
                          <div class="emoj-group-list-foot down-emoji-circle">
                            <ul>
                              <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-02.svg" alt="Icon"></a></li>
                              <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-05.svg" alt="Icon"></a></li>
                              <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-06.svg" alt="Icon"></a></li>
                              <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-07.svg" alt="Icon"></a></li>
                              <li><a href="javascript:void(0);"><img src="/assets/img/icons/emonji-08.svg" alt="Icon"></a></li>
                              <li class="add-emoj"><a href="javascript:void(0);"><i class="ti ti-plus"></i></a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="form-item">
                          <a href="#" data-bs-toggle="dropdown">
                            <i class="ti ti-dots-vertical"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end p-3">
                            <a href="#" class="dropdown-item "><span><i class="ti ti-file-text"></i></span>Document</a>
                            <a href="#" class="dropdown-item"><span><i class="ti ti-camera-selfie"></i></span>Camera</a>
                            <a href="#" class="dropdown-item"><span><i class="ti ti-photo-up"></i></span>Gallery</a>
                            <a href="#" class="dropdown-item"><span><i class="ti ti-music"></i></span>Audio</a>
                            <a href="#" class="dropdown-item"><span><i class="ti ti-map-pin-share"></i></span>Location</a>
                            <a href="#" class="dropdown-item"><span><i class="ti ti-user-check"></i></span>Contact</a>
                          </div>
                        </div>
                        <div class="form-btn">
                          <a class="btn btn-primary" href="user-status.html">
                            <i class="ti ti-send"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /Status -->

          <!-- Profile -->
          <div class="tab-pane fade" id="profile-menu">
            <!-- Profile sidebar -->
            <div class="sidebar-content active slimscroll">
              <div class="slimscroll">
                <div class="chat-search-header">
                  <div class="header-title d-flex align-items-center justify-content-between">
                    <h4 class="mb-3">Profile</h4>
                  </div>
                </div>

                <!-- Profile -->
                <div class="profile mx-3">
                  <div class="border-bottom text-center pb-3 mx-1">
                    <div class="d-flex justify-content-center ">
                                            <span class="avatar avatar-xxxl online mb-4">
                                                <img :src="getFileUrl(userInfo.avatar)" class="rounded-circle" alt="user">
                                            </span>
                    </div>
                    <div>
                      <h6 class="fs-16">{{userinfo.name}}</h6>
                      <div class="d-flex justify-content-center">
                        <span class="fs-14 text-center">Web Designer</span>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /Profile -->

                <div class="sidebar-body chat-body">

                  <!-- Profile Info -->
                  <h5 class="mb-2">Profile Info</h5>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Name</h6>
                          <p class="fs-16 ">{{userInfo.name}}</p>
                        </div>
                        <span><i class="ti ti-user-circle fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Phone</h6>
                          <p class="fs-16">{{userInfo.phone}}</p>
                        </div>
                        <span><i class="ti ti-phone-check fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list  profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Gender</h6>
                          <p class="fs-16">Female</p>
                        </div>
                        <span><i class="ti ti-user-star fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Email Address</h6>
                          <p class="fs-16"><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="3b52555d547b5e435a564b575e15585456">{{userInfo.email}}</a></p>
                        </div>
                        <span><i class="ti ti-mail-heart fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Bio</h6>
                          <p class="fs-16">Web Designer</p>
                        </div>
                        <span><i class="ti ti-user-check fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Location</h6>
                          <p class="fs-16">Portland, USA</p>
                        </div>
                        <span><i class="ti ti-map-2 fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list justify-content-between align-items-center">
                        <div>
                          <h6 class="fs-14">Join Date</h6>
                          <p class="fs-16">{{ formatDate(userInfo.created_at) }}</p>
                        </div>
                        <span><i class="ti ti-calendar-event fs-16"></i></span>
                      </div>
                    </div>
                  </div>
                  <!-- /Profile Info -->

                  <!-- Status -->
                  <h5 class="mb-2">Status</h5>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Active Status</h6>
                          <p class="fs-16 ">Show when you’re active</p>
                        </div>
                        <div class="form-check form-switch d-flex justify-content-end align-items-center">
                          <input class="form-check-input" type="checkbox" role="switch" checked="">
                        </div>
                      </div>
                      <div class="d-flex profile-list justify-content-between align-items-center">
                        <div>
                          <h6 class="fs-14">Friends Status</h6>
                          <p class="fs-16 ">Show friends status in chat</p>
                        </div>
                        <div class="form-check form-switch d-flex justify-content-end align-items-center">
                          <input class="form-check-input" type="checkbox" role="switch" checked="">
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Status -->

                  <!-- Social Media -->
                  <h5 class="mb-2">Social Media</h5>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Facebook</h6>
                          <p class="fs-16 ">@SalomKatherine</p>
                        </div>
                        <span><i class="ti ti-brand-facebook fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list justify-content-between align-items-center border-bottom mb-3 pb-3">
                        <div>
                          <h6 class="fs-14">Instagram Linkedin</h6>
                          <p class="fs-16 ">@SalomKatherine</p>
                        </div>
                        <span><i class="ti ti-brand-instagram fs-16"></i></span>
                      </div>
                      <div class="d-flex profile-list justify-content-between align-items-center">
                        <div>
                          <h6 class="fs-14">Linkedin</h6>
                          <p class="fs-16 ">@SalomKatherine</p>
                        </div>
                        <span><i class="ti ti-brand-linkedin fs-16"></i></span>
                      </div>
                    </div>
                  </div>
                  <!-- /Social Media -->

                  <!-- Deactivate -->
                  <h5 class="mb-2">Deactivate </h5>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex profile-list justify-content-between align-items-center">
                        <div>
                          <h6 class="fs-14">Deactivate Account</h6>
                          <p class="fs-16 ">Deactivate your Account</p>
                        </div>
                        <div class="form-check form-switch d-flex justify-content-end align-items-center">
                          <input class="form-check-input" type="checkbox" role="switch">
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Deactivate -->

                  <!-- Logout -->
                  <h5 class="mb-2">Logout</h5>
                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="d-flex profile-list justify-content-between align-items-center">
                        <div>
                          <h6 class="fs-14">Logout</h6>
                          <p class="fs-16 ">Sign out from this Device</p>
                        </div>
                        <a href="login.html" class="link-icon"><i class="ti ti-logout fs-16"></i></a>
                      </div>
                    </div>
                  </div>
                  <!-- /Logout -->

                </div>

              </div>

            </div>
            <!-- / Profile sidebar -->
          </div>
          <!-- /Profile -->

          <!-- Calls -->
          <div class="tab-pane fade" id="call-menu">
            <div class="sidebar-content active slimscroll">

              <div class="slimscroll">

                <div class="chat-search-header">
                  <div class="header-title d-flex align-items-center justify-content-between">
                    <h4 class="mb-3">Calls</h4>
                    <div class="d-flex align-items-center mb-3">
                      <a href="#" class="call-icon d-flex justify-content-center align-items-center text-white bg-primary rounded-circle me-2" data-bs-toggle="modal" data-bs-target="#new-call">
                        <i class="ti ti-phone-plus fs-16"></i>
                      </a>
                      <div class="dropdown">
                        <a href="javascript:void(0);" data-bs-toggle="dropdown" class="fs-16 text-default">
                          <i class="ti ti-dots-vertical"></i>
                        </a>
                        <ul class="dropdown-menu p-3">
                          <li>
                            <a href="#" class="dropdown-item d-flex align-items-center">
                              <span><i class="ti ti-phone-x me-2"></i></span>
                              Clear Call Log
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Chat Search -->
                  <div class="search-wrap">
                    <form action="#">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search">
                        <span class="input-group-text"><i class="ti ti-search"></i></span>
                      </div>
                    </form>
                  </div>
                  <!-- /Chat Search -->
                </div>

                <div class="sidebar-body chat-body" id="chatsidebar">

                  <!-- Left Chat Title -->
                  <div class="d-flex  align-items-center mb-3">
                    <h5 class="chat-title2 me-2">All Calls</h5>
                    <div class="dropdown">
                      <a href="#"  class="text-default fs-16" data-bs-toggle="dropdown" aria-expanded="false"><i class="ti ti-chevron-down"></i></a>
                      <ul class=" dropdown-menu dropdown-menu-end p-3" id="innerTab" role="tablist">
                        <li role="presentation">
                          <a class="dropdown-item active" id="all-calls-tab" data-bs-toggle="tab" href="#all-calls" role="tab" aria-controls="all-calls" aria-selected="true" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat2('All Calls')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">All Calls</a>
                        </li>
                        <li role="presentation">
                          <a class="dropdown-item" id="audio-calls-tab" data-bs-toggle="tab" href="#audio-calls" role="tab" aria-controls="audio-calls" aria-selected="false" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat2('Audio Calls')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">Audio Calls</a>
                        </li>
                        <li role="presentation">
                          <a class="dropdown-item" id="video-calls-tab" data-bs-toggle="tab" href="#video-calls" role="tab" aria-controls="video-calls" aria-selected="false" onclick="if (!window.__cfRLUnblockHandlers) return false; changeChat2('Video Calls')" data-cf-modified-1bb910c254b5a746ecb43b9e-="">Video Calls</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /Left Chat Title -->
                  <div class="tab-content" id="innerTabContent">
                    <div class="tab-pane fade show active" id="all-calls" role="tabpanel" aria-labelledby="all-calls-tab">
                      <div class="chat-users-wrap">
                        <div class="chat-list">
                          <a href="#" @click="setActiveComponent('MAinCallsComponent')" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Edward Lietz</h6>
                                <p><i class="ti ti-phone-outgoing text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6 class="">Mark Villiams</h6>
                                <p class="fs-14">
                                  <i class="ti ti-phone-incoming me-2 fs-14 text-success"></i>
                                  20 Min Ago
                                </p>
                              </div>
                              <div class="chat-user ">
                                <span class="mb-2">08m 12s</span>
                                <div class="d-flex justify-content-end">
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Federico Wells</h6>
                                <p><i class="ti ti-video-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Clyde Smith</h6>
                                <p><i class="ti ti-phone-outgoing text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Carla Jenkins</h6>
                                <p><i class="ti ti-video text-success me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sarika Jain</h6>
                                <p><i class="ti ti-phone-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-purple offline avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">AG</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Amfr_boys_Group</h6>
                                <p><i class="ti ti-video-minus text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Wilbur Martinez</h6>
                                <p><i class="ti ti-phone-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="audio-calls" role="tabpanel" aria-labelledby="audio-calls-tab">
                      <div class="chat-users-wrap">
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Edward Lietz</h6>
                                <p><i class="ti ti-phone-outgoing text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6 class="">Mark Villiams</h6>
                                <p class="fs-14">
                                  <i class="ti ti-phone-incoming me-2 fs-14 text-success"></i>
                                  20 Min Ago
                                </p>
                              </div>
                              <div class="chat-user ">
                                <span class="mb-2">08m 12s</span>
                                <div class="d-flex justify-content-end">
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Federico Wells</h6>
                                <p class="fs-14">
                                  <i class="ti ti-phone-incoming me-2 fs-14 text-success"></i>
                                  20 Min Ago
                                </p>
                              </div>
                              <div class="chat-user ">
                                <span class="mb-2">08m 12s</span>
                                <div class="d-flex justify-content-end">
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Clyde Smith</h6>
                                <p><i class="ti ti-phone-outgoing text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Carla Jenkins</h6>
                                <p><i class="ti ti-phone-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sarika Jain</h6>
                                <p><i class="ti ti-phone-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-purple avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">AG</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Amfr_boys_Group</h6>
                                <p class="fs-14">
                                  <i class="ti ti-phone-incoming me-2 fs-14 text-success"></i>
                                  20 Min Ago
                                </p>
                              </div>
                              <div class="chat-user ">
                                <span class="mb-2">08m 12s</span>
                                <div class="d-flex justify-content-end">
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Wilbur Martinez</h6>
                                <p><i class="ti ti-phone-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-phone-call text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="video-calls" role="tabpanel" aria-labelledby="video-calls-tab">
                      <div class="chat-users-wrap">
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Edward Lietz</h6>
                                <p><i class="ti ti-video text-success me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6 class="">Mark Villiams</h6>
                                <p><i class="ti ti-video-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Federico Wells</h6>
                                <p><i class="ti ti-video-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Clyde Smith</h6>
                                <p><i class="ti ti-video-minus text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Carla Jenkins</h6>
                                <p><i class="ti ti-video text-success me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Sarika Jain</h6>
                                <p><i class="ti ti-video-minus text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg bg-purple avatar-rounded me-2">
                              <span class="avatar-title fs-14 fw-medium">AG</span>
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Amfr_boys_Group</h6>
                                <p><i class="ti ti-video-off text-danger me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                        <div class="chat-list">
                          <a href="#" class="chat-user-list">
                            <div class="avatar avatar-lg online me-2">
                              <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                            </div>
                            <div class="chat-user-info">
                              <div class="chat-user-msg">
                                <h6>Wilbur Martinez</h6>
                                <p><i class="ti ti-video-minus text-purple me-2"></i>20 Min Ago</p>
                              </div>
                              <div class="chat-user-time">
                                <span class="time">08m 12s</span>
                                <div>
                                  <i class="ti ti-video text-pink"></i>
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
          <!-- /Calls -->

          <!-- Settings -->
          <div class="tab-pane fade" id="setting-menu">
            <!-- Profile sidebar -->
            <div class="sidebar-content active slimscroll">
              <div class="slimscroll">
                <div class="chat-search-header">
                  <div class="header-title d-flex align-items-center justify-content-between">
                    <h4 class="mb-3">Settings</h4>
                  </div>

                  <!-- Settings Search -->
                  <div class="search-wrap">
                    <form action="#">
                      <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search Settings">
                        <span class="input-group-text"><i class="ti ti-search"></i></span>
                      </div>
                    </form>
                  </div>
                  <!-- /Settings Search -->
                </div>

                <div class="sidebar-body chat-body">

                  <!-- Account setting -->
                  <div class="content-wrapper">
                    <h5 class="sub-title">Account</h5>
                    <div class="chat-file">
                      <div class="file-item">
                        <div class="accordion accordion-flush chat-accordion" id="account-setting">
                          <div class="accordion-item others">
                            <h2 class="accordion-header">
                              <a href="#" class="accordion-button" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse" aria-expanded="true" aria-controls="chatuser-collapse">
                                <i class="ti ti-user me-2"></i>Profile Info
                              </a>
                            </h2>
                            <div id="chatuser-collapse" class="accordion-collapse collapse show" data-bs-parent="#account-setting">
                              <div class="accordion-body">
                                <div>
                                  <div class="d-flex justify-content-center align-items-center">
                                    <span class="set-pro avatar avatar-xxl rounded-circle mb-3 p-1">
                                      <img :src="getFileUrl(userInfo.avatar)" class="rounded-circle" alt="user">
                                       <span class="add avatar avatar-sm d-flex justify-content-center align-items-center hover-effect">
                                        <label for="upload-image" class="mb-0">
                                           <i class="ti ti-plus rounded-circle d-flex justify-content-center align-items-center hover-effect"></i>
                                        </label>
                                        <input id="upload-image" type="file" accept="image/*" @change="handleImageUpload" style="display: none;" />
                                       </span>

                                    </span>
                                  </div>

                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="text" v-model="userInfo.name" class="form-control" placeholder="Full Name">
                                        <span class="icon-addon">
                                          <i class="ti ti-user"></i>
                                        </span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <select v-model="userInfo.gender" class="form-control">
                                          <option value="" disabled>Select Gender</option>
                                          <option value="Male">Male</option>
                                          <option value="Female">Female</option>
                                          <option value="Other">Other</option>
                                        </select>
                                        <span class="icon-addon">
                                         <i class="ti ti-user-star"></i>
                                        </span>
                                      </div>
                                    </div>

                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="date" v-model="userInfo.date_birth" class="form-control" placeholder="Date of birth">

                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="text" v-model="userInfo.country" class="form-control" placeholder="Country">
                                        <span class="icon-addon">
                                          <i class="ti ti-map-2"></i>
                                        </span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="form-item d-flex justify-content-between mb-3">
                                        <textarea class="form-control" v-model="userInfo.about" placeholder="About" rows="3"></textarea>
                                      </div>
                                    </div>
                                    <div class="col-lg-12 d-flex">
                                      <a href="#" v-on:click="updateProfile()" class="btn btn-primary flex-fill"><i class="ti ti-device-floppy me-2"></i>Save Changes</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item others mb-3">
                            <h2 class="accordion-header">
                              <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#social-id" aria-expanded="false" aria-controls="social-id">
                                <i class="ti ti-social me-2"></i>Social Profiles
                              </a>
                            </h2>
                            <div id="social-id" class="accordion-collapse collapse" data-bs-parent="#account-setting">
                              <div class="accordion-body">
                                <div class="chat-video">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="text" value="" class="form-control" placeholder="Facebook">
                                        <span class="icon-addon">
                                                                                        <i class="ti ti-brand-facebook"></i>
                                                                                    </span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="text" value="" class="form-control" placeholder="Google">
                                        <span class="icon-addon">
                                                                                        <i class="ti ti-brand-google"></i>
                                                                                    </span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="text" value="" class="form-control" placeholder="Twitter">
                                        <span class="icon-addon">
                                                                                        <i class="ti ti-brand-twitter"></i>
                                                                                    </span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="text" value="" class="form-control" placeholder="Linkedin">
                                        <span class="icon-addon">
                                                                                        <i class="ti ti-brand-linkedin"></i>
                                                                                    </span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3 position-relative">
                                        <input type="text" value="" class="form-control" placeholder="youtube">
                                        <span class="icon-addon">
                                                                                        <i class="ti ti-brand-youtube"></i>
                                                                                    </span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12 d-flex">
                                      <a href="" class="btn btn-primary flex-fill"><i class="ti ti-device-floppy me-2"></i>Save Changes</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fs-14"><a href=""><i class="ti ti-lock-square text-gray me-2"></i>Screen Lock</a></h6>
                            <div class="form-check form-switch d-flex justify-content-end align-items-center">
                              <input class="form-check-input" type="checkbox" role="switch">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Account setting -->

                  <!-- Security setting -->
                  <div class="content-wrapper">
                    <h5 class="sub-title">Security</h5>
                    <div class="chat-file">
                      <div class="file-item">
                        <div class="accordion accordion-flush chat-accordion" id="pwd-setting">
                          <div class="accordion-item others mb-3">
                            <h2 class="accordion-header">
                              <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#set-pwd" aria-expanded="false" aria-controls="set-pwd">
                                <i class="ti ti-key me-2"></i>Password
                              </a>
                            </h2>
                            <div id="set-pwd" class="accordion-collapse collapse" data-bs-parent="#pwd-setting">
                              <div class="accordion-body">
                                <div class="">
                                  <div class="row">
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3">
                                        <input type="password" class="pass-input form-control" placeholder="Old Password">
                                        <span class="ti toggle-password ti-eye-off"></span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3">
                                        <input type="password" class="pass-inputs form-control" placeholder="New Password">
                                        <span class="ti toggle-passwords ti-eye-off"></span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12">
                                      <div class="input-icon mb-3">
                                        <input type="password" class="conform-pass-input form-control" placeholder="Confirmed Password">
                                        <span class="ti conform-toggle-password ti-eye-off"></span>
                                      </div>
                                    </div>
                                    <div class="col-lg-12 d-flex">
                                      <a href="javascript:void(0);" class="btn btn-primary flex-fill"><i class="ti ti-device-floppy me-2"></i>Save Changes</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fs-14"><a href=""><i class="ti ti-shield text-gray me-2"></i>Two Factor Authentication</a></h6>
                            <div class="form-check form-switch d-flex justify-content-end align-items-center">
                              <input class="form-check-input" type="checkbox" role="switch">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Security setting -->

                  <!-- Privacy setting -->
                  <div class="content-wrapper">
                    <h5 class="sub-title">Privacy</h5>
                    <div class="chat-file">
                      <div class="file-item ">
                        <div class="accordion accordion-flush chat-accordion" id="privacy-setting">
                          <div class="mb-3">
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header others">
                                <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse3" aria-expanded="true" aria-controls="chatuser-collapse3">
                                  <i class="ti ti-mood-smile me-2"></i>Profile Info
                                </a>
                              </h2>
                              <div id="chatuser-collapse3" class="accordion-collapse collapse " data-bs-parent="#privacy-setting">
                                <div class="accordion-body">
                                  <div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <select class="form-select">
                                          <option>Everyone</option>
                                          <option>Except</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header others">
                                <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse3-1" aria-expanded="true" aria-controls="chatuser-collapse3-1">
                                  <i class="ti ti-eye me-2"></i>Last Seen
                                </a>
                              </h2>
                              <div id="chatuser-collapse3-1" class="accordion-collapse collapse " data-bs-parent="#privacy-setting">
                                <div class="accordion-body">
                                  <div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <select class="form-select">
                                          <option>Everyone</option>
                                          <option>Except</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header others">
                                <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse3-2" aria-expanded="true" aria-controls="chatuser-collapse3-2">
                                  <i class="ti ti-users-group me-2"></i>Groups
                                </a>
                              </h2>
                              <div id="chatuser-collapse3-2" class="accordion-collapse collapse " data-bs-parent="#privacy-setting">
                                <div class="accordion-body">
                                  <div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <select class="form-select">
                                          <option>Everyone</option>
                                          <option>Except</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header others">
                                <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse3-3" aria-expanded="true" aria-controls="chatuser-collapse3-3">
                                  <i class="ti ti-circle-dot me-2"></i>Status
                                </a>
                              </h2>
                              <div id="chatuser-collapse3-3" class="accordion-collapse collapse " data-bs-parent="#privacy-setting">
                                <div class="accordion-body">
                                  <div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <select class="form-select mb-3">
                                          <option>Everyone</option>
                                          <option>Except</option>
                                        </select>
                                      </div>
                                      <div class="col-lg-12 d-flex">
                                        <a href="" class="btn btn-primary flex-fill"><i class="ti ti-device-floppy me-2"></i>Save Changes</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fs-14"><a href=""><i class="ti ti-checks text-gray me-2"></i>Read Receipients</a></h6>
                            <div class="form-check form-switch d-flex justify-content-end align-items-center">
                              <input class="form-check-input" type="checkbox" role="switch">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Privacy setting -->

                  <!-- Chat setting -->
                  <div class="content-wrapper">
                    <h5 class="sub-title">Chat</h5>
                    <div class="chat-file">
                      <div class="file-item ">
                        <div class="accordion accordion-flush chat-accordion" id="chat-setting">
                          <div class="border-0 profile-list mb-3">
                            <div class="accordion-item border-0 border-bottom">
                              <h2 class="accordion-header border-0">
                                <a href="#" class="accordion-button border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse4" aria-expanded="true" aria-controls="chatuser-collapse4">
                                  <i class="ti ti-photo me-2"></i>Background Images
                                </a>
                              </h2>
                              <div id="chatuser-collapse4" class="accordion-collapse border-0 collapse " data-bs-parent="#chat-setting">
                                <div class="accordion-body border-0 pb-0">
                                  <div class="chat-user-photo">
                                    <div class="chat-img contact-gallery mb-3">
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-01.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-01.jpg" title="Demo 01"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-02.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-02.jpg" title="Demo 02"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-03.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-03.jpg" title="Demo 03"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-04.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-04.jpg" title="Demo 04"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-05.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-05.jpg" title="Demo 04"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-06.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-06.jpg" title="Demo 04"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-07.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-07.jpg" title="Demo 04"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                      <div class="img-wrap">
                                        <img src="/assets/img/gallery/gallery-08.jpg" alt="img">
                                        <div class="img-overlay-1">
                                          <a class="gallery-img" data-fancybox="gallery-img" href="/assets/img/gallery/gallery-08.jpg" title="Demo 04"></a>
                                          <span class="check-icon avatar avatar-md d-flex justify-content-center align-items-center">
                                                                                            <i class="ti ti-check  d-flex justify-content-center align-items-center"></i>
                                                                                        </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="col-lg-12 d-flex">
                                      <a href="" class="btn btn-primary flex-fill mb-3"><i class="ti ti-device-floppy me-2"></i>Save Changes</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex justify-content-between profile-list align-items-center border-bottom pb-3 mb-3">
                            <h6 class="fs-14"><a href=""><i class="ti ti-clear-all text-gray me-2 "></i>Clear All Chat</a></h6>
                            <div class="form-check form-switch d-flex justify-content-end align-items-center">
                              <input class="form-check-input" type="checkbox" role="switch">
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center profile-list border-bottom pb-3 mb-3">
                            <h6 class="fs-14"><a href=""><i class="ti ti-trash text-gray me-2 "></i>Delete All Chat</a></h6>
                            <div class="form-check form-switch d-flex justify-content-end align-items-center">
                              <input class="form-check-input" type="checkbox" role="switch">
                            </div>
                          </div>
                          <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fs-14"><a href=""><i class="ti ti-restore text-gray me-2 "></i>Chat Backup</a></h6>
                            <div class="form-check form-switch d-flex justify-content-end align-items-center">
                              <input class="form-check-input" type="checkbox" role="switch">
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <!-- /Chat setting -->

                  <!-- Notification setting -->
                  <div class="content-wrapper">
                    <h5 class="sub-title">Notifications</h5>
                    <div class="chat-file">
                      <div class="file-item ">
                        <div class="card">
                          <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center profile-list border-bottom pb-3 mb-3">
                              <h6 class="fs-14"><a href=""><i class="ti ti-message text-gray me-2 "></i>Message Notifications</a></h6>
                              <div class="form-check form-switch d-flex justify-content-end align-items-center">
                                <input class="form-check-input" type="checkbox" role="switch">
                              </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center profile-list border-bottom pb-3 mb-3">
                              <h6 class="fs-14"><a href=""><i class="ti ti-trash text-gray me-2 "></i>Show Previews</a></h6>
                              <div class="form-check form-switch d-flex justify-content-end align-items-center">
                                <input class="form-check-input" type="checkbox" role="switch">
                              </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center profile-list border-bottom pb-3 mb-3">
                              <h6 class="fs-14"><a href=""><i class="ti ti-mood-smile text-gray me-2 "></i>Show Reaction Notifications</a></h6>
                              <div class="form-check form-switch d-flex justify-content-end align-items-center">
                                <input class="form-check-input" type="checkbox" role="switch">
                              </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center ">
                              <h6 class="fs-14"><a href=""><i class="ti ti-bell-ringing text-gray me-2 "></i>Notification Sound</a></h6>
                              <div class="form-check form-switch d-flex justify-content-end align-items-center">
                                <input class="form-check-input" type="checkbox" role="switch">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Notification setting -->

                  <!-- Language setting -->
                  <div class="content-wrapper">
                    <h5 class="sub-title">Language</h5>
                    <div class="chat-file">
                      <div class="file-item ">
                        <div class="accordion accordion-flush chat-accordion" id="language-setting">
                          <div>
                            <div class="accordion-item border-0">
                              <h2 class="accordion-header">
                                <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse5" aria-expanded="false" aria-controls="chatuser-collapse5">
                                  <i class="ti ti-language me-2"></i>Language
                                </a>
                              </h2>
                              <div id="chatuser-collapse5" class="accordion-collapse collapse " data-bs-parent="#Language-setting">
                                <div class="accordion-body">
                                  <div>
                                    <div class="row">
                                      <div class="col-lg-12">
                                        <select class="form-select">
                                          <option>English</option>
                                          <option>French</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Language setting -->

                  <!-- Manage Device -->
                  <div class="content-wrapper">
                    <h5 class="sub-title">Manage Device</h5>
                    <div class="chat-file">
                      <div class="file-item ">
                        <div class="accordion accordion-flush chat-accordion" id="device-setting">
                          <div>
                            <div class="accordion-item border-0">
                              <h2 class="accordion-header">
                                <a href="#" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#chatuser-collapse6" aria-expanded="false" aria-controls="chatuser-collapse6">
                                  <i class="ti ti-eye me-2"></i>Device History
                                </a>
                              </h2>
                              <div id="chatuser-collapse6" class="accordion-collapse collapse " data-bs-parent="#device-setting">
                                <div class="accordion-body">
                                  <div class="device-option">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                      <div class="d-flex align-items-center">
                                                                                    <span class="device-icon d-flex justify-content-center align-items-center bg-transparent-dark rounded-circle me-2">
                                                                                        <i class="ti ti-device-laptop"></i>
                                                                                    </span>
                                        <div>
                                          <h6 class="fs-16">Mac OS Safari 15.1</h6>
                                          <span class="fs-16">13 Jul 2024 at 03:15 PM</span>
                                        </div>
                                      </div>
                                      <div class="d-flex justify-content-end align-items-center">
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="mute" checked="">
                                        </div>
                                        <a href="#"><i class="ti ti-trash fs-16"></i></a>
                                      </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                      <div class="d-flex align-items-center">
                                                                                    <span class="device-icon d-flex justify-content-center align-items-center bg-transparent-dark rounded-circle me-2">
                                                                                        <i class="ti ti-device-laptop"></i>
                                                                                    </span>
                                        <div>
                                          <h6 class="fs-16">Windows 11 Mozilla Firefox</h6>
                                          <span class="fs-16">06 Jul 2024 at 09:30 AM</span>
                                        </div>
                                      </div>
                                      <div class="d-flex justify-content-end align-items-center">
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="mute">
                                        </div>
                                        <a href="#"><i class="ti ti-trash fs-16"></i></a>
                                      </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                      <div class="d-flex align-items-center">
                                                                                    <span class="device-icon d-flex justify-content-center align-items-center bg-transparent-dark rounded-circle me-2">
                                                                                        <i class="ti ti-device-mobile"></i>
                                                                                    </span>
                                        <div>
                                          <h6 class="fs-16">IOS Safari 15.1</h6>
                                          <span class="fs-16">28 Jun 2024 at 04:00 PM</span>
                                        </div>
                                      </div>
                                      <div class="d-flex justify-content-end align-items-center">
                                        <div class="form-check">
                                          <input class="form-check-input" type="radio" name="mute">
                                        </div>
                                        <a href="#"><i class="ti ti-trash fs-16"></i></a>
                                      </div>
                                    </div>
                                    <div class="d-flex">
                                      <a href="" class="btn btn-primary flex-fill"><i class="ti ti-logout-2 me-2"></i>Logout From All Devices</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- /Manage Device -->

                  <!-- Others -->
                  <div class="content-wrapper mb-0">
                    <h5 class="sub-title">Others</h5>
                    <div class="card mb-0">
                      <div class="card-body list-group profile-item">
                        <div class="accordion accordion-flush chat-accordion list-group-item" id="other-term">
                          <div class="accordion-item w-100">
                            <h2 class="accordion-header">
                              <a href="#" class="accordion-button py-0 collapsed" data-bs-toggle="collapse" data-bs-target="#terms" aria-expanded="false" aria-controls="terms">
                                <i class="ti ti-file-text me-2"></i>Terms & Conditions
                              </a>
                            </h2>
                            <div id="terms" class="accordion-collapse collapse" data-bs-parent="#other-term">
                              <div class="accordion-body p-0 pt-3">
                                <textarea class="form-control"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="accordion accordion-flush chat-accordion list-group-item" id="other-policy">
                          <div class="accordion-item w-100">
                            <h2 class="accordion-header">
                              <a href="#" class="accordion-button py-0 collapsed" data-bs-toggle="collapse" data-bs-target="#privacy" aria-expanded="false" aria-controls="privacy">
                                <i class="ti ti-file-text me-2"></i>Privacy Policy
                              </a>
                            </h2>
                            <div id="privacy" class="accordion-collapse collapse" data-bs-parent="#other-policy">
                              <div class="accordion-body p-0 pt-3">
                                <textarea class="form-control"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a href="javascript:void(0);" class="list-group-item" data-bs-toggle="modal" data-bs-target="#block-user">
                          <div class="profile-info">
                            <h6><i class="ti ti-ban text-gray me-2"></i>Blocked User</h6>
                          </div>
                          <div>
                            <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                          </div>
                        </a>
                        <a href="javascript:void(0);" class="list-group-item" data-bs-toggle="modal" data-bs-target="#mute-user">
                          <div class="profile-info">
                            <h6><i class="ti ti-volume-off text-gray me-2"></i>Mute User</h6>
                          </div>
                          <div>
                            <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                          </div>
                        </a>
                        <a href="javascript:void(0);" class="list-group-item" data-bs-toggle="modal" data-bs-target="#delete-account">
                          <div class="profile-info">
                            <h6><i class="ti ti-trash-x text-gray me-2"></i>Delete Account</h6>
                          </div>
                          <div>
                            <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                          </div>
                        </a>
                        <a href="javascript:void(0);" class="list-group-item" data-bs-toggle="modal" data-bs-target="#acc-logout">
                          <div class="profile-info">
                            <h6><i class="ti ti-logout text-gray me-2"></i>Logout</h6>
                          </div>
                          <div>
                            <span class="link-icon"><i class="ti ti-chevron-right"></i></span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- Others -->

                </div>

              </div>

            </div>
            <!-- / Chats sidebar -->
          </div>
          <!-- /Settings -->

        </div>
      </div>
      <!-- /Sidebar group -->

      <!-- Chat -->

      <component :is="currentComponent" v-bind="componentProps" @navigate-back="setPreviousComponent"></component>


      <!-- /Chat -->

      <!-- Contact Info -->
      <!-- /Contact Info -->

      <!-- Favourites Info -->
      <div class="chat-offcanvas fav-canvas offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="contact-favourite">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title"><a href="javascript:void(0);" data-bs-toggle="offcanvas" data-bs-target="#contact-profile" data-bs-dismiss="offcanvas"><i class="ti ti-arrow-left me-2"></i></a>Favourites</h4>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i class="ti ti-x"></i></button>
        </div>
        <div class="offcanvas-body">
          <div class="favourite-chats">
            <div class="text-end mb-4">
              <a href="javascript:void(0);" class="btn btn-light"><i class="ti ti-heart-minus me-2"></i>Mark all Unfavourite</a>
            </div>
            <div class="chats">
              <div class="chat-avatar">
                <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
              </div>
              <div class="chat-content">
                <div class="chat-profile-name">
                  <h6>Edward Lietz<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"><i class="ti ti-checks"></i></span></h6>
                </div>
                <div class="chat-info">
                  <div class="message-content">
                    Thanks!!!, I ll Update you Once i check the Examples
                  </div>
                  <div class="chat-actions">
                    <a class="#" href="#" data-bs-toggle="dropdown">
                      <i class="ti ti-dots-vertical"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                      <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Unfavourite</a></li>
                      <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    </ul>
                  </div>
                </div>
                <p>Saved on 23 Septemer 2024</p>
              </div>
            </div>
            <div class="chats">
              <div class="chat-avatar">
                <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
              </div>
              <div class="chat-content">
                <div class="chat-profile-name">
                  <h6>Carla Jenkins<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:45 PM</span><span class="msg-read success"><i class="ti ti-checks"></i></span></h6>
                </div>
                <div class="chat-info">
                  <div class="message-content bg-transparent p-0">
                    <div class="message-audio">
                      <audio controls="">
                        <source src="/assets/img/audio/audio.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                  <div class="chat-actions">
                    <a class="#" href="#" data-bs-toggle="dropdown">
                      <i class="ti ti-dots-vertical"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                      <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Unfavourite</a></li>
                      <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    </ul>
                  </div>
                </div>
                <p>Saved on 26 Septemer 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Favourites Info -->

      <!-- Mute -->
      <div class="modal fade" id="mute-notification">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                Mute Notifications
              </h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="mute" id="mute1">
                  <label class="form-check-label" for="mute1">30 Minutes</label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="mute" id="mute2">
                  <label class="form-check-label" for="mute2">1 Hour</label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="mute" id="mute3">
                  <label class="form-check-label" for="mute3">1 Day</label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="mute" id="mute4">
                  <label class="form-check-label" for="mute4">1 Week</label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="mute" id="mute5">
                  <label class="form-check-label" for="mute5">1 Month</label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="mute" id="mute6">
                  <label class="form-check-label" for="mute6">1 Year</label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="mute" id="mute7">
                  <label class="form-check-label" for="mute7">Always</label>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Mute</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Mute -->


      <!-- Add Call -->
      <div class="modal fade" id="new-call">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">New Call</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="search-wrap contact-search mb-3">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search">
                    <a href="javascript:void(0);" class="input-group-text"><i class="ti ti-search"></i></a>
                  </div>
                </div>
                <h6 class="mb-3 fw-medium fs-16">Contacts</h6>
                <div class="contact-scroll contact-select mb-3">
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Edward Lietz</h6>
                        <p>App Developer</p>
                      </div>
                    </div>
                    <div class="d-inline-flex">
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle me-2" data-bs-toggle="modal" data-bs-target="#voice_call"><span><i class="ti ti-phone"></i></span></a>
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle" data-bs-toggle="modal" data-bs-target="#video-call"><span><i class="ti ti-video"></i></span></a>
                    </div>
                  </div>
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Sarika Jain</h6>
                        <p>UI/UX Designer</p>
                      </div>
                    </div>
                    <div class="d-inline-flex">
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle me-2" data-bs-toggle="modal" data-bs-target="#voice_call"><span><i class="ti ti-phone"></i></span></a>
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle" data-bs-toggle="modal" data-bs-target="#video-call"><span><i class="ti ti-video"></i></span></a>
                    </div>
                  </div>
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Clyde Smith</h6>
                        <p>Web Developer</p>
                      </div>
                    </div>
                    <div class="d-inline-flex">
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle me-2" data-bs-toggle="modal" data-bs-target="#voice_call"><span><i class="ti ti-phone"></i></span></a>
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle" data-bs-toggle="modal" data-bs-target="#video-call"><span><i class="ti ti-video"></i></span></a>
                    </div>
                  </div>
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Carla Jenkins</h6>
                        <p>Business Analyst</p>
                      </div>
                    </div>
                    <div class="d-inline-flex">
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle me-2" data-bs-toggle="modal" data-bs-target="#voice_call"><span><i class="ti ti-phone"></i></span></a>
                      <a href="" class="model-icon bg-light d-flex justify-content-center align-items-center rounded-circle" data-bs-toggle="modal" data-bs-target="#video-call"><span><i class="ti ti-video"></i></span></a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Add Call -->

      <!-- Delete -->
      <div class="modal fade" id="message-delete">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">
                Delete Chat
              </h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" checked="" name="delete-chat" id="delete-for-me">
                  <label class="form-check-label" for="delete-for-me">Delete For Me</label>
                </div>
                <div class="form-check mb-3">
                  <input class="form-check-input" type="radio" name="delete-chat" id="delete-for-everyone">
                  <label class="form-check-label" for="delete-for-everyone">Delete For Everyone</label>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Delete</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Delete -->
      <!-- Block User -->
      <div class="modal fade" id="block-user">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Block User</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="block-wrap text-center mb-3">
                                    <span class="user-icon mb-3 mx-auto bg-transparent-info">
                                        <i class="ti ti-user-off text-info"></i>
                                    </span>
                  <p class="text-grya-9">Blocked contacts will no longer be able to call you or send you messages.</p>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Block</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Block User -->

      <!-- Report User -->
      <div class="modal fade" id="report-user">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Report User</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="block-wrap mb-3">
                  <p class="text-grya-9 mb-3">If you block this contact and clear the chat, messages will only be removed from this device and your devices on the newer versions of DreamsChat</p>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" name="mute" id="report">
                    <label class="form-check-label" for="report">Report User</label>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Report</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Report User -->

      <!-- Delete Chat -->
      <div class="modal fade" id="delete-chat">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Delete Chat</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="block-wrap text-center mb-3">
                                    <span class="user-icon mb-3 mx-auto bg-transparent-danger">
                                        <i class="ti ti-trash text-danger"></i>
                                    </span>
                  <p class="text-grya-9">Clearing or deleting entire chats will only remove messages from this device and your devices on the newer versions of DreamsChat.</p>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Delete</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Delete Chat -->

      <!-- New Chat -->
      <div class="modal fade" id="new-chat">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">New Chat</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="search-wrap contact-search mb-3">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search">
                    <a href="javascript:void(0);" class="input-group-text"><i class="ti ti-search"></i></a>
                  </div>
                </div>
                <h6 class="mb-3 fw-medium fs-16">Contacts</h6>
                <div class="contact-scroll contact-select mb-3">
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Aaryian Jose</h6>
                        <p>App Developer</p>
                      </div>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="contact">
                    </div>
                  </div>
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Sarika Jain</h6>
                        <p>UI/UX Designer</p>
                      </div>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="contact">
                    </div>
                  </div>
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Clyde Smith</h6>
                        <p>Web Developer</p>
                      </div>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="contact">
                    </div>
                  </div>
                  <div class="contact-user d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-lg">
                        <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="image">
                      </div>
                      <div class="ms-2">
                        <h6>Carla Jenkins</h6>
                        <p>Business Analyst</p>
                      </div>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="contact">
                    </div>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Start Chat</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /New Chat -->

      <!-- Add Contact -->
      <div class="modal fade" id="add-contact">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Contact</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">First Name</label>
                      <div class="input-icon position-relative">
                        <input type="text" class="form-control">
                        <span class="input-icon-addon">
                                                    <i class="ti ti-user"></i>
                                                </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Last Name</label>
                      <div class="input-icon position-relative">
                        <input type="text" class="form-control">
                        <span class="input-icon-addon">
                                                    <i class="ti ti-user"></i>
                                                </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">Email</label>
                      <div class="input-icon position-relative">
                        <input type="text" class="form-control">
                        <span class="input-icon-addon">
                                                    <i class="ti ti-mail"></i>
                                                </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Phone</label>
                      <div class="input-icon position-relative">
                        <input type="text" class="form-control">
                        <span class="input-icon-addon">
                                                    <i class="ti ti-phone"></i>
                                                </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">Date of Birth</label>
                      <div class="input-icon position-relative">
                        <input type="text" class="form-control">
                        <span class="input-icon-addon">
                                                    <i class="ti ti-calendar-event"></i>
                                                </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">Website Address</label>
                      <div class="input-icon position-relative">
                        <input type="text" class="form-control">
                        <span class="input-icon-addon">
                                                    <i class="ti ti-globe"></i>
                                                </span>
                      </div>
                    </div>
                    <div class="card border">
                      <div class="card-header border-bottom">
                        <h6>Social Information</h6>
                      </div>
                      <div class="card-body pb-1">
                        <div class="row align-items-center">
                          <div class="col-md-4">
                            <label class="form-label text-default fw-normal mb-3">Facebook</label>
                          </div>
                          <div class="col-md-8">
                            <div class="input-icon position-relative mb-3">
                              <input type="text" class="form-control">
                              <span class="input-icon-addon">
                                                                <i class="ti ti-brand-facebook"></i>
                                                            </span>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label class="form-label text-default fw-normal mb-3">Twitter</label>
                          </div>
                          <div class="col-md-8">
                            <div class="input-icon position-relative mb-3">
                              <input type="text" class="form-control">
                              <span class="input-icon-addon">
                                                                <i class="ti ti-brand-twitter"></i>
                                                            </span>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label class="form-labe text-default fw-normall mb-3">Instagram</label>
                          </div>
                          <div class="col-md-8">
                            <div class="input-icon position-relative mb-3">
                              <input type="text" class="form-control">
                              <span class="input-icon-addon">
                                                                <i class="ti ti-brand-instagram"></i>
                                                            </span>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label class="form-label text-default fw-normal mb-3">Linked in</label>
                          </div>
                          <div class="col-md-8">
                            <div class="input-icon position-relative mb-3">
                              <input type="text" class="form-control">
                              <span class="input-icon-addon">
                                                                <i class="ti ti-brand-linkedin"></i>
                                                            </span>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <label class="form-label text-default fw-normal mb-3">YouTube</label>
                          </div>
                          <div class="col-md-8">
                            <div class="input-icon position-relative mb-3">
                              <input type="text" class="form-control">
                              <span class="input-icon-addon">
                                                                <i class="ti ti-brand-youtube"></i>
                                                            </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Add Contact</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Add Contact -->

      <!-- Contact Detail -->
      <div class="modal fade" id="contact-details">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Contact Detail</h4>
              <div class="d-flex align-items-center">
                <div class="dropdown me-2">
                  <a class="d-block" href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li><a class="dropdown-item" href="#"><i class="ti ti-share-3 me-2"></i>Share</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-edit me-2"></i>Edit</a></li>
                    <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#block-user"><i class="ti ti-ban me-2"></i>Block</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                  </ul>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <i class="ti ti-x"></i>
                </button>
              </div>
            </div>
            <div class="modal-body">
              <div class="card bg-light shadow-none">
                <div class="card-body pb-1">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center mb-3">
                                            <span class="avatar avatar-lg">
                                                <img :src="getFileUrl(selectedUser?.avatar)" class="rounded-circle" alt="img">
                                            </span>
                      <div class="ms-2">
                        <h6>{{ selectedUser?.name }}</h6>
                        <p>App Developer</p>
                      </div>
                    </div>
                    <div class="contact-actions d-flex align-items-center mb-3">
                      <a v-if="selectedUser?.friend == true" href="#" @click="openChat(selectedUser.id)" data-bs-dismiss="modal" class="me-2"><i class="ti ti-message"></i></a>
                      <a v-else href="#" @click="addFriend(selectedUser.id)" class="me-2"><i class="ti ti-user-plus"></i></a>
                      <a href="javascript:void(0);" class="me-2" data-bs-toggle="modal" data-bs-target="#voice_call"><i class="ti ti-phone"></i></a>
                      <a href="javascript:void(0);" class="me-2"><i class="ti ti-video"></i></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border mb-3">
                <div class="card-header border-bottom">
                  <h6>Personal Information</h6>
                </div>
                <div class="card-body pb-1">
                  <div class="mb-2">
                    <div class="row align-items-center">
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-clock-hour-4 me-1"></i>Local Time</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">10:00 AM</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-calendar-event me-1"></i>Date of Birth</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">22 July 2024</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-phone me-1"></i>Phone Number</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">{{selectedUser?.phone}}</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-mail me-1"></i>Email</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2"><a href="{{selectedUser?.email}}" class="__cf_email__" data-cfemail="96f7f7e4ffeff7f8d6f3eef7fbe6faf3b8f5f9fb">{{selectedUser?.email}}</a></h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-globe me-1"></i>Website Address</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">www.examplewebsite.com</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border mb-0">
                <div class="card-header border-bottom">
                  <h6>Social Information</h6>
                </div>
                <div class="card-body pb-1">
                  <div class="mb-2">
                    <div class="row align-items-center">
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-brand-facebook me-1"></i>Facebook</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">www.facebook.com</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-brand-twitter me-1"></i>Twitter</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">www.twitter.com</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-brand-instagram me-1"></i>Instagram</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">www.instagram.com</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-brand-linkedin me-1"></i>Linkedin</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">www.linkedin.com</h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-2 d-flex align-items-center"><i class="ti ti-brand-youtube me-1"></i>YouTube</p>
                      </div>
                      <div class="col-sm-6">
                        <h6 class="fw-medium fs-14 mb-2">www.youtube.com</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Contact Detail -->

      <!-- Voice Call -->
      <div class="modal fade" id="voice_call">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header justify-content-center border-0">
                            <span class="model-icon bg-primary d-flex justify-content-center align-items-center rounded-circle me-2">
                                <i class="ti ti-phone-call"></i>
                            </span>
              <h4 class="modal-title">Audio Calling...</h4>
            </div>
            <div class="modal-body pb-0">
              <div class="card bg-light mb-0">
                <div class="card-body d-flex justify-content-center">
                  <div>
                                        <span class="avatar avatar-xxl">
                                            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="user">
                                        </span>
                    <h6 class="fs-14">Edward Lietz</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center border-0">
              <a href="" class="voice-icon btn btn-success rounded-circle d-flex justify-content-center align-items-center me-2" data-bs-toggle="modal" data-bs-target="#voice_attend">
                <i class="ti ti-phone fs-20"></i>
              </a>
              <a href="" class="voice-icon btn btn-danger rounded-circle d-flex justify-content-center align-items-center" data-bs-dismiss="modal" aria-label="close">
                <i class="ti ti-phone-off fs-20"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- /Voice Call -->

      <!-- Voice Call attend -->
      <div class="modal fade" id="voice_attend" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header d-flex border-0 pb-0">
              <div class="card bg-transparent-dark flex-fill border mb-3">
                <div class="card-body d-flex justify-content-between p-3 flex-wrap row-gap-3">
                  <div class="d-flex align-items-center">
                                        <span class="avatar avatar-lg online me-2">
                                            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="user">
                                        </span>
                    <div>
                      <h6>Edward Lietz</h6>
                      <span>+22-555-345-11</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                                        <span class="badge border border-primary  text-primary badge-sm me-2">
                                            <i class="ti ti-point-filled"></i>
                                            01:15:25
                                        </span>
                    <a href="" class="user-add bg-primary rounded d-flex justify-content-center align-items-center text-white" data-bs-toggle="modal" data-bs-target="#voice_group">
                      <i class="ti ti-user-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body border-0 pt-0">
              <div class="card audio-crd bg-transparent-dark border">
                <div class="modal-bgimg">
                                    <span class="modal-bg1">
                                        <img src="/assets/img/bg/bg-02.png" class="img-fluid" alt="bg">
                                    </span>
                  <span class="modal-bg2">
                                        <img src="/assets/img/bg/bg-03.png" class="img-fluid" alt="bg">
                                    </span>
                </div>
                <div class="card-body p-3">
                  <div class="d-flex justify-content-center align-items-center pt-5">
                                        <span class="avatar avatar-xxxl bg-soft-primary rounded-circle p-2">
                                            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="user">
                                        </span>

                  </div>
                  <div class="d-flex align-items-end justify-content-end">
                                        <span class="call-span border border-2 border-primary d-flex justify-content-center align-items-center rounded">
                                            <span class="avatar avatar-xl bg-soft-primary rounded-circle p-2">
                                                <img src="/assets/img/profiles/avatar-17.jpg" class="rounded-circle" alt="user">
                                            </span>
                                        </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center border-0 pt-0">
              <div class="call-controll-block d-flex align-items-center justify-content-center rounded-pill">
                <a href="javascript:void(0);" class="call-controll mute-bt d-flex align-items-center justify-content-center">
                  <i class="ti ti-microphone"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-volume"></i>
                </a>
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="call-controll call-decline d-flex align-items-center justify-content-center">
                  <i class="ti ti-phone"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-maximize"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-dots"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Voice Call attend -->

      <!-- Voice Call group -->
      <div class="modal fade" id="voice_group" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header d-flex border-0 pb-0">
              <div class="card bg-transparent-dark flex-fill border mb-3">
                <div class="card-body d-flex justify-content-between p-3">
                  <div class="row justify-content-between flex-fill row-gap-3">
                    <div class="col-lg-5">
                      <div class="d-flex justify-content-between align-items-center flex-wrap row-gap-2">
                        <h3>Weekly Report Call</h3>

                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="d-flex justify-content-start align-items-center">
                                                <span class="badge border border-primary  text-primary badge-sm me-3">
                                                    <i class="ti ti-point-filled"></i>
                                                    01:15:25
                                                </span>
                        <a href="javascript:void(0);" data-bs-toggle="modal" class="badge badge-danger badge-sm">Leave</a>
                      </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                                                    <span class="user-add bg-primary d-flex justify-content-center align-items-center rounded-circle me-2">
                                                        6
                                                    </span>
                          <a href="" class="user-add bg-primary rounded d-flex justify-content-center align-items-center text-white">
                            <i class="ti ti-user-plus"></i>
                          </a>
                        </div>
                        <div class="row justify-content-center">
                          <div class="layout-tab d-flex justify-content-center ">
                            <div class="nav nav-pills inner-tab " id="pills-tab2" role="tablist">
                              <div class="nav-item me-0" role="presentation">
                                <a href="#" class="nav-link bg-white text-gray p-0 fs-16 me-2" id="pills-single1-tab" data-bs-toggle="pill" data-bs-target="#pills-single1" role="tab" aria-controls="pills-single1" aria-selected="false" tabindex="-1">
                                  <i class="ti ti-square"></i>
                                </a>
                              </div>
                              <div class="nav-item" role="presentation">
                                <a href="#" class="nav-link active bg-white text-gray p-0 fs-16" id="pills-group1-tab" data-bs-toggle="pill" data-bs-target="#pills-group1" role="tab" aria-controls="pills-group1" aria-selected="false" tabindex="-1">
                                  <i class="ti ti-layout-grid"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body border-0 pt-0">
              <div class="tab-content dashboard-tab">
                <div class="tab-pane fade" id="pills-single1" role="tabpanel" aria-labelledby="pills-single1-tab">
                  <div class="card audio-crd bg-transparent-dark border">
                    <div class="modal-bgimg">
                                            <span class="modal-bg1">
                                                <img src="/assets/img/bg/bg-02.png" class="img-fluid" alt="bg">
                                            </span>
                      <span class="modal-bg2">
                                                <img src="/assets/img/bg/bg-03.png" class="img-fluid" alt="bg">
                                            </span>
                    </div>
                    <div class="card-body p-3">
                      <div class="single-img d-flex justify-content-center align-items-center">
                                                <span class=" avatar avatar-xxxl bg-soft-primary rounded-circle p-2">
                                                    <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="user">
                                                </span>
                      </div>
                      <div class="d-flex align-items-end justify-content-end">
                                                <span class="call-span border border-2 border-primary d-flex justify-content-center align-items-center rounded">
                                                    <span class="avatar avatar-xxl bg-soft-primary rounded-circle p-2">
                                                        <img src="/assets/img/profiles/avatar-17.jpg" class="rounded-circle" alt="user">
                                                    </span>
                                                </span>
                      </div>
                    </div>

                  </div>

                </div>
                <div class="tab-pane fade active show" id="pills-group1" role="tabpanel" aria-labelledby="pills-group1-tab">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="card audio-crd bg-transparent-dark border border-primary pt-4">
                        <div class="modal-bgimg">
                                                    <span class="modal-bg1">
                                                        <img src="/assets/img/bg/bg-02.png" class="img-fluid" alt="bg">
                                                    </span>
                          <span class="modal-bg2">
                                                        <img src="/assets/img/bg/bg-03.png" class="img-fluid" alt="bg">
                                                    </span>
                        </div>
                        <div class="card-body ">
                          <div class="d-flex justify-content-center align-items-center">
                                                        <span class="avatar avatar-xxxl bg-soft-primary rounded-circle p-2">
                                                            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="user">
                                                        </span>
                          </div>
                          <div class="d-flex align-items-end justify-content-end">
                            <span class="badge badge-info">Edwin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card audio-crd bg-transparent-dark border pt-4">
                        <div class="modal-bgimg">
                                                    <span class="modal-bg1">
                                                        <img src="/assets/img/bg/bg-02.png" class="img-fluid" alt="bg">
                                                    </span>
                          <span class="modal-bg2">
                                                        <img src="/assets/img/bg/bg-03.png" class="img-fluid" alt="bg">
                                                    </span>
                        </div>
                        <div class="card-body ">
                          <div class="d-flex justify-content-center align-items-center">
                                                        <span class="avatar avatar-xxxl bg-soft-primary rounded-circle p-2">
                                                            <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle" alt="user">
                                                        </span>
                          </div>
                          <div class="d-flex align-items-end justify-content-end">
                            <span class="badge badge-info">Edwin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card audio-crd bg-transparent-dark border pt-4">
                        <div class="modal-bgimg">
                                                    <span class="modal-bg1">
                                                        <img src="/assets/img/bg/bg-02.png" class="img-fluid" alt="bg">
                                                    </span>
                          <span class="modal-bg2">
                                                        <img src="/assets/img/bg/bg-03.png" class="img-fluid" alt="bg">
                                                    </span>
                        </div>
                        <div class="card-body ">
                          <div class="d-flex justify-content-center align-items-center">
                                                        <span class="avatar avatar-xxxl bg-soft-primary rounded-circle p-2">
                                                            <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="user">
                                                        </span>
                          </div>
                          <div class="d-flex align-items-end justify-content-end">
                            <span class="badge badge-info">Edwin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card audio-crd bg-transparent-dark border pt-4">
                        <div class="modal-bgimg">
                                                    <span class="modal-bg1">
                                                        <img src="/assets/img/bg/bg-02.png" class="img-fluid" alt="bg">
                                                    </span>
                          <span class="modal-bg2">
                                                        <img src="/assets/img/bg/bg-03.png" class="img-fluid" alt="bg">
                                                    </span>
                        </div>
                        <div class="card-body ">
                          <div class="d-flex justify-content-center align-items-center">
                                                        <span class="avatar avatar-xxxl bg-soft-primary rounded-circle p-2">
                                                            <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="user">
                                                        </span>
                          </div>
                          <div class="d-flex align-items-end justify-content-end">
                            <span class="badge badge-info">Edwin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card audio-crd bg-transparent-dark border pt-4">
                        <div class="modal-bgimg">
                                                    <span class="modal-bg1">
                                                        <img src="/assets/img/bg/bg-02.png" class="img-fluid" alt="bg">
                                                    </span>
                          <span class="modal-bg2">
                                                        <img src="/assets/img/bg/bg-03.png" class="img-fluid" alt="bg">
                                                    </span>
                        </div>
                        <div class="card-body">
                          <div class="d-flex justify-content-center align-items-center">
                                                        <span class="avatar avatar-xxxl bg-soft-primary rounded-circle p-2">
                                                            <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="user">
                                                        </span>
                          </div>
                          <div class="d-flex align-items-end justify-content-end">
                            <span class="badge badge-info">Edwin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center border-0 pt-0">
              <div class="call-controll-block d-flex align-items-center justify-content-center rounded-pill">
                <a href="javascript:void(0);" class="call-controll mute-bt d-flex align-items-center justify-content-center">
                  <i class="ti ti-microphone"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-volume"></i>
                </a>
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="call-controll call-decline d-flex align-items-center justify-content-center">
                  <i class="ti ti-phone"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-maximize"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-dots"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Voice Call group -->

      <!-- Video Call -->
      <div class="modal fade" id="video-call">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header justify-content-center border-0">
                            <span class="model-icon bg-primary d-flex justify-content-center align-items-center rounded-circle me-2">
                                <i class="ti ti-video"></i>
                            </span>
              <h4 class="modal-title">Video Calling...</h4>
            </div>
            <div class="modal-body pb-0">
              <div class="card bg-light mb-0">
                <div class="card-body d-flex justify-content-center">
                  <div>
                                        <span class="avatar avatar-xxl">
                                            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="user">
                                        </span>
                    <h6 class="fs-14">Edward Lietz</h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center border-0">
              <a href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#start-video-call" class="voice-icon btn btn-success rounded-circle d-flex justify-content-center align-items-center me-2">
                <i class="ti ti-phone fs-20"></i>
              </a>
              <a href="" class="voice-icon btn btn-danger rounded-circle d-flex justify-content-center align-items-center" data-bs-dismiss="modal" aria-label="close">
                <i class="ti ti-phone-off fs-20"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- /Video Call -->
      <div class="modal video-call-popup fade" id="start-video-call" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header d-flex border-0 pb-0">
              <div class="card bg-transparent-dark flex-fill border">
                <div class="card-body d-flex justify-content-between flex-wrap gap-2">
                  <div class="d-flex align-items-center">
                                        <span class="avatar avatar-lg online me-2">
                                            <img src="/assets/img/profiles/avatar-05.jpg" class="rounded-circle" alt="user">
                                        </span>
                    <div>
                      <h6>Federico Wells</h6>
                      <span>+22-555-345-11</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                                        <span class="badge border border-primary  text-primary badge-sm me-2">
                                            <i class="ti ti-point-filled"></i>
                                            01:15:25
                                        </span>
                    <a href="javascript:void(0);" class="user-add bg-primary rounded d-flex justify-content-center align-items-center text-white" data-bs-toggle="modal" data-bs-target="#video_group">
                      <i class="ti ti-user-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body border-0 pt-0">
              <div class="video-call-view br-8 overflow-hidden position-relative">
                <img src="/assets/img/video/video-member-01.jpg" alt="user-image">
                <div class="mini-video-view active br-8 overflow-hidden position-absolute">
                  <img src="/assets/img/video/user-image.jpg" alt="">
                  <div class="bg-soft-primary mx-auto default-profile rounded-circle align-items-center justify-content-center">
                    <span class="avatar  avatar-lg rounded-circle bg-primary ">RG</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-center border-0 pt-0">
              <div class="call-controll-block d-flex align-items-center justify-content-center rounded-pill">
                <a href="javascript:void(0);" class="call-controll mute-bt d-flex align-items-center justify-content-center">
                  <i class="ti ti-microphone"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-volume"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll mute-video d-flex align-items-center justify-content-center">
                  <i class="ti ti-video"></i>
                </a>
                <a href="javascript:void(0);" data-bs-dismiss="modal" class="call-controll call-decline d-flex align-items-center justify-content-center">
                  <i class="ti ti-phone"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-mood-smile"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-maximize"></i>
                </a>
                <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                  <i class="ti ti-dots"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Video Call group -->
      <div class="modal fade" id="video_group" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header d-flex border-0 pb-0">
              <div class="card bg-transparent-dark flex-fill border mb-3">
                <div class="card-body d-flex justify-content-between p-3">
                  <div class="row justify-content-between flex-fill row-gap-3">
                    <div class="col-lg-5 col-sm-12">
                      <div class="d-flex justify-content-between align-items-center row-gap-2">
                        <h3>Weekly Report Call</h3>

                      </div>
                    </div>
                    <div class="col-lg-5 col-sm-12">
                      <div class="d-flex justify-content-start align-items-center">
                                                <span class="badge border border-primary  text-primary badge-sm me-3">
                                                    <i class="ti ti-point-filled"></i>
                                                    01:15:25
                                                </span>
                        <a href="javascript:void(0);" data-bs-toggle="modal" class="badge badge-danger badge-sm">Leave</a>
                      </div>
                    </div>
                    <div class="col-lg-2 col-sm-12">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                                                    <span class="user-add bg-primary d-flex justify-content-center align-items-center rounded-circle me-2">
                                                        6
                                                    </span>
                          <a href="" class="user-add bg-primary rounded d-flex justify-content-center align-items-center text-white">
                            <i class="ti ti-user-plus"></i>
                          </a>
                        </div>
                        <div class="row justify-content-center">
                          <div class="layout-tab d-flex justify-content-center ">
                            <div class="nav nav-pills inner-tab " id="pills-tab3" role="tablist">
                              <div class="nav-item me-0" role="presentation">
                                <a href="#" class="nav-link bg-white text-gray p-0 fs-16 me-2" id="pills-single2-tab" data-bs-toggle="pill" data-bs-target="#pills-single2" role="tab" aria-controls="pills-single2" aria-selected="false" tabindex="-1">
                                  <i class="ti ti-square"></i>
                                </a>
                              </div>
                              <div class="nav-item" role="presentation">
                                <a href="#" class="nav-link active bg-white text-gray p-0 fs-16" id="pills-group2-tab" data-bs-toggle="pill" data-bs-target="#pills-group2" role="tab" aria-controls="pills-group2" aria-selected="false" tabindex="-1">
                                  <i class="ti ti-layout-grid"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-body border-0 pt-0">
              <div class="tab-content dashboard-tab">
                <div class="tab-pane fade" id="pills-single2" role="tabpanel" aria-labelledby="pills-single2-tab">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="video-call-view br-8 overflow-hidden position-relative">
                        <img src="/assets/img/video/video-member-01.jpg" alt="user-image">
                        <div class="mini-video-view active br-8 overflow-hidden position-absolute">
                          <img src="/assets/img/video/user-image.jpg" alt="">
                          <div class="bg-soft-primary mx-auto default-profile rounded-circle align-items-center justify-content-center">
                            <span class="avatar  avatar-lg rounded-circle bg-primary ">RG</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="tab-pane fade active show" id="pills-group2" role="tabpanel" aria-labelledby="pills-group2-tab">
                  <div class="row row-gap-4">
                    <div class="col-md-6 d-flex">
                      <div class="video-call-view br-8 overflow-hidden flex-fill">
                        <img src="/assets/img/video/video-member-02.jpg" alt="user-image">
                      </div>
                    </div>
                    <div class="col-md-6 d-flex">
                      <div class="video-call-view br-8 overflow-hidden flex-fill">
                        <img src="/assets/img/video/video-member-03.jpg" alt="user-image">
                      </div>
                    </div>
                    <div class="col-md-4 d-flex">
                      <div class="video-call-view br-8 overflow-hidden flex-fill">
                        <img src="/assets/img/video/video-member-05.jpg" alt="user-image">
                      </div>
                    </div>
                    <div class="col-md-4 d-flex">
                      <div class="video-call-view br-8 overflow-hidden flex-fill">
                        <img src="/assets/img/video/video-member-04.jpg" alt="user-image">
                      </div>
                    </div>
                    <div class="col-md-4 d-flex">
                      <div class="video-call-view br-8 overflow-hidden default-mode d-flex align-items-center  flex-fill">
                        <div class="bg-soft-primary mx-auto default-profile rounded-circle d-flex align-items-center justify-content-center">
                          <span class="avatar  avatar-lg rounded-circle bg-primary ">RG</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div class="modal-footer justify-content-center border-0">
                <div class="call-controll-block d-flex align-items-center justify-content-center rounded-pill">
                  <a href="javascript:void(0);" class="call-controll mute-bt d-flex align-items-center justify-content-center">
                    <i class="ti ti-microphone"></i>
                  </a>
                  <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                    <i class="ti ti-volume"></i>
                  </a>
                  <a href="javascript:void(0);" class="call-controll mute-video d-flex align-items-center justify-content-center">
                    <i class="ti ti-video"></i>
                  </a>
                  <a href="javascript:void(0);" data-bs-dismiss="modal" class="call-controll call-decline d-flex align-items-center justify-content-center">
                    <i class="ti ti-phone"></i>
                  </a>
                  <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                    <i class="ti ti-mood-smile"></i>
                  </a>
                  <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                    <i class="ti ti-maximize"></i>
                  </a>
                  <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
                    <i class="ti ti-dots"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Video Call group -->

      <!-- Invite -->
      <div class="modal fade" id="invite">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Invite Others</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="#">
                <div class="row">
                  <div class="col-lg-12">
                    <label class="form-label">Email Address or Phone Number</label>
                    <div class="input-icon mb-3 position-relative">
                      <input type="text" value="" class="form-control">
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <label class="form-label">Invitation Message</label>
                    <textarea class="form-control mb-3"></textarea>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#new-chat">Send Invitation</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Invite -->

      <!-- Mute User -->
      <div class="modal fade" id="mute-user">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Muted User</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="index.html">
                <div class="link-item mb-3">
                  <input type="text" class="form-control border-0" placeholder="Search For Muted Users ">
                  <span class="input-group-text"><i class="ti ti-search"></i></span>
                </div>
                <h6 class="mb-3 fs-16">Muted User</h6>
                <div class="mb-3">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                                                <span class="avatar avatar-lg me-2">
                                                    <img src="/assets/img/profiles/avatar-01.jpg" class="rounded-circle" alt="">
                                                </span>
                          <div>
                            <h6>Aaryian Jose</h6>
                            <span class="fs-14">App Developer</span>
                          </div>
                        </div>
                        <a href="javascript:void(0);" class="btn btn-outline-primary">Unmute</a>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                                                <span class="avatar avatar-lg me-2">
                                                    <img src="/assets/img/profiles/avatar-02.jpg" class="rounded-circle" alt="">
                                                </span>
                          <div>
                            <h6>Sarika Jain</h6>
                            <span class="fs-14">UI/UX Designer</span>
                          </div>
                        </div>
                        <a href="javascript:void(0);" class="btn btn-outline-primary">Unmute</a>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                                                <span class="avatar avatar-lg me-2">
                                                    <img src="/assets/img/profiles/avatar-03.jpg" class="rounded-circle" alt="">
                                                </span>
                          <div>
                            <h6>Clyde Smith</h6>
                            <span class="fs-14">Web Developer</span>
                          </div>
                        </div>
                        <a href="javascript:void(0);" class="btn btn-outline-primary">Unmute</a>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                                                <span class="avatar avatar-lg me-2">
                                                    <img src="/assets/img/profiles/avatar-04.jpg" class="rounded-circle" alt="">
                                                </span>
                          <div>
                            <h6>Carla Jenkins</h6>
                            <span class="fs-14">Business Analyst</span>
                          </div>
                        </div>
                        <a href="javascript:void(0);" class="btn btn-outline-primary">Unmute</a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Mute User -->

      <!-- Delete  Account -->
      <div class="modal fade" id="delete-account">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Delete Account</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="index.html">
                <div class="block-wrap mb-3">
                  <h6 class="fs-16">Are you sure you want to delete your account? </h6>
                  <p class="text-grya-9">
                    This action is irreversible and all your data will be permanently deleted.
                  </p>
                </div>
                <div class="mb-3">
                  <ul>
                    <li class="d-flex align-items-center fs-16 mb-2">
                      <i class="ti ti-arrow-badge-right me-2 fs-20 text-primary"></i>
                      Delete your account info and profile photo
                    </li>
                    <li class="d-flex align-items-center fs-16 mb-2">
                      <i class="ti ti-arrow-badge-right me-2 fs-20 text-primary"></i>
                      Delete you from all dreamschat groups
                    </li>
                    <li class="d-flex fs-16 mb-2">
                      <i class="ti ti-arrow-badge-right me-2 fs-20 text-primary"></i>
                      Delete your message history on this phone and your icloud backup
                    </li>
                  </ul>
                </div>
                <div class="d-flex mb-3">
                  <div>
                    <input type="checkbox" class="me-2">
                  </div>
                  <div>
                    <p class="text-grya-9">
                      I understand that deleting my account is irreversible and all my data will be permanently deleted.
                    </p>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Delete</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Delete Account -->

      <!-- Logout -->
      <div class="modal fade" id="acc-logout">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Logout</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="ti ti-x"></i>
              </button>
            </div>
            <div class="modal-body">
              <form action="index.html">
                <div class="block-wrap text-center mb-3">
                                <span class="user-icon mb-3 mx-auto bg-transparent-danger">
                                    <i class="ti ti-logout text-danger"></i>
                                </span>
                  <p class="text-grya-9">Are you sure you want to logout? </p>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <a href="#" class="btn btn-outline-primary w-100" data-bs-dismiss="modal" aria-label="Close">Cancel</a>
                  </div>
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary w-100">Logout</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- /Logout -->
    </div>
    <!-- /Content -->


</template>

<script>
import DefualtChatComponent from '../components/DefualtChatComponent.vue';
import MainChatComponent from '../components/MainChatComponent.vue';
import GroupChatComponent from "../components/GroupChatComponent.vue";
import DefualtStatusComponent from "../components/DefualtStatusComponent.vue";
import MainStatusComponent from "../components/MainStatusComponent.vue";
import MainCallsComponent from "../components/MAinCallsComponent.vue";
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
  name:'ChatPage',
  components: {
    MainChatComponent,
    DefualtChatComponent,
    GroupChatComponent,
    DefualtStatusComponent,
    MainStatusComponent,
    MainCallsComponent,
  },
  data() {
    return {
      searchQuery: '',        // The user's input for searching
      Users: [],
      Groups:[],
      userinfo: {},
      userInfo: {},
      friends: [],
      selectedUser: null,
      activeUserId: null,
      activeGroupId:null,
      componentProps: {},
      currentComponent: 'DefualtChatComponent', // Default component to show
      dropdownVisible1:false,
      dropdownVisible2:false,
      dropdownVisibleAC: false,
      dropdownVisibleLG: false,
    }
  },
  mounted() {
    this.getFriends();
    this.activeUserListner();
    this.getUsers();
    this.loadUser();
    this.getGroups();
    this.updateActiveStatus(1);
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    window.addEventListener("beforeunload", () => this.updateActiveStatus(0));
    let token=localStorage.getItem('token');
    if(token){
      this.$router.push({name:"LoginPage"});
    }
    
  },
   beforeUnmount() {
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    window.removeEventListener("beforeunload", () => this.updateActiveStatus(0));
  },
  computed: {
    groupedUsers() {
      // Group users by the first character of their name
      return this.Users.reduce((acc, user) => {
        const initial = user.name[0].toUpperCase();
        if (!acc[initial]) acc[initial] = [];
        acc[initial].push(user);
        return acc;
      }, {});
    }
  },
  methods: {
 
    activeUserListner() {
    const userId = localStorage.getItem('userId');

    if (userId) {
        echo.join('presence.friends') // Global channel for all users
            .listen('UserStatusUpdated', (event) => {
                this.friends.forEach(friend => {
                    if (friend?.user?.id === Number(event.user_id)) {
                        friend.user.is_active = event.is_active; // Update status
                    }
                });
            });
    } else {
        console.error("User ID not found in localStorage.");
    }
    },
    async updateActiveStatus(status) {
      try {
        await axios.post("/user/active/status", { is_active: status });
        console.log("User status updated:", status);
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    },
    handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        this.updateActiveStatus(1); 
      } else {
        this.updateActiveStatus(0); 
      }
    },
    setPreviousComponent() {
      // Logic to switch back to the previous component
      this.currentComponent = 'PreviousComponent'; // Example
    },
    openDropdown1() {
      this.dropdownVisible1 = true;
    },
    closeDropdown1() {
      this.dropdownVisible1 = false;
    },
    openDropdown2() {
      this.dropdownVisible2 = true;
    },
    closeDropdown2() {
      this.dropdownVisible2 = false;
    },
    openDropdownAC() {
      this.dropdownVisibleAC = true;
    },
    closeDropdownAC() {
      this.dropdownVisibleAC = false;
    },

    openDropdownLG() {
      this.dropdownVisibleLG = true;
    },
    closeDropdownLG() {
      this.dropdownVisibleLG = false;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('avatar', file);

        axios.post('/update/profile/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
            .then(response => {
              this.userInfo.avatar = response.data.data.avatar; // Update the avatar URL
              localStorage.setItem('User', JSON.stringify(response.data.data));
            })
            .catch(error => {
              console.error(error.response ? error.response.data : error.message);
              alert('Failed to update profile image.');
            });
      }
    },
    updateProfile() {
      axios.post('/update/profile', this.userInfo)
          .then(response => {
            // Handle success
            console.log(response.data);
            localStorage.setItem('User', JSON.stringify(response.data.data));
            alert("Profile updated successfully!");
          })
          .catch(error => {
            // Handle error
            console.error(error.response ? error.response.data : error.message);
            alert("Error updating profile. Please try again.");
          });
    },
    addFriend(userId) {
      axios.post('/friends/add', { friend_id: userId })
          .then(response => {
            // Handle success
            console.log(response.data);
            this.selectedUser.friend = true;
          })
          .catch(error => {
            // Handle error
            console.error(error.response ? error.response.data : error.message);
            alert("Error adding friend!");
          });
    },
    selectUser(user) {
      this.selectedUser = user;
    },
    loadUser() {
      // Retrieve user object from localStorage
      return  this.userInfo = JSON.parse(localStorage.getItem('User'));
    },
    openChat(userId) {
      this.activeUserId = userId;
      this.componentProps = { userId };
      this.setActiveComponent('MainChatComponent');
    },
    openGroup(groupId){
     this.activeGroupId = groupId;
     this.componentProps={groupId};
     this.setActiveComponent('GroupChatComponent');
    },
    async searchUsers() {
      if (this.searchQuery.length > 1) { // Trigger search after 3 characters
        try {
          const response = await axios.get(`/users?search=${this.searchQuery}`);
          if (response.data.status) {
            this.Users = response.data.user; // Assuming the API returns a `users` array
            console.log('search:',response.data.user);
          } else {
            this.Users = []; // Clear results if API response indicates no users
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          this.Users = []; // Clear results on error
        }
      }else if(this.searchQuery.length > 0){
        try {
          const response = await axios.get(`/users`);
          if (response.data.status) {
            this.Users = response.data.user; // Assuming the API returns a `users` array
            console.log('search:',response.data.user);
          } else {
            this.Users = []; // Clear results if API response indicates no users
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          this.Users = []; // Clear results on error
        }
      }
      else {
        this.searchResults = []; // Clear results if search query is too short
      }
    },
    async getUsers() {
      axios.get("/users").then((response) => {
        this.Users = response.data.user;
        console.log('users:',response.data.user);
      })
    },
    async getFriends() {
      axios
          .get("/friends_with_msg")
          .then((response) => {
            this.friends = response.data.friends;
            console.log('friends',response.data.friends);
          })
          .catch((error) => {
            console.error("Error fetching friends:", error);
          });
    },
    formatMessageDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);

      // Check if the date is today
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      // Check if the date is yesterday
      else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
      } else {
        // Format as "MMMM dd, yyyy"
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');       // Day with leading zero if needed
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (0-based, so add 1)
      const year = date.getFullYear();
      return `${day}-${month}-${year}`; // "dd-mm-yyyy" format
    },
    setActiveComponent(component) {
      this.currentComponent = component;
    },
    formatTime(timestamp) {
      // Format timestamp as "HH:MM AM/PM"
      return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit'
      });
    },
    getFileUrl(avatar) {
      return avatar ? `http://127.0.0.1:8000/${avatar}` : '/assets/img/profiles/avatar-16.jpg';
    },
    async getuser() {
      const userId = localStorage.getItem('userId');
      axios
          .get(`/user/${userId}`)
          .then((response) => {
            this.userinfo = response.data.user;
          })
          .catch((error) => {
            console.error("Error fetching user info:", error);
          });
    },

   async getGroups(){
      axios.get("/user/groups").then((response) =>{
        this.Groups = response.data.data;
        console.log('groups',response.data);
      })
    },
    async userLogout(){
      axios
          .get("/logout")
          .then((response) => {
            const status=response.data.status;
            if(status==true){
              console.log('success',response.data.message);
            localStorage.removeItem('token');
            localStorage.removeItem('User'); // Example: if you store user data
            localStorage.removeItem('userId'); // Example: if you store user data
            // Redirect to login page
            this.$router.push({name:'LoginPage'}); 
            }
            if(status==false){
              console.log('error',response.data.message);
            }
          })
          .catch((error) => {
            console.error("Error in logout:", error);
          });
    },
  },
};
document.addEventListener("DOMContentLoaded", function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const lightModeToggle = document.getElementById('light-mode-toggle');

  function enableDarkMode() {
    document.body.classList.add('darkmode');
    darkModeToggle.classList.remove('active');
    lightModeToggle.classList.add('active');
    localStorage.setItem('darkMode', 'enabled');
  }

  function disableDarkMode() {
    document.body.classList.remove('darkmode');
    darkModeToggle.classList.add('active');
    lightModeToggle.classList.remove('active');
    localStorage.setItem('darkMode', 'disabled');
  }

  // Set the initial mode based on localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  // Attach event listeners for toggling dark/light mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', enableDarkMode);
  }

  if (lightModeToggle) {
    lightModeToggle.addEventListener('click', disableDarkMode);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const lightModeToggle = document.getElementById('light-mode-toggle');

  function enableDarkMode() {
    document.body.classList.add('darkmode');
    darkModeToggle.classList.remove('active');
    lightModeToggle.classList.add('active');
    localStorage.setItem('darkMode', 'enabled');
  }

  function disableDarkMode() {
    document.body.classList.remove('darkmode');
    darkModeToggle.classList.add('active');
    lightModeToggle.classList.remove('active');
    localStorage.setItem('darkMode', 'disabled');
  }

  // Set the initial mode based on localStorage (already applied above)

  // Attach event listeners for toggling dark/light mode
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', enableDarkMode);
  }

  if (lightModeToggle) {
    lightModeToggle.addEventListener('click', disableDarkMode);
  }
});
</script>
<style scoped >
/* CSS for the chat sidebar scroll */
.sidebar-group {
  width: 29%;
}
.hover-effect {
  transition: all 0.3s ease-in-out;
  background-color: transparent;
}
.hover-effect:hover {
  background-color: #f0f0f0; /* Light gray background */
  border-radius: 50%;       /* Ensure it's a circle */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow */
  cursor: pointer;          /* Change the cursor to indicate interaction */
}
.hover-effect:hover i {
  color: #007bff; /* Change icon color on hover (blue) */
}
.dropdown-menu {
  bottom: 0%;
  top: auto;
}
.dropdown-menu1 {
  bottom: 0%;
  top: auto;
}
</style>