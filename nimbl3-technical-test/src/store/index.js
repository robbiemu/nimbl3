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
    nav: {
      bp: undefined
    },
    people, types, statuses
  },
  modules: {products, orders},
  mutations: {
    muteItemsFilter: (state, payload) => state.order.itemsFilter = payload,
    sortLineItems: (state, payload) => state.order.sortLineItems = payload,
    setBreakPoint: (state, payload) => {console.log('bp at ' +  payload)
      state.nav.bp = payload}
  },
  actions: {
    'order/itemsFilter':
      ({commit}, payload) => commit('muteItemsFilter', payload),
    'order/sortLineItems':
      ({commit}, payload) => commit('sortLineItems', payload),
    'nav/setBp': ({commit}, payload) => commit('setBreakPoint', payload)

  }
})

export default store
