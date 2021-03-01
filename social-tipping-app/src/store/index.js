import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebaseConfig from '../../firebase.config'

Vue.use(Vuex)
const firebase = firebaseConfig();
const db = firebase.firestore();

export default new Vuex.Store({
  state: {
    userName: '',   // ユーザ名
    balance: 0,     // 残高
    alert: ''       // アラートメッセージ
  },
  mutations: {
    updateUserName(state, val) {
      state.userName = val;
    },
    updateBalance(state, val) {
      state.balance = val;
    },
    updateAlert(state, val) {
      state.alert = val;
    }
  },
  getters: {
    userName(state) {
      return state.userName;
    },
    balance(state) {
      return state.balance;
    },
    alert(state) {
      return state.alert;
    }
  },
  actions: {
    signUp(context, input) {
      const email = input.email;
      const password = input.password;
      const userName = input.userName;
      let user = null;
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(resp => {
          user = resp.user;
          return db.collection('users').doc(user.uid).set({
            userName: userName,
            balance: 0
          });
        })
        .then(() => {
          return user.updateProfile({ displayName: userName });
        })
        .then(() => {
          context.commit('updateBalance', 0);
          context.commit('updateUserName', userName);
          context.commit('updateAlert', '');
          router.push('/dashboard');
        })
        .catch(error => {
          context.commit('updateAlert', error.code + ' ' + error.message);
        });
    },
    login(context, input) {
      const email = input.email;
      const password = input.password;
      let user = null;
      
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(resp => {
          user = resp.user;
          return db.collection('users').doc(user.uid).get();
        })
        .then(resp => {
          const userName = resp.data().userName;
          const balance = resp.data().balance;
          context.commit('updateUserName', userName);
          context.commit('updateBalance', balance);
          context.commit('updateAlert', '');
          router.push('/dashboard');
        })
        .catch(error => {
          context.commit('updateAlert', error.code + ' ' + error.message);
        });
    }
  }
})
