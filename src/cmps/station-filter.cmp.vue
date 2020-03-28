<template>
  <section class="station-filter">
    <select
      v-model="filterBy.searchIn"
      @change="emitFilter"
      class="station-filter-select-search select"
    >
      <option value="">Search by</option>
      <option value="genres">Genres</option>
      <option value="titles">Titles</option>
    </select>
    <input
      type="text"
      v-model="filterBy.txt"
      v-debounce:500ms="emitFilter"
      placeholder="Search in stations..." 
    />
    <select
      v-model="filterBy.sortBy" 
      @change="emitFilter"
      class="station-filter-select-sort select"
    >
      <option value="">Sort by</option>
      <option value="title">Title</option>
      <option value="date">Date</option>
    </select>
  </section>
</template>

<script>
import { stationService } from '@/services/station.service';

export default {
  props: {
    initialFilterBy: {
      type: Object
    }
  },
  data() {
    return {
      filterBy: stationService.getEmptyCritirea()
    };
  },
  methods: {
    emitFilter() {
      this.$emit("emitingFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
    setInitalFilter() {
      // so that the page opens on the chosen filter
      this.filterBy = this.initialFilterBy;
    }
  },
  created() {
    if(this.initialFilterBy) this.setInitalFilter()
  }
};
</script>

