<template>
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
</template>

<script>
/* this object was designed to couple tightly with lineItems in a Order. Further work like necessary to modularize it */
import {mapState} from 'vuex'

export default {
  data () {
    return {
      searchState: false,
      searchStates: { start: false, during: true, processing: 'one' },
      searchTyping: undefined,
      icons: {
        'icon-plus': require('../../assets/icons/icon_plus.svg'),
      }
    }
  },
  computed: mapState({itemsFilter: (state) => state.order.itemsFilter}),
  methods: {
    search (event) {
      this.searchState = event.target.value?true:false
      this.$store.dispatch('order/sortLineItems', 'order')
    },
    maskItems (event) {
      this.$store.dispatch('order/itemsFilter', event.target.value)
      this.searchState = this.searchStates['processing']
      const self = this
      window.clearTimeout(this.searchTyping)
      this.searchTyping = setTimeout(function() {
        self.searchState = self.itemsFilter ?
          self.searchStates['during'] : self.searchStates['start']
          self.$store.dispatch('order/sortLineItems', 'order')
      }, 500)
    },
    checkClear (e) {
      /* recieve click calls in the input box for external image */
      if(this.searchState !== this.searchStates['during'])
        return

      const rect = document.querySelector('.clear-search').getBoundingClientRect()

      if(e.pageX - rect.left > rect.right-rect.left ||
        e.pageY - rect.top > rect.bottom-rect.top)
        return

      document.querySelector('.control.search > input').value=''
      this.searchState = this.searchStates['start']
      this.$store.dispatch('order/itemsFilter')
      this.$store.dispatch('order/sortLineItems', 'natural-order')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'static/styles/orderSearch';
</style>
