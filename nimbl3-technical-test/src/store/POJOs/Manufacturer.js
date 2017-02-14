'use strict';

import uuidV1 from 'uuid/v1'

class Manufacturer {
  constructor (name, id=uuidV1()) {
    this.id = id
    this.name = name
  }
}

export default Manufacturer
