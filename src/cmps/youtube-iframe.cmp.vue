<template>
  <section class="youtube-iframe">
    <div class="youtube-container ratio-16-9">
      <loader-small v-if="elPlayer"></loader-small>
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>
    <!-- <div class="youtube-iframe-controller">
      <button @click.prevent="emitSwitchSong(-1)">
        <img src="@/assets/imgs/icons/prev.png" alt="previous song" title="Previous song" />
      </button>
      <button @click.prevent="togglePlaying">
        <img 
            class="youtube-iframe-controller-play"
            :src="(isPlaying) ? require('@/assets/imgs/icons/pause.png') : require('@/assets/imgs/icons/play.png')"  
            :alt="(isPlaying) ? 'pause song' : 'play song'"
            :title="(isPlaying) ? 'Pause song' : 'Play song'"
        />
      </button>
      <button @click.prevent="emitSwitchSong(1)">
        <img src="@/assets/imgs/icons/next.png" alt="next song" title="Next song" />
      </button>
    </div>  -->
    <div class="youtube-iframe-claps-container">
      <button class="youtube-iframe-claps-container-btn btn-link" @click="emitUpdateRate">
        <img src="../assets/imgs/icons/claps.svg" />
      </button>
      <span class="youtube-iframe-claps-container-rate">{{stationRate}}</span>
    </div>
    <div class="youtube-iframe-cover" v-if="isPlaylistEmpty"></div>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";
import loaderSmall from '@/cmps/icons/loader-small.cmp';


export default {
  props: { 
    currSong: Object, 
    stationRate: Number,
    isPlaylistEmpty: Boolean
  },
  data() {
    return {
      playerEvNum: -1,
      elPlayer: null,
      isPlaying: false,
      playerVars: {
        autoplay: 1,
        controls: 0
      }
    };
  },
  methods: {
    setupYoutubePlayer() {
      this.elPlayer = this.$refs.youtube.player;
      this.elPlayer.addEventListener("onStateChange", this.handleStateChange);
      eventBusService.$emit('SENDING_ELPLAYER', this.elPlayer);
    },
    handleStateChange(ev) {
      this.playerEvNum = ev.data
       eventBusService.$emit('PLAYER_EVENT', this.playerEvNum);
    },
    // setPlayer() {
    //   this.elPlayer = this.$refs.youtube.player;
    // },
    // togglePlaying() {
    //   this.isPlaying ? this.elPlayer.pauseVideo() : this.elPlayer.playVideo();
    // },
    // emitSwitchSong(diff) {
    //   this.$emit("switch-song", { idx: this.currSong.idx, diff });
    // },
    emitUpdateRate() {
      eventBusService.$emit('updateRate');
    },
    // handleStateChange(ev) {
    //   switch (ev.data) {
    //     case -1:
    //       this.isPlaying = false; // (unstarted)
    //       break;
    //     case 0:
    //       this.emitSwitchSong(1); /// End of song
    //       break;
    //     case 1:
    //       this.isPlaying = true; //play
    //       break;
    //     case 2:
    //       this.isPlaying = false; //paused
    //       break;
    //     default:
    //       break;
    //   }
    // }
  },
  watch: {
    currSong() {
      if (this.currSong) this.elPlayer.loadVideoById(this.currSong.embedId);
    },
    isPlaylistEmpty() {
      this.elPlayer.stopVideo();
    }
  },
  created() {
    eventBusService.$on("play-song", song => { 
    this.elPlayer.loadVideoById(song.embedId);
    });
  },
  mounted() {
    this.setupYoutubePlayer();
    // if (this.currSong) this.elPlayer.loadVideoById(this.currSong.embedId);
    // this.elPlayer.addEventListener("onStateChange", this.handleStateChange);
  },
  components: {
    loaderSmall
  }
};
</script>

