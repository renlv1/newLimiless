<template>
    <div class="login">
      <!--登录-->
      <div class="logging-box">
        <div class="logging">
          <div class="title">登录Discovery账号</div>
          <div class="text-input login-user">
            <div class="user-img" :class="{'userActive': userActiveShow}">
             <span></span>
            </div>
            <input :class="{'alluserAcive': alluserAcive}" id="user" type="text" v-model.trim="userName" @focus="userFocus" @blur="userblur" placeholder="请输入Discovery账号" autocomplete="off">
            <div class="error-msg" :class="{clssuserMsg: userMsgAcive}" v-show="userMsg">{{userErrorText}}</div>
          </div>
          <div class="text-input login-password" >
            <div class="psw-img" :class="{'pswActive': pswActiveShow}">
             <span></span>
            </div>
            <input :class="{'alluserAcive': alluserAcive}" id="password" type="password" v-model.trim="passWord" @focus="pswFocus" @blur="pswblur"  placeholder="请输入登录密码" autocomplete="off">
            <div class="error-msg" :class="{clssPsdMsg: psdMsgAcive}" v-show="psdMsg">{{psdErrorText}}</div>
          </div>
          <div class="error" v-show="errorShow">{{errorText}}</div>
          <div class="btn button--ujarak button--inverted" :class="{'active': goLoginActive}" @click="goToLogin()">登录
            <!--login加載-->
            <div class="loding-box">
              <div v-show="loadingShow" class="spinner">
                <div class="spinner-container container1">
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                  <div class="circle4"></div>
                </div>
                <div class="spinner-container container2">
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                  <div class="circle4"></div>
                </div>
                <div class="spinner-container container3">
                  <div class="circle1"></div>
                  <div class="circle2"></div>
                  <div class="circle3"></div>
                  <div class="circle4"></div>
                </div>
            </div>
          </div>
          </div>
          <div class="signin-link">
            <router-link to="/signIn" tag="div" class="signin">注册</router-link>
            <router-link to="/forgetThePassword" tag="div" class="forget-password">忘记密码</router-link>
          </div>
          <div class="download-app"><a target="_blank" href="https://app.pi-group.biz/appdownload/us/pi.html">点击下载Discovery App</a></div>
        </div>
      </div>
      <!-- 目前不要登录身份验证-->
      <!--<div class="authentication-mask" v-show="authenticationShow">
        <div class="authentication">
          <div class="close" @click="close()"></div>
          <div class="tab-box">
            <div class="title">身份验证</div>
            <div class="verification">
              <div class="sms-verification" :class="{active: defaultIndex == index}" v-for="(item,index) in tabDatas" @click="onTabVerification(index)"  :key="index">{{item.tab}}</div>
              &lt;!&ndash;<div class="google-authenticator">谷歌验证</div>
              <div class="sms-verification">短信验证</div>&ndash;&gt;
            </div>
            <div class="input-box" v-show="defaultIndex == index" v-for="(item,index) in loginAuthenticationData" :key="index">
              <input class="code" type="text" autocomplete="off" :placeholder="item.text">
              <div class="code-btn">
                 <div class="btn-veri">获取验证码</div>
              </div>
            </div>
            <div class="btn" @click="gotoInHome">确定</div>
          </div>
        </div>
      </div>-->
    </div>
</template>

<script>
export default {
  data () {
    return {
      loadingShow: false, // 登錄加載show
      errorText: '', // 请求錯誤提示文本
      userErrorText: '', // 账号输入錯誤提示文本
      psdErrorText: '', // 密码输入錯誤提示文本
      userMsgAcive: false,
      psdMsgAcive: false,
      userNull: '请输入账号',
      psdNull: '请输入密码',
      loginHintErr: '用户名或者密码错误',
      loginHintIsOn: '用户不存在，请先注册',
      userMsg: false,
      psdMsg: false,
      errorShow: false, // 錯誤提示show
      userName: '',
      passWord: '',
      userActiveShow: false,
      pswActiveShow: false,
      alluserAcive: false,
      goLoginActive: false,
      // 身份验证
      authenticationShow: false, // 身份验证遮罩
      defaultIndex: 1,
      loginAuthentication: '',
      loginAuthenticationData: [
        {
          text: '请输入谷歌验证码'
        },
        {
          text: '请输入短信验证码'
        }
      ],
      tabDatas: [
        {
          tab: '谷歌验证'
        },
        {
          tab: '短信验证'
        }
      ]
    }
  },
  created () {
    // console.log(this.$route.query.id >= 0)
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        this.goToLogin()
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.$http.post(`${this.$api}/user/userlogin`).then((res) => {
        if (res.data.success) {
          if (res.data.data.user.loginFlag === 1) { // 用户已登录过
            this.$router.push({ path: '/home' })
          } else {
            this.$router.push({ path: '/Login' })
          }
        }
      })
    })
  },
  methods: {
    // 注册,获取短信验证码
    ongetCode () {},
    // 忘记密码, 获取短信验证码
    onGetSmsVerification () {},
    userError () {
      if (this.userName === '') {
        this.userMsg = true
        this.userErrorText = this.userNull
        this.alluserAcive = false
        this.userMsgAcive = true
      } else {
        this.userMsgAcive = false
        this.userMsg = false
        this.errorShow = false
      }
    },
    psdError () {
      if (this.passWord === '') {
        this.psdMsg = true
        this.psdErrorText = this.psdNull
        this.alluserAcive = false
        this.psdMsgAcive = true
      } else {
        this.psdMsgAcive = false
        this.psdMsg = false
        this.errorShow = false
      }
    },
    userFocus () {
      this.userActiveShow = true
      this.alluserAcive = false
      this.userError()
    },
    pswFocus () {
      this.pswActiveShow = true
      this.alluserAcive = false
      this.psdError()
    },
    userblur () {
      this.userActiveShow = false
      this.userError()
    },
    pswblur () {
      this.pswActiveShow = false
      this.psdError()
    },
    // 登录
    goToLogin () {
      // 请求后台账号和密码,判断是否匹配,匹配就弹出身份验证遮罩框,及绑定键盘13
      // this.authenticationShow = true // 目前不要登录身份验证...
      // this.loginShow = false
      // 用户名提示验证
      this.goLoginActive = !this.goLoginActive
      if (this.userName === '' || this.passWord === '') {
        this.errorShow = true
      } else {
        this.errorShow = false
      }
      let userData = new FormData()
      userData.append('username', this.userName)
      userData.append('password', this.passWord)
      if (this.userName !== '' && this.passWord !== '') {
        this.$http.post(`${this.$api}/user/userlogin`, userData).then((res) => {
          this.loadingShow = true
          if (res.data.success) {
            this.$store.dispatch('getUserBalance')
            if (Number(this.$route.query.id) >= 0 && !(this.$route.query.purchaseId)) {
              this.$router.push({path: '/buyGoods', query: {id: this.$route.query.id, shareCode: this.$route.query.shareCode}})
            } else if (Number(this.$route.query.id) >= 0 && Number(this.$route.query.purchaseId) >= 0) {
              this.$router.push({path: '/buyGoodsDetail', query: {id: this.$route.query.id, purchaseId: this.$route.query.purchaseId, shareCode: this.$route.query.shareCode}})
            } else {
              this.$router.push('/home')
            }
            this.loadingShow = false
          } else {
            setTimeout(() => {
              this.errorText = res.data.msg
              this.errorShow = true
              this.loadingShow = false
              if (res.data.msg === this.loginHintErr || res.data.msg === this.loginHintIsOn) { // 账号密码错误，用户不存在input字体红色 英文時待写
                this.alluserAcive = true
              } else {
                this.alluserAcive = false
              }
            }, 1000)
          }
        })
      }
    },
    onTabVerification (index) {
      this.defaultIndex = index
    },
    close () {
      this.authenticationShow = !this.authenticationShow
      this.loginShow = !this.loginShow
    },
    // 身份验证,获取验证码,判断匹配通过后进入首页,及绑定键盘13
    gotoInHome () {}
  }
}
</script>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: 100vh;
    background: url("../../assets/images/login/bg.png") no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    .logging-box{
      width: 660px;
      height: 500px;
      border-radius: 4px;
      background-color: rgba(255,255,255,1);
      box-shadow: 0 0 16px 2px rgba(167, 177, 194, .4);
      position: relative;
      .logging{
        width: 100%;
        padding: 70px 100px 0;
        .title{
          font-size: 20px;
          color: #1a1a1a;
        }
        .text-input{
          width: 100%;
          height: 44px;
          border: 1px solid #e7e8ec;
          border-radius: 4px;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          span{
            display: inline-block;
            width: 18px;
            height: 20px;
            background-size: 100%;
            margin: 0 15px;
          }
          input{
            width: 100%;
            height: 100%;
            -webkit-appearance: initial;
            background-color: initial;
            cursor: default;
            padding: initial;
            border: initial;
            padding-left: 4px;
          }
          input:-webkit-autofill {
            background-color: #fff;
            background-image: none;
          }
        }
        .login-user{
          margin: 30px auto;
          .user-img{
            width: auto;
            height: 100%;
            border-right: none;
            display: flex;
            align-items: center;
            justify-content: center;
            &.userActive{
              background-color: rgba(232, 233, 235, .4);
              opacity: .8;
            }
            span{
              background: url("../../assets/images/login/user.png") no-repeat;
            }
          }
          #user{
            flex: 1;
            color: #1a1a1a;
            font-size: 14px;
            &.alluserAcive{
              color: #e93a3a;;
            }
          }
          .error-msg {
            top: 10px;
            &.clssuserMsg {
              top: 50px;
            }
          }
        }
        .login-password{
          margin-bottom: 6px;
          .psw-img{
            width: auto;
            height: 100%;
            border-right: none;
            display: flex;
            align-items: center;
            justify-content: center;
            &.pswActive{
              background-color: rgba(232, 233, 235, .4);
              opacity: .8;
            }
          }
          span{
            background: url("../../assets/images/login/password.png") no-repeat;
          }
          #password{
            flex: 1;
            color: #1a1a1a;
            font-size: 14px;
            &.alluserAcive{
              color: #e93a3a;;
            }
          }
          .error-msg {
            top: 10px;
            &.clssPsdMsg {
              top: 50px;
            }
          }
        }
        .error{
          position: absolute;
          left: 100px;
          top: 250px;
          font-size: 14px;
          color: #e93a3a;
        }
        .btn{
          width: 100%;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          color: #fff;
          margin: 30px auto 10px;
          background-color: #ffba14;
          border-radius: 4px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 2px rgba(255, 153, 20, 0.4);
          cursor: pointer;
          position: relative;
          z-index: 1;
          &.active{
            opacity: .9;
          }
          &:hover{
            background-color: #F29800;
          }
          .loding-box{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 40%;
            .spinner {
              width: 18px;
              height: 18px;
              position: relative;
            }
            .container1 > div, .container2 > div, .container3 > div {
              width: 6px;
              height: 6px;
              background-color: #fff;
              border-radius: 100%;
              position: absolute;
              -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
              animation: bouncedelay 1.2s infinite ease-in-out;
              -webkit-animation-fill-mode: both;
              animation-fill-mode: both;
            }
            .spinner .spinner-container {
              position: absolute;
              width: 100%;
              height: 100%;
            }
            .container2 {
              -webkit-transform: rotateZ(45deg);
              transform: rotateZ(45deg);
            }
            .container3 {
              -webkit-transform: rotateZ(90deg);
              transform: rotateZ(90deg);
            }
            .circle1 { top: 0; left: 0; }
            .circle2 { top: 0; right: 0; }
            .circle3 { right: 0; bottom: 0; }
            .circle4 { left: 0; bottom: 0; }
            .container2 .circle1 {
              -webkit-animation-delay: -1.1s;
              animation-delay: -1.1s;
            }
            .container3 .circle1 {
              -webkit-animation-delay: -1.0s;
              animation-delay: -1.0s;
            }
            .container1 .circle2 {
              -webkit-animation-delay: -0.9s;
              animation-delay: -0.9s;
            }
            .container2 .circle2 {
              -webkit-animation-delay: -0.8s;
              animation-delay: -0.8s;
            }
            .container3 .circle2 {
              -webkit-animation-delay: -0.7s;
              animation-delay: -0.7s;
            }
            .container1 .circle3 {
              -webkit-animation-delay: -0.6s;
              animation-delay: -0.6s;
            }
            .container2 .circle3 {
              -webkit-animation-delay: -0.5s;
              animation-delay: -0.5s;
            }
            .container3 .circle3 {
              -webkit-animation-delay: -0.4s;
              animation-delay: -0.4s;
            }
            .container1 .circle4 {
              -webkit-animation-delay: -0.3s;
              animation-delay: -0.3s;
            }
            .container2 .circle4 {
              -webkit-animation-delay: -0.2s;
              animation-delay: -0.2s;
            }
            .container3 .circle4 {
              -webkit-animation-delay: -0.1s;
              animation-delay: -0.1s;
            }
            @-webkit-keyframes bouncedelay {
              0%, 80%, 100% { -webkit-transform: scale(0.0) }
              40% { -webkit-transform: scale(1.0) }
            }
            @keyframes bouncedelay {
              0%, 80%, 100% {
                transform: scale(0.0);
                -webkit-transform: scale(0.0);
              } 40% {
                  transform: scale(1.0);
                  -webkit-transform: scale(1.0);
                }
            }
          }
        }
        .signin-link{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #4b84ff;
          .signin{
            cursor: pointer;
            &:hover{
              color: #ffba14;
            }
          }
          .forget-password{
            cursor: pointer;
            &:hover{
              color: #ffba14;
            }
          }
        }
        .download-app{
          text-align: center;
          padding-top: 16px;
          a{
            display: inline-block;
            font-size: 14px;
            color: #1a1a1a;
            padding-bottom: 2px;
            border-bottom: 1px solid #1a1a1a;
            &:hover{
              color: #ffba14;
              border-bottom: 1px solid #ffba14;
            }
          }
        }
      }
    }
  }
  // 身份验证
  .authentication-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0,0,0, .2);
    display: flex;
    align-items: center;
    justify-content: center;
    .authentication{
      width: 600px;
      height: 374px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 3px 8px rgba(74, 134, 255, 0.4);;
      position: relative;
      .close{
        width: 17px;
        height: 17px;
        background: url("../../assets/images/login/Shutdown.png") no-repeat;
        background-size: 100%;
        background-position: center;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
      }
      .tab-box{
        width: 440px;
        margin: 40px auto;
        .title{
          font-size: 20px;
          color: #1a1a1a;
          font-weight: bold;
          text-align: center;
        }
        .verification{
          width: 100%;
          height: 38px;
          line-height: 38px;
          margin-top: 40px;
          text-align: center;
          font-size: 16px;
          color: #1a1a1a;
          display: flex;
          .google-authenticator{
            flex: 1;
          }
          .sms-verification{
            flex: 1;
            border-bottom: 1px solid #999;
            cursor: pointer;
            &.active{
              width: 100%;
              height: 100%;
              background-color: #ffba14;
              color: #fff;
              border-bottom: none;
              border-top-left-radius: 4px;
              border-top-right-radius: 4px;
            }
          }
        }
        .input-box{
          width: 100%;
          height: 44px;
          border: 1px solid #999;
          border-top-style: none;
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .code{
            flex: 1;
            padding-left: 30px;
            font-size: 16px;
            color: #999;
          }
          .code-btn{
            width: auto;
            height: 44px;
            display: flex;
            align-items: center;
            cursor: pointer;
            .btn-veri{
              padding: 0 20px;
              border-left: 1px solid #999;
              font-size: 16px;
              color: #4b84ff;
            }
          }
        }
        .btn{
          width: 100%;
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-radius: 4px;
          background-color: #ffba14;
          box-shadow: 0 2px 2px rgba(255, 153, 20, 0.4);;
          color: #fff;
          font-size: 20px;
          margin: 40px auto 20px;
          cursor: pointer;
        }
      }
    }
  }
</style>
