import lorem from 'lorem-ipsum'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const properNoun = (noun) => noun.charAt(0).toUpperCase() + noun.slice(1)

class OrderLineItem {
    constructor (opts={}) {
      const properties = Object.assign({}, OrderLineItem.schema, opts)
      Object.keys(properties).forEach(k => {
        if(properties[k] === String ||
           properties[k] === Number){
          properties[k] = OrderLineItem['default values'](k)
        }
        this[k] = properties[k]
      })
    }
}
OrderLineItem.schema = {
  sku: String,
  description: String,
  brand: String,
  'list price': Number,
  discount: Number,
  quantity: Number
}

OrderLineItem['default values'] = (k) => {
  switch (k) {
    case 'sku':
      const br = String.fromCharCode(97 + Math.round(Math.random()*26)) +
      String.fromCharCode(97 + Math.round(Math.random()*25))
      const ma = String.fromCharCode(97 + Math.round(Math.random()*26)) +
      String.fromCharCode(97 + Math.round(Math.random()*25))
      const mo = (''+(Math.random()*26)).substring(2,8).replace('.','')
      return `${br.toUpperCase()} ${ma.toUpperCase()} ${mo}`
    case 'description':
      return lorem({
          count: 1                      // Number of words, sentences, or paragraphs to generate.
        , units: 'sentences'            // Generate words, sentences, or paragraphs.
        , sentenceLowerBound: 5         // Minimum words per sentence.
        , sentenceUpperBound: 15        // Maximum words per sentence.
        , paragraphLowerBound: 3        // Minimum sentences per paragraph.
        , paragraphUpperBound: 7        // Maximum sentences per paragraph.
        , format: 'plain'               // Plain text or html
      })
    case 'brand':
      return properNoun(lorem({
          count: 1                      // Number of words, sentences, or paragraphs to generate.
        , units: 'words'
      }))
    case 'list price':
      return getRandomInt(400000,400)/100
    case 'discount':
      return getRandomInt(100,0)
    case 'quantity':
      return getRandomInt(20,1)
    default:
      return undefined
  }
}

class Order {
  constructor (opts={}) {
    const properties = Object.assign({}, Order.schema, opts)
    Object.keys(properties).forEach(k => {
      if(properties[k] === String ||
         properties[k] === Number ||
         properties[k] === OrderLineItem){
        properties[k] = Order['default values'](k)
      }
      this[k] = properties[k]
    })
  }
}
Order.schema = {
  name: String,
  address: String,
  creator: String,
  status: String,
  'estimated delivery date': String,
  shipping: Number,
  'special discount': Number,
  tax: Number,
  lineItems: OrderLineItem
}
Order['default values'] = (k) => {
  switch (k) {
    case 'name':
      return properNoun(lorem({
          count: 1                      // Number of words, sentences, or paragraphs to generate.
        , units: 'words'
      }))
    case 'address':
      const number = getRandomInt(10000,100)
      const remainder = properNoun(lorem({
         count: 2
       , units: 'words'
      }))
      return `${number} ${remainder} Thailand`
    case 'creator':
      return properNoun(lorem({
         count: 2
       , units: 'words'
      }))
    case 'status':
      return ['Pending', 'Shipping', 'Flagged', 'Awaiting Payment', 'etc'][getRandomInt(4,0)]
    case 'estimated delivery date':
      return `${getRandomInt(28,1)} ${getRandomInt(12,1)} 2017`
    case 'shipping':
      return 0
    case 'special discount':
      return 0
    case 'tax':
      return 7
    case 'lineItems':
      return [...Array(getRandomInt(10,1))].map(() => new OrderLineItem())
  }
}

export const orders = [new Order(), new Order(), new Order()]
