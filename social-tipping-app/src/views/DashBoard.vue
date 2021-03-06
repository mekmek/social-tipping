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
      <table class="table table-borderless">
        <thead>
          <tr>
            <th>ユーザ名</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, idx) in usersExceptCurrentUser" :key="idx">
            <td>{{ user.userName }}</td>
            <td>
              <b-button v-b-modal.show-wallet variant="primary" class="mr-2" @click="updateWallet(idx)">walletを見る</b-button>
              <b-button v-b-modal.send-tip variant="primary" @click="setToUid(user.uid)">送る</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-5"><small>Copyright &copy;2019 〇〇 Inc. All rights reserved.</small></p>

    <!-- 「walletを見る」のモーダル -->
    <b-modal
      id="show-wallet"
      hide-header
      ok-only
      ok-title="close"
      ok-variant="danger"
      footer-bg-variant="light"
      size="sm"
      centered
    >
      <p class="text-center">{{ walletName }}さんの残高</p>
      <p class="text-center m-0">{{ walletBalance }}</p>
    </b-modal>

    <!-- 「送る」のモーダル -->
    <b-modal
      id="send-tip"
      hide-header
      ok-only
      ok-title="送信"
      ok-variant="danger"
      footer-bg-variant="light"
      size="sm"
      centered
      @show="resetTip"
      @ok="sendTip"
    >
      <p class="text-center">あなたの残高：{{ balance }}</p>
      <p class="text-center">送る金額</p>
      <input type="number" class="form-control" v-model="tip">
    </b-modal>
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
    
    this.$store.dispatch('getUsers');
  },
  data: () => {
    return {
      walletName: '',
      walletBalance: 0,
      tip: null,
      toUid: null
    }
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    balance() {
      return this.$store.getters.balance;
    },
    users() {
      return this.$store.getters.users;
    },
    usersExceptCurrentUser() {
      return this.users.filter(u => u.userName !== this.userName);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
    updateWallet(idx) {
      this.walletName = this.usersExceptCurrentUser[idx].userName;
      this.walletBalance = this.usersExceptCurrentUser[idx].balance;
    },
    sendTip() {
      this.$store.dispatch('sendTip', {
        toUid: this.toUid,
        tip: this.tip
      });
    },
    resetTip() {
      this.tip = null;
    },
    setToUid(uid) {
      this.toUid = uid;
    }
  }
}
</script>

<style scopd lang="scss">
#user-info {
  font-size: 25px;
}

table {
  table-layout: fixed;
}

.modal-body {
  p {
    font-size: 23px;
  }
  input[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>