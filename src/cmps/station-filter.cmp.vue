<template>
  <section class="station-filter">
    <!-- <v-select
      v-model="filterBy.searchIn"
      :options="['Search by', 'Genres', 'Titles']">
    ></v-select> -->
    <select
      v-model="filterBy.searchIn"
      @change="emitFilter"
      class="station-filter-search-select select-arrow"
      name="seachBy"
    >
      <option value="all">Search by</option>
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
      class="station-filter-sort-select select-arrow"
      name="sortBy"
    >
      <option value="title">Sort by</option>
      <option value="title">Title</option>
      <option value="date">Date</option>
    </select>
  </section>
</template>

<script>
import vSelect from "vue-select";


export default {
  props: {
    initialFilterBy: {
      type: Object
    }
  },
  data() {
    return {
      filterBy: { 
        txt: '',
        searchIn: 'all', 
        page: '' 
      },
      sortBy: 'title'
    };
  },
  methods: {
    emitFilter() {
      this.$emit('emitingFilter', JSON.parse(JSON.stringify(this.filterBy)));
    },
    emitSort() {
      this.$emit('emitingSort', JSON.parse(JSON.stringify(this.sortBy)));
    },
    setInitalFilter() {
      // so that the page opens on the chosen filter
      this.filterBy = this.initialFilterBy;
    }
  },
  created() {
    if(this.initialFilterBy) this.setInitalFilter()
  },
  components: {
    vSelect
  }
};
</script>

