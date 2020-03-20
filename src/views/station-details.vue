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
    // playVideo() {
    //   this.player.playVideo()
    // },
    playing() {
      console.log("o/ we are watching!!!");
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    }
  }
};
</script>