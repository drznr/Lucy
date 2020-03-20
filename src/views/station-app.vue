<template>
  <section class="station-app">
    STATIONS APPP
    <div class="player-container">
      <youtube 
        :video-id="videoId" 
        ref="youtube" 
        :fitParent="true" 
        :player-vars="playerVars" 
        @playing="playing"
        @paused="paused"
      ></youtube>
    </div>
    <div class="player-controler">
      <button @click.prevent="togglePlaying">{{playPause}}</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isPlaying: false,
      videoId: "naoknj1ebqI",
      playerVars: {
        autoplay: 1
      }
    };
  },
  computed:{
    playPause(){
      return this.isPlaying ? 'Pause' : 'Play'
    }
  },
  methods: {
    togglePlaying() {
      let player = this.$refs.youtube.player
      this.isPlaying ? player.pauseVideo() : player.playVideo()
    },
    playing() {
      this.isPlaying = true
    },
    paused(){
        this.isPlaying = false
      
    }
  }
};
</script>

<style scoped>
.player-container {
  display: none;
}
</style>