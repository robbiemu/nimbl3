<template>
  <div id="orders" class="component routeable">
    Orders
    {{orders}}
    <ul class="orders">
      <li class="top">
        <div class="column sku">SKU</div>
        <div class="column description">Description</div>
        <div class="column brand">Brand</div>
        <div class="column list-price">List Price</div>
        <div class="column discount">Discount</div>
        <div class="column quantity">Quantity</div>
      </li>
      <li class="order" v-for="order in orders">
        <div class="sku">{{order.sku}}</div>
        <div class="description">{{order.description}}</div>
        <div class="brand">{{order.brand}}</div>
        <div class="list-price">{{order['list price']}}</div>
        <div class="discount">{{order.discount}}</div>
        <div class="quantity">{{order.quantity}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState({orders: state => state.orders.orders})
}
</script>

<style lang="scss" scoped>
@import 'static/styles/order.scss';
</style>
