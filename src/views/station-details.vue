<template>
  <section class="station-details">
    MUSIC PLAYER
    <div class="player-container">
      <youtube
        ref="youtube"
        :fitParent="true"
        :player-vars="playerVars"
        @playing="playing"
        @paused="paused"
      ></youtube>
    </div>
    <div class="player-controller">
      <button @click.prevent="changeSong(-1)">Prev</button>
      <button @click.prevent="togglePlaying">{{playPause}}</button>
      <button @click.prevent="changeSong(1)">Next</button>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  // props: { playlist: Array },
  data() {
    return {
      player: null,
      isPlaying: false,
      isLoopQue: true,
      playlist: ["jHfOqqQ1DLQ", "7s65Zc6ULbo", "l9BxObmqejw"],
      playerVars: {
        autoplay: 1,
        loop: 1,
        controls: 1,
        playlist: this.videoId    // change this and fix auto play
      }
    };
  },
  computed: {
    playPause() {
      return this.isPlaying ? "Pause" : "Play";
    },
  },
  methods: {
    setPlayer() {
      this.player = this.$refs.youtube.player;
    },
    togglePlaying() {
      this.isPlaying ? this.player.pauseVideo() : this.player.playVideo();
    },
    playing() {
      this.isPlaying = true;
    },
    paused() {
      this.isPlaying = false;
    },
    loadPlaylist() {
      this.playerVars.playlist= this.playlist.join(',') ; //this.playlist will be changed from data to prop
    },
    changeSong(diff) {
      (diff > 0 )? this.player.nextVideo() : this.player.previousVideo();
    },
  },
  mounted() {
    this.setPlayer();
    this.loadPlaylist();
  }
};
</script>

<style scoped>
.player-container {
  width: 400px;
}
</style>
