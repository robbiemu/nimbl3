<template>
  <div class="component" id="nav">
  <nav id="sidebar">
    <div @click="toggle" class="navbar-brand"><img :src="logo" /></div>
    <ul>
      <li class="btn">Dashboard</li>
      <li class="btn">Orders</li>
      <li class="btn">Companies</li>
      <li class="btn">Products</li>
      <li class="btn">Documents</li>
      <li class="btn">Pricing</li>
      <li class="btn">Brands</li>
      <li class="btn">Settings</li>
      <li class="btn">Reports</li>
      <li class="btn">Account Users</li>
      <li></li>
    </ul>
    <div id="nav-footer" class="bottom">
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
export default {
  data () {
    return {
      nav: true,
      logo: require('../assets/icons/logo-white.svg')
    }
  },
  methods: {
    slide(dir) {
      console.dir('slide ' + dir)
      const el = document.getElementById('sidebar')
      const opp = dir === 'in'? 'out' : 'in'

      if(el.classList.contains('slide-' + dir))
        return

      if(el.classList.contains('slide-' + opp))
        el.classList.remove('slide-' + opp)

      el.classList.add('slide-' + dir)

      setTimeout(function () {
        document.getElementById('overbar').classList.toggle('show')
      }, 250)
    },
    slideIn(){ this.slide('in') },
    slideOut(){ this.slide('out') },
    toggle(){
      console.log(this.nav)
      const dir = this.nav? 'out' : 'in'
      this.slide(dir)
      this.nav = !this.nav
    }
  }
}
</script>

<style scoped>
#nav {
  font-weight: 600;
  color: #D18EE2;
}

.btn, .navbar-brand {
  cursor: pointer;
  user-select: none;
}

#nav-footer{
  padding: 1px;
  width: 100%;
  cursor: default;
  user-select: none;
}

#nav-footer > .row {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 1px;
  font-size: 11px;
  font-weight: 600;
  line-height: 26px;
  letter-spacing: 1px;
}
#nav-footer img {
  width: 113px;
  height: auto;
  margin-bottom: 22px;
}

#overbar .navbar-brand {
  padding: 7.375px 0;
}
#sidebar .navbar-brand {
  padding: 15.375px 0;
  background-color: #4C1367;
}

#sidebar ul { flex-grow: 1 }

#sidebar li:hover {
  background-color: rgba(76,19,103,0.5);
  color: white;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  font-size: 14px;
  font-weight: 600;
  line-height: 34px;
  padding: 16.546px 0;
}

#sidebar, #overbar {
  background-color: #702283;
}

#sidebar {
  display: flex;
  flex-direction: column;
  min-height: 100Vh;
  width: 15vw;
  min-width: 246px;
  position: absolute;
  top: 0;
  z-index: 1000;
}

#overbar {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100vw;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: none;
}
#overbar.show {
  display: flex;
}

#overbar > * {
  margin-left: 1rem;
}

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
