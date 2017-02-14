'use strict';

import uuidV1 from 'uuid/v1'

class Order {
  constructor (orderMap, id=uuidV1()) {
    this.id = id
    this.orderMap = orderMap
  }
}

export default Order
