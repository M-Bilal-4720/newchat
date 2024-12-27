<script>

import { Carousel } from 'bootstrap';

export default {
  name: "MainStatusComponent",
  mounted() {
    const carousel = document.querySelector('#carouselIndicators');
    if (carousel) {
      new Carousel(carousel);
    }
  },
  methods: {
  nextSlide() {
    const carousel = document.querySelector('#carouselIndicators');
    if (carousel) {
      const carouselInstance = Carousel.getInstance(carousel);
      carouselInstance.next(); // Next slide
    }
  },
},
}
</script>

<template>
  <!-- Chat -->
  <div class="chat chat-messages show status-msg justify-content-center">
    <div class="user-status-group">
      <!-- Back Button for Smaller Screens -->
      <div class="d-xl-none">
        <a class="text-muted chat-close mb-3 d-block" href="#">
          <i class="fas fa-arrow-left me-2"></i>Back
        </a>
      </div>
      
      <!-- Status Section -->
      <div class="user-stories-box">
        <div class="inner-popup">
          <!-- Carousel for Status Images -->
          <div id="carouselIndicators" class="carousel slide slider" data-bs-ride="carousel">
            <ol class="carousel-indicators">
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="1"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="2"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="3"></li>
              <li data-bs-target="#carouselIndicators" data-bs-slide-to="4"></li>
            </ol>
            <div class="carousel-inner status_slider">
              <div class="carousel-item active">
                <img src="/assets/img/status/status-01.jpg" alt="Image" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-02.jpg" alt="Image" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-03.jpg" alt="Image" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-04.jpg" alt="Image" class="d-block w-100">
              </div>
              <div class="carousel-item">
                <img src="/assets/img/status/status-05.jpg" alt="Image" class="d-block w-100">
              </div>
            </div>
              <!-- User Details and Status Actions -->
          <div class="status-user-blk">
            <div class="user-details">
              <div class="avatar avatar-lg me-2">
                <img src="/assets/img/profiles/avatar-10.jpg" class="rounded-circle" alt="Profile Image">
              </div>
              <div class="user-online">
                <h5>Michael</h5>
                <span>Today at 7:15 AM</span>
              </div>
            </div>
            <div class="status-voice-group">
              <button class="status-pause btn"><i class="ti ti-player-pause"></i></button>
              <button class="btn text-white me-2 fs-24"><i class="ti ti-volume"></i></button>
              <button class="btn text-white fs-24"><i class="ti ti-maximize"></i></button>
            </div>
          </div>

          <!-- Chat Footer -->
          <div class="chat-footer">
            <div class="footer-form">
              <div class="chat-footer-wrap">
                <button class="action-circle btn"><i class="ti ti-microphone"></i></button>
                <input type="text" class="form-control" placeholder="Type Your Message">
                <button class="action-circle btn emoj-action-foot">
                  <i class="ti ti-mood-smile"></i>
                </button>
                <button class="btn btn-primary"><i class="ti ti-send"></i></button>
              </div>
            </div>
          </div>
          </div>

        
        </div>
      </div>
    </div>
  </div>

  
  <!-- /Chat -->
</template>

<style scoped>
/* Add your scoped styles here */
.carousel-item img {
  height: auto;
  max-height: 600px;
  object-fit: cover;
}
.status-user-blk {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  color: white;
  z-index: 9;
  left: 40px;
  right: 40px;
  top: 60px;
  background: transparent;
}
.chat-footer-wrap {
  display: flex;
  align-items: center;
  padding: 0;
  justify-content: space-between;
}
.chat-footer {
  padding: 0;
}
.footer-form {
  padding: 0;
}
.action-circle {
  background-color: transparent;
  border: none;
  color: #007bff;
  font-size: 20px;
}


</style>