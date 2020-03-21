<template>
  <section class="search-song">
    <h1>Searchhhh</h1>
    <input type="txt" v-model="queryStr" v-debounce:500ms="emitSearchSong" />
    <ul>
      <li v-for="(song, idx) in songs" :key="idx">
        {{song.snippet.title}}
        <button @click="emitAddSong(song)">+</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: { songs: Array },
  data() {
    return {
      queryStr: ""
    };
  },
  methods: {
    emitSearchSong() {
      this.$emit("search-song", this.queryStr);
      console.log("inside search cmp youtube results:", this.songs);
    },
    emitAddSong(song){
     console.log('emitting add song with', song.snippet.title)
     this.$emit('add-song', song)
    }
  }
};
</script>

<style>
</style>