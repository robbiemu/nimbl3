'use strict';

import Vue from 'vue'
import Vuex from 'vuex'

import products from './products'
import orders from './orders'
import {people, types, statuses} from './dummy_data'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    order: {
      itemsFilter: undefined,
      sortLineItems: undefined
    },
    people, types, statuses
  },
  modules: {products, orders},
  mutations: {
    muteItemsFilter: (state, payload) =>
      Vue.set(state.order, 'itemsFilter', payload),
    sortLineItems: (state, payload) =>
      Vue.set(state.order, 'sortLineItems', payload)
  },
  actions: {
    'order/itemsFilter':
      ({commit}, payload) => commit('muteItemsFilter', payload),
    'order/sortLineItems':
      ({commit}, payload) => commit('sortLineItems', payload)
  }
})

export default store
