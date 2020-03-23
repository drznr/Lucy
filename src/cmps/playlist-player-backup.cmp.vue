<template>
  <section class="playlist-player">
    <div class="youtube-container ratio-16-9">
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>
    <div class="player-controller">
      <button @click.prevent="changeSong(-1)">Prev</button>
      <button @click.prevent="togglePlaying">{{playPause}}</button>
      <button @click.prevent="changeSong(1)">Next</button>
    </div>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";

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
      return this.isPlaying ? "Pause" : "Play";
    }
  },
  methods: {
    setPlayer() {
      this.elPlayer = this.$refs.youtube.player;
    },
    togglePlaying() {
      this.isPlaying ? this.elPlayer.pauseVideo() : this.elPlayer.playVideo();
    },
    setPlaylist(idx = 0) {
      this.elPlayer.loadPlaylist(this.playlist.join(","), idx);
    },
    async changeSong(diff) {
        const idx = await this.elPlayer.getPlaylistIndex();
      if (diff > 0) {
        (idx === this.playlist.length -1) ? this.setPlaylist() : this.elPlayer.nextVideo()
      } else {
        (idx === 0) ? this.setPlaylist(this.playlist.length -1) : this.elPlayer.previousVideo()
      }
    },
    handleStateChange(ev) {
      if (ev.data === -1) this.isPlaying = false; // (unstarted)
      if (ev.data === 0) this.setPlaylist(); //end
      if (ev.data === 1) this.isPlaying = true; //play
      if (ev.data === 2) this.isPlaying = false; //paused
    }
  },
  watch: {
    playlist() {
      this.setPlaylist();
    }
  },
  created() {
    eventBusService.$on("play-song", idx => {
      this.elPlayer.loadPlaylist(this.playlist.join(","), idx);
    });
  },
  mounted() {
    this.setPlayer();
    this.setPlaylist();
    this.elPlayer.addEventListener("onStateChange", this.handleStateChange);
  }
};
</script>

<style scoped>
.youtube-container {
  width: 400px;
}
</style>
