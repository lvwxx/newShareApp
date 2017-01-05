// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import './assets/js/rem.js'
import App from './App'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import router from './assets/js/router.js'
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  components: {
    App,
  }
})
