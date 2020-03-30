<template>
  <nav class="main-nav" :class="{colored: isColored}">
    <div class="nav-container container">
      <router-link to="/" class="main-logo">
        <span>wave</span>
        <span class="main-logo-o">O</span>n
      </router-link>
      <input type="checkbox" id="mobileNav" ref="navToggle" v-show="false" />
      <label for="mobileNav" class="main-nav-mobile-btn">
        <span>|</span>
      </label>
      <ul class="main-nav-nav">
        <li>
          <router-link to="/" class="main-nav-nav-link">Home</router-link>
        </li>
        <li>
          <router-link to="/station" class="main-nav-nav-link">Stations</router-link>
        </li>
        <li>
          <router-link to="/station/new" class="main-nav-nav-link btn-link">Create</router-link>
        </li>
        <li>
          <button class="main-nav-nav-link btn-link" v-if="!loggedUser" @click="openLogin">Login</button>
          <button class="main-nav-nav-link btn-link" v-else @click="doLogout">Logout</button>
        </li>
        <li>
          <router-link to="/signup" class="main-nav-nav-link" v-if="!loggedUser">Signup</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";

export default {
  data() {
    return {
      isColored: true
    };
  },
  computed: {
    loggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  watch: {
    "$route.params"() {
      if (this.$refs.navToggle.checked) this.$refs.navToggle.checked = false;
      this.isColored = !(
        this.$route.name === "home" || this.$route.name === "station-app"
      );
    }
  },
  methods: {
    animateNavbar(ev) {
      if (this.$route.name === 'home' || this.$route.name === 'station-app') {
        this.isColored = (window.scrollY > 60); 
      }
    },
    openLogin() {
      eventBusService.$emit("open-login");
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    }
  },
  created() {
    window.addEventListener("scroll", this.animateNavbar);
    this.isColored = !(
      this.$route.name === "home" || this.$route.name === "station-app"
    );
  },
  destroyed() {
    window.removeEventListener("scroll", this.animateNavbar);
  }
};
</script>