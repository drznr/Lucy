<template>
  <nav class="main-nav" :class="{colored: isColored}">
    <div class="nav-container container">
      <router-link to="/" class="main-logo">Lucy</router-link>
      <input type="checkbox" id="mobileNav" v-show="false" />
      <label for="mobileNav" class="main-nav-mobile-btn">
        <span>|</span>
      </label>
      <ul class="main-nav-nav">
        <li>
          <router-link to="/" class="main-nav-nav-link">Home</router-link>
        </li>
        <li>
          <router-link to="/signup" class="main-nav-nav-link">Signup</router-link>
        </li>
        <li>
          <button class="main-nav-nav-link btn-link" @click="openLogin">Login</button>
        </li>
        <li>
          <router-link to="/station" class="main-nav-nav-link">Stations</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { eventBusService } from '@/services/event-bus.service';

export default {
  data() {
    return {
      isColored: false
    };
  },
  methods: {
    animateNavbar(ev) {
      this.isColored = (window.scrollY > 60);
    },
    openLogin() {
      eventBusService.$emit('open-login');
    }
  },
  created() {
    window.addEventListener("scroll", this.animateNavbar);
  },
  destroyed() {
    window.removeEventListener("scroll", this.animateNavbar);
  }
};
</script>