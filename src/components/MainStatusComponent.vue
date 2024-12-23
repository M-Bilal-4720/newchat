<script>
export default {
  name: "MainStatusComponent",
}
</script>

<template>
  <!-- Chat -->
  <div class="chat chat-messages show status-msg justify-content-center">
    <div class="user-status-group">
      <div class="d-xl-none">
        <a class="text-muted chat-close mb-3 d-block" href="#">
          <i class="fas fa-arrow-left me-2"></i>Back
        </a>
      </div>
      <!-- Status-->
      <div class="user-stories-box ">
        <div class="inner-popup">
          <div id="carouselIndicators" class="carousel slide slider" data-bs-ride="carousel">
            <div class="chat status-chat-footer show-chatbar">
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
                        <a href="#" class="dropdown-item"><i class="ti ti-file-text me-2"></i>Document</a>
                        <a href="#" class="dropdown-item"><i class="ti ti-camera-selfie me-2"></i>Camera</a>
                        <a href="#" class="dropdown-item"><i class="ti ti-photo-up me-2"></i>Gallery</a>
                        <a href="#" class="dropdown-item"><i class="ti ti-music me-2"></i>Audio</a>
                        <a href="#" class="dropdown-item"><i class="ti ti-map-pin-share me-2"></i>Location</a>
                        <a href="#" class="dropdown-item"><i class="ti ti-user-check me-2"></i>Contact</a>
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
            <div class="status-user-blk">
              <div class="user-details">
                <div class="avatar avatar-lg me-2">
                  <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="image">
                </div>
                <div class="user-online">
                  <h5>Michael</h5>
                  <span>Today at 7:15 AM</span>
                </div>
              </div>
              <div class="status-voice-group ">
                <a href="javascript:;" class="status-pause me-4"><i class="ti ti-player-pause"></i></a>
                <a href="javascript:;" class="text-white me-2 fs-24"><i class="ti ti-volume"></i></a>
                <a href="javascript:;" class="text-white fs-24"><i class="ti ti-maximize"></i></a>

              </div>
            </div>
            <ol class="carousel-indicators">
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="1"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="2"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="3"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="4"></li>
            </ol>
            <div class="carousel-inner status_slider" role="listbox">

              <div id="target" class="carousel-item active">
                <img src="/assets/img/status/status-01.jpg" alt="Image">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-02.jpg" alt="Image">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-03.jpg" alt="Image">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-04.jpg" alt="Image">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-05.jpg" alt="Image">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Status -->
    </div>

  </div>
  <!-- /Chat -->
</template>

<style scoped>

</style>