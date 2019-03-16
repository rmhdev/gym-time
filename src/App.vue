<template>
  <div id="app">
    <Welcome msg="Welcome!"/>
    <Clock/>
  </div>
</template>

<script>
import Welcome from './components/Welcome.vue'
import Clock from "./components/Clock";

export default {
  name: 'app',
  components: {
    Clock,
    Welcome
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
