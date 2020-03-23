<template>
  <section class="station-preview">
    <section @click.prevent="stationDetails" :style="setBgi" class="station-preview-card-img ratio-square">
      <button @click.stop="sendSongsList">Play Station</button>
      <!-- <div class="swiper-overlay"></div> -->
    </section>
    <h3 class="station-preview-title">{{station.title}}</h3>
    <p class="station-preview-description">{{station.description}}</p>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";

export default {
  name: "station-preview",
  props: { 
    station: {
      type: Object
    }
  },
  computed: {
    setBgi() {
        return `background-image: url('${this.station.imgUrl}');`
    }
  },
  methods: {
    playPause() {
      return this.isPlaying ? "pause" : "play";
    },
    sendSongsList() {
        const readyPlaylist = this.station.songs.map(song => song.embedId);
        eventBusService.$emit('NEW_PLAYLIST', readyPlaylist)
    },
    stationDetails() {
      this.$router.push(`/station/${this.station._id}`);
    }
  }
};
</script>

<style scoped>
</style>
