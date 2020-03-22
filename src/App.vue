<template>
  <div id="app">
    <main-navbar></main-navbar>
    <router-view></router-view>
    <main-footer></main-footer>
    <login-modal></login-modal>
    <station-info></station-info>
  </div>
</template>

<script>
import mainNavbar from '@/cmps/main-navbar.cmp';
import mainFooter from '@/cmps/main-footer.cmp';
import loginModal from '@/cmps/login-modal.cmp';
import stationCreateModal from '@/cmps/station-create-modal.cmp';

export default {
   created() {
    this.$store.dispatch({
      type: "loadStations"
    });
  },
   components: {
     mainNavbar,
     mainFooter,
     loginModal,
     stationCreateModal
   }
};
</script>


