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
        <li>fully functional animation and order lineitem search</li>
        <li>modular scss, components with vue's vuex2 flux architecture</li>
        <li>autoprefixer matching last 2 and ie >= 10</li>
        <li>Delivery float is dockable</li>
        <li>meaningful dummy data</li>
        <li>proper framework for wiring up to real API</li>
        <li>tested with ~3MB of dummy records - remains fast!</li>
      </ol>
      <h1>Caveats</h1>
      <ol>
        <li>use of noimage_placeholder for missing nav</li>
        <li>however, custom svg for search animation since asset not provided</li>
        <li>and since poweredby image is not ready, rebuilt it in css/html</li>
        <li>rudamentary e2e tests</li>
        <li>rudamentary karma unit tests</li>
        <li>mostly a weekend project, I had no time to look at this until the weekend.</li>
        <li>incomplete bp-small changes, but you can see it is going along.</li>
        <li>didn't understand the second search form</li>
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
