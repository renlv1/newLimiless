<template>
  <div class="login">
    <!--忘记密码-->
    <div class="retrievePassword-box">
      <div class="retrievePassword">
        <div class="title">忘记密码</div>
        <div class="input-box">
          <input type="text" placeholder="输入你的用户名" autocomplete="off">
        </div>
        <div class="input-box">
          <input type="text" placeholder="输入密码" autocomplete="off">
        </div>
        <div class="input-box confirm-passwd">
          <input type="text" placeholder="确认密码" autocomplete="off">
        </div>
        <div class="confirm-error">两次密码要一致</div>
        <div class="input-box sms-box">
          <input class="sms-verification" type="text" placeholder="输入短信验证码" autocomplete="off">
          <div class="getSmsVerification-cu" @click="onGetSmsVerification()">
            <div class="getSmsVerification">获取验证码</div>
          </div>
        </div>
        <div class="btn">确认</div>
        <router-link to="/login" tag="div" class="back-login">返回登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    // 忘记密码, 获取短信验证码
    onGetSmsVerification () {}
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
    // 忘记密码
    .retrievePassword-box{
      width: 660px;
      height: 540px;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 0 16px 2px rgba(167, 177, 194, .4);
      .retrievePassword{
        padding: 40px 90px 0;
        .title{
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
        }
        .input-box{
          width: 100%;
          height: 44px;
          line-height: 44px;
          padding-left: 30px;
          border: 1px solid #999;
          margin: 30px auto;
          border-radius: 4px;
          input{
            color: #999;
            font-size: 14px;
          }
        }
        .confirm-passwd{
          margin-bottom: 0;
        }
        .confirm-error{
          color: #e93a3a;
          font-size: 14px;
          padding: 6px 0 20px;
        }
        .sms-box{
          display: flex;
          align-items: center;
          margin-top: 0;
          justify-content: space-between;
          .sms-verification{
            flex: 1;
          }
          .getSmsVerification-cu{
            width: auto;
            height: 44px;
            cursor: pointer;
            display: flex;
            align-items: center;
            .getSmsVerification{
              width: 100%;
              height: 20px;
              line-height: 20px;
              padding: 0 20px;
              font-size: 14px;
              color: #4b84ff;
              border-left: 1px solid #999;
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
          cursor: pointer;
          margin: 40px auto 20px;
        }
        .back-login{
          text-align: center;
          color: #4b84ff;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
</style>
