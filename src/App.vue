<template>
  <div id="app" class="container">

    <div class="text-center">
      <Welcome msg="Welcome!"/>
      <Clock/>
    </div>

    <div class="row justify-content-md-center">
      <div class="col-3">
        <a href="#" class="btn btn-block btn-primary btn-lg">Check-in</a>
      </div>
      <div class="col-1"></div>
      <div class="col-3">
        <a href="#" class="btn btn-block btn-danger btn-lg">Check-out</a>
      </div>
    </div>
  </div>
</template>

<script>
import './styles/main.scss'
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
  margin-top: 60px;
}
</style>
