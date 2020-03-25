<template>
  <section class="signup">
    <header class="signup-navbar-backdrop"></header>

    <main class="signup-main container">
      <h2 class="signup-main-title">
        Create a New Account
        <span class="signup-main-subtitle">It’s quick and easy.</span>
      </h2>

      <form @submit.prevent="doSignup" v-if="credentials">
        <section class="signup-main-userpass-inp-wrap">
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
        </section>
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
          v-model="credentials.prefs.favGenre"
          class="signup-main-inp form-inp"
        />
        <label>Favorate genre?</label>

        <label class="signup-main-inp-label-file"> 
          UserAvatar:
          <input type="file" @change="uploadImage" class="signup-main-inp-file" />
        </label>

        <button class="btn">Login</button>
      </form>
    </main>
    <main-footer></main-footer>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";
import mainFooter from '@/cmps/main-footer.cmp';

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
      this.$store.commit({ type: "setInProgress", inProgress: true });
      const imgData = await uploadService.uploadImg(ev);
      this.currStation.imgUrl = imgData.secure_url;
      this.$store.commit({ type: "setInProgress", inProgress: false });
    },
    doSignup() {
      console.log(this.credentials);
      this.setEmptyCredentials();
    },
    setEmptyCredentials(){
        this.credentials = userService.getEmptySignupCredentials();
    }
  },
  mounted() {
    this.setEmptyCredentials()
  },
  components: {
    mainFooter
  }
};
</script> 