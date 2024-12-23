<template>
  <div class="login-page">
    <!-- Insert HTML from the theme's login page here -->
    <div class="container-fuild">
      <div class=" w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap login-bg1 ">
              <div class="col-md-9 mx-auto p-4">
                <form @submit.prevent="login">
                  <div>
                    <div class=" mx-auto mb-5 text-center">
                      <img src="/assets/img/full-logo.svg" class="img-fluid" alt="Logo">
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <div class=" mb-4">
                          <h2 class="mb-2">Welcome!</h2>
                          <p class="mb-0 fs-16">Sign in to see what you’ve missed.</p>
                        </div>
                        <div class="mb-3 ">
                          <label class="form-label">User Name</label>
                          <div class="input-icon mb-3 position-relative">
                            <input type="email" v-model="email" class="form-control">
                            <span class="input-icon-addon">
															<i class="ti ti-user"></i>
														</span>
                          </div>
                          <label class="form-label">Password</label>
                          <div class="input-icon ">
                            <input type="password" v-model="password" class="pass-input form-control">
                            <span class="ti toggle-password ti-eye-off"></span>
                          </div>
                        </div>
                        <div class="form-wrap form-wrap-checkbox mb-3">
                          <div class="d-flex align-items-center">
                            <div class="form-check form-check-md mb-0">
                              <input class="form-check-input mt-0" type="checkbox">
                            </div>
                            <p class=" mb-0 ">Remember Me</p>
                          </div>
                          <div class="text-end ">
                            <a href="#" class="link-primary">Forgot
                              Password?</a>
                          </div>
                        </div>
                        <div class="mb-4">
                          <button type="submit" class="btn btn-primary w-100 justify-content-center">Sign In</button>
                        </div>
                        <div class="login-or mb-3">
                          <span class="span-or">Or sign in with </span>
                        </div>
                        <div class="d-flex align-items-center justify-content-center flex-wrap">
                          <div class="text-center me-2 flex-fill">
                            <a href="javascript:void(0);" class="fs-16 btn btn-white btn-shadow d-flex align-items-center justify-content-center">
                              <img class="img-fluid me-3" src="/assets/img/icons/google.svg" alt="Facebook">
                              Google
                            </a>
                          </div>
                          <div class="text-center flex-fill">
                            <a href="javascript:void(0);" class="fs-16 btn btn-white btn-shadow d-flex align-items-center justify-content-center">
                              <img class="img-fluid me-3" src="/assets/img/icons/facebook.svg" alt="Facebook">
                              Facebook
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5 text-center">
                      <p class="mb-0 text-gray-9">Don’t have a account? <a href="/register" class="link-primary">Sign Up</a></p>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
          <div class="col-lg-6 p-0">
            <div class="d-lg-flex align-items-center justify-content-center position-relative d-lg-block d-none flex-wrap vh-100 overflowy-auto login-bg2 ">
              <div class="floating-bg">
                <img src="/assets/img/bg/circle-1.png" alt="Img">
                <img src="/assets/img/bg/circle-2.png" alt="Img">
                <img src="/assets/img/bg/emoji-01.svg" alt="Img">
                <img src="/assets/img/bg/emoji-02.svg" alt="Img">
                <img src="/assets/img/bg/emoji-03.svg" alt="Img">
                <img src="/assets/img/bg/emoji-04.svg" alt="Img">
                <img src="/assets/img/bg/right-arrow-01.svg" alt="Img">
                <img src="/assets/img/bg/right-arrow-02.svg" alt="Img">

              </div>
              <div class="floating-avatar ">
                                <span class="avatar avatar-xl avatar-rounded border border-white">
									<img src="/assets/img/profiles/avatar-12.jpg" alt="img">
								</span>
                <span class="avatar avatar-xl avatar-rounded border border-white">
									<img src="/assets/img/profiles/avatar-03.jpg" alt="img">
								</span>
                <span class="avatar avatar-xl avatar-rounded border border-white">
									<img src="/assets/img/profiles/avatar-02.jpg" alt="img">
								</span>
                <span class="avatar avatar-xl avatar-rounded border border-white">
									<img src="/assets/img/profiles/avatar-05.jpg" alt="img">
								</span>
              </div>
              <div class="text-center">
                <img src="/assets/img/bg/login-bg-1.svg" class="login-img" alt="Img">
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios.js";
import { inject } from 'vue';
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      axios.post('/login', {
        email: this.email,
        password: this.password
      })
          .then(response => {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('userId', response.data.data.id);
            localStorage.setItem('User', JSON.stringify(response.data.data));
            alert(response.data.message || 'Login successful!');

            this.$router.push('/chat');
          })
          .catch(error => {
            alert(error.response?.data?.message || 'Login failed. Please try again.');
            console.error('Login failed', error);
          });
    }
  }

};
</script>
