<template>
  <section class="signup">
    <header class="signup-navbar-backdrop"></header>

    <transition name="fade">
      <main class="signup-main container">
        <h2 class="signup-main-title">Create a New Account</h2>
        <p class="signup-main-subtitle">It’s quick and easy.</p>

        <form @submit.prevent="doLogin">
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
      // isActive: false,
      credentials: userService.getEmptyCredentials()
    };
  },
  methods: {
    doLogin() {
      // debugger
    },
    closeLogin() {
      // this.isActive = false;
      // this.credentials = userService.getEmptyCredentials();
    }
  },
  created() {
    //     eventBusService.$on('open-login', () => {
    //         this.isActive = true;
    //     });
  }
};
</script> 