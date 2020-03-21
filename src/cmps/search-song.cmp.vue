<template>
  <section class="search-song">
    <h1>Searchhhh</h1>
    <input type="txt" v-model="queryStr" v-debounce:500ms="searchSongs"/>
    {{queryStr}}
  </section>
</template>

<script>
export default {
 data(){
     return {
       queryStr: ''
     }
 },
 methods:{
     searchSongs(){
         console.log('searching', this.queryStr)
     }
 }
}
</script>

<style>

</style>