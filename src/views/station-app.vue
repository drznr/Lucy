<template>
  <section class="station-app">
    STATIONS APPP
    <!-- <iframe :src="'https://www.youtube.com/embed/naoknj1ebqI'"></iframe> -->
    <div class="player-container">
      <youtube :video-id="videoId" ref="youtube" :fitParent="true" :player-vars="playerVars" @playing="playing"></youtube>
    </div>
  </section>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      videoId: "naoknj1ebqI",
      playerVars: {
        autoplay: 1
      }
    };
  },
  methods: {
    // playVideo() {
    //   this.player.playVideo()
    // },
    playing() {
      console.log("o/ we are watching!!!");
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
};
</script>

<style scoped>
.player-container {
  display: none;
}
</style>