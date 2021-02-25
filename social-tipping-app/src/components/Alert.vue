<template>
  <div class="container mt-3" v-show="alert">
    <div class="alert alert-danger">{{ alert }}</div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  computed: {
    alert() {
      return this.$store.getters.alert;
    }
  }
}
</script>