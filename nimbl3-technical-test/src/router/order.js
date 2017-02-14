import Order from 'components/Orders/Order.vue'

export const neworder = {
  path: '/order/new',
  name: 'NewOrder',
  component: Order,
  props: {isNew: true}
}

export const order = {
  path: '/order/:id',
  name: 'Order',
  component: Order,
  props: true
}
