//   公共请求数据
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
// const api = 'https://wallet.pigamegroup.com/'
const api = 'http://wallet.pigamegroup.com/'
const api2 = 'http://boss.pigamegroup.com/'

Vue.use(Vuex)

const balance = {
  state: {
    userInfo: [],
    userData: '',
    account: '',
    loginFlag: false,
    purseQuota: { // 可转入转出额度
    },
    coinList: []
  },
  getters: {
    userInfo: state => state.userInfo, // 用户信息balanceData.user
    loginFlag: state => state.loginFlag,
    userData: state => state.userData,
    account: state => state.account,
    purseQuota: state => state.purseQuota,
    coinList: state => state.coinList
  },
  actions: {
    // 获取用户信息
    getUserBalance ({commit}) {
      let url = `${api}/user/balance`
      axios.get(url).then((res) => {
        commit('GET_USER_INFO', res.data)
        commit('GET_LOGIN_FLAG', res.data)
      }).catch(() => {
      })
    },
    // 退出登录
    logoutAction ({state}) {
      // console.log(this.userInfo, this.loginFlag)
      axios.get(`${api}user/logout`).then((res) => {
        if (res.data.success) {
          state.userInfo = [] // 清空header用户信息
          state.loginFlag = false // 登陆状态为false
          router.push('/login')
        } else if (res.data.resultCode === 'NOT_LOGGEDIN') {
          router.push('/login')
        }
      })
    },
    // 可转入转出额度
    getPurseQuota ({commit}) {
      axios.post(`${api}purse/getPurseQuota`).then(res => {
        if (res.data.status === 'success') {
          commit('GET_PURSE_QUOTA', res.data)
        }
      })
    },
    // 查询币种列表
    queryCoinList ({commit}) {
      axios.post(`${api2}account/queryCoinList?sourceType=1`).then(res => {
        if (res.data.status === 'success') {
          commit('QUERY_COIN_LIST', res.data)
        }
      })
    }
  },
  mutations: {
    GET_USER_INFO (state, data) {
      if (data.success === true) {
        state.account = data.data.account
        state.userInfo = data.user
        state.userData = data.data.user
        state.userInfo = data
        state.userData = data.data.user
        state.account = data.data.account
      } else {
      }
    },
    GET_LOGIN_FLAG (state, data) {
      if (data.resultCode === 'NOT_LOGGEDIN') {
        state.loginFlag = false
        this.$router.push('/login')
      }
      if (data.success) {
        state.user = data
        state.loginFlag = true
      }
    },
    GET_PURSE_QUOTA (state, data) {
      state.purseQuota = data.data
    },
    QUERY_COIN_LIST (state, data) {
      state.coinList = data.data
    }
  }
}
export default new Vuex.Store({
  modules: {
    balance,
    userData: '',
    account: ''
  }
})
