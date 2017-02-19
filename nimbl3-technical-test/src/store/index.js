'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

import products from './products'
import orders from './orders'
import {people, types, statuses} from './dummy_data'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {people, types, statuses},
  modules: {products, orders}
})

export default store
