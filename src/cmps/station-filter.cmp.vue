<template>
  <section class="station-filter">
    <select
      v-model="filterBy.searchIn"
      @change="emitFilter"
      class="station-filter-select-search"
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
      v-model="sortBy"
      @change="emitSort"
      class="station-filter-select-sort"
    >
      <option value="">Sort by</option>
      <option value="title">Title</option>
      <option value="date">Date</option>
    </select>
  </section>
</template>

<script>
export default {
  props: {
    initialFilterBy: {
      type: Object
    }
  },
  data() {
    return {
      filterBy: { txt: "", searchIn: "", page: "" },
      sortBy: ""
    };
  },
  methods: {
    emitFilter() {
      this.$emit("emitingFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
    emitSort() {
      this.$emit("emitingSort", JSON.parse(JSON.stringify(this.sortBy)));
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

