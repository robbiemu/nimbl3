'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

import products from './products'
import orders from './orders'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {products, orders}
})
