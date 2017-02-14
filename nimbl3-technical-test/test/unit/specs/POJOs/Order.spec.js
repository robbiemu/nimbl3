import Order from 'src/store/POJOs/Order'
import OrderMap from 'src/store/POJOs/OrderMapFactory'

describe('POJOs - Order', () => {
  it('should create an object with a default id', () => {
    const ord1 = new Order()
    expect('id' in ord1).to.be.equal(true)
    expect(ord1.id).to.not.be.equal(undefined)
  })

  it('should create an object accepting an orderMap and id', () => {
    const id = 'test id'
    const product = 'test product'
    const quantity = 'test quantity'

    const OM = new OrderMap()
    const orderMap = OM.gen([{product, quantity}])
    const ord2 = new Order(orderMap,id)

    expect(ord2.id).to.be.equal(id)
    expect(ord2.orderMap[0].product).to.be.equal(product)
  })
})
