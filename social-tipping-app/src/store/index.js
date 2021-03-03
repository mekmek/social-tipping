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
    async signUp(context, input) {
      const email = input.email
      const password = input.password
      const userName = input.userName
      
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const user = firebase.auth().currentUser
        await db.collection('users').doc(user.uid).set({
          userName: userName,
          balance: 0
        })
        await user.updateProfile({
          displayName: userName
        })
        context.commit('updateBalance', 0)
        context.commit('updateUserName', userName)
        context.commit('updateAlert', '')
        router.push('/dashboard')
      } catch(e) {
        context.commit('updateAlert', e.code + ' ' + e.message)
      }
    },
    async login(context, input) {
      const email = input.email
      const password = input.password
      
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        const user = firebase.auth().currentUser
        const doc = await db.collection('users').doc(user.uid).get()
        const userName = doc.data().userName
        const balance = doc.data().balance
        context.commit('updateUserName', userName)
        context.commit('updateBalance', balance)
        context.commit('updateAlert', '')
        router.push('/dashboard')
      } catch(e) {
        context.commit('updateAlert', e.code + ' ' + e.message)
      }
    }
  }
})
