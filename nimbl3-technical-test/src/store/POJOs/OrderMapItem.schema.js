import Product from './Product'

const orderMapItem = {
  product: Product,
  quantity: Number,
  getTotal() {
    return (!this.product)? 0 : (this.product.price || 0) * (this.quantity || 0)
  }
}
export default orderMapItem
