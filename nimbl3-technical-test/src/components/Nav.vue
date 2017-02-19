<template>
  <div class="component" id="nav">
  <nav id="sidebar">
    <div @click="toggle" class="sidebar-brand"><img :src="logo" /></div>
    <ul>
      <router-link v-for="route in Object.keys(activeRoutes)"
          :to="{ name: properNoun(route) }"
          tag="li"
          class="btn"
          :class="'route-'+route.replace(' ','-')"
          active-class="active-route"
          @mouseover.native="highlightedRoutes[route]=true"
          @mouseleave.native="highlightedRoutes[route]=false">
        <div class="route-icon-container">
          <img class="route-icon" :src="routeResources[route].active"
            v-if="activeRoutes[route] || highlightedRoutes[route]" />
          <img class="route-icon" :src="routeResources[route].inactive" v-else />
        </div>
        <div class="proper-noun">{{route}}</div>
      </router-link>
      <li></li>
    </ul>
    <div id="nav-footer" class="bottom">
      <!-- the following asset downloaded from the project source does not match the sample
      <img :src="poweredby" />-->
      <div class="row">
        <div class="centered">POWERED BY</div>
      </div>
      <img :src="logo" />
    </div>
  </nav>
  <nav id="overbar" class="nav">
    <div class="navbar-brand" @click="toggle"><img :src="logo" /></div>
    <div class="btn"><big>Nav</big></div>
  </nav>
</template>

<script>
import routeResources from './routeResources'
import activeRoutes from './activeRoutes'
const highlightedRoutes = Object.assign({}, activeRoutes)

const properNoun = (noun) => noun.charAt(0).toUpperCase() + noun.slice(1)

export default {
  data () {
    return {
      nav: true,
      logo: require('../assets/icons/logo-white.svg'),
      activeRoutes,
      highlightedRoutes,
      /* TODO - the following asset downloaded from the project source does not match the sample
      poweredby: require('../assets/icons/poweredby.svg')*/
      routeResources
    }
  },
  watch: {
    '$route.name': function () {
      Object.keys(this.activeRoutes)
        .map(r => this.activeRoutes[r] = properNoun(r) === this.$route.name ?
            true : false
        )
      if (this.$route.name === 'Order')
                  this.activeRoutes['orders'] = true

    }
  },
  updated () {
    if (this.$route.name === 'Order')
      document.querySelector('.route-orders').classList
        .toggle('active-route')
  },
  methods: {
    properNoun,
    /* the follow are methods for navigation slide animation */
    slide (dir) {
      const el = document.getElementById('sidebar')
      const opp = dir === 'in'? 'out' : 'in'

      if(el.classList.contains('slide-' + dir))
        return

      if(el.classList.contains('slide-' + opp))
        el.classList.remove('slide-' + opp)

      el.classList.add('slide-' + dir)

      setTimeout(function () {
        document.getElementById('overbar').classList.toggle('show')
        document.getElementById('sidebar').classList.toggle('show')
        let component = document.querySelector('.component.routeable')
        if(component)
          component.classList.toggle('nav')
      }, 250)
    },
    slideIn () { this.slide('in') },
    slideOut () { this.slide('out') },
    toggle () {
      const dir = this.nav? 'out' : 'in'
      this.slide(dir)
      this.nav = !this.nav
    }
  },
  mounted () {
    document.getElementById('sidebar').classList.add('show')
  }
}
</script>

<style lang="scss" scoped>
@import 'static/styles/nav.scss';

#sidebar.slide-in {
  animation-name: SlideIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
}
#sidebar.slide-out {
  animation-name: SlideOut;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease-out;
}

@keyframes SlideIn {
  from { margin-left:-100vw; }
  to   { margin-left: 0 }
}
@keyframes SlideOut {
  from { margin-left: 0 }
  to   { margin-left:-100vw; }
}
</style>
