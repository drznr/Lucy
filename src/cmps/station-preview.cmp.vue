<template>
  <section class="station-preview">
    <div @click.prevent="stationDetails" :style="setBgi" class="station-preview-img ratio-square">
      <button @click.stop="sendSongsList">
        <play-btn class="play-btn"></play-btn>
      </button>
      <span class="station-preview-info">
        <popular v-if="station.rate >= 10" class="station-preview-info-icon"></popular>
        <img :src="stationOwnerAvatar" alt="station owner avatar" :title="stationOwnerTitle" class="station-preview-info-avatar">
      </span>
    </div>
    <h3 class="station-preview-title">{{station.title}}</h3>
    <p class="station-preview-description">{{station.description}}</p>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";
import playBtn from '@/cmps/icons/play-btn.cmp';
import popular from '@/cmps/icons/popular.cmp';

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
    },
    stationOwnerTitle() {
      return (this.station.owner) ? this.station.owner.fullName.charAt(0).toUpperCase() + this.station.owner.fullName.substring(1) : 'Public';
    },
    stationOwnerAvatar() {
      return (this.station.owner && this.station.owner.avatar) ? this.station.owner.avatar : require('@/assets/imgs/account.svg');
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
  },
  components: {
    playBtn,
    popular
  }
};
</script>

<style scoped>
</style>
