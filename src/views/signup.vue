<template>
  <section class="signup">
    <header class="signup-navbar-backdrop"></header>

    <main class="signup-main container">
      <h2 class="signup-main-title">Create a New Account</h2>
      <p class="signup-main-subtitle">It’s quick and easy.</p>

      <pre>
            {{credentials}}
        </pre>

      <form @submit.prevent="doSignup" v-if="credentials">
        <input
          type="text"
          placeholder="Full Name"
          class="signup-main-inp form-inp"
          v-model="credentials.fullName"
        />
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Favorate genre?"
          v-model="credentials.prefs.favGnere"
          class="signup-main-inp form-inp"
        />
        <label>Favorate genre?</label>
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

        <label class="signup-main-inp-label-file">
          UserAvatar:
          <input type="file" @change="uploadImage" class="signup-main-inp-file" />
        </label>

        <button class="btn">Login</button>
      </form>
    </main>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";

export default {
  props: {},
  data() {
    return {
      credentials: null
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
    }
  },
  methods: {
    async uploadImage(ev) {
      console.log("uploading");
    //   try {
    //       const imgData = await uploadService.uploadImg(ev);
    //       this.credentials.avatar = imgData.secure_url;
    //   } catch (err) {
    //       console.log('Error uploading', err);
    //   }
    },
    doSignup() {
      console.log("signing up");
        this.setEmptyCredentials()
    },
    setEmptyCredentials(){
        this.credentials = JSON.parse(
          JSON.stringify(userService.getEmptySignupCredentials())
        );
    }
  },
  mounted() {
    this.setEmptyCredentials()
  }
};
</script> 