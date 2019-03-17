<template>
  <div class="clock">
    <h2 class="local-time">{{ renderTime }}</h2>
    <p class="local-date">{{ renderDate }}</p>
  </div>
</template>

<script>
import { TimeFormatter } from '@/domain/model/TimeFormatter'
import { DateFormatter } from '@/domain/model/DateFormatter'

export default {
  name: 'Clock',
  props: {
    date: {
      type: Date,
      default: function () {
        return new Date();
      }
    }
  },
  computed: {
    renderTime() {
      return (new TimeFormatter()).format(this.date);
    },
    renderDate() {
      return (new DateFormatter()).format(this.date);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  margin: 40px 0 0;
}
</style>
