import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vueDebounce from 'vue-debounce'
import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)
Vue.use(vueDebounce, {
  listenTo: 'input'
})

import './styles/global.scss';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
