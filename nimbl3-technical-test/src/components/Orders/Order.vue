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
        <li class="control search" @click="checkClear($event)">
          <img :src="icons['icon-plus']" v-show="searchState===searchStates['start']" />
          <img class="clear-search"
            :src="icons['icon-plus']" v-show="searchState===searchStates['during']"
            style="transform: rotate(45deg)" />
          <svg class="button" expanded="true" height="50px" width="50px"
          v-show="searchState===searchStates['processing']"
          style="margin-top: 10px">
            <circle class="innerCircle" cx="25%" cy="25%" r="20.1365%" fill="none" stroke="#8899AA" stroke-width="5%">
              <animate attributeType="SVG" attributeName="r" begin="0s" dur="1s" repeatCount="indefinite" from="5%" to="25%"></animate>
              <animate attributeType="CSS" attributeName="stroke-width" begin="0s" dur="1s" repeatCount="indefinite" from="3%" to="0%"></animate>
              <animate attributeType="CSS" attributeName="opacity" begin="0s" dur="1s" repeatCount="indefinite" from="1" to="0"></animate>
            </circle>
          </svg>
          <!-- TODO - missing animated SVG asset -->
          <input type="text"
            @keyup="maskItems($event)" @change="search($event)" />
        </li>
        <li class="line-item" v-for="(lineItem, index) in order.lineItems"
            :class="{floater: willFloat(lineItem)}"
            :data-natural-order="index"
            :data-order="willFloat(lineItem)? index : 1000+index">
          <div class="sku">{{lineItem.sku}}</div>
          <div class="description">{{lineItem.description}}</div>
          <div class="brand">{{lineItem.brand}}</div>
          <div class="list-price">{{lineItem['list price']}}</div>
          <div class="discount">{{lineItem.discount}}</div>
          <div class="quantity">
            <div v-if="editableQuantity[lineItem.sku]">
              <input class="form-control" type="number" placeholder="1"
                v-model="lineItem.quantity"
                @change.lazy="toggle('editableQuantity', lineItem.sku)" />
            </div>
            <div v-else>{{lineItem.quantity}}</div>
            <img class="edit-button" :src="icons['icon-edit']"
              v-show="!editableQuantity[lineItem.sku]"
              @click="toggle('editableQuantity', lineItem.sku)" />
          </div>
          <div class="control cancel"><a @click="removeItem(lineItem.sku)">Remove Item</a></div>
        </li>
      </ul>

      <h4>Remarks</h4>
      <div class="remarks box">{{order.remarks}}</div>
    </div>

    <div class="floater summary box col-md-3 col-md-offset-8">
      <div class="form-group">
        <label for="delivery">Estimated Delivery Date</label>

        <input type="text" class="form-control" id="delivery" v-model="order['estimated delivery date']" />

      </div>
      <hr />
      <div>
        <div class="pull-left">Subtotal</div>
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
        <div><input type="number" class="form-control" id="tax" v-model="order.tax" @change="$forceUpdate()" />% {{tax|currency}}</div>
      </div>
      <hr />
      <div>
        <div class="pull-left">Total</div>
        <div class="subtotal pull-right">{{total|THB}}</div>
      </div>
    </div>

    <div class="base" :class="{'modal-base': itemsFilter}"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'

export default {
  props: ['isNew', 'id'],
  data () {
    return {
      itemsFilter: undefined,
      searchState: false,
      searchStates: { start: false, during: true, processing: 'one' },
      searchTyping: undefined,
      editableQuantity: {},
      icons: {
        'icon-edit': require('../../assets/icons/icon_edit.svg'),
        'icon-plus': require('../../assets/icons/icon_plus.svg'),
      },
      order: Vue.util.extend({}, this.$store.state.orders.orders
          .find(o => o.orderid === this.id))
    }
  },
  computed: {
    ...mapState(['people', 'types', 'statuses']),
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
    maskItems (event) {
      this.itemsFilter = event.target.value
      this.searchState = this.searchStates['processing']
      const self = this
      window.clearTimeout(this.searchTyping)
      this.searchTyping = setTimeout(function() {
        self.searchState = self.itemsFilter ?
          self.searchStates['during'] : self.searchStates['start']
          self.sortLineItems()
      }, 500)
    },
    search (event) {
      this.searchState = event.target.value?true:false
      this.sortLineItems()
    },
    sortLineItems (sort='order') {
      const ul = document.querySelector('.line-items')
      Array.from(document.querySelectorAll('.line-items .line-item'))
        .sort((a, b) => Number.parseInt(a.getAttribute('data-'+sort)) >
          Number.parseInt(b.getAttribute('data-'+sort)))
        .forEach(e => ul.appendChild(e))
    },
    update () {
      this.$store.dispatch('UPDATE ORDER', Vue.util.extend({}, this.order))
    },
    removeItem (id) {
      const idx = this.order.lineItems.indexOf(
        this.order.lineItems.find((i) => i.sku === id))
      this.order.lineItems.splice(idx,1)
    },
    toggle (where, node) {
      const copy = Vue.util.extend({}, this[where])
      copy[node] = !copy[node]
      Vue.set(this, where, copy)
    },
    willFloat (lineItem) {
      if(!this.itemsFilter)
        return false
      const regex = new RegExp(this.itemsFilter.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"))
      return Object.keys(lineItem).some(k => regex.test(lineItem[k]))
    },
    checkClear (e) {
      if(this.searchState !== this.searchStates['during'])
        return

      const rect = document.querySelector('.clear-search').getBoundingClientRect()

      if(e.pageX - rect.left > rect.right-rect.left ||
        e.pageY - rect.top > rect.bottom-rect.top)
        return

      document.querySelector('.control.search > input').value=''
      this.searchState = this.searchStates['start']
      this.itemsFilter = undefined
      this.sortLineItems('natural-order')
    }
  },
  mounted () {
    const self = this
    this.order.lineItems.forEach(i => self.editableQuantity[i.sku]=false)
    Vue.set(this.order, 'lineItems', this.order.lineItems)
  }
}
</script>

<style lang="scss" scoped>
@import 'static/styles/order.scss';
</style>
