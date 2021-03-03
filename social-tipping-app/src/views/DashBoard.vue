<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png" class="my-5">
    <div class="row" id="user-info">
      <div class="col-7 text-left">{{ userName }}さんようこそ！！</div>
      <div class="col-3 text-right">残高：{{ balance }}</div>
      <div class="col-2 text-left">
        <button class="btn btn-outline-primary btn-sm" @click="logout">ログアウト</button>
      </div>
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
  created() {
    const userName = this.$store.getters.userName;
    if (!userName) {
      this.$store.commit('updateAlert', 'ログインが必要です');
      this.$router.push('/login');
    }   
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    balance() {
      return this.$store.getters.balance;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style scopd>
#user-info {
  font-size: 25px;
}
</style>