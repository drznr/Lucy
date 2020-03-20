<template>
  <section class="station-app">
    STATIONS APPP
    <div class="player-container">
      <youtube :video-id="videoId" ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>
    <div class="player-controler">


      <button @click.prevent="handleSongChange(false)">Prev</button>
      <button @click.prevent="togglePlaying">{{playPause}}</button>
      <button @click.prevent="handleSongChange(true)">Next</button>
    </div>
  </section>
</template>
<script>
// import d from ''
export default {
  props: {},
  data() {
    return {
      player: null,
      isPlaying: false,
      videoId: "naoknj1ebqI",
      playerVars: {
        autoplay: 1
      }
    };
  },
  computed: {
    playPause() {
      return this.isPlaying ? "Pause" : "Play";
    }
  },
  methods: {
    togglePlaying() {
      this.isPlaying ? this.player.pauseVideo() : this.player.playVideo();
    },
    handleSongChange(nextSong) {
      nextSong ? console.log("next") : console.log("prev");
      // nextSong ? this.videoId = _ : this.videoId = _
    },
    handleStateShange(ev) {
      switch (ev.data) {
        case -1:
        case 0:
          this.isPlaying = false;
          break;
        case 1:
          this.isPlaying = true;
          break;
        case 2:
          this.isPlaying = false;
      }
    }
  },
  mounted() {
    this.player = this.$refs.youtube.player;
    this.player.addEventListener("onStateChange", this.handleStateShange);
  }
};
</script>

<style scoped>
.player-container {
  display: none;
}
.player-controler {
  margin-top: 200px;
}
</style>