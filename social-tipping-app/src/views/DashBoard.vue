<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png" class="mt-5">
    <div class="row" id="user-info">
      <div class="col text-left">{{ userName }}さんようこそ！！</div>
      <div class="col text-right">残高：{{ balance }}</div>
    </div>
    <h1 class="my-5">ユーザ一覧</h1>
    <div class="mb-5">
      <table>
        <thead>
          <th>ユーザ名</th>
        </thead>
        <tbody>
          <!-- ユーザリストを表示するエリア -->
        </tbody>
      </table>
    </div>
    <p class="mt-5"><small>Copyright &copy;2019 〇〇 Inc. All rights reserved.</small></p>
  </div>
</template>

<script>
export default {
  name: 'DashBoard',
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    balance() {
      return this.$store.getters.balance;
    }
  }
}
</script>

<style scopd>
#user-info {
  font-size: 25px;
}
</style>