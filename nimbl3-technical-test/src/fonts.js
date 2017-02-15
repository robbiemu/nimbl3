const fonts = {
  Montserrat: {
    'Montserrat-Black.otf': {weight:800, format:'opentype'},
    'Montserrat-ExtraBold.otf': {weight:700, format: 'opentype'},
    'Montserrat-Bold.ttf': {weight:600, format: 'truetype'},
    'Montserrat-SemiBold.otf': {weight:500, format:'opentype'},
    'Montserrat-Regular.ttf': {weight:400, format: 'truetype'},
    'Montserrat-Light.otf': {weight:300, format: 'opentype'},
    'Montserrat-UltraLight.otf': {weight:200, format: 'opentype'},
    'Montserrat-Hairline.otf': {weight:100, format: 'opentype'},
  }
}
let f = ''
let style = ''
Object.keys(fonts).forEach(font => {
  Object.keys(fonts[font]).forEach(k => {
    f = require('assets/fonts/'+k)
    style += `
  @font-face {
    font-family: "Montserrat";
    src: url("${f}") format("${fonts[font][k].format}") ;
    font-weight: ${fonts[font][k].weight};
  }
`
  })
})
export default '<style>'+style+'</style>'
