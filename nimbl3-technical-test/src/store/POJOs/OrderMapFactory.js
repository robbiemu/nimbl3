'use strict';

import schema from './OrderMapItem.schema'

class OrderMapFactory {
  static instance

  constructor () {
    if(this.instance){
      return this.instance;
    }
    this.instance = this;
  }

  gen(opts=[]) {
    return opts
  }

  genItem(opts) {
    let orderItem = Object.assign({}, schema)

    Object.keys(schema).forEach(k => {

      switch (schema[k].name) {
        case 'Number':
        case 'Product':
          orderItem[k] = undefined
          break
        case 'getTotal':
          break
      }
    })

    orderItem = Object.assign(orderItem, opts)

    return orderItem
  }
}

export default OrderMapFactory
