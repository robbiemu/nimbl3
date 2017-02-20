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
@include getMontserrat(300);

#app {
  color: #2c3e50;
  display:flex;
  font-family: Montserrat;
  font-size: 12px;
  height: 100%;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  line-height: 15px;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  .component.routeable {
    margin-top: 15px;
    animation-name: ComponentSlideOut;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;

    &.nav {
      animation-name: ComponentSlideIn;
      animation-duration: 0.1s;
      animation-fill-mode: forwards;
      animation-iteration-count: 1;
      animation-timing-function: ease-in;
      margin-top: $overbar-height + 15px;
    }
  }

  @keyframes ComponentSlideIn {
    from { margin-left: $sidebar-width + 15px }
    to   { margin-left: 15px }
  }
  @keyframes ComponentSlideOut {
    from { margin-left: 15px }
    to   { margin-left: $sidebar-width + 15px }
  }
}
</style>
