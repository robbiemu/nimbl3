'use strict';

import Vue from 'vue'
import Router from 'vue-router'

import orders from './orders'
import {neworder, order} from './order'
import etc from './etc'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    orders,
    neworder,
    order,
    ...etc
  ]
})
