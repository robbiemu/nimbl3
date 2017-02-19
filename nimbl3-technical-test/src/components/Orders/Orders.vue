<template>
  <div id="orders" class="component routeable">
    Orders
    <ul class="orders">
      <li class="top">
        <div class="column orderid">Order Id</div>
        <div class="column name">Name</div>
        <div class="column telephone">Telephone</div>
        <div class="column address">Address</div>
        <div class="column creator">Creator</div>
        <div class="column status">Status</div>
      </li>
      <router-link tag="li" class="order" v-for="order in orders"
          :to="{name: 'Order', params: {id: order.orderid}}">
        <div class="orderid">{{order.orderid}}</div>
        <div class="name">{{order.name}}</div>
        <div class="telephone">{{order.telephone}}</div>
        <div class="address">{{order.address}}</div>
        <div class="creator">{{order.creator}}</div>
        <div class="status">{{order.status}}</div>
      </router-link>
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
@import 'static/styles/orders.scss';
</style>
