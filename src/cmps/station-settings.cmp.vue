<template>
  <section class="station-settings">
    <form @submit.prevent="editStation" class="station-settings-form">
      <input
        type="text"
        class="station-settings-form-inp"
        placeholder="Station's Title"
        v-model="currStation.title"
      />
      <textarea
        class="station-settings-form-text-area"
        placeholder="Station's Description"
        v-model="currStation.description"
      ></textarea>
      <input
        type="text"
        class="station-settings-form-inp"
        placeholder="Station's Labels & Genres"
        v-model="labels"
      />
      <loader-small class="station-settings-loader" v-if="inProgress"></loader-small>
      <label class="station-settings-form-label" v-else>
        Station Thumbnail:
        <upload-img
          class="station-settings-form-label-upload-icon"
          :class="{'uploaded': this.currStation.imgUrl}"
        ></upload-img>
        <input type="file" class="station-settings-form-inp-file" @change="uploadImage" hidden />
      </label>
      <button :disabled="inProgress" class="station-settings-form-btn">Save</button>
    </form>
    <button
      v-if="routesProps.isStationOwner"
      class="station-settings-delete"
      @click="removeStation"
    >Delete Station</button>
  </section>
</template>

<script>
import { stationService } from "@/services/station.service";
import { uploadService } from "@/services/upload.service";
import loaderSmall from "@/cmps/icons/loader-small.cmp";
import uploadImg from "@/cmps/icons/upload-img.cmp";

export default {
  props: {
    routesProps: Object
  },
  data() {
    return {
      currStation: JSON.parse(JSON.stringify(this.routesProps.station))
    };
  },
  computed: {
    labels: {
      get() {
        return this.currStation.labels.join(" ");
      },
      set(val) {
        this.currStation.labels = val.split(" ");
      }
    },
    inProgress() {
      return this.$store.getters.inProgress;
    }
  },
  methods: {
    editStation() {
      this.$emit(
        "station-updated",
        JSON.parse(JSON.stringify(this.currStation))
      );
      this.$swal("Station updated successfully");
    },
    async uploadImage(ev) {
      this.$store.commit({ type: "setInProgress", inProgress: true });
      const imgData = await uploadService.uploadImg(ev);
      this.currStation.imgUrl = imgData.secure_url;
      this.$store.commit({ type: "setInProgress", inProgress: false });
    },
    removeStation() {
      this.$emit('station-removed', this.currStation._id);
      this.$router.push('/station');
    }
  },
  components: {
    loaderSmall,
    uploadImg
  }
};
</script>