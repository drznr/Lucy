<template>
  <div id="app">
    <main-navbar></main-navbar>
    <router-view></router-view>
    <main-footer></main-footer>
    <modal></modal>
  </div>
</template>

<script>
import mainNavbar from '@/cmps/main-navbar.cmp';
import mainFooter from '@/cmps/main-footer.cmp';
import modal from '@/cmps/modal.cmp';

export default {
   components: {
     mainNavbar,
     mainFooter,
     modal
   }
};
</script>


