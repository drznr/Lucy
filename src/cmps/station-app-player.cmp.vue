<template>
  <section class="station-app-player">
    <div class="station-app-player-youtube-warp">
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>
    <div class="station-app-player-controler">
      <section class="station-app-player-controler-volume">
        <img
          src="../assets/imgs/icons/speaker.svg"
          class="station-app-player-controler-volume-icon"
        />
        <div class="station-app-player-controler-volume-range-wrap">
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="100"
            v-model="volume"
            @input="handleVolume"
          />
        </div>
      </section>

      <section class="station-app-player-controler-btns">
        <img src="../assets/imgs/icons/skip-back.png" @click.prevent="seek(-15)" />
        <img src="../assets/imgs/icons/prev.png" @click.prevent="handleSongChange(false)" />
        <button @click.prevent="togglePlaying">{{playPause}}</button>
        <!-- <img v-bind:src="`../assets/imgs/icons/${playPause}.png`" @click.prevent="togglePlaying"/> -->
        <img src="../assets/imgs/icons/next.png" @click.prevent="handleSongChange(true)" />
        <img src="../assets/imgs/icons/skip-forward.png" @click.prevent="seek(15)" />
      </section>

      <section class="station-app-player-controler-playback">
        <span
          class="station-app-player-controler-playback-time-elapsed-digital"
        >{{timeElapsedForDisplay}}/{{fullRunTimeForDisplay}}</span>
        <div class="station-app-player-controler-playback-timeline">
          <div
            :style="playbackTimelineStyle"
            class="station-app-player-controler-playback-timeline-progress-bar"
          ></div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";

export default {
  // props: {
  //   playlist: {
  //     type: Array
  //   }
  // },
  data() {
    return {
      playlist: [
        "jHfOqqQ1DLQ",
        "eZXS8Jpkiac",
        "naoknj1ebqI",
        "7s65Zc6ULbo",
        "l9BxObmqejw"
      ],
      volume: 50,
      timeElapsed: 0,
      fullRunTime: 0,
      elPlayer: null,
      isPlaying: false,
      playerVars: {
        // TODO: make video quality lowest for faster loading time
        // playlist: ''
      }
    };
  },
  computed: {
    playbackTimelineStyle() {
      return `width: ${(this.timeElapsed / this.fullRunTime) * 100}%`;
    },
    playPause() {
      return this.isPlaying ? "pause" : "play";
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
      this.elPlayer.setVolume(this.volume);
    },
    seek(diff) {
      this.elPlayer.seekTo(parseInt(this.timeElapsed) + diff, true);
    },
    togglePlaying() {
      this.isPlaying ? this.elPlayer.pauseVideo() : this.elPlayer.playVideo();
    },
    handleSongChange(nextSong) {
      nextSong ? this.elPlayer.nextVideo() : this.elPlayer.previousVideo();
    },
    handleStateChange(ev) {
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
    async setTimeElapsed() {
      // this function runs the digital clock
      const fullRunTime = await this.elPlayer.getDuration();
      this.fullRunTime = fullRunTime.toFixed();
      if (this.isPlaying) {
        const incTime = setInterval(async () => {
          const timeElapsed = await this.elPlayer.getCurrentTime();
          // When songs change this prevents .toFixed of undefined
          if (!timeElapsed) return;
          this.timeElapsed = timeElapsed.toFixed();
        }, 0);
      } else {
        clearInterval(incTime);
      }
    },
    updatePlayerPlaylist() {
      this.elPlayer.loadPlaylist(this.playlist.join(","));
    },
    reciveNewPlaylist(playlist) {
      this.playlist = playlist;
      this.updatePlayerPlaylist();
    }
  },
  watch: {
    isPlaying() {
      this.$emit(
        "playingStatusChanged",
        JSON.parse(JSON.stringify(this.isPlaying))
      );
    }
  },
  mounted() {
    this.elPlayer = this.$refs.youtube.player;
    this.elPlayer.addEventListener("onStateChange", this.handleStateChange);
    this.updatePlayerPlaylist();

    eventBusService.$on("NEW_PLAYLIST", playlist => {
      this.reciveNewPlaylist(playlist);
    });
  }
};
</script>