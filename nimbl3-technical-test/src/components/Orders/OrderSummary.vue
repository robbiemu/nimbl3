<template>
  <div class="toprow">
    <div class="order box col-md-10">
      <div class="identity">
        <div class="name">{{order.name}}</div>
        <div class="address">{{order.address}}</div>
        <div class="telephone">{{order.telephone}}</div>
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
    <div class="bp-small">
      <div class="dropdown creator">
        <h6>Owned By</h6>
        <select v-model="order.creator" class="form-control">
          <option v-for="person in people" :value="person">{{person}}</option>
        </select>
      </div>
      <div class="dropdown status">
        <h6>Status</h6>
        <select v-model="order.status" class="form-control">
          <option v-for="status in statuses" :value="status">{{status}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapState} from 'vuex'

export default {
  props: ['order'],
  computed: mapState(['people', 'types', 'statuses']),
  methods: {
    update () {
      this.$store.dispatch('UPDATE ORDER', Vue.util.extend({}, this.order))
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'static/styles/orderSummary.scss';
</style>
