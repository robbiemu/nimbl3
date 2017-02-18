'use strict';

import {load} from './separate_routes'

export const neworder = {
  path: '/order/new',
  name: 'NewOrder',
  component: load('Orders/Order'),
  props: {isNew: true}
}

export const order = {
  path: '/order/:id',
  name: 'Order',
  component: load('Orders/Order'),
  props: true
}
