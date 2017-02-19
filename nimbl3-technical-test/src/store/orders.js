'use strict';

/* TODO - move from dummy_data to API data */
import {orders as order_data} from './dummy_data'

const orders = {
  state: {orders: []}
}

/* TODO - make this import real data from API */
orders.state.orders = order_data

export default orders
