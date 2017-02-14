import OrderMap from 'src/store/POJOs/OrderMapFactory'
import Product from 'src/store/POJOs/Product'

import schema from 'src/store/POJOs/OrderMapItem.schema'

describe('POJOs - OrderMapFactory', () => {
  it('should create a singleton', () => {
    const om1 = new OrderMap()
    const om2 = new OrderMap()
    expect(om1 === om1).to.be.equal(true)
  })

  it('should acces an ordermap with ordermap items matching spec', () => {
    const om3 = new OrderMap()
    const price = 2
    const product = new Product(undefined, undefined, price)
    const quantity = 3
    const item = om3.genItem({product, quantity})
    const omi1 = om3.gen([item])

    Object.keys(schema).forEach(k => {
      if(schema[k] === undefined)
        return

      switch (schema[k].name) {
        case 'Number':
          expect(omi1[0][k])
            .to.be.equal(quantity)
          break
        case 'Product':
          expect(omi1[0][k].price)
            .to.be.equal(price)
          break
        case 'getTotal':
          expect(omi1[0][k]())
            .to.be.equal(price * quantity)
          break
        default:
          console.log('default',typeof schema[k])
          expect(['string', 'function'].indexOf(typeof omi1[0][k]))
            .to.not.be.equal(-1)
          break
      }
    })
  })
})
