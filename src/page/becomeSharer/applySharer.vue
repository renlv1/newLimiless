<template>
  <div>
    <!--申请共享者-->
    <div class="registeredSharer-warp">
      <div class="registered-sharer-box">
        <div class="title">注册共享着</div>
        <!--申请共享者-->
        <div class="tabBtn" v-if="formTablShow === true">
          <div class="btn appForbtn"></div>
          <div class="btn"></div>
          <div class="btn result"></div>
        </div>
        <!--审核个人信息...-->
        <div class="tabBtn" v-else-if="informationShow === true">
          <div class="btn appForbtn appForbtnShenHe"></div>
          <div class="btn information"></div>
          <div class="btn result"></div>
        </div>
        <!--审核成功,成为共享者-->
        <div class="tabBtn" v-else-if="isSharerShow === true">
          <div class="btn appForbtn appForbtnShenHe"></div>
          <div class="btn appForbtn appForbtnShenHe"></div>
          <div class="btn appForbtn appForbtnShenHeLast"></div>
        </div>
        <!--审核失败-->
        <div class="tabBtn" v-else-if="noSharerShow === true">
          <div class="btn appForbtn appForbtnShenHe"></div>
          <div class="btn appForbtn appForbtnShenHe"></div>
          <div class="btn appForbtn appNoForbtnShenHeLast"></div>
        </div>
        <div class="tab-title">
          <div class="tit">申请成为共享着</div>
          <div class="tit">审核个人信息</div>
          <div class="tit">审核结果</div>
        </div>
        <div class="formTable" v-show="formTablShow">
          <div class="personal-details">个人信息</div>
          <div class="input-box zcname">
            <span>姓名</span><input type="text" placeholder="请输入你用户名" autocomplete="off">
          </div>
          <div class="input-box zcaddress">
            <span>地址</span><input type="text" placeholder="请输入地址" autocomplete="off">
          </div>
          <div class="input-box zcphone">
            <span>手机号码</span>
            <div class="phone">
              <div class="area-code">+86</div>
              <input type="text" placeholder="请输入手机号码" autocomplete="off">
              <div class="error">请输入正确的手机号码</div>
            </div>
          </div>
          <div class="input-box bondsman">
            <span>担保人用户名</span><input type="text" placeholder="请输入担保人用户名" autocomplete="off">
            <div class="error">担保人不存在</div>
          </div>
          <div class="procedure-rates">手续费率</div>
          <div class="input-box Pay">
            <span>法币充值费率</span><input type="text" placeholder="请输入法币充值费率" autocomplete="off"><i>%</i>
          </div>
          <div class="input-box embody">
            <span>法币提现费率</span><input type="text" placeholder="请输入法币提现费率" autocomplete="off"><i>%</i>
          </div>
          <div class="contact-title">联系信息</div>
          <div class="input-box contact-way">
            <span>联系方式</span>
            <div class="inputcontact-box">
              <div class="input-type">微信</div>
              <input type="text" placeholder="请输入联系方式" autocomplete="off">
            </div>
          </div>
          <div class="sibBtn button--ujarak button--inverted" @click="paymentBond()">确认提交</div>
          <div class="bottim-text">
            确认资料无误后,提交资料并支付保证金
          </div>
        </div>
        <div class="review-progress" v-show="informationShow">
          <div class="imgBg"></div>
          <div class="textmsg">正在审核个人信息 ...</div>
        </div>
        <div class="review-progress" v-show="isSharerShow">
          <div class="isSharerShowImgBg"></div>
          <div class="textmsg">审核成功! 恭喜你成为共享者.</div>
        </div>
        <div class="review-progress" v-show="noSharerShow">
          <div class="nOSharerShowImgBg"></div>
          <div class="notextmsg">审核失败: 我是失败的原因</div>
          <div class="error-btn">重新提交</div>
        </div>
      </div>
      <div class="mask" v-show="paymentBondShow">
        <div class="amount-of-payment">
          <div class="close" @click="close()"></div>
          <div class="amount-of-payment-box">
            <div class="title">支付金额</div>
            <div class="money">20000 T</div>
            <div class="transaction-password">交易密码</div>
            <div class="transaction-password-input">
              <input type="password" placeholder="请输入交易密码">
            </div>
            <div class="verification">
              <div class="sms-verification" :class="{active: defaultIndex == index}" v-for="(item,index) in tabDatas" @click="onTabVerification(index)"  :key="index">{{item.tab}}</div>
              <!--<div class="google-authenticator">谷歌验证</div>
              <div class="sms-verification">短信验证</div>-->
            </div>
            <div class="input-box" v-show="defaultIndex == index" v-for="(item,index) in loginAuthenticationData" :key="index">
              <input class="code" type="text" autocomplete="off" :placeholder="item.text">
              <div class="code-btn">
                <div class="btn-veri">获取验证码</div>
              </div>
            </div>
            <div class="error">交易密码错误</div>
            <div class="amount-of-payment-btn button--ujarak button--inverted" @click="amountofpayment()">确认支付</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paymentBondShow: false,
      defaultIndex: 1,
      amountOfPaymentShow: false,
      formTablShow: true, // 注册共享者show
      informationShow: false, // 支付成功后审核个人信息
      isSharerShow: false, // 审核成为共享者
      noSharerShow: false, // 审核失败
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
  methods: {
    paymentBond () {
      this.paymentBondShow = true
    },
    onTabVerification (index) {
      this.defaultIndex = index
    },
    close () {
      this.paymentBondShow = !this.paymentBondShow
    },
    amountofpayment () {
      // 确认支付后,支付成功提示框和支付失败提示框,
      // 支付成功后,隐藏注册贡献者表,显示共享者审核状态,样式,审核中,审核个人信息,审核失败,和成功
      // (1)判断申请共享支付成功后:
      this.formTablShow = false
      this.paymentBondShow = false
      // 判断审核个人信息中
      // this.informationShow = true
      // (2)判断申请成功
      this.isSharerShow = true
      // (3)判断申请失败
      // this.noSharerShow = true
    }
  }
}
</script>

<style lang="less" scoped>
  .registeredSharer-warp{
    width: 100%;
    height: 100%;
    background-color: #FAFAFC;
    .registered-sharer-box{
      width: 1550px;
      height: auto;
      margin: auto;
      .title{
        font-size: 34px;
        font-weight: bold;
        color: #1a1a1a;
        padding: 60px 0;
      }
      .tabBtn{
        width: 552px;
        margin: auto;
        height: 2px;
        background-color: #c4c6cc;
        display: flex;
        justify-content: space-between;
        .btn{
          width: 20px;
          height: 20px;
          background-color: #FAFAFC;
          border: 2px solid #c4c6cc;
          border-radius: 100%;
          margin-top: -10px;
        }
        .appForbtn{
          width: 24px;
          height: 24px;
          border: none;
          background: url("../../assets/images/applySharers/ongoing.png") no-repeat;
          background-size: 100%;
          margin-left: -3px;
          position: relative;
        }
        .appForbtnShenHe{
          width: 24px;
          height: 24px;
          border: none;
          background: url("../../assets/images/applySharers/complete.png") no-repeat;
          background-size: 100%;
          margin-left: -2px;
          &:after{
            content: '';
            display: inline-block;
            width: 247px;
            height: 2px;
            position: absolute;
            left: 145px;
            top: 43%;
            transform: translate(-50%);
            background-color: #4B84FF;
          }
        }
        .appForbtnShenHeLast{
          width: 24px;
          height: 24px;
          border: none;
          background: url("../../assets/images/applySharers/complete.png") no-repeat;
          background-size: 100%;
          margin-right: -2px;
        }
        .appNoForbtnShenHeLast{
          width: 24px;
          height: 24px;
          border: none;
          background: url("../../assets/images/applySharers/failure.png") no-repeat;
          background-size: 100%;
          margin-right: -2px;
        }
        .information{
          width: 24px;
          height: 24px;
          border: none;
          background: url("../../assets/images/applySharers/ongoing.png") no-repeat;
          background-size: 100%;
          margin-left: -3px;
        }
      }
      .tab-title{
        width: 634px;
        margin: auto;
        padding: 20px 0 70px;
        display: flex;
        font-size: 18px;
        color: #666;
        justify-content: space-between;
        .tit{
          width: 33%;
          &:nth-child(2){
            text-align: center;
          }
          &:nth-child(3){
            text-align: right;
            padding-right: 20px;
          }
        }
      }
      .formTable{
        width: 580px;
        margin: auto;
        .personal-details{
          font-size: 20px;
          font-weight: bold;
          padding: 12px 0;
          text-align: left;
        }
        .input-box{
          width: 100%;
          height: 44px;
          margin: 30px auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          span{
            display: inline-block;
            font-size: 16px;
            color: #1a1a1a;
          }
          input{
            width: 440px;
            height: 100%;
            background-color: #fff;
            border: 1px solid #999;
            border-radius: 4px;
            padding-left: 30px;
            color: #1a1a1a;
            font-size: 16px;
          }
          .error{
            font-size: 14px;
            color: #e93a3a;
            position: absolute;
            left: 140px;
            bottom: -20px;
          }
          .phone{
            width: 440px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            .area-code{
              width: 100px;
              height: 100%;
              text-align: center;
              line-height: 44px;
              background-color: #fff;
              border: 1px solid #999;
              border-radius: 4px;
              color: #999;
              margin-right: 20px;
            }
            input{
              flex: 1;
            }
            .error{
              font-size: 14px;
              color: #e93a3a;
              position: absolute;
              left: 120px;
              bottom: -20px;
            }
          }
          i{
            position: absolute;
            right: -20px;
            font-size: 16px;
            color: #1a1a1a;
          }
        }
        .procedure-rates{
          font-size: 20px;
          color: #1a1a1a;
          font-weight: bold;
          padding: 30px 0;
        }
        .contact-title{
          font-size: 20px;
          color: #1a1a1a;
          font-weight: bold;
          margin: 50px auto;
        }
        .contact-way{
          padding-top: 0;
          margin-top: 0;
          margin-bottom: 80px;
          .inputcontact-box{
            width: 440px;
            height: 44px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .input-type{
              width: 100px;
              height: 100%;
              line-height: 44px;
              text-align: center;
              color: #999;
              font-size: 16px;
              margin-right: 20px;
              border: 1px solid #999;
              border-radius: 4px;
            }
            input{
              flex: 1;
              color: #999;
              font-size: 16px;
            }
          }
        }
        .sibBtn{
          width: 200px;
          height: 50px;
          line-height: 50px;
          background-color: #ffa114;
          border-radius: 4px;
          margin: 0 auto;
          font-size: 20px;
          text-align: center;
          color: #fff;
        }
        .bottim-text{
          padding: 10px 0 60px;
          color: #999;
          text-align: center;
          font-size: 14px;
        }
      }
      .review-progress{
        width: 552px;
        margin: auto;
        .imgBg{
          width: 120px;
          height: 108px;
          background: url("../../assets/images/applySharers/Waiting.png") no-repeat;
          margin: 0 auto;
        }
        .isSharerShowImgBg{
          width: 120px;
          height: 108px;
          background: url("../../assets/images/applySharers/big_complete.png") no-repeat;
          margin: 0 auto;
        }
        .nOSharerShowImgBg{
          width: 120px;
          height: 108px;
          background: url("../../assets/images/applySharers/big_failure.png") no-repeat;
          margin: 0 auto;
        }
        .textmsg{
          width: 552px;
          margin: auto;
          font-size: 16px;
          color: #1a1a1a;
          text-align: center;
          padding-top: 20px;
        }
        .notextmsg{
          color: #e93a3a;
          text-align: center;
          padding: 20px 0 60px;
        }
        .error-btn{
          width: 200px;
          height: 50px;
          line-height: 50px;
          color: #fff;
          font-size: 20px;
          background-color: #ffba14;
          border-radius: 4px;
          box-shadow: 0 2px 2px rgba(255, 153, 20, 0.4);
          margin: auto;
          text-align: center;
        }
      }
    }
    .mask{
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      z-index: 9999;
      background-color: rgba(0,0,0, .2);
      display: flex;
      align-items: center;
      justify-content: center;
      .amount-of-payment{
        width: 600px;
        padding-bottom: 80px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 16px 2px rgba(167, 177, 194, 0.4);
        display: flex;
        justify-content: center;
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
        .amount-of-payment-box{
          width: 440px;
          .title{
            font-size: 20px;
            color: #1a1a1a;
            font-weight: bold;
            padding: 40px 0;
            text-align: center;
          }
          .money{
            font-size: 34px;
            color: #f75050;
            text-align: center;
            padding-bottom: 50px;
          }
          .transaction-password{
            font-size: 16px;
            color: #1a1a1a;
            padding-bottom: 10px;
          }
          .transaction-password-input{
            width: 440px;
            height: 44px;
            line-height: 44px;
            padding-left: 30px;
            border: 1px solid #999;
            margin-bottom: 30px;
            border-radius: 4px;
            input{
              width: 100%;
              height: 100%;
              color: #1a1a1a;
              font-size: 16px;
            }
          }
          .verification{
            width: 100%;
            height: 38px;
            line-height: 38px;
            margin-top: 30px;
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
          .error{
            font-size: 14px;
            color: #e93a3a;
            padding-top: 6px;
            padding-bottom: 82px;
          }
          .amount-of-payment-btn{
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            color: #fff;
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
            &:hover{
              opacity: .8;
            }
          }
        }
      }
    }
  }
</style>
