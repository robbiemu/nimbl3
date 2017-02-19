<template>
  <div id="order" class="component routeable">
    <div id="new-order" v-if="isNew">New Order</div>
    <div id="show-order" v-else>
      Order {{id}}
      <ul class="order">
        <li class="top">
          <div class="column sku">SKU</div>
          <div class="column description">Description</div>
          <div class="column brand">Brand</div>
          <div class="column list-price">List Price</div>
          <div class="column discount">Discount</div>
          <div class="column quantity">Quantity</div>
        </li>
        <li class="lineItem" v-for="order in orders">
          <div class="sku">{{order.sku}}</div>
          <div class="description">{{order.description}}</div>
          <div class="brand">{{order.brand}}</div>
          <div class="list-price">{{order['list price']}}</div>
          <div class="discount">{{order.discount}}</div>
          <div class="quantity">{{order.quantity}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isNew', 'id']
}
</script>

<style scoped>
</style>
