<style lang="scss" scoped>
  .xmas-main {

  }
</style>

<template>

  <main class="xmas-main">
    <xmas_wheel></xmas_wheel>
  </main>

</template>

<script>
  import wheel from './wheel.vue'

  export default {
    name: 'index',
    components: {
      xmas_wheel: wheel,
    },
    mounted: function() {

    },
  }
</script>
