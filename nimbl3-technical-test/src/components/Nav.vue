<template>
  <div class="component" id="nav">
    <nav id="sidebar">
      <div @click="toggle" class="sidebar-brand"><img class="logo" :src="icons.logo" /></div>
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
        <li><!-- TODO - min margin-top setup in scss --></li>
      </ul>
      <div id="nav-footer" class="bottom">
        <!-- the following asset downloaded from the project source does not match the sample
        <img :src="poweredby" />-->
        <div class="row">
          <div class="centered">POWERED BY</div>
        </div>
        <img :src="icons.logo" />
      </div>
    </nav>
    <nav id="overbar" class="nav">
      <div class="navbar-brand" @click="toggle" v-if="this.$route.name==='Home'"><img class="logo" :src="icons.logo" /></div>
      <div class="navbar-brand" :class="{order:this.$route.name='Order'}" v-else>
        <router-link :to="{name: this.$route.name==='Order'?'Orders':'Home'}" tag="img"
          class="nav-icon" :src="icons['arrow-yellow']" />
        <span :class="{order:this.$route.name==='Order'}">{{getRouteName()}}</span>
        <img class="searchSomething" @click="searchSomething" :src="icons['magnifying-glass']" v-if="this.$route.name==='Order'" />
      </div>
    </nav>
  </div>
</template>

<script>
import routeResources from './routeResources'
import activeRoutes from './activeRoutes'
const highlightedRoutes = Object.assign({}, activeRoutes)

const properNoun = (noun) => noun.charAt(0).toUpperCase() + noun.slice(1)

const mql = []

export default {
  data () {
    return {
      nav: true,
      icons: {
        logo: require('../assets/icons/logo-white.svg'),
        'arrow-yellow': require('../assets/icons/noimage_placeholder.svg'),
        'magnifying-glass': require('../assets/icons/magnifying-glass.svg')
      },
      activeRoutes,
      highlightedRoutes,
      /* TODO - the following asset downloaded from the project source does not match the sample
      poweredby: require('../assets/icons/poweredby.svg')*/
      routeResources
    }
  },
  watch: {
    '$route.name': function () {
      // when the route changes, keep track of it
      Object.keys(this.activeRoutes)
        .map(r => this.activeRoutes[r] = properNoun(r) === this.$route.name ?
            true : false
        )
      if (this.$route.name === 'Order')
        this.activeRoutes['orders'] = true
    }
  },
  methods: {
    properNoun,
    getRouteName () {
      return (this.$route.name === 'Order') ? this.$route.params.id : this.$route.name
    },
    show (which) {
      document.getElementById(which).classList.add('show')
      this.nav = which === 'sidebar'
    },
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
      }, 125)
    },
    slideIn () { this.slide('in') },
    slideOut () { this.slide('out') },
    toggle () {
      const dir = this.nav? 'out' : 'in'
      this.slide(dir)
      this.nav = !this.nav
    }
  },
  created() {
    let self = this
    mql.push(window.matchMedia('(max-width: 768px)'))
    mql[0].addListener(function(changed) {
      if(changed.matches) {
        if(self.bp !=='small')
          self.$store.dispatch('nav/setBp', 'small')
        if(!self.nav)
          self.slideOut()
      } else {
        if(self.bp !=='medium')
          self.$store.dispatch('nav/setBp', 'medium')
        if(self.nav)
          self.slideIn()
      }
    })
    mql.push(window.matchMedia('(min-width: 1024px)'))
    mql[1].addListener(function(changed) {
      if(changed.matches) {
        if(self.bp !=='large')
          self.$store.dispatch('nav/setBp', 'large')
        if(self.nav)
          self.slideIn()
      } else if(self.bp !=='medium') {
          self.$store.dispatch('nav/setBp', 'medium')
      }
    })
  },
  mounted () {
    (mql[0].matches)?
      this.show('overbar') : this.show('sidebar')

    if(mql[0].matches) {
      this.$store.dispatch('nav/setBp', 'small')
    } else {
      if (mql[1].matches) {
        this.$store.dispatch('nav/setBp', 'large')
      } else {
        this.$store.dispatch('nav/setBp', 'medium')
      }
    }
  },
  updated () {
    if (this.$route.name === 'Order')
      document.querySelector('.route-orders').classList
        .toggle('active-route')
  },
}
</script>

<style lang="scss" scoped>
@import 'static/styles/nav.scss';

#sidebar.slide-in {
  animation-name: SlideIn;
  animation-duration: 0.125s;
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
