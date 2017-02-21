<template>
  <div id="order-estimate" class="estimate component box col-md-3 col-md-offset-8"
      :class="{floater: bp !== 'small'}" @click="toggleFloat($event)" >
    <div class="form-group">
      <label for="delivery">Estimated Delivery Date</label>

      <input type="text" class="form-control" id="delivery" v-model="order['estimated delivery date']" />

    </div>
    <hr />
    <div class="form-group">
      <div class="subtotal-label pull-left">Subtotal</div>
      <div class="subtotal pull-right">{{subTotal|currency}}</div>
    </div>
    <div class="form-group">
      <label for="shipping">Shipping</label>
      <input type="number" class="form-control" id="shipping" v-model="order.shipping" />
    </div>
    <div class="form-group">
      <label for="discount">Special Discount</label>
      <input type="number" class="form-control" id="discount" v-model="order['special discount']" />
    </div>
    <div class="form-group">
      <label for="tax">Tax</label>
      <div><input type="number" class="form-control" id="tax" v-model="order.tax" />%<div></div> {{tax|currency}}</div>
    </div>
    <hr />
    <div>
      <div class="total-label pull-left">Total</div>
      <div class="total pull-right">{{total|THB}}</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['order'],
  computed: {
    ...mapState({bp: (state) => state.nav.bp}),
    tax () {
      return (this.order.tax/100) * this.order.lineItems
        .reduce((p,c) =>  p + c.quantity * c['list price'], 0)
    },
    subTotal () {
      return this.order.lineItems
        .reduce((p,c) =>  p + c.quantity * c['list price'], 0)
    },
    total () {
      return this.order.lineItems
          .reduce((p,c) =>  p + c.quantity * c['list price'], 0) +
          (this.order.tax/100) * this.order.lineItems
            .reduce((p,c) =>  p + c.quantity * c['list price'], 0) +
          this.order.shipping -
          this.order['special discount']
    }
  },
  methods: {
    toggleFloat (e) {
       e.target.classList.toggle('floater')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'static/styles/orderEstimate.scss';
</style>
