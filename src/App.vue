<template>
  <div id="app">
    <main-navbar></main-navbar>
    <router-view></router-view>
    <login-modal></login-modal>
    <station-create-modal></station-create-modal>
  </div>
</template>

<script>
import mainNavbar from '@/cmps/main-navbar.cmp';
import loginModal from '@/cmps/login-modal.cmp';
import stationCreateModal from '@/cmps/station-create-modal.cmp';

export default {
   created() {
    this.$store.dispatch({
      type: "loadStations",
      filterBy: null
    });
  },
   components: {
     mainNavbar,
     loginModal,
     stationCreateModal
   }
};
</script>


