import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '@/views/home';
import stationApp from '@/views/station-app';
import stationDetails from '@/views/station-details';
import userDetails from '@/views/user-details';
import signUp from '@/views/signup';
import chatRoom from '@/cmps/chat-room.cmp';
import searchSong from '@/cmps/search-song.cmp';
import stationSettings from '@/cmps/station-settings.cmp';
import userProfile from '@/cmps/user-profile.cmp';
import userStats from '@/cmps/user-stats.cmp';

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: home },
  { path: '/station', name: 'station-app', component: stationApp },
  { path: '/station/:id', component: stationDetails, // removed  - ,name: 'station-details' - because the console told me to
    children:[
      { path: '', name: 'chat-room', component: chatRoom },
      { path: 'search', name: 'search-song', component: searchSong },
      { path: 'settings', name: 'station-settings', component: stationSettings },
    ]
  },
  { path: '/signup', name: 'signup', component: signUp },
  { path: '/user/:id', component: userDetails, // removed name: 'user-details',  - because the console told me to
    children:[
      { path: '', name: 'user-profile', component: userProfile }, // crudl on user stations ( admin has extra options )
      { path: 'stats', name: 'user-stats', component: userStats },
    ] 
  }


    // DONT ERASE
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash', // history
  base: process.env.BASE_URL,
  routes
})

export default router
