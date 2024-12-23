<script>
export default {
  name: 'MainCallsComponent',
}
</script>

<template>
  <!-- Chat -->
  <div class="chat chat-messages show" id="middle">
    <div>
      <div class="chat-header">
        <div class="user-details">
          <div class="d-xl-none">
            <a class="text-muted chat-close me-2" href="#">
              <i class="fas fa-arrow-left"></i>
            </a>
          </div>
          <div class="avatar avatar-lg online">
            <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
          </div>
          <div class="ms-2">
            <h6>Edward Lietz</h6>
            <span class="last-seen">Online</span>
          </div>
        </div>
        <div class="chat-options">
          <ul>
            <li>
              <a href="javascript:void(0);" class="btn chat-search-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Search">
                <i class="ti ti-search"></i>
              </a>
            </li>
            <li data-bs-toggle="tooltip" data-bs-placement="bottom" title="Video Call">
              <a href="javascript:void(0);" class="btn" data-bs-toggle="modal" data-bs-target="#video-call">
                <i class="ti ti-video"></i>
              </a>
            </li>
            <li data-bs-toggle="tooltip" data-bs-placement="bottom" title="Voice Call">
              <a href="javascript:void(0);" class="btn" data-bs-toggle="modal" data-bs-target="#voice_call">
                <i class="ti ti-phone"></i>
              </a>
            </li>
            <li>
              <a class="btn no-bg" href="#" data-bs-toggle="dropdown">
                <i class="ti ti-dots-vertical"></i>
              </a>
              <ul class="dropdown-menu dropdown-menu-end p-3">
                <li><a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#mute-notification"><i class="ti ti-copy me-2"></i>Copy Number</a></li>
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
      <div class="chat-body chat-page-group slimscroll">
        <div class="messages">
          <div class="chats">
            <div class="chat-avatar">
              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
            </div>
            <div class="chat-content">
              <div class="chat-profile-name">
                <h6>Edward Lietz<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"></span></h6>
              </div>
              <div class="chat-info">
                <div class="message-content">
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
                  </div>
                </div>
                <div class="chat-actions">
                  <a class="#" href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Reply</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="chats chats-right">
            <div class="chat-content">
              <div class="chat-profile-name text-end">
                <h6>You<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"></span></h6>
              </div>
              <div class="chat-info">
                <div class="chat-actions">
                  <a class="#" href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Reply</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                  </ul>
                </div>
                <div class="message-content">
                  <div class="file-attach">
                                                <span class="file-icon bg-success text-white">
                                                    <i class="ti ti-phone-incoming"></i>
                                                </span>
                    <div class="ms-2 overflow-hidden">
                      <h6 class="mb-1">Audio Call Ended</h6>
                      <p>07 Min 34 Sec</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-avatar">
              <img src="/assets/img/profiles/avatar-17.jpg" class="rounded-circle dreams_chat" alt="image">
            </div>
          </div>
          <div class="chats">
            <div class="chat-avatar">
              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
            </div>
            <div class="chat-content">
              <div class="chat-profile-name">
                <h6>Edward Lietz<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"></span></h6>
              </div>
              <div class="chat-info">
                <div class="message-content">
                  <div class="file-attach">
                    <div class="d-flex align-items-center">
                                                    <span class="file-icon bg-danger text-white">
                                                        <i class="ti ti-video"></i>
                                                    </span>
                      <div class="ms-2 overflow-hidden">
                        <h6 class="mb-1 text-truncate">Missed Video Call</h6>
                        <p>10 Min 23 Sec</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chat-actions">
                  <a class="#" href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Reply</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="chats chats-right">
            <div class="chat-content">
              <div class="chat-profile-name text-end">
                <h6>You<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"></span></h6>
              </div>
              <div class="chat-info">
                <div class="chat-actions">
                  <a class="#" href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Reply</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                  </ul>
                </div>
                <div class="message-content">
                  <div class="file-attach">
                                                <span class="file-icon bg-success text-white">
                                                    <i class="ti ti-video"></i>
                                                </span>
                    <div class="ms-2 overflow-hidden">
                      <h6 class="mb-1">Video Call Ended</h6>
                      <p>07 Min 34 Sec</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-avatar">
              <img src="/assets/img/profiles/avatar-17.jpg" class="rounded-circle dreams_chat" alt="image">
            </div>
          </div>
          <div class="chats">
            <div class="chat-avatar">
              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
            </div>
            <div class="chat-content">
              <div class="chat-profile-name">
                <h6>Edward Lietz<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"></span></h6>
              </div>
              <div class="chat-info">
                <div class="message-content">
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
                  </div>
                </div>
                <div class="chat-actions">
                  <a class="#" href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Reply</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="chats chats-right">
            <div class="chat-content">
              <div class="chat-profile-name text-end">
                <h6>You<i class="ti ti-circle-filled fs-7 mx-2"></i><span class="chat-time">02:39 PM</span><span class="msg-read success"></span></h6>
              </div>
              <div class="chat-info">
                <div class="chat-actions">
                  <a class="#" href="#" data-bs-toggle="dropdown">
                    <i class="ti ti-dots-vertical"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end p-3">
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Reply</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Forward</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-file-export me-2"></i>Copy</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-heart me-2"></i>Mark as Favourite</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-trash me-2"></i>Delete</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-check me-2"></i>Mark as Unread</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-box-align-right me-2"></i>Archeive Chat</a></li>
                    <li><a class="dropdown-item" href="#"><i class="ti ti-pinned me-2"></i>Pin Chat</a></li>
                  </ul>
                </div>
                <div class="message-content">
                  <div class="file-attach">
                                                <span class="file-icon bg-success text-white">
                                                    <i class="ti ti-video"></i>
                                                </span>
                    <div class="ms-2 overflow-hidden">
                      <h6 class="mb-1">Video Call Ended</h6>
                      <p>07 Min 34 Sec</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat-avatar">
              <img src="/assets/img/profiles/avatar-17.jpg" class="rounded-circle dreams_chat" alt="image">
            </div>
          </div>
          <div class="chats incoming d-flex">
            <div class="chat-content flex-fill">
              <div class="chat-info">
                <div class="message-content">
                  <div class="file-attach">
                    <div class="d-flex align-items-center">
                                                    <span class="incoming-phone file-icon bg-success text-white">
                                                        <i class="ti ti-phone-call"></i>
                                                    </span>
                      <div class="ms-2 overflow-hidden me-2">
                        <h6 class="mb-1 text-truncate">Incoming Call</h6>
                        <span class="text-gray-5 fs-16">Not answer yet</span>

                      </div>
                      <div class="overlay">
                        <a href="#" onclick="if (!window.__cfRLUnblockHandlers) return false; openCallDetails()" class="badge badge-success me-2" data-cf-modified-50ecaf58dcc2d1d12faa28f0-="">
                          Accept
                        </a>
                        <a href="#" class="badge badge-danger">
                          Reject
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chats incoming d-flex">
            <div class="chat-content flex-fill">
              <div class="chat-info">
                <div class="message-content">
                  <div class="file-attach">
                    <div class="d-flex align-items-center">
                                                    <span class=" file-icon bg-success text-white">
                                                        <i class="ti ti-access-point"></i>
                                                    </span>
                      <div class="ms-2 overflow-hidden me-2">
                        <h6 class="mb-1 text-truncate">Call In Progress</h6>
                        <span class="text-gray-5 fs-16">You answered</span>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chats incoming d-flex">
            <div class="chat-content flex-fill">
              <div class="chat-info">
                <div class="message-content">
                  <div class="file-attach">
                    <div class="d-flex align-items-center">
                                                    <span class=" file-icon bg-white">
                                                        <i class="ti ti-phone-call"></i>
                                                    </span>
                      <div class="ms-2 overflow-hidden me-2">
                        <h6 class="mb-1 text-truncate">Call Completed</h6>
                        <span class="text-gray-5 fs-16">10 Min 23 Sec</span>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="chats incoming d-flex">
            <div class="chat-content flex-fill">
              <div class="chat-info">
                <div class="message-content">
                  <div class="file-attach">
                    <div class="d-flex align-items-center">
                                                    <span class=" file-icon bg-danger text-white">
                                                        <i class="ti ti-phone-off"></i>
                                                    </span>
                      <div class="ms-2 overflow-hidden me-2">
                        <h6 class="mb-1 text-truncate">Call Rejected</h6>
                        <span class="text-gray-5 fs-16">You rejected</span>

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
    <div class="chat-footer position-relative">
      <form class="footer-form">
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
          <div class="form-item position-relative d-flex align-items-center justify-content-center ">
            <a href="#" class="action-circle file-action position-absolute">
              <i class="ti ti-folder"></i>
            </a>
            <input type="file" class="open-file position-relative" name="files" id="files">
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
            <button class="btn btn-primary" type="submit">
              <i class="ti ti-send"></i>
            </button>
          </div>
        </div>
      </form>
      <div class="card call-details-popup position-absolute">
        <div class="card-header">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <h4 class="me-2">Call Details</h4>
              <span class="badge border border-primary  text-primary badge-sm me-2">
                                        <i class="ti ti-point-filled"></i>
                                        10:23
                                    </span>
            </div>
            <a href="javascript:void(0);" class="float-end user-add bg-primary rounded d-flex justify-content-center align-items-center text-white" data-bs-toggle="modal" data-bs-target="#video_group">
              <i class="ti ti-user-plus"></i>
            </a>
          </div>
        </div>
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <div class="avatar avatar-lg me-2">
              <img src="/assets/img/profiles/avatar-17.jpg" class="rounded-circle" alt="image">
            </div>
            <div class="chat-user-info">
              <div class="chat-user-msg">
                <h6>Steve Merrell (you)</h6>
              </div>

            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class="avatar avatar-lg me-2">
              <img src="/assets/img/profiles/avatar-06.jpg" class="rounded-circle" alt="image">
            </div>
            <div class="chat-user-info">
              <div class="chat-user-msg">
                <h6>Edward Lietz</h6>
              </div>

            </div>
          </div>
        </div>
        <div class="card-footer border-0 pt-0">
          <div class="call-controll-block d-flex align-items-center justify-content-center">
            <a href="javascript:void(0);" class="call-controll mute-bt d-flex align-items-center justify-content-center">
              <i class="ti ti-microphone"></i>
            </a>
            <a href="javascript:void(0);" class="call-controll d-flex align-items-center justify-content-center">
              <i class="ti ti-volume"></i>
            </a>
            <a href="javascript:void(0);" onclick="if (!window.__cfRLUnblockHandlers) return false; closeCallDetails()" class="call-controll call-decline d-flex align-items-center justify-content-center" data-cf-modified-50ecaf58dcc2d1d12faa28f0-="">
              <i class="ti ti-phone"></i>
            </a>
            <a href="javascript:void(0);" onclick="if (!window.__cfRLUnblockHandlers) return false; closeCallDetails()" data-bs-toggle="modal" data-bs-target="#voice_attend" class="call-controll d-flex align-items-center justify-content-center" data-cf-modified-50ecaf58dcc2d1d12faa28f0-="">
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
  <!-- /Chat -->
</template>

<style scoped>

</style>