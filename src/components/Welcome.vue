<template>
  <div class="welcome">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1 {
  margin: 40px 0 0;
}
</style>
