<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png" class="mt-5">
    <h1 class="my-5">ログイン画面</h1>
    <div class="mb-5">
      <div class="form-group row justify-content-center">
        <label class="col-2 col-form-label font-weight-bold text-right" for="email">メールアドレス</label>
        <input class="col-3 form-control" type="email" id="email" placeholder="E-mail" v-model="email">  
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-2 col-form-label font-weight-bold text-right" for="password">パスワード</label>
        <input class="col-3 form-control" type="password" id="password" placeholder="Password" v-model="password">  
      </div>
    </div>
    <button class="btn btn-outline-primary btn-lg" @click="login">ログイン</button>
    <p><router-link to="/" class="text-primary">新規登録はこちらから</router-link></p>
    <p class="mt-5"><small>Copyright &copy;2019 〇〇 Inc. All rights reserved.</small></p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      const input = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch('login', input);
    }
  }
}
</script>
