import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebaseConfig from '../../firebase.config'

Vue.use(Vuex)
const firebase = firebaseConfig();

export default new Vuex.Store({
  state: {
    userName: '',
    email: '',
    password: ''
  },
  mutations: {
    updateUserName(state, val) {
      state.userName = val;
    },
    updateEmail(state, val) {
      state.email = val;
    },
    updatePassword(state, val) {
      state.password = val;
    }
  },
  getters: {
    userName(state) {
      return state.userName;
    },
    email(state) {
      return state.email;
    },
    password(state) {
      return state.password;
    }
  },
  actions: {
    signUp(context) {
      const email = context.state.email;
      const password = context.state.password;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          router.push('/user');   // 暫定処理
        })
        .catch(error => {
          console.log(error.code + ' ' + error.message);  // 暫定処理
        });
    },
    login(context) {
      const email = context.state.email;
      const password = context.state.password;
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          router.push('/user');   // 暫定処理
        })
        .catch(error => {
          console.log(error.code + ' ' + error.message);  // 暫定処理
        });
    }
  }
})
