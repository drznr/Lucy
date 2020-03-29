<template>
  <section class="youtube-iframe">
    <div class="youtube-container ratio-16-9">
      <loader-small class="youtube-iframe-loader" v-if="elPlayer"></loader-small>
      <youtube ref="youtube" :fitParent="true" :player-vars="playerVars"></youtube>
    </div>
    <div class="youtube-iframe-claps-container">
      <button class="youtube-iframe-claps-container-btn btn-link" @click="emitRate">
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
      },
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
    emitRate() {
      eventBusService.$emit('updateRate');
    }
  },
  watch: {
    // currSong() {
    //   // this may need to go
    //   if (this.currSong) this.elPlayer.loadVideoById(this.currSong.embedId);
    // },
    isPlaylistEmpty() {
      this.elPlayer.stopVideo();
    }
  },
  mounted() {
    this.setupYoutubePlayer();
    
  },
  components: {
    loaderSmall
  }
};
</script>

