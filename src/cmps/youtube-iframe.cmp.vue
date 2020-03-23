<template>
  <section class="youtube-iframe">
    <div class="youtube-container ratio-16-9">
      <loader v-if="inProgress"></loader>
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>
    <h2>{{ videoTitle }}</h2>
    <div class="youtube-iframe-controller">
      <button @click.prevent="emitSwitchSong(-1)">Prev</button>
      <button @click.prevent="togglePlaying">{{playPause}}</button>
      <button @click.prevent="emitSwitchSong(1)">Next</button>
    </div>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";

export default {
  props: { currSong: Object },
  data() {
    return {
      elPlayer: null,
      isPlaying: false,
      playerVars: {
        autoplay: 1,
        controls: 0
      }
    };
  },
  computed: {
    playPause() {
      return this.isPlaying ? "Pause" : "Play";
    },
    videoTitle() {
      return this.currSong.title.trim();
    },
    inProgress() {
      return this.$store.getters.inProgress;
    }
  },
  methods: {
    setPlayer() {
      this.elPlayer = this.$refs.youtube.player;
    },
    togglePlaying() {
      this.isPlaying ? this.elPlayer.pauseVideo() : this.elPlayer.playVideo();
    },
    emitSwitchSong(diff) {
      this.$emit("switch-song", { idx: this.currSong.idx, diff });
    },
    handleStateChange(ev) {
      switch (ev.data) {
        case -1:
          this.isPlaying = false; // (unstarted)
          break;
        case 0:
          this.emitSwitchSong(1); /// End of song
          break;
        case 1:
          this.isPlaying = true; //play
          break;
        case 2:
          this.isPlaying = false; //paused
          break;
        default:
          break;
      }
    }
  },
  watch: {
    currSong() {
      this.elPlayer.loadVideoById(this.currSong.embedId);
    }
  },
  created() {
    eventBusService.$on("play-song", song => {
      this.elPlayer.loadVideoById(song.embedId);
    });
  },
  mounted() {
    this.setPlayer();
    this.elPlayer.loadVideoById(this.currSong.embedId);
    this.elPlayer.addEventListener("onStateChange", this.handleStateChange);
  }
};
</script>

