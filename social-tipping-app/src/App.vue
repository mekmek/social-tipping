<template>
  <div id="app">
    <Alert/>
    <router-view/>
  </div>
</template>

<script>
import Alert from './components/Alert.vue'

export default {
  name: 'app',
  components: {
    Alert
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
