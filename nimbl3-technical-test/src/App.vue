<template>
  <div id="app">
    <app-nav />
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

import style from './fonts'

export default {
  name: 'app',
  components: {
    appNav: Nav
  },
  created () {
    const temp = document.createElement('div');
    temp.innerHTML = style;
    const ele = temp.firstChild;

    const body = document.querySelector('body')
    body.insertBefore(ele, body.firstChild);
  }
}
</script>

<style>
#app {
  margin-top: 60px;
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  line-height: 15px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
