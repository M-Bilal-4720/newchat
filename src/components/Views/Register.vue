<template>
  <div class="register-page">

    <!-- Insert HTML from the theme's register page here -->
    <div class="container-fuild">
      <div class=" w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap login-bg1 ">
              <div class="col-md-9 mx-auto p-4">
                <form @submit.prevent="register">
                  <div>
                    <div class=" mx-auto mb-5 text-center">
                      <img src="/assets/img/full-logo.svg" class="img-fluid" alt="Logo">
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <div class=" mb-4">
                          <h2 class="mb-2">Register</h2>
                          <p class="mb-0 fs-16">Sign up to share moments with friends!</p>
                        </div>
                        <div class="row">
                          <div class=" col-md-12">
                            <div class="mb-3 ">
                              <label class="form-label">Full Name</label>
                              <div class="input-icon mb-3 position-relative">
                                <input type="text" v-model="name" class="form-control">
                                <span class="input-icon-addon"><i class="ti ti-user"></i></span>
                              </div>

                            </div>
                          </div>

                          <div class="col-md-12">
                            <div class="mb-3">
                              <label class="form-label">Email</label>
                              <div class="input-icon mb-3 position-relative">
                                <input type="email" v-model="email" class="form-control">
                                <span class="input-icon-addon">
                                                                    <i class="ti ti-mail"></i>
                                                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="mb-3">
                              <label class="form-label">Phone Number</label>
                              <div class="input-icon mb-3 position-relative">
                                <input type="tel" v-model="phone" class="form-control">
                                <span class="input-icon-addon"><i class="ti ti-phone"></i></span>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <div class="mb-3">
                              <label class="form-label">Profile Image</label>
                              <div class="input-icon mb-3 position-relative">
                                <input type="file" @change="handleFileChange" class="form-control">
                                <span class="input-icon-addon"><i class="ti ti-user"></i></span>
                              </div>
                            </div>
                          </div>
                          <div class=" col-md-12">
                            <div class="mb-3">
                              <label class="form-label">Password</label>
                              <div class="input-icon ">
                                <input type="password" v-model="password" class="pass-input form-control">
                                <span class="ti toggle-password ti-eye-off"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-wrap form-wrap-checkbox mb-3">
                          <div class="d-flex align-items-center">
                            <div class="form-check form-check-md mb-0">
                              <input class="form-check-input mt-0" type="checkbox">
                            </div>
                            <p class=" mb-0 ">I agree to
                              <a href="terms-of-use.html" class="link-primary">Terms of use </a>&
                              <a href="privacy-policy.html" class="link-primary">Privacy policy </a>

                            </p>
                          </div>

                        </div>
                        <div class="mb-4">
                          <button type="submit" class="btn btn-primary w-100 justify-content-center">Sign Up</button>
                        </div>
                        <div class="login-or mb-3">
                          <span class="span-or">Or sign up with </span>
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
                      <p class="mb-0 text-gray-9">Already have a account? <a href="/login" class="link-primary">Sign In</a></p>
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
import axios from '../axios';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      image:null,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]; // Get the first selected file
      if (file) {
        this.image = file; // Store the file in the data property
        console.log('Selected file:', this.image);
      }
    },
    register() {
      const formData = new FormData(); // Create a FormData instance
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('phone', this.phone);
      formData.append('image', this.image); // Append the file
      formData.append('password', this.password);

      axios
          .post('/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Specify the content type
            },
          })
          .then(response => {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('userId', response.data.data.id);
            localStorage.setItem('User', JSON.stringify(response.data.data));
            alert(response.data.message || 'Register successful!');

            this.$router.push('/chat');
          })
          .catch(error => {
            alert(error.response?.data?.message || 'Registration failed. Please try again.');
            console.error('Login failed', error);
          });
    }
  }
};
</script>
