<template>
  <div id="order" class="component routeable">
    <div id="new-order" v-if="isNew">New Order</div>
    <div id="show-order" v-else>

      <div class="breadcrumbs">
        <span class="route">Order</span>
        <span class="id">{{order.orderid}}</span>
      </div>

      <app-order-summary :order="order" />
      <app-order-estimate :order="order" v-if="bp === 'small'" />

      <ul class="line-items box">
        <app-order-search v-if="bp !== 'small'" />

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
              <input class="form-control editable-quantity" type="number" placeholder="1"
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

    <app-order-estimate :order="order" v-if="bp !== 'small'" />
    <app-order-search v-else />

    <div class="base" :class="{'modal-base': itemsFilter}"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'

import OrderEstimate from './OrderEstimate.vue'
import OrderSummary from './OrderSummary.vue'
import OrderSearch from './OrderSearch.vue'

export default {
  props: ['isNew', 'id'],
  components: {
    'app-order-estimate': OrderEstimate,
    'app-order-summary': OrderSummary,
    'app-order-search': OrderSearch
  },
  data () {
    return {
      icons: {
        'icon-edit': require('../../assets/icons/icon_edit.svg')
      },
      editableQuantity: {},
/* making a static copy - in practice we would use a clone method on the POJO */
      order: (() => {
        const orig = this.$store.state.orders.orders
          .find(o => o.orderid === this.id)
        let ord = {}
        Object.keys(orig).forEach(k => {
          if(k === 'lineItems'){
            ord[k] = orig.lineItems.map(i => Object.assign({}, i))
          } else {
            ord[k] = orig[k]
          }
        })
        return ord
      })()
    }
  },
  computed: mapState({
    itemsFilter: (state) => state.order.itemsFilter,
    storeSortLineItems: (state) => state.order.sortLineItems,
    bp: (state) => state.nav.bp
  }),
  watch: {
    storeSortLineItems () {
      if(!this.storeSortLineItems)
        return
      this.sortLineItems(this.storeSortLineItems)
      this.$store.dispatch('order/sortLineItems')
    }
  },
  methods: {
    sortLineItems (sort) {
      const ul = document.querySelector('.line-items')
      Array.from(document.querySelectorAll('.line-items .line-item'))
        .sort((a, b) => Number.parseInt(a.getAttribute('data-'+sort)) >
          Number.parseInt(b.getAttribute('data-'+sort)))
        .forEach(e => ul.appendChild(e))
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
    }
  },
  mounted () {
    const self = this
    this.order.lineItems.forEach(i => self.editableQuantity[i.sku]=false)
    Vue.set(this.order, 'lineItems', this.order.lineItems)
  },
  beforeRouteLeave: function(to, from, next) {
    this.$store.dispatch('order/sortLineItems') //reseting these
    this.$store.dispatch('order/itemsFilter')
    next();
  }
}
</script>

<style lang="scss" scoped>
@import 'static/styles/order.scss';
</style>
