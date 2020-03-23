<template>
  <section class="signup">
    <header class="signup-navbar-backdrop"></header>

    <transition name="fade">
      <main class="signup-main container">
        <h2 class="signup-main-title">Create a New Account</h2>
        <p class="signup-main-subtitle">It’s quick and easy.</p>

        <form @submit.prevent="doSignup">
          <input
            type="text"
            placeholder="Full Name"
            class="signup-main-inp form-inp"
            v-model="credentials.fullName"
          />
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Username"
            class="signup-main-inp form-inp"
            v-model="credentials.username"
          />
          <label>Username</label>
          <input
            type="password"
            placeholder="Password"
            class="signup-main-inp form-inp"
            v-model="credentials.password"
          />
          <label>Password</label>

          <input
            type="text"
            placeholder="Whats your favorate genre?"
            v-model="credentials.prefs.favGnere"
            class="signup-main-inp form-inp"
          />
          <label>Favorate genre?</label>
          <label>
            UserAvatar:
            <input type="file" @change="uploadImage" class="signup-main-inp-file" />
          </label>

          <button class="btn">Login</button>
        </form>
      </main>
    </transition>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";

export default {
  props: {},
  data() {
    return {
      credentials: userService.getEmptySignupCredentials()
    };
  },
  computed: {
    labels: {
      get() {
        return this.credentials.labels.join(" ");
      },
      set(val) {
        this.credentials.labels = val.split(" ");
      }
    },
    methods: {
      async uploadImage(ev) {
        console.log("uploading");
        // const imgData = await uploadService.uploadImg(ev);
        // this.credentials.avatar = imgData.secure_url;
      },
      doSignup() {
        console.log("signing up");
      }
    }
  }
};
</script> 