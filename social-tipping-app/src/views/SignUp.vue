<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png" class="mt-5">
    <h1 class="my-5">新規登録画面</h1>
    <div class="mb-5">
      <div class="form-group row justify-content-center">
        <label class="col-2 col-form-label font-weight-bold text-right" for="username">ユーザ名</label>
        <input class="col-3 form-control" type="text" id="username" placeholder="userName" v-model="userName">  
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-2 col-form-label font-weight-bold text-right" for="email">メールアドレス</label>
        <input class="col-3 form-control" type="email" id="email" placeholder="E-mail" v-model="email">  
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-2 col-form-label font-weight-bold text-right" for="password">パスワード</label>
        <input class="col-3 form-control" type="password" id="password" placeholder="Password" v-model="password">  
      </div>
    </div>
    <button class="btn btn-outline-primary btn-lg" @click="signUp">新規登録</button>
    <p><a href="#" class="text-primary">ログインはこちらから</a></p>
    <p class="mt-5"><small>Copyright &copy;2019 〇〇 Inc. All rights reserved.</small></p>
  </div>
</template>

<script>
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyClby3on7h4LCprQCpHdUzfN4vLgoMkXGQ",
  authDomain: "social-tipping-app.firebaseapp.com",
  projectId: "social-tipping-app",
  storageBucket: "social-tipping-app.appspot.com",
  messagingSenderId: "528773370919",
  appId: "1:528773370919:web:84bda9ba9e50b6e7f8aa02"
};

firebase.initializeApp(firebaseConfig);

export default {
  name: 'SignUp',
  data() {
    return {
      userName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('登録しました');
          this.userName = '';
          this.email = '';
          this.password = '';
        })
        .catch(error => {
          alert(error.code + ' ' + error.message);
        });
    }
  }
}
</script>
