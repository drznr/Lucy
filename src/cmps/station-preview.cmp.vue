<template>
  <section class="station-preview">
    <div @click.self="stationDetails" :style="setBgi" class="station-preview-img ratio-square">
      <button @click.stop="sendSongsList" v-if="station.songs.length">
        <play-btn class="play-btn"></play-btn>
      </button>
      <span class="station-preview-info">
        <popular v-if="station.rate >= 10" class="station-preview-info-icon"></popular>
        <img
          :src="stationOwnerAvatar"
          alt="station owner avatar"
          :title="stationOwnerTitle"
          class="station-preview-info-avatar"
        />
      </span>
    </div>
    <h3 class="station-preview-title">{{station.title}}</h3>
    <p @click.self="stationDetails" class="station-preview-description">{{station.description}}</p>
  </section>
</template>

<script>
import { eventBusService } from "@/services/event-bus.service";
import playBtn from "@/cmps/icons/play-btn.cmp";
import popular from "@/cmps/icons/popular.cmp";

export default {
  name: "station-preview",
  props: {
    station: {
      type: Object
    }
  },
  computed: {
    setBgi() {
      const imgUrl =
        this.station.imgUrl ||
        require("@/assets/imgs/station-default-thumb.png");
      return `background-image: url(${imgUrl});`;
    },
    stationOwnerTitle() {
      return this.station.owner
        ? this.station.owner.fullName.charAt(0).toUpperCase() +
            this.station.owner.fullName.substring(1)
        : "Public";
    },
    stationOwnerAvatar() {
      return this.station.owner && this.station.owner.avatar
        ? this.station.owner.avatar
        : require("@/assets/imgs/account.svg");
    }
  },
  methods: {
    sendSongsList() {
      // eventBusService.$emit('NEW_PLAYLIST', this.station)
      eventBusService.$emit("UPDATE_CURR_STATION", this.station);
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