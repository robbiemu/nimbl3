import lorem from 'lorem-ipsum'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const properNoun = (noun) => noun.charAt(0).toUpperCase() + noun.slice(1)

let names = new Set()
export const types = ['Retailers','Individual', 'Enterprise']
export const statuses = ['Pending', 'Shipping', 'Flagged', 'Awaiting Payment', 'etc']

const commonThaiNames = JSON.parse('["กนกพร","กมล","กระสินธ์","กฤษฏิ์","กล้า","กาญจนา","กานดา","กุญชนิตา","กุมโชค","กุลพันธ์","เกษม","แก้ว","ขจี","ขนิษฐา","ขวัญจิต","ขวัญ","ขวัญ","คลัง","จตุพล","จักรี","จันทนา","จันทร์สิริ","จารุวรรณ","จินตหรา","จินทนา","จุลภาส","เจือ","ฉลวย","เฉลิม","ชนะ","ชนินทร์","ชนิภรณ์","ชมเกดุ","ชวน","ชัยพร","ชัย","ชาญชัย","ชาติ","ชาติชาย","ชิด","ชุ่ม","ชูวิทย์","เชาวน์","เซติยัง","เซติอาวัน","ญาณิน","ฐิตวรรณ","ฐิติภรณ์","ณรงค์ศักดิ์","ณัฎฐา","ณัฏฐสิทธิ์","ณัฐิมา","ณี","ดนัย","ดนุพล","ดวงกมล","ดวงใจ","ดุสิต","เดือนเพ็ญ","แดง","ตนุพล","ถนัด","ถวิล","ทวีฉัตร","ทวีป","ทวีวงศ์","ทวีศักดิ์","ทักษิณ","ทัศนีย์","ธงชัย","ธนัชชา","ธนากร","ธนาพร","ธเนศ","ธีรภัทร","ธีร","นงนุช","นงลักษณ์","นพคุณ","นพดล","นพ","นภสร","นรินทร์ศักดิ์","นริศา","นฤมล","นววรรณ","นัยนา","นาก","นาค","นารี","นิตยา","นีราชา","เนาว","บัญญัติ","บัณฑิตา","บุญยง","บุญเยี่ยม","บุญรัตน์","บุญ","บุศวรรณ","บุษราคัม","ปกรณ์","ปฏิภาณ","ปฐม","ประชา","ประดิษฐ์","ประทีป","ประทุม","ประพันธ์","ประภาส","ประมนต์","ประมุข","ประวิตร","ประวิทย์","ประเวช","ประเวศ","ประสงค์","ประสาน","ประสิทธิ์","ประเสริฐ","ปรัชญา","ปราณี","ปรารถนา","ปริญญา","ปรีชา","ปรีดา","ปวีณา","ป้อง","ปัญญา","ปานใจ","ปานเทพ","ปาริชาติ","ปิติ","ปิยบุตร","ปิยวรรณ","ปิยะคม","ปีติ","ปีย์รติ","เปรม","ผ่องเพ็ญ","ผาณิต","เผด็จ","พนม","พนิต","พยนต์","พรชัย","พรพรรณ","พรพันธุ์","พรรณี","พรรัมภา","พลเดช","พัชรพร","พัฒนา","พาณิชย์","พาที","พิกุล","พิจิตร","พิชิต","พินิจ","พิภพ","พิมพ์ใจ","พิมพ์วสี","พิราวรรณ์","พิริยะ","พูนศักดิ์","เพ็ญสุขภรณ์","เพิ่ม","ไพฑูรย์","ไพบูลย์","ไพรัช","ไพศักดิ์","ไพศาล","ฟุ้งฟ้า","ภรณ์พรรณ","ภรณ์พันธ์","ภรณ์พันธุ์","ภานุพัฒน์","ภาสุระ","ภิรมย์","ภุชงค์","ภูมินทร์","ภูมิพัฒน์","มงคล","มณี","มณู","มนตรี","มนู","มโน","มะลิ","มาณี","มานิจ","มานิตย์","มารวย","มาลี","มุกดา","ยิ่งยศ","ยุทธ์","ยุพิน","ยุวรัตน์","เยาว","รอง","รังรอง","รัตน์","ราม","รินรดา","รื่น","รื่น","รุ่งสิทธิ์","ฤดี","ฤทัย","วรพร","วรภัทร","วรรณ","วรรณา","วราภรณ์","วัชราภรณ์","วัฒนา","วันพล","วัลลภ","วัลลภา","วานี","วิจารณ์","วิจิตร","วิชัย","วิเชียร","วิทยา","วินัย","วิภา","วิภาภรณ์","วิรัช","วิริยะ","วิโรจน์","วิลาศ","วิศิษฏ์","วิเศษ","วิสา","วีรยุทธ์","วีรศักดิ์","วีระ","วีระ","วีระชาติ","วีระชาย","วีระพล","วีระพันธุ์","วีระศักดิ์","ศรีศักดิ์","ศศิธร","ศักดา","ศักดิ์ทิพย์","ศิริ","ศิริโชค","ศิริณี","ศิริพงศ์","ศิริ","ศิริพล","ศิริพันธ์","ศิริรัตน์","ศิริวรรณ","ศุภชัย","ศุภผล","ศุภรัตน์","ศุภวิทย์","ศุภ","สกุล","สนธิ","สนั่น","สนิท","สมควร","สมคิด","สมจิต","สมชาย","สมโชค","สมทรง","สมบัติ","สมบุญ","สมบูรณ์","สมพงษ์","สมพร","สมเพียร","สมภพ","สมยศ","สมร","สมรัตน์","สมลักษณ์","สมศรี","สมศักดิ์","สมหมาย","สมัคร","สริตา","สลิลธร","สวัสดิ์","สว่าง","สังวาล","สันติ","สากล","สาธิต","สาธิตยัง","สามารถ","สายพิณ","สาย","สาวิทย์","สิงห์","สิทธิ","สิริกิติ์","สิริรักษ์","สีห์ศักดิ์","สุกัญญา","สุจิต","สุจินดา","สุชาดา","สุชาดาจะ","สุชาติ","สุชาย","สุด","สุดา","สุทธิพงศ์","สุทธิพล","สุเทพ","สุธรรม","สุนทรี","สุนัย","สุนี","สุนีย์","สุประภา","สุพรรณ","สุพิชา","สุพิศ","สุภา","สุภาพ","สุภาภรณ์","สุเมธ","สุรัตน์","สุริยะ","สุริยา","สุรี","สุวรรณ","สุวิชา","สุ","สุหัตถ์","เสรี","แสง","โสภาค","หทัย","หนิว","อดิศักดิ์","อนันต์","อนันต","อนุชา","อภิชาต","อภิชาติ","อภิญญา","อภิรักษ์","อภิศักดิ์","อภิสิทธิ์","อมร","อมรรัตน์","อรรถสิทธิ์","อริศรา","อรุณศรี","อักขระ","อัญชลี","อัญชลี","อัญญาณี","อัษฎา","อัษรา","อาณัติ","อาทิตย์","อารง","อารี","อารีพงศ์","อุกฤษฏ์","อุกิต","อุดม","อุบล","อุบลวรรณ","เอกพงษ์","เอกใหม่","สังวาลย์"]')

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
      let br = String.fromCharCode(97 + Math.round(Math.random()*26)) +
      String.fromCharCode(97 + Math.round(Math.random()*26))
      let ma = String.fromCharCode(97 + Math.round(Math.random()*26)) +
      String.fromCharCode(97 + Math.round(Math.random()*26))
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
      return getRandomInt(400,400000)/100
    case 'discount':
      return getRandomInt(0,100)
    case 'quantity':
      return getRandomInt(1,20)
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
  orderid: String,
  type: String,
  name: String,
  address: String,
  telephone: String,
  creator: String,
  status: String,
  'estimated delivery date': String,
  shipping: Number,
  'special discount': Number,
  tax: Number,
  remarks: String,
  lineItems: OrderLineItem
}
Order['default values'] = (k) => {
  switch (k) {
    case 'orderid':
      const br = String.fromCharCode(97 + Math.round(Math.random()*26)) +
      String.fromCharCode(97 + Math.round(Math.random()*26))
      const mo = (''+(Math.random()*26)).substring(2,7).replace('.','')
      return `${br.toUpperCase()} ${mo}`
    case 'type':
      return types[getRandomInt(0,2)]
    case 'name':
      return Math.random()>0.5?
        lorem({
            count: getRandomInt(2,4)  // Number of words, sentences, or paragraphs to generate.
          , units: 'words'
        }).split(' ').map(w => properNoun(w)).join(' '):
        lorem({count: getRandomInt(2,4), units: 'words', words: commonThaiNames })
    case 'address':
    const number = getRandomInt(100,10000)
    const remainder = properNoun(lorem({
       count: 2
     , units: 'words'
    }))
      return `${number} ${remainder} Thailand`
    case 'telephone':
      let no = []
      let format = [2,3,3,2,2]
      format.forEach(len => {
        let group = ''+getRandomInt(0,10*len)
        while(group.length < len) {
          group = '0' + group
        }
        no.push(group)
      })
      return '+' + no.join(' ')
    case 'creator':
      let name = Math.random()>0.5?
        lorem({count: getRandomInt(2,4), units: 'words'}).split(' ').map(w => properNoun(w)).join(' '):
        lorem({count: getRandomInt(2,4), units: 'words', words: commonThaiNames })
      names.add(name)
      return name
    case 'status':
      return statuses[getRandomInt(0,4)]
    case 'estimated delivery date':
      return `${getRandomInt(1,28)}-${getRandomInt(1,12)}-${2017+getRandomInt(1,0)}`
    case 'shipping':
      return 0
    case 'special discount':
      return 0
    case 'tax':
      return 7
    case 'remarks':
      return properNoun(lorem({
         count: getRandomInt(4,1)
       , units: 'paragraphs'
      }))
    case 'lineItems':
      return [...Array(getRandomInt(1,10))].map(() => new OrderLineItem())
  }
}

export const orders = [new Order(), new Order(), new Order()]
console.log(orders)
export const people = Array.from(names)
