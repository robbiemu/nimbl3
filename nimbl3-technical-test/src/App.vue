<template>
  <div id="app">
    <app-nav />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'app',
  components: {
    appNav: Nav
  }
}
</script>

<style lang="scss">
@import 'static/styles/global.scss';
@import 'static/styles/montserrat.scss';

@include getMontserrat(600);
@include getMontserrat(400);

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
