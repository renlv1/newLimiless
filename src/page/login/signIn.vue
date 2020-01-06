<template>
  <div class="login">
    <!--注册-->
    <div class="signin-box">
      <div class="sigin">
        <div class="title">注册新用户</div>
        <div class="new-user">
          <input type="text" ref="inputModel" v-model.trim="userZcNamer" @focus="userHintShow = false"  placeholder="输入你的用户名" autocomplete="off" maxlength="26">
          <div class="hint" :class="{'allHintNullActive': userHintShow}">请输入用户名</div>
        </div>
        <div class="sex">
          <div class="tit">性别</div>
          <div class="sex-input">
               <span v-for="(item,index) in sexDatas" :key="index">
                 <span class="radio" style="margin-left: 50px" :class="{checkSex: defaultSexIndex === index}" @click="sexRadio(index)"><img
                   src="../../assets/images/applySharers/sex.png" alt=""></span><i>{{item.sex}}</i>
               </span>
            <!--<input type="radio" style="margin-left: 50px" autocomplete="off" value=""><i>女</i>-->
          </div>
        </div>
        <div class="phone-box">
          <div class="area-code" @click="directionFlag = !directionFlag">
            <div class="code-box">
              <div class="phone-code">{{defaultAreaCode}}</div>
              <div class="img" :class="{'active': directionFlag}"><img src="../../assets/images/login/down_gray.png" alt=""></div>
            </div>
            <div class="select" :class="{'active': directionFlag}">
              <div class="list-code" @click="defaultAreaCode = item.areaCode ,directionFlag === false" v-for="(item,index) in  selectAreaCodeDatas" :key="index">{{item.areaCode}}</div>
            </div>
          </div>
          <div class="phone">
            <input type="text" ref="inputModel" v-model.trim="phoneZc" @focus="phoneHintShow = false" autocomplete="off" placeholder="输入注册手机号码">
            <div class="hint" :class="{'allHintNullActive': phoneHintShow}">{{phoneHintText}}</div>
          </div>
        </div>
        <div class="new-password">
          <input type="text" ref="inputModel" v-model.trim="userZcPassword" maxlength="26" autocomplete="off" placeholder="输入密码">
          <div class="hint">（密码必须包含大小写和数字，不能少于6位）</div>
        </div>
        <div class="new-password confirmPassWord">
          <input type="text" ref="inputModel" v-model.trim="confirmThePassword" maxlength="26" @focus="confirmPswHintShow = false" autocomplete="off" placeholder="确认密码">
          <div class="hint" :class="{'allHintNullActive': confirmPswHintShow}">两次密码不一致</div>
        </div>
        <div class="new-password short">
          <input type="text" ref="inputModel" v-model.trim="verificationCode" @focus="phoneSmsHintShow = false" autocomplete="off" placeholder="输入短信验证码">
          <div class="getCode-box" @click="ongetCode">
            <button class="getCode" ref="sendMsg" @click="sendPhoneCode()">{{countDownText}}</button>
          </div>
          <div class="hint" :class="{'allHintNullActive': phoneSmsHintShow}">{{phoneHintText}}</div>
        </div>
        <div class="new-password pay">
          <input type="text" ref="inputModel" v-model.trim="paymentPassword" @focus="patPswHintShow = false" autocomplete="off" placeholder="输入你的支付密码">
          <div class="hint" :class="{'allHintNullActive': patPswHintShow}">支付密码不能少于6位</div>
        </div>
        <div class="btn" @click="registrationSubmitted()">确认</div>
        <router-link to="/login" tag="div" class="back-login">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/dialog'
export default {
  data () {
    return {
      // 注册
      defaultSexIndex: 0,
      userZcNamer: '', // 用户名
      phoneZc: '', // 手机号
      userZcPassword: '', // 输入密码
      confirmThePassword: '', // 确认密码
      verificationCode: '', // 输入短信验证码
      paymentPassword: '', // 输入你的支付密码
      allHintNullActive: false, // 都为空show
      userHintShow: false, // get焦点用户名的show
      phoneHintShow: false, // 手机show
      patPswHintShow: false, // 支付密码show
      phoneSmsHintShow: false, // 手机短信show
      confirmPswHintShow: false, // 确认密码show
      areaCodeShow: false, // 确认密码show
      directionFlag: false,
      defaultAreaCode: '+86',
      phoneHintText: '请输入短信验证码',
      countDownText: '获取验证码',
      sendBtnTimes: 10,
      timer: null,
      userAddress: '',
      selectAreaCodeDatas: [
        {
          areaCode: '+86'
        },
        {
          areaCode: '+87'
        },
        {
          areaCode: '+88'
        }
      ],
      sexDatas: [
        {
          sex: '男'
        },
        {
          sex: '女'
        }
      ]
    }
  },
  created () {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
      }
    })
  },
  mounted () {
  },
  methods: {
    // 注册,获取短信验证码
    ongetCode () {},
    // 忘记密码, 获取短信验证码
    onGetSmsVerification () {},
    onTabVerification (index) {
      this.defaultIndex = index
    },
    close () {
      this.authenticationShow = !this.authenticationShow
      this.loginShow = !this.loginShow
    },
    // 身份验证,获取验证码,判断匹配通过后进入首页,及绑定键盘13
    gotoInHome () {},
    // 注册部分
    sexRadio (index) {
      this.defaultSexIndex = index
    },
    registrationSubmitted () {
      let phoneTest = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/ // 手机
      let passWordTest = /^(?![0-9]+$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![a-zA-Z]+$)[0-9A-Za-z]{6,26}$/ //  密码匹配长度为6到26位,字母和数字组成必须包含大写小写
      if (this.userZcNamer === '') {
        this.userHintShow = true
      }
      if (this.phoneZc === '' || !phoneTest.test(this.phoneZc)) { // 手机号码
        this.phoneHintShow = true
      }
      if (this.userZcPassword === '' || !passWordTest.test(this.userZcPassword)) {
        this.confirmPswHintShow = true // 更换提示内容 密码不能为空
      }
      if (this.confirmThePassword === '' || !passWordTest.test(this.confirmThePassword)) {
        this.confirmPswHintShow = true // 更换提示内容 确认密码不能为空
      }
      if (this.confirmThePassword !== this.userZcPassword) {
        this.confirmPswHintShow = true // 2此密码不一致
      }
      if (this.verificationCode === '') { // 短信
        this.phoneSmsHintShow = true
      }
      if (this.paymentPassword === '' || !passWordTest.test(this.paymentPassword)) { // 支付密码
        this.patPswHintShow = true
      }
      let formData = new FormData()
      formData.append('username', this.userZcNamer) // 用户名
      // formData.append('gender') // 性别
      formData.append('phoneNumber', this.phoneZc) // 手机号
      // formData.append('phoneCode') // 手机区号
      formData.append('password', this.userZcPassword) // 密码
      formData.append('pay_pwd', this.paymentPassword) // 支付密码
      formData.append('verifyCode', this.verificationCode) // 验证密码
      if (this.userZcNamer !== '' && this.phoneZc !== '' && phoneTest.test(this.phoneZc) && this.userZcPassword !== '' && passWordTest.test(this.userZcPassword) && (this.userZcPassword === this.confirmThePassword) && this.paymentPassword !== '' && passWordTest.test(this.paymentPassword) && this.verificationCode !== '') {
        this.$http.post(`${this.$api}user/register_user`, formData).then((res) => {
          if (res.data.success) {
            this.sendBtnTimes = 0 // 关闭倒计时
            Dialog({
              msg: '注册成功',
              okFn: () => {
                this.$router.replace('/login')
              }
            })
          } else {
            Dialog({
              msg: res.data.msg,
              okFn: () => {
                this.$router.replace('/signIn')
              }
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    countDown () {
      if (this.sendBtnTimes === 0) {
        this.$refs.sendMsg.innerHTML = '重新发送'
        this.sendBtnTimes = 60
        this.$refs.sendMsg.style.color = 'rgba(201,0,16)'
        this.$refs.sendMsg.disabled = false
        clearTimeout(this.timer)
      } else {
        this.sendBtnTimes--
        this.$refs.sendMsg.innerHTML = this.sendBtnTimes
        this.$refs.sendMsg.disabled = true
        this.$refs.sendMsg.style.color = 'rgba(0,0,0,0.6)'
        this.timer = setTimeout(() => this.countDown(), 1000)
      }
    },
    sendPhoneCode () { // 发送验证码
      let sendCodeMsg // 发送提醒
      let phoneTest = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (this.phoneZc === '' || !phoneTest.test(this.phoneZc)) {
        this.phoneHintShow = true
      } else {
        let formData = new FormData()
        formData.append('json', JSON.stringify({'type': 'register', 'phoneNumber': this.phoneZc}))
        this.$http.post(`${this.$api}user/sendSmsCode`, formData).then(res => {
          if (res.data.success) {
            sendCodeMsg = '发送成功'
            this.phoneHintText = sendCodeMsg
            this.phoneSmsHintShow = true
          } else {
            sendCodeMsg = res.data.msg
            this.phoneHintText = sendCodeMsg
            this.phoneSmsHintShow = true
          }
        }).catch((err) => {
          console.log(err)
        })
        this.countDown()
      }
    }
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
    .signin-box{
      width: 560px;
      height: auto;
      background-color: #fff;
      box-shadow: 0 0 16px 2px rgba(167, 177, 194, .4);
      border-radius: 4px;
      .sigin{
        width: 100%;
        padding: 40px;
        .title{
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          padding-bottom: 40px;
        }
        .new-user{
          width: 100%;
          height: 44px;
          border: 1px solid #999;
          border-radius: 4px;
          padding-left: 30px;
          position: relative;
          input{
            width: 100%;
            height: 100%;
            font-size: 14px;
            color: #999;
          }
          .hint{
            position: absolute;
            left: 0;
            top: 46px;
            font-size: 14px;
            color: #e93a3a;
            opacity: 0;
            &.allHintNullActive{
              opacity: 1;
            }
          }
        }
        .sex{
          height: 44px;
          line-height: 44px;
          margin: 30px auto;
          display: flex;
          justify-content: space-between;
          .tit{
            width: 100px;
            height: 44px;
            border: 1px solid #999;
            border-radius: 4px;
            text-align: center;
            font-size: 14px;
            color: #999;
            margin-right: 20px;
          }
          .sex-input{
            flex: 1;
            height: 44px;
            line-height: 44px;
            border: 1px solid #999;
            border-radius: 4px;
            span{
              display: inline-block;
              line-height: 44px;
              .radio{
                -webkit-appearance: none;
                display: inline-block;
                font-size: 14px;
                color: #999;
                width: 18px;
                height: 18px;
                line-height: 20px;
                border: 1px solid #999;
                border-radius: 100%;
                margin-right: 6px;
                cursor: pointer;
                margin-left: 30px;
                vertical-align: text-bottom;
                &.checkSex{
                  width: 18px;
                  height: 18px;
                  display: inline-block;
                  background-color: #4b84ff;
                  border-radius: 100%;
                  border: none;
                  position: relative;
                  box-shadow: 0 0 1px 1.8px rgba(74, 134, 255, .4);
                  vertical-align: sub;
                  img{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    display: inline-block;
                    width: 10px;
                    height: 7px;
                  }
                }
              }
              i{
                color: #999;
                font-size: 14px;
                vertical-align: middle;
              }
            }
          }
        }
        .phone-box{
          width: 100%;
          height: 44px;
          display: flex;
          justify-content: space-between;
          .phone{
            width: 360px;
            height: 100%;
            border: 1px solid #999;
            border-radius: 4px;
            padding-left: 30px;
            position: relative;
            input{
              width: 100%;
              height: 100%;
              font-size: 14px;
              color: #999;
            }
            .hint{
              position: absolute;
              left: 0;
              top: 46px;
              font-size: 14px;
              color: #e93a3a;
              opacity: 0;
              &.allHintNullActive{
                opacity: 1;
              }
            }
          }
        }
        .new-password{
          width: 100%;
          height: 44px;
          border: 1px solid #999;
          padding-left: 20px;
          border-radius: 4px;
          margin: 30px auto;
          position: relative;
          input{
            width: 100%;
            height: 100%;
            color: #999;
            font-size: 14px;
          }
          .hint {
            position: absolute;
            top: 50px;
            left: 0;
            font-size: 14px;
            color: #e93a3a;
          }
        }
        .confirmPassWord {
          .hint {
            position: absolute;
            left: 0;
            top: 46px;
            font-size: 14px;
            color: #e93a3a;
            opacity: 0;
            &.allHintNullActive {
              opacity: 1;
            }
          }
        }
        .short{
          display: flex;
          align-items: center;
          justify-content: space-around;
          input{
            flex: 1;
          }
          .getCode-box{
            width: auto;
            height: 44px;
            cursor: pointer;
            display: flex;
            align-items: center;
            .getCode{
              padding: 0 20px;
              border-left: 1px solid #999;
              text-align: center;
              color: #4b84ff;
            }
          }
          .hint {
            position: absolute;
            left: 0;
            top: 46px;
            font-size: 14px;
            color: #e93a3a;
            opacity: 0;
            &.allHintNullActive {
              opacity: 1;
            }
          }
        }
        .pay{
          .hint {
            position: absolute;
            left: 0;
            top: 46px;
            font-size: 14px;
            color: #e93a3a;
            opacity: 0;
            &.allHintNullActive {
              opacity: 1;
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
          margin-top: 40px;
          cursor: pointer;
        }
        .back-login{
          text-align: center;
          padding-top: 20px;
          color: #4b84ff;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
</style>
