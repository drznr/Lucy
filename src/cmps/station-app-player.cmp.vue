<template>
  <section class="station-app-player">
    <div class="player-container">
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>
    <div class="player-controler">
      <label for="volume">Volume</label>
      <input
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="100"
        v-model="volume"
        @input="handleVolume"
      />
      <button @click.prevent="seek(-15)">Skip -</button>
      <button @click.prevent="handleSongChange(false)">Prev</button>
      <button @click.prevent="togglePlaying">{{playPause}}</button>
      <button @click.prevent="handleSongChange(true)">Next</button>
      <button @click.prevent="seek(15)">Skip +</button>
      <span class="time-elapsed-digital">{{timeElapsedForDisplay}}/{{fullRunTimeForDisplay}}</span>
      <div class="playback-timeline">
        <div :style="playbackTimelineStyle" class="playback-timeline-progress-bar"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: { playlist: Array },
  data() {
    return {
      volume: 70,
      timeElapsed: 0,
      fullRunTime: 0,
      player: null,
      isPlaying: false,
      currSong: null, // this needs to go in the store
      playerVars: {
        autoplay: 1,
        playlist: []
      }
    };
  },
  computed: {
    playbackTimelineStyle() {
      return `width: ${(this.timeElapsed / this.fullRunTime) * 100}%`;
    },
    playPause() {
      return this.isPlaying ? "Pause" : "Play";
    },
    timeElapsedForDisplay() {
      var minutes = Math.floor(this.timeElapsed / 60);
      var seconds = this.timeElapsed - minutes * 60;

      var time = minutes < 10 ? "0" : "";
      time += minutes + ":" + (seconds < 10 ? "0" : "");
      time += seconds;
      return time;
    },
    fullRunTimeForDisplay() {
      var minutes = Math.floor(this.fullRunTime / 60);
      var seconds = this.fullRunTime - minutes * 60;

      var time = minutes < 10 ? "0" : "";
      time += minutes + ":" + (seconds < 10 ? "0" : "");
      time += seconds;
      return time;
    }
  },
  methods: {
    handleVolume() {
        console.log('vol', this.volume);
        this.player.setVolume(this.volume)
    },
    seek(diff) {
      this.player.seekTo(parseInt(this.timeElapsed) + diff, true);
    },
    togglePlaying() {
      this.isPlaying ? this.player.pauseVideo() : this.player.playVideo();
    },
    handleSongChange(nextSong) {
      nextSong ? this.player.nextVideo() : this.player.previousVideo();
    },
    loadPlaylist() {
      this.playerVars.playlist = this.playlist.join(",");
    },
    handleStateShange(ev) {
      if (ev.data === -1) this.isPlaying = false; // (unstarted)
      if (ev.data === 0) this.isPlaying = false; // (ended)
      if (ev.data === 1) {
        // (playing)
        this.isPlaying = true;
        this.setTimeElapsed();
      }
      if (ev.data === 2) this.isPlaying = false;
      if (ev.data === 3) console.log("buffering"); // (buffering)
    },
    setTimeElapsed() {
      this.player.getDuration().then(fullRunTime => {
        this.fullRunTime = fullRunTime.toFixed();
      });
      if (this.isPlaying) {
        var incTime = setInterval(() => {
          this.player.getCurrentTime().then(timeElapsed => {
            this.timeElapsed = timeElapsed.toFixed();
          });
        }, 0);
      } else {
        clearInterval(incTime);
      }
    },
    loadPlaylist() {
      this.playerVars.playlist = this.playlist.join(","); //this.playlist will be changed from data to prop
    }
  },
  mounted() {
    this.player = this.$refs.youtube.player;
    this.player.addEventListener("onStateChange", this.handleStateShange);
    this.loadPlaylist();
  }
};
</script>



<style scoped>
.station-app-player {
  background-color: white;
}
.player-container {
  display: none;
}
.player-controler {
  max-width: 960px;
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
}
.playback-timeline {
  width: 300px;
  height: 7px;
  border-radius: 10px;
  border: 1px inset;
}
.playback-timeline-progress-bar {
  background-color: lightgreen;
  height: 100%;
  width: 0%;
}
.time-elapsed-digital {
  font-family: monospace;
}
</style>