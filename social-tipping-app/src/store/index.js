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
    users: [],      // firestoreのユーザ一覧
    alert: ''       // アラートメッセージ
  },
  mutations: {
    updateUserName(state, val) {
      state.userName = val;
    },
    updateBalance(state, val) {
      state.balance = val;
    },
    updateUsers(state, users) {
      state.users = users;
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
    users(state) {
      return state.users;
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
          uid: user.uid,
          userName: userName,
          balance: 1000
        })
        await user.updateProfile({
          displayName: userName
        })
        context.commit('updateBalance', 1000)
        context.commit('updateUserName', userName)
        context.commit('updateAlert', '')
        router.push('/dashboard')
      } catch(e) {
        context.commit('updateAlert', e.message)
        router.push('/')
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
        context.commit('updateAlert', e.message)
        router.push('/login')
      }
    },
    async logout(context) {
      try {
        await firebase.auth().signOut()
        context.commit('updateBalance', 0)
        context.commit('updateUserName', '')
        router.push('/login')
      } catch(e) {
        context.commit('updateAlert', e.message)
        router.push('/dashboard')
      }
    },
    async sendTip(context, tippingData) {
      try {
        const tip = Number(tippingData.tip)
        const userBalance = this.getters.balance - tip
        if (tip <= 0) {
          throw new Error('金額は正の整数で入力してください')
        } else if (userBalance < 0) {
          throw new Error('残高が不足しています')
        }
        context.commit('updateAlert', '')
        
        const user = firebase.auth().currentUser
        const toUserDoc = await db.collection('users').doc(tippingData.toUid).get()
        const toUserBalance = toUserDoc.data().balance + tip
        
        await db.collection('users').doc(user.uid).update({ balance: userBalance })
        await db.collection('users').doc(tippingData.toUid).update({ balance: toUserBalance })
        context.commit('updateBalance', userBalance)
      } catch(e) {
        context.commit('updateAlert', e.message)
        router.push('/dashboard')
      }
    },
    getUsers(context) {
      db.collection('users').onSnapshot(s => {
        const users = [] 
        s.forEach(doc => users.push(doc.data()))
        context.commit('updateUsers', users)
      })
    }
  }
})
