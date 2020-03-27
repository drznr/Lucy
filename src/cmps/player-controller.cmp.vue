<template>
  <section class="player-controller">

    <section class="player-controller-now-playing">
      <img class="player-controller-now-playing-img" v-if="currStation" :src="this.currStation.imgUrl"/>
      <p v-if="currStation">{{currStation.title}}</p>
      <p v-if="currSong">{{currSong.title}}</p>
    </section>

    <div class="player-controller-controler">  
      <section class="player-controller-controler-volume">
        <img
          src="../assets/imgs/icons/speaker.svg"
          class="player-controller-controler-volume-icon"
        />
        <div class="player-controller-controler-volume-range-wrap">
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

      <section class="player-controller-controler-btns">
        <img src="../assets/imgs/icons/skip-back.png" @click.prevent="seek(-15)" />
        <img src="../assets/imgs/icons/prev.png" @click.prevent="handleSongChange(-1)" />
        <loader-small class="player-controller-controler-btns-loader" v-if="isBuffering"></loader-small>
        <img v-else :src="playPause" @click.prevent="togglePlaying" />
        <img src="../assets/imgs/icons/next.png" @click.prevent="handleSongChange(1)" />
        <img src="../assets/imgs/icons/skip-forward.png" @click.prevent="seek(15)" />
      </section>

      <section class="player-controller-controler-playback">
        <span
          class="player-controller-controler-playback-time-elapsed-digital"
        >{{timeElapsedForDisplay}}/{{fullRunTimeForDisplay}}</span>
        <div class="player-controller-controler-playback-timeline">
          <div
            :style="playbackTimelineStyle"
            class="player-controller-controler-playback-timeline-progress-bar"
          ></div>
        </div>
      </section>

    </div>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";
import loaderSmall from '@/cmps/icons/loader-small.cmp';

export default {
  props: {
    currSong: {
      type: Object
    },
    currStation: {
      type: Object
    },
    elPlayer: {
      type: Object
    },
    playerEv: {
      type: Number
    },
  },
  data() {
    return {
      isBuffering: false,
      miniStation: null,
      startingPoint: 0,
      // idx: 0,
      volume: 50,
      timeElapsed: 0,
      fullRunTime: 0,
      isPlaying: false,
    };
  },
  computed: {
    playbackTimelineStyle() {
      return `width: ${(this.timeElapsed / this.fullRunTime) * 100}%`;
    },
    playPause() {
      // TODO: Add loader while buffering
      return this.isPlaying
        ? require("@/assets/imgs/icons/pause.png")
        : require("@/assets/imgs/icons/play.png");
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
    handleSongChange(diff) {
      this.emitSongChange(diff)
    },
    emitSongChange(diff) {
      var idx;

      if(this.currSong) {
        idx = this.currStation.songs.findIndex(song => song.embedId === this.currSong.embedId);
        if(idx === -1 || !idx) idx = 0;
      } else {
        idx = 0;
      }

      if(diff) {
        if (diff === -1) {
          idx--
          idx = (idx < 0) ? (this.currStation.songs.length - 1) : idx
        } else {
          idx++;
          idx = (idx === this.currStation.songs.length) ? 0 : idx;
        }
      }

       this.$emit("songChanged", this.currStation.songs[idx]);
    },
    updateTimeElapsed() {
      var timeObj = {
        timeElapsed: this.timeElapsed,
        inSong: this.currSong.embedId,
        inStation: this.currStation._id,
      }
      this.$emit("timeElapsed", timeObj);
    },
    stateChanged(ev) {
      if (ev === -1) {  // unstarted
        this.isPlaying = false;
        this.isBuffering = false
      }
      if (ev === 0) { // ended
        this.isPlaying = false;
        this.isBuffering = false
      }
      if (ev === 1) { // playing
        this.isPlaying = true;
        this.isBuffering = false
        this.setTimeElapsed();
      }
      if (ev === 2) { // paused
        this.isPlaying = false;
        this.isBuffering = false;
      } 
      if (ev === 3) {
        this.isBuffering = true // Buffering
        this.isPlaying = false;
      }      
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
          if (this.timeElapsed !== timeElapsed.toFixed() ) { 
            // this makes the timeElapsed update every second and not constantly
            this.timeElapsed = timeElapsed.toFixed();
          }
        }, 0);
      } else {
        clearInterval(incTime);
      }
    },
  },
  watch: {
    isPlaying() {
      this.$emit(
        "playingStatusChanged",
        JSON.parse(JSON.stringify(this.isPlaying))
      );
    },
    playerEv(){
      this.stateChanged(this.playerEv)
    },
    currStation(){
      this.emitSongChange()
    },
    currSong(){      
      this.elPlayer.loadVideoById(this.currSong.embedId);
    },
    elPlayer(){
      // incase the song comes before the player
      if(this.currSong) this.elPlayer.loadVideoById(this.currSong.embedId);
    }
  },
  destroyed() {
    this.updateTimeElapsed()

    // clearing the interval
    // this.isPlaying = false
    // this.setTimeElapsed()
  },
  mounted() {  
    if(this.currStation) this.emitSongChange()
  },
  components: {
    loaderSmall
  }
};
</script>