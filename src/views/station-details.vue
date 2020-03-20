<template>
  <section class="station-details">
    <playlist-player></playlist-player>
    <router-view></router-view>
  </section>
</template>

<script>
  import playlistPlayer from "@/cmps/playlist-player.cmp.vue";
export default {

  data() {
    return {
    };
  },
  computed: {
  
  },
  methods: {

  },
  components:{
    playlistPlayer
  }
};
</script>

<style scoped>

</style>
