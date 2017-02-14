import Manufacturer from 'src/store/POJOs/Manufacturer'

describe('POJOs - Manufacturer', () => {
  it('should create an object with a default id', () => {
    const man1 = new Manufacturer()
    expect('id' in man1).to.be.equal(true)
    expect(man1.id).to.not.be.equal(undefined)
  })

  it('should create an object accepting name and id', () => {
    const id = 'test id'
    const name = 'test name'
    const man2 = new Manufacturer(name,id)
    expect(man2.id).to.be.equal(id)
    expect(man2.name).to.be.equal(name)
  })
})
