<template>
  <section class="station-details">
    <div class="player-container ratio-16-9">
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
  </section>
</template>

<script>
export default {
  props: { playlist: Array },
  data() {
    return {
      player: null,
      isPlaying: false,
      playerVars: {
        autoplay: 1,
        loop: 1,
        controls: 1,//later will be change to 0
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
