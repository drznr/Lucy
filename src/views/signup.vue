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
            id="inpUsername"
          />
          <label for="inpUsername">Username</label>
          <input
            type="password"
            placeholder="Password"
            class="signup-main-inp form-inp"
            v-model="credentials.password"
            id="inpPassword"
          />
          <label for="inpPassword">Password</label>
        </section>
        <input
          type="text"
          placeholder="Full Name"
          class="signup-main-inp form-inp"
          v-model="credentials.fullName"
          id="inpFullName"
        />
        <label for="inpFullName">Full Name</label>
        <input
          type="text"
          placeholder="Favorate genre?"
          v-model="credentials.prefs.favGenre"
          class="signup-main-inp form-inp"
          id="inpGenre"
        />
        <label for="inpGenre">Favorate genre?</label>

        <label class="signup-main-inp-label-file" v-if="!$store.getters.inProgress">
          UserAvatar:
          <upload-img
            class="signup-main-inp-label-file-upload-icon"
            :class="{'uploaded': this.credentials.avatar}"
          ></upload-img>
          <input type="file" @change="uploadImage" class="signup-main-inp-file" hidden />
        </label>
        <loader-small class="signup-main-loader" v-else></loader-small>
        <p
          class="signup-main-msg"
          :class="{active: msgActive}"
        >Username, Password and full name are required.</p>
        <button class="btn" :disabled="$store.getters.inProgress">Sign Up</button>
      </form>
    </main>
    <main-footer></main-footer>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";
import { uploadService } from "@/services/upload.service.js";
import mainFooter from "@/cmps/main-footer.cmp";
import loaderSmall from "@/cmps/icons/loader-small.cmp";
import uploadImg from "@/cmps/icons/upload-img.cmp";

export default {
  props: {},
  data() {
    return {
      credentials: null,
      msgActive: false
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
      this.credentials.avatar = imgData.secure_url;
      this.$store.commit({ type: "setInProgress", inProgress: false });
    },
    async doSignup() {
      if (
        !this.credentials.username ||
        !this.credentials.password ||
        !this.credentials.fullName
      )
        return (this.msgActive = true);
      this.$store.dispatch({
        type: "signup",
        credentials: JSON.parse(JSON.stringify(this.credentials))
      });
      this.setEmptyCredentials();
      this.$router.push('/station')
    },
    setEmptyCredentials() {
      this.msgActive = false;
      this.credentials = userService.getEmptySignupCredentials();
    }
  },
  mounted() {
    this.setEmptyCredentials();
  },
  components: {
    mainFooter,
    loaderSmall,
    uploadImg
  }
};
</script> 