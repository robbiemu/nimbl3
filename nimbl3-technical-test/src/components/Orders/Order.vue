<template>
  <div id="order" class="component routeable">
    <div id="new-order" v-if="isNew">New Order</div>
    <div id="show-order" v-else>Order {{id}}</div>
  </div>
</template>

<script>
export default {
  props: ['isNew', 'id']
}
</script>

<style scoped>
</style>
