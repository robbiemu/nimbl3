'use strict';

import {load} from './separate_routes'

const orders = {
  path: '/orders',
  name: 'Orders',
  component: load('Orders/Orders')
}

export default orders
