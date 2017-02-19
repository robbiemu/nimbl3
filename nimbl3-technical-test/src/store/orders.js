'use strict';

/* TODO - move from dummy_data to API data */
import {orders as order_data} from './dummy_data'

const orders = {
  state: {orders: []},
  mutations: {
    updateOrder: (state, payload) =>{console.log(payload.orderid)
      state.orders.map(o => o.orderid === payload.orderid? payload: o)}
  },
  actions: {
    'UPDATE ORDER': ({commit}, payload) => commit('updateOrder', payload)
  }
}

/* TODO - make this import real data from API */
orders.state.orders = order_data

export default orders
