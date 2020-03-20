<template>
  <section class="station-details">
    MUSIC PLAYER
    <div class="player-container">
      <youtube
        :video-id="videoId"
        ref="youtube"
        :fitParent="true"
        :player-vars="playerVars"
        @playing="playing"
      ></youtube>
    </div>
    <div class="player-controller">
        <button @click="play">Play</button>
        <button @click="pause">Pause</button>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
export default {
    props: {},
  data() {
    return {
      videoId: "aYDfwUJzYQg",
      playerVars: {
        autoplay: 1
      }
    };
  },
  methods: {
    play() {
      this.player.playVideo()
    },
    pause(){
        this.player.pauseVideo()
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
};
</script>