<template>
  <div>
    <div class="accountBankDetails">
      <div class="accountBankDetailswrap">
        <div class="tab">
          <router-link tag="span" to="/shareRechargeSettings">共享充提</router-link>
          <span>》</span>
          <router-link tag="span" to="/accountBankDetails">账户信息</router-link>
          <span>》</span>
          <router-link tag="span" to="/accountBankDetails"><i>USD</i>账户</router-link>
        </div>
        <div class="accout-box">
          <div class="account-title">账户信息</div>
          <div class="newAddAccount" @click="addNewBank">添加新账户</div>
        </div>
        <div class="account-box">
          <!---->
          <div class="list" v-for="(item,index) in accountBankDetailsDatas" :key="index">
            <div class="bank-box">
              <div class="bank">
                <div class="img"></div><span>{{item.bank}}</span>
              </div>
              <div class="bankCardNumber">{{item.bankNumber}}</div>
            </div>
            <div class="del" @click="deletelistIndexBank(index)"></div>
          </div>
        </div>
      </div>
      <div class="bank-mask" v-show="bankIndexShow">
        <div class="del-box">
          <div class="close" @click="closeBank"></div>
          <div class="title">确认移除账户</div>
          <div class="list">
            <div class="bank-box">
              <div class="bank">
                <div class="img"></div><span>中国银行</span>
              </div>
              <div class="bank-user">钱多多</div>
            </div>
            <div class="bankCardNumber">6324 4561 45648 8951</div>
          </div>
          <div class="delBtn button--ujarak button--inverted">确认移除</div>
        </div>
      </div>
      <div class="annNewBank-mask" v-show="addNewBankShow">
        <div class="del-box">
          <div class="close" @click="closeAddNewBank"></div>
          <div class="hr"></div>
          <div class="title">添加 USD 賬戶</div>
          <div class="list" v-for="(item,index) in addNewBankDatas" :key="index">
            <div class="box-siz">
              <div class="bank-box">
                <div class="bank">
                  <div class="img"></div><span>{{item.bank}}</span>
                </div>
                <div class="bank-user">{{item.user}}</div>
              </div>
              <div class="bankCardNumber">{{item.bankNumber}}</div>
            </div>
            <div class="check-btn">
              <div class="img"></div>
            </div>
          </div>
          <div class="delBtn button--ujarak button--inverted">确认添加</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bankIndexShow: false,
      addNewBankShow: false,
      accountBankDetailsDatas: [
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245'
        },
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245'
        },
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245'
        },
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245'
        },
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245'
        },
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245'
        }
      ],
      addNewBankDatas: [
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245',
          user: '錢少少'
        },
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245',
          user: '錢少少'
        },
        {
          bank: '中国银行',
          bankNumber: '4567 7896 9865 1245',
          user: '錢少少'
        }
      ]
    }
  },
  component: {},
  methods: {
    deletelistIndexBank (index) {
      this.bankIndexShow = true
    },
    closeBank () {
      this.bankIndexShow = false
    },
    addNewBank () {
      this.addNewBankShow = true
    },
    closeAddNewBank () {
      this.addNewBankShow = false
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .accountBankDetails{
    width: 100%;
    .accountBankDetailswrap{
      width: 1550px;
      height: auto;
      margin: auto;
      .tab{
        font-size: 16px;
        color: #1a1a1a;
        span{
          padding-left: 10px;
        }
      }
      .accout-box{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .account-title{
          flex: 1;
          font-size: 34px;
          color: #1a1a1a;
          font-weight: bold;
          padding: 30px 0 60px;
        }
        .newAddAccount{
          width: 200px;
          height: 50px;
          line-height: 50px;
          background-color: #FFBA14;
          border-radius: 4px;
          box-shadow: 0 2px 2px rgba(255, 153, 20, 0.4);
          color: #fff;
          font-size: 20px;
          text-align: center;
          cursor: pointer;
        }
      }
      .account-box{
        width: 100%;
        height: auto;
        display: flex;
        flex-flow: wrap;
        align-items: center;
        justify-content: space-between;
        .list{
          width: 500px;
          height: 120px;
          margin-bottom: 30px;
          background-color: #fcfcfc;
          border: 1px solid #e7e8ec;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .bank-box{
            width: 100%;
            height: auto;
            line-height: 20px;
            .bank{
              height: 20px;
              line-height: 20px;
              margin-bottom: 20px;
              .img{
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;
                margin-left: 20px;
                border-radius: 100%;
                background-color: #1a1a1a;
                background: url("../../assets/images/applySharers/bank.png") no-repeat;
              }
              span{
                padding-left: 10px;
                font-size: 16px;
                color: #1a1a1a;
              }
            }
            .bankCardNumber{
              padding-left: 20px;
              font-size: 16px;
              color: #1a1a1a;
            }
          }
          .del{
            width: 20px;
            height: 20px;
            background: url("../../assets/images/applySharers/delete.png")no-repeat;
            margin-right: 30px;
            cursor:pointer;
          }
        }
      }
    }
    .bank-mask,.annNewBank-mask{
      width: 100%;
      height: 100%;
      z-index: 9999;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0,0,0, .2);
      display: flex;
      align-items: center;
      justify-content: center;
      .del-box{
        width: 600px;
        height: 432px;
        background-color: #fff;
        border-radius: 4px;
        position: relative;
        box-shadow: 0 3px 8px rgba(74, 134, 255, 0.4);
        .close{
          position: absolute;
          right: 20px;
          top: 20px;
          width: 17px;
          height: 17px;
          background: url("../../assets/images/login/Shutdown.png") no-repeat;
          cursor: pointer;
        }
        .title{
          text-align: center;
          padding: 40px 0;
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
        }
        .list{
          width: 440px;
          height: 100px;
          margin: auto;
          margin-bottom: 100px;
          border: 1px solid #e7e8ec;
          border-radius: 4px;
          .bank-box{
            width: 100%;
            height: auto;
            line-height: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 30px 20px 20px;
            .bank{
              flex: 1;
              .img{
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;
                border-radius: 100%;
                background-color: #1a1a1a;
                background: url("../../assets/images/applySharers/bank.png") no-repeat;
              }
              span{
                padding-left: 10px;
                font-size: 16px;
                color: #1a1a1a;
              }
            }
            .bank-user{}
          }
          .bankCardNumber{
            padding-left: 20px;
            font-size: 16px;
            color: #1a1a1a;
          }
        }
        .delBtn{
          width: 440px;
          height: 50px;
          margin: auto;
          background-color: #FFBA14;
          box-shadow: 0 2px 2px rgba(255, 153, 20, 0.4);
          border-radius: 4px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          position: relative;
          z-index: 1;
          &:hover{
            opacity: .8;
          }
        }
        .button--ujarak:hover::before {
          opacity: 1;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
        .button--ujarak.button--inverted::before {
          background: #F0A50E;
        }
        .button--ujarak::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: #F29B05;
          z-index: -1;
          opacity: 0;
          -webkit-transform: scale3d(0.7, 1, 1);
          transform: scale3d(0.7, 1, 1);
          -webkit-transition: -webkit-transform 0.4s, opacity 0.4s;
          transition: transform 0.4s, opacity 0.4s;
          -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
          transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        }
        .button--ujarak,.button--ujarak::before {
          -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
          transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
        }
      }
    }
    .annNewBank-mask{
     .del-box{
       height: 630px;
       position: relative;
       .hr{
         width: 6px;
         height: 100px;
         background-color: #ffe8b2;
         position: absolute;
         right: 24px;
         top: 180px;
       }
       .list{
         width: 500px;
         margin-bottom: 20px;
         display: flex;
         align-items: center;
         justify-content: space-between;
         .box-siz{
           flex: 1;
           height: 100%;
           border-right: 1px solid #e7e8ec;
         }
         .check-btn{
           width: 60px;
           display: flex;
           align-items: center;
           justify-content: center;
           .img{
             width: 18px;
             height: 18px;
             cursor: pointer;
             border: 1px solid #e7e8ec;
             border-radius: 4px;
             //background: url("../../assets/images/applySharers/selected.png") no-repeat;
           }
         }
       }
       .delBtn{
         margin-top: 60px;
       }
     }
    }
  }
</style>
