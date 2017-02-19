<template>
  <div id="order" class="component routeable">
    <div id="new-order" v-if="isNew">New Order</div>
    <div id="show-order" v-else>

      <div class="breadcrumbs">
        <span class="route">Order</span>
        <span class="id">{{order.orderid}}</span>
      </div>

      <div class="toprow">
        <div class="order box col-md-10">
        <div class="identity">
          <div class="name">{{order.name}}</div>
          <div class="address">{{order.address}}</div>
          <div class="telehone">{{order.telephone}}</div>
        </div>
        <div class="dropdown type">
          <h3>Type</h3>
          <select v-model="order.type" class="form-control">
            <option v-for="type in types" :value="type">{{type}}</option>
          </select>
        </div>
        <div class="dropdown creator">
          <h3>Owned By</h3>
          <select v-model="order.creator" class="form-control">
            <option v-for="person in people" :value="person">{{person}}</option>
          </select>
        </div>
        <div class="dropdown status">
          <h3>Status</h3>
          <select v-model="order.status" class="form-control">
            <option v-for="status in statuses" :value="status">{{status}}</option>
          </select>
        </div>
      </div>
        <div class="actions">
          <router-link :to="{name: 'Orders'}" tag="button" class="btn btn-secondary">Back</router-link>
          <button class="btn btn-primary" @click="update()">Update Order</button>
        </div>
      </div>

      <ul class="line-items box">
        <li class="line-item" v-for="lineItem in order.lineItems">
          <div class="sku">{{lineItem.sku}}</div>
          <div class="description">{{lineItem.description}}</div>
          <div class="brand">{{lineItem.brand}}</div>
          <div class="list-price">{{lineItem['list price']}}</div>
          <div class="discount">{{lineItem.discount}}</div>
          <div class="quantity">
            {{lineItem.quantity}}
            <img :src="icons['icon-edit']" @click="modal('line-item',line-item,'quantity')" />
          </div>
        </li>
      </ul>
    </div>
    <div class="base"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  props: ['isNew', 'id'],
  data () {
    return {
      icons: {
        'icon-edit': require('../../assets/icons/icon_edit.svg')
      }
    }
  },
  computed: {
    ...mapState(['people', 'types', 'statuses']),
    order: function() {
      return this.$store.state.orders.orders.find(o => o.orderid === this.id)
    }
  },
  methods: {
    update() {
      this.$store.dispatch('UPDATE ORDER', this.order)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'static/styles/order.scss';
</style>
