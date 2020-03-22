<template>
  <section class="playlist-player">
    <div class="youtube-container ratio-16-9">
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
      elPlayer: null,
      isPlaying: false,
      playerVars: {
        autoplay: 1, // not working
        loop: 1,
        controls: 1, //later will be change to 0
        playlist: [] //  fix auto play
      }
    };
  },
  computed: {
    playPause() {
      return this.isPlaying ? 'Pause' : 'Play';
    }
  },
  methods: {
    setPlayer() {
      this.elPlayer = this.$refs.youtube.player;
    },
    togglePlaying() {
      this.isPlaying ? this.elPlayer.pauseVideo() : this.elPlayer.playVideo();
    },
    playing() {
      this.isPlaying = true;
    },
    paused() {
      this.isPlaying = false;
    },
    loadPlaylist() {                      
      this.playerVars.playlist = this.playlist.join(',');
    },
    changeSong(diff) {
      diff > 0 ? this.elPlayer.nextVideo() : this.elPlayer.previousVideo();
    }
  },
  watch: {
    playlist() {
      this.setPlayer();
      this.loadPlaylist();
    }
  },
  mounted() {
    this.setPlayer();
    this.loadPlaylist();
  }
};
</script>

<style scoped>
.youtube-container {
  width: 400px;
}
</style>
