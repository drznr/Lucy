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
  created() {
    const stationId = this.$route.params.id;
      
  },
  components:{
    playlistPlayer
  }
};
</script>

<style scoped>

</style>
