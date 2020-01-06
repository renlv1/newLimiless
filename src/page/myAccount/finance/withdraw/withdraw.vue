<template>
  <div class="recharge" >
    <div class="bread">
      <router-link tag="i" to="cashValue">充值/提现</router-link> 》 <span>充值</span>
    </div>
    <h3>充值</h3>
    <div class="recharge-box">
      <div class="rechargeNum">
        <span>输入充值数额</span>
        <input type="text" placeholder="输入您需要充值的数额" v-model="rechargeNum">
      </div>
      <div class="currency">
        <span>选择您支付的币种</span>
        <div class="currencySelect">
          <div class="select" @click="currencyToggle = !currencyToggle">
            <span>{{selectedCurrency}}</span><i :class="{'close':currencyToggle}"></i>
          </div>
          <ul :class="{'close': currencyToggle}">
            <li v-for="(item, index) in currencyList" :key="index" @click="selectedCurrency = item.tag;currencyToggle = false;currencyFlag = true" :class="{'active':selectedCurrency === item.tag}">{{item.tag}}</li>
          </ul>
        </div>
      </div>
      <div class="payNumber">
        <span>选择支付账号</span>
        <div class="selectNumber">
          <div class="select" @click="accountToggle = !accountToggle">
            <span>{{payNumber}}</span><i :class="{'close':accountToggle && currencyFlag }"></i>
          </div>
          <div class="curNumber" v-if="selectedNumber">
            <div class="cur-li">
              <p>
                <span><i></i>中国银行</span><span>张三</span>
              </p>
              <p><span>62271764456455645645</span></p>
            </div>
          </div>
          <div class="accountNum" :class="{'close': accountToggle && currencyFlag}">
            <div class="addBtn" @click="$router.push({path: '/account/addAccount',query: {currency: selectedCurrency}})">
              <p><span>添加账户</span></p>
            </div>
            <ul>
              <li>
                <p>
                  <span><i></i>中国银行</span><span>张三</span>
                </p>
                <p><span>62271764456455645645</span><b>默认</b></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btn">
        确认充值
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      rechargeNum: '', // 充值数额
      currencyToggle: false, // 币种选择开关
      accountToggle: false,
      currencyFlag: false, // 是否已经选择了币种
      currencyList: [
        {
          tag: 'USD'
        },
        {
          tag: 'CNY'
        },
        {
          tag: 'BTC'
        },
        {
          tag: 'LTC'
        }
      ],
      selectedNumber: {},
      selectedCurrency: '请选择您支付的币种', // 当前币种
      payNumber: '选择支付账号'
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
  .recharge{
    background-color: #fafafc;
    width: 100%;
    padding: 40px 60px;
    h3{
      font-size: 34px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 60px;
    }
    .recharge-box{
      width: 760px;
      padding: 40px;
      border: 1px solid #e7e8ec;
      border-radius: 4px;
      background-color: #fff;
      .rechargeNum{
        padding-right: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          color: #1a1a1a;
          font-size: 16px;
        }
        input{
          width: 440px;
          border: 1px solid #e7e8ec;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          padding: 0 20px;
        }
      }
      .currency{
        margin-top: 30px;
        padding-right: 70px;
        display: flex;
        margin-bottom: 30px;
        align-items: center;
        justify-content: space-between;
        &>span{
          color: #1a1a1a;
          font-size: 16px;
        }
        .currencySelect{
          width: 440px;
          height: 50px;
          border: 1px solid #e7e8ec;
          position: relative;
          padding: 0 20px;
          .select{
            width: 100%;
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
              line-height: 50px;
              display: block;
              color: #999;
            }
            i{
              display: block;
              height: 0px;
              width: 0px;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #ffba14;
              transition: all 0.5s;
              transform: rotate(180deg);
              &.close{
                transform: rotate(0deg);
              }
            }
          }
          ul{
            position: absolute;
            top: 50px;
            left: 0;
            box-shadow: 0px 5px 20px #ccc;
            height: 0;
            overflow: hidden;
            transition: all 0.5s;
            z-index: 10;
            &.close{
              height: 176px;
            }
            li{
              width: 440px;
              height: 44px;
              border-bottom: 1px solid #e7e8ec;
              line-height: 44px;
              text-align: center;
              background-color: #fff;
              cursor: pointer;
              color: #999;
              &:hover{
                color: #1a1a1a;
              }
              &.active{
                color: #1a1a1a;
              }
            }
          }

        }
      }
      .payNumber{
        margin-top: 30px;
        padding-right: 70px;
        display: flex;
        margin-bottom: 30px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 200px;
        &>span{
          color: #1a1a1a;
          font-size: 16px;
        }
        .selectNumber{
          width: 440px;
          height: 50px;
          border: 1px solid #e7e8ec;
          position: relative;
          padding: 0 20px;
          .select{
            width: 100%;
            height: 100%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
              line-height: 50px;
              display: block;
              color: #999;
            }
            i{
              display: block;
              height: 0px;
              width: 0px;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #ffba14;
              transition: all 0.5s;
              transform: rotate(180deg);
              &.close{
                transform: rotate(90deg);
              }
            }
          }
          .curNumber{
            padding: 20px  ;
            position: absolute;
            top: 50px;
            left: -1px;
            border: 1px solid #e7e8ec;
            border-top: none;
            width: 440px;
            height: 140px;
            z-index: 9;
            background-color: #fff;
            .cur-li{
              width: 380px;
              height: 100px;
              margin: 0 auto;
              border: 1px solid #e7e8ec;
              background-color: #fcfcfc;
              margin-bottom: 20px;
              padding: 20px 30px 20px 20px;
              p {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 30px;
                span {
                  font-size: 16px;
                  color: #1a1a1a;
                  vertical-align: middle;
                  line-height: 30px;
                  i {
                    display: inline-block;
                    background-image: url('../../../../assets/images/finance/bank.png');
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background-size: cover;
                    margin-right: 10px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
          .accountNum{
            position: absolute;
            top:0 ;
            right: -600px;
            width: 440px;
            height: 0px;
            box-shadow: 0px 5px 20px #ccc;
            transition: all 0.5s;
            overflow: hidden;
            background-color: #fff;
            &.close{
              height: 448px;
            }
            .addBtn{
              padding: 18px 0;
              border-bottom: 1px solid #e7e8ec;
              p{
                width: 380px;
                height: 44px;
                border: 1px dashed #ffba14;
                border-radius: 4px;
                text-align: center;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content:center;
                cursor: pointer;
                span{
                  text-align: center;
                  font-size: 16px;
                  color: #1a1a1a;
                  &:before{
                    content: '+';
                    display: inline-block;
                    margin-right: 10px;
                    font-size:16px;
                  }
                }
              }
            }
            ul{
              padding: 10px 0 0 ;
              height: 370px;
              overflow-y: auto;
              &::-webkit-scrollbar {display:none}
              li{
                width: 380px;
                height: 100px;
                margin: 0 auto;
                border: 1px solid #e7e8ec;
                background-color: #fcfcfc;
                margin-bottom: 20px;
                padding: 20px 30px 20px 20px;
                cursor: pointer;
                p{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  height: 30px;
                  span{
                    font-size: 16px;
                    color: #1a1a1a;
                    vertical-align: middle;
                    line-height: 30px;
                    i{
                      display: inline-block;
                      background-image: url('../../../../assets/images/finance/bank.png');
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background-size: cover;
                      margin-right: 10px;
                      vertical-align: middle;
                    }
                  }
                  b{
                    color: #4b84ff;
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
      .btn{
        width: 210px;
        height: 50px;
        border: 1px solid transparent;
        border-radius: 4px;
        display: block;
        text-align: center;
        line-height: 50px;
        color: #fff;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #999;
        margin-left: 165px;
        &.active{
          background-color: #ffba14;
        }
      }
    }
  }
</style>
