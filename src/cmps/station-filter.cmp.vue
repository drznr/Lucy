<template>
<section class="station-filter">
  <input type="text" placeholder="Search Startions!">
  <select name="seachBy" id="">
    <option value="all">All</option>
    <option value="genres">Genres</option>
    <option value="titles">Titles</option>
  </select>
</section>
</template>

<script>

export default {
  data() {
    return {
      options: ['All', 'Genres', 'Title']
    }
  },
  // computed: {
  // }, 
  // methods: {
  // }, 
  // components: {
  // }
};
</script>

<style scoped>
</style>

