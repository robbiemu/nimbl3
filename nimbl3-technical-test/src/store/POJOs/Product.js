'use strict';

import uuidV1 from 'uuid/v1'

class Product {
  constructor (description, manufacturer, price, id=uuidV1()) {
    this.id = id
    this.description = description
    this.manufacturer = manufacturer
    this.price = price
  }
}

export default Product
