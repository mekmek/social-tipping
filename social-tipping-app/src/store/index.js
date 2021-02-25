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
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(resp => {
          const user = resp.user;
          db.collection('users').doc(user.uid).set({ balance: 0 });
          user.updateProfile({ displayName: userName })
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
      
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(resp => {
          const user = resp.user;
          console.log(user.uid);
          db.collection('users').doc(user.uid).get()
            .then(doc => {
              const balance = doc.data().balance;
              context.commit('updateBalance', balance);
              context.commit('updateUserName', user.displayName);
              context.commit('updateAlert', '');
              router.push('/dashboard');
            })
            .catch(error => {
              context.commit('updateAlert', error.code + ' ' + error.message);
            })
        })
        .catch(error => {
          context.commit('updateAlert', error.code + ' ' + error.message);
        });
    }
  }
})
