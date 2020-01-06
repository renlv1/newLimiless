<template>
  <div>
    <div class="header">
      <div class="header-content container">
        <div class="head-left">
          <router-link v-show="loginFlag" tag="div" to="/home" class="logo isClick">
            <img src="../assets/images/header/logo.png"/>
          </router-link>
          <router-link v-show="!loginFlag" tag="div" to="/" class="logo">
            <img src="../assets/images/header/logo.png"/>
          </router-link>
          <ul class="nav" v-show="loginFlag">
            <router-link tag="li" :to="{path:'/home'}" class="isClick">{{$t('header.text1')}}</router-link>
            <router-link tag="li" :to="{path: '/tradingPlatform'}" class="isClick">{{$t('header.text2')}}</router-link>
          </ul>
        </div>
        <div class="head-right">
          <div class="header-rt-user">
            <div class="activeBox" ref="userNameDiv" @mouseover="showMenu(1)" @mouseout="closeShowMenu(1)">
              <div class="log-reg-button" v-show="!loginFlag">
                <li class="header-rt-btn isClick" @click="$router.push({path: '/login'})">登录</li>
                <span class="segmentation">/</span>
                <li class="header-rt-btn isClick" @click="$router.push({path: '/signIn'})">注册</li>
              </div>
              <div class="common alreadyLogin" v-show="loginFlag">
                <div class="user-wrapper isClick">
                  <img class="userImg" alt="" :src="avatar + userData.address" v-if="userData.address">
                  <span class="userName">{{userData.username}}<i class="arrowDown" :class="{arrowActive: userMenuShow}"></i></span>
                </div>
                <div class="user-panel">
                  <ul class="dropDownMenu" v-show="userMenuShow" :class="{dropDownMenuActive: userMenuShow}">
                    <router-link class="isClick" tag="li" to="/account">我的账户</router-link>
                    <li class="isClick">共享充提</li>
                    <li class="isClick" @click="logout()">退出登录</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="activeBox" ref="userNameDiv" @mouseover="showMenu(2)" @mouseout="closeShowMenu(2)">
              <div class="common lang">
                <div class="user-wrapper isClick">
                  <span class="userName">{{langText}}<i class="arrowDown" :class="{arrowActive: langMenuShow}"></i></span>
                </div>
                <div class="user-panel">
                  <ul class="dropDownMenu" v-show="langMenuShow" :class="{dropDownMenuActive: langMenuShow}">
                    <li class="isClick" @click="chooseLang(0)">中文</li>
                    <li class="isClick" @click="chooseLang(1)">English</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {i18n} from '../i18n/config'
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      userMenuShow: false,
      langMenuShow: false,
      langText: '中文',
      langActive: 0,
      avatar: `${this.$api}` + `file/img?type=user&size=2&id=` // 头像地址前缀
    }
  },
  computed: {
    ...mapGetters([
      'userInfo', // 用户信息
      'loginFlag',
      'userData'
    ])
  },
  mounted () {
    this.getUserBalance()
  },
  methods: {
    ...mapActions([
      'getUserBalance'
    ]),
    logout () { // 退出登录
      this.$store.dispatch('logoutAction')
      // this.$store.dispatch('getUserBalance')
    },
    showMenu (num) {
      if (num === 1) {
        this.userMenuShow = true
      } else if (num === 2) {
        this.langMenuShow = true
      }
    },
    closeShowMenu (num) {
      if (num === 1) {
        this.userMenuShow = false
      } else if (num === 2) {
        this.langMenuShow = false
      }
    },
    chooseLang (val) { // 选择语言
      this.langActive = val
      if (val === 0) {
        localStorage.setItem('Qlang', 'CN')
        i18n.locale = 'CN'
        return (this.langText = '中文')
      } else if (val === 1) {
        this.langText = 'English'
        localStorage.setItem('Qlang', 'EN')
        i18n.locale = 'EN'
        return (this.langText = 'English')
      } else if (val === 2) {
        localStorage.setItem('Qlang', 'JN')
        i18n.locale = 'JN'
      } else if (val === 3) {
        localStorage.setItem('Qlang', 'KN')
        i18n.locale = 'KN'
      }
      window.location.reload()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    width 100%
    height 88px
    background-color #fff
    position fixed
    top 0
    z-index 99
    border-bottom 1px solid #d7d9db
    min-width 1600px
    .header-content
      height 100%
      display flex
      align-items center
      justify-content space-between
      .head-left
        display flex
        flex-direction row
        .nav
          display flex
          flex-direction row
          align-items cente
          li
            line-height 88px
            width 250px
            text-align center
            font-size 16px
            color #161616
        .logo
          width 250px
          height 88px
          display flex
          align-items center
          border-right 1px solid #e6e6e6
          img
            display block
            width 192px
            height 47px
      .head-right
        display flex
        flex-direction row
        align-items center
        .header-rt-user
          display flex
          flex-direction row
          align-items center
          .activeBox
            .log-reg-button
              margin-right 54px
              display flex
              flex-direction row
              align-items center
              .segmentation
                 margin 0 10px
                 font-weight bold
                 color #1a1a1a
            .alreadyLogin
              margin-right 54px
            .common
              position relative
              height 88px
              line-height 88px
              .user-wrapper
                display flex
                flex-direction row
                align-items center
                .userImg
                  width 36px
                  height 36px
                  margin-right 20px
                .userName
                  i
                    display inline-block
                    width 10px
                    height 6px
                    vertical-align middle
                    background url("../assets/images/header/arrow.png") no-repeat
                    background-size cover
                    margin-left 20px
                    transition .2s
                    &.arrowActive
                      transform rotate(180deg)
              .user-panel
                width auto
                min-width 100%
                top 75px
                left 0
                position absolute
                background #fff
                box-shadow 0 0 5px #d7d9db
                .dropDownMenu
                  text-align center
                  line-height 40px
                  li
                    padding 0 5px
                    color #999
                    background #fff
                    border-bottom 1px solid #e7e8ec
                    &:hover
                      background #fcfcfc
                      color #1a1a1a
</style>
