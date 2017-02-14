import Product from 'src/store/POJOs/Product'
import Manufacturer from 'src/store/POJOs/Manufacturer'

describe('POJOs - Product', () => {
  it('should create an object with a default id', () => {
    const prod1 = new Product()
    expect('id' in prod1).to.be.equal(true)
    expect(prod1.id).to.not.be.equal(undefined)
  })

  it('should create an object accepting description, manufacturer, price and id', () => {
    const man = { id: 'test man id', name: 'test man name'}
    const man1 = new Manufacturer(man.name, man.id)

    const prod = {
      id: 'test prod id',
      description: 'test description',
      manufacturer: man1,
      price: 2
    }
    const prod2 = new Product(prod.description, prod.manufacturer, prod.price, prod.id)

    expect(prod2.id).to.be.equal(prod.id)
    expect(prod2.description).to.be.equal(prod.description)
    expect(prod2.price).to.be.equal(prod.price)
    expect(prod2.manufacturer.id).to.be.equal(man.id)
  })
})
