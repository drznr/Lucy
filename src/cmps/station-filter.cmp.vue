<template>
  <section class="station-filter">
    <section class="station-filter-search">
      <label class="station-filter-search-select-label" for="searchBy">Search by</label>
      <select class="station-filter-search-select" name="seachBy">
        <option value="all">All</option>
        <option value="genres">Genres</option>
        <option value="titles">Titles</option>
      </select>
    </section>
    <input type="text" v-model="filterBy.txt" v-debounce:500ms="emitFilter" placeholder="Type here..." />
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
      filterBy: { txt: '', page: '' }
    };
  },
  // computed: {
  // },
  methods: {
    emitFilter(){
      console.log('Sending Filter');
      // this.$emit("emitingFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
    setInitalFilter(){
      // so that the page opens on the chosen filter
      this.filterBy = this.initialFilterBy
    }
  },
  created(){
    // this.setInitalFilter()
  }
};
</script>

<style scoped>
</style>

