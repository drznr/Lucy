<template>
  <section class="player-controller">
    <section class="player-controller-now-playing">
      <img
        class="player-controller-now-playing-img"
        v-if="currStation && currStation.imgUrl && isNotMobile"
        :src="currStation.imgUrl"
      />
      <p v-if="currStation" class="player-controller-title">{{currStation.title}}</p>
      <p v-if="currSong" class="player-controller-song">{{currSong.title}}</p>
    </section> 

    <div class="player-controller-controler">
      <section class="player-controller-controler-btns">
        <div class="player-controller-controler-volume" v-if="isNotMobile">
          <volume-speaker
            class="player-controller-controler-volume-icon"
            @click.native="toggleMute"
            :isMuted="isMuted"
          ></volume-speaker>

          <div class="player-controller-controler-volume-range-wrap">
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="100"
              v-model.number="volume"
              @input="handleVolume"
            />
          </div>
        </div>
        <rewind @click.native.prevent="seek(-10)" v-if="isNotMobile"></rewind>
        <previous-track @click.native.prevent="handleSongChange(-1)"></previous-track>
        <loader-small v-if="isBuffering"></loader-small>
        <pause-play v-else :isPlaying="isPlaying" @click.native.prevent="togglePlaying"></pause-play>
        <next-track @click.native.prevent="handleSongChange(1)"></next-track>
        <fast-forward @click.native.prevent="seek(10)" v-if="isNotMobile"></fast-forward>
      </section>

      <section class="player-controller-controler-playback">
        <span
          class="player-controller-controler-playback-time-elapsed-digital"
        >{{timeElapsedForDisplay}}/{{fullRunTimeForDisplay}}</span>
        <div class="player-controller-controler-playback-timeline" @click.prevent="jumpTo($event)">
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
import loaderSmall from "@/cmps/icons/loader-small.cmp";
import volumeSpeaker from "@/cmps/icons/volume-speaker.cmp";
import rewind from "@/cmps/icons/rewind.cmp";
import fastForward from "@/cmps/icons/fast-forward.cmp";
import previousTrack from "@/cmps/icons/previous-track.cmp";
import nextTrack from "@/cmps/icons/next-track.cmp";
import pausePlay from "@/cmps/icons/pause-play.cmp";

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
    }
  },
  data() {
    return {
      isBuffering: false,
      isMuted: false,
      startingPoint: 0,
      volume: 50,
      lastVolume: 0,
      timeElapsed: 0,
      fullRunTime: 0,
      isPlaying: false,
      isNotMobile: true,
    };
  },
  computed: {
    playbackTimelineStyle() {
      return `width: ${(this.timeElapsed / this.fullRunTime) * 100}%`;
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
    jumpTo(ev) {
      if (!this.currSong) return;
      var skipTo = ev.offsetX; // inital offset
      if (ev.offsetX < 0) skipTo = 0;
      skipTo = (skipTo / ev.toElement.scrollWidth) * 100; // percent of perent
      skipTo = (skipTo / 100) * this.fullRunTime; // what the corisponding percent is from the playing song
      this.elPlayer.seekTo(skipTo, true);
    },
    toggleMute() {
      if (this.volume > 0) {
        this.lastVolume = this.volume;
        this.volume = 0;
      } else this.volume = this.lastVolume;
      this.handleVolume();
    },
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
      this.emitSongChange(diff);
    },
    emitSongChange(diff) {
      var idx;

      if (this.currSong) {
        idx = this.currStation.songs.findIndex(
          song => song.embedId === this.currSong.embedId
        );
        if (idx === -1 || !idx) idx = 0;
      } else {
        idx = 0;
      }

      if (diff) {
        if (diff === -1) {
          idx--;
          idx = idx < 0 ? this.currStation.songs.length - 1 : idx;
        } else {
          idx++;
          idx = idx === this.currStation.songs.length ? 0 : idx;
        }
      }

      this.$emit("songChanged", this.currStation.songs[idx]);
    },
    updateTimeElapsed() {
      var timeObj = {
        timeElapsed: this.timeElapsed,
        inSong: this.currSong.embedId,
        inStation: this.currStation._id
      };
      this.$emit("timeElapsed", timeObj);
    },
    stateChanged(ev) {
      switch (ev) {
        case -1:
          // unstarted
          this.isPlaying = false;
          this.isBuffering = false;
          break;
        case 0:
          // ended
          this.isPlaying = false;
          this.isBuffering = false;
          this.handleSongChange(1);
          break;
        case 1:
          // playing
          this.isPlaying = true;
          this.isBuffering = false;
          this.setTimeElapsed();
          break;
        case 2:
          // paused
          this.isPlaying = false;
          this.isBuffering = false;
          break;
        case 3:
          // Buffering
          this.isBuffering = true; 
          this.isPlaying = false;
      }
    },
    async setTimeElapsed() {
      const fullRunTime = await this.elPlayer.getDuration();
      this.fullRunTime = fullRunTime.toFixed();
      if (this.isPlaying) {
        const incTime = setInterval(async () => {
          const timeElapsed = await this.elPlayer.getCurrentTime();
          if (!timeElapsed) return;
          if (this.timeElapsed !== timeElapsed.toFixed()) {
            this.timeElapsed = timeElapsed.toFixed();
          }
        }, 0);
      } else {
        clearInterval(incTime);
      }
    },
    checkForMobile() {
      if (window.innerWidth < 550) {
        this.isNotMobile = false 
      } 
    }
  },
  watch: {
    isPlaying() {
      this.$emit(
        "playingStatusChanged",
        JSON.parse(JSON.stringify(this.isPlaying))
      );
    },
    playerEv() {
      this.stateChanged(this.playerEv);
    },
    currStation(newStation, oldStation) {
      if (newStation._id !== oldStation._id) this.emitSongChange();
    },
    currSong() {
      if (this.elPlayer) {
        this.elPlayer.loadVideoById(this.currSong.embedId);
      }
    },
    elPlayer() {
      if (this.currSong) {
        this.elPlayer.loadVideoById(this.currSong.embedId);
      }
    },
    volume(newVolume) {
      newVolume === 0 ? (this.isMuted = true) : (this.isMuted = false);
    }
  },
  destroyed() {
    if (this.currSong) this.updateTimeElapsed();

    // clearing the interval
    this.isPlaying = false
  },
  mounted() {
    if (this.currStation) this.emitSongChange();
    this.checkForMobile()
  },
  components: {
    loaderSmall,
    volumeSpeaker,
    rewind,
    fastForward,
    previousTrack,
    nextTrack,
    pausePlay
  }
};
</script>