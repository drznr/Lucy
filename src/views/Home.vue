<template>
  <section class="home">
    <header class="home-header">
      <div class="home-header-heading">
        <h1 v-if="loggedUser">welcome {{loggedUser.username}}</h1>
        <h1 v-else>Lets listen together</h1>
        <span>Discover our live jukeboxes & playlist's and share your own</span>
        <router-link to="/station" class="home-header-heading-link">Get started</router-link>
      </div>
      <scroll-down-arrow @click.native="scrollDown"></scroll-down-arrow>
    </header>
    <main ref="homeContent">
      <h2 class="home-slider-title">Top rated Stations</h2>
      <station-slider class="home-slider" v-if="stationsForDisplay.length" :stations="stationsForDisplay"></station-slider>
      <genre-cubes v-if="stations.length" :stations="stations" class="home-genres"></genre-cubes>
      <article class="home-teaser">
        <div class="home-teaser-figures"> 
          <figure></figure>
          <figure></figure>
        </div>
        <div class="home-teaser-info">
          <h2>Never stop listening</h2>
          <p>WaveOn let's you hear music as a playlist or jukebox and share your own playlists with the world.</p>
        </div>
        <div class="home-teaser-teaser">
          <figure></figure>
          <div class="home-teaser-teaser-txt">
            <h2>Calling all creators</h2>
            
            <p>Make your very own station to share your sounds, and grow your audience. What are you waiting for?</p>
            <router-link to="/station/new" class="home-teaser-teaser-txt-btn">Share your own</router-link>
          </div>
          <img src="@/assets/imgs/chapman.jpg" class="home-teaser-teaser-img" />
        </div>
      </article>
    </main>
    <main-footer></main-footer>
  </section>
</template>

<script>
import stationSlider from "@/cmps/station-slider.cmp";
import mainFooter from "@/cmps/main-footer.cmp";
import scrollDownArrow from "@/cmps/icons/scroll-down-arrow.cmp";
import genreCubes from "@/cmps/genre-cubes.cmp";
import { utilService } from "@/services/util.service";

export default {
  computed: {
    stationsForDisplay() {
      return (this.$store.getters.stations) ? 
        JSON.parse(JSON.stringify(this.$store.getters.stations)).sort(utilService.dynamicSort("rate")) : [];
    },
    stations() {
      return this.$store.getters.stations;
    },
    loggedUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    scrollDown() {
      window.scrollTo(this.$refs.homeContent, (this.$refs.homeContent.offsetTop - 100));
    }
  },
  components: {
    scrollDownArrow,
    stationSlider,
    mainFooter,
    genreCubes
  }
};
</script>

