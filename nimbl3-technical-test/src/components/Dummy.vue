<template>
  <div id="dummy" class="component">
    <div>
      <img src="../assets/logo.png">
    </div>
    <div>
      <h1>How to view</h1>
      <p>Dummy data is already wired up and an extra Orders page built. <br/>Get there by clicking 'Orders' from the menu, then navigate to individual orders by clicking on one. .</p>
      <h1>Project highlights</h1>
      <ol>
        <li>well-rendered pc media</li>
        <li>fully functional animation and search</li>
        <li>modular scss, components with vue's vuex2 flux architecture</li>
        <li>autoprefixer matching last 2 and ie >= 10</li>
        <li>use of noimage_placeholder for missing nav</li>
        <li>however, custom svg for search animation since asset not provided</li>
        <li>Delivery float is dockable</li>
        <li>meaningful dummy data</li>
        <li>proper framework for wiring up to real API</li>
        <li>rudamentary e2e tests</li>
        <li>rudamentary karma unit tests</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        dummy: true
      }
    }
}
</script>

<style scoped>
#dummy {
  width: 80vw;
  margin-left: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
ol { width: 25vw; min-width: 450px; }
p {
  text-align: left;
}
</style>
