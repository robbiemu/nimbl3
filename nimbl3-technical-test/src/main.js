'use strict';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

require('../node_modules/normalize.css/normalize.css')

import App from './App'
import router from './router'
import store from './store'

Vue.filter('THB', function (value) {
  return 'THB ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
})
Vue.filter('currency', function (value) {
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
