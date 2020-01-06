<template>
  <div>
    <!--共享者充值提现设置-->
    <div class="shareRechargeSettings-wrap">
      <div class="shareRechargeSettings">
        <div class="title">共享者充提设置</div>
        <div class="formTable">
          <div class="sharing-Settings">共享设置</div>
          <div class="infoBox">
            <div class="type">支持类型</div>
            <div class="pay">充值</div>
            <div class="withdrawal">提现</div>
          </div>
          <div class="infoBox infoBoxBot">
            <div class="type">共享充提</div>
            <div class="pay" v-for="(item,index) in sharingSettingsDatas" :key="index" @click="sharingSettingstype(index)">
               <div class="payBtn" :class="{active: sharingSettingsTypeindex == 0}">{{item.taype}}</div>
            </div>
            <!--<div class="withdrawal">
              <div class="withdBtn"></div>s
            </div>-->
          </div>
          <div class="top-up-fees">
            <div class="title">充值费率</div>
            <div class="num">36%</div>
            <div class="modification">修改</div>
          </div>
          <div class="withdrawal-rate">
            <div class="title">提现费率</div>
            <div class="input">
              <input type="text" autocomplete="off" placeholder="请输入提现费率">
            </div>
            <div class="btn-box">
              <div class="save">保存</div>
              <div class="cancel">取消</div>
            </div>
          </div>
          <div class="currency-type">
            <div class="table">
                <div class="title">支持币种设置</div>
                <router-link to="/sharerAccount" tag="div" class="account-information button--round-s button--aylen button--aylen">账户信息</router-link>
            </div>
            <div class="form">
              <div class="list-title">
                <div class="type">支持币种</div>
                <div class="recharge">充值</div>
                <div class="withdrawal">提现</div>
              </div>
              <div class="currency-list" v-for="(item,index) in currencyDatas" :key="index">
                <div class="currency">{{item.currency}}</div>
                <div class="recharge">
                  <div class="checkbox"></div>
                </div>
                <div class="withdrawal">
                  <div class="checkbox"></div>
                </div>
              </div>
            </div>
            <div class="personal-information">个人信息</div>
            <div class="username">
              <div class="user">姓名</div>
              <div class="name">灭霸</div>
            </div>
            <div class="address">
              <div class="addr">地址</div>
              <div class="name">风语咒</div>
            </div>
            <div class="contact-information">联系信息</div>
            <div class="contact-title">
              <div class="type">类型</div>
              <div class="manner">联系方式</div>
              <div class="operation">操作</div>
            </div>
            <div class="contact-list" v-for="(item,index) in contactListDatas" :key="index">
              <div class="type">{{item.type}}</div>
              <div class="manner">{{item.manner}}</div>
              <div class="operation">
                <div class="del">{{item.del}}</div>
              </div>
            </div>
            <div class="weixi">
              <div class="type">
                <div class="tit">微信</div>
                <div class="img"></div>
              </div>
              <div class="manner">
                <input type="text" autocomplete="off" placeholder="请输入联系方式">
              </div>
              <div class="operation">
                <div class="save">保存</div>
                <div class="cancel">取消</div>
              </div>
            </div>
            <div class="addnew">+新增联系方式</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      sharingSettingsShow: true,
      sharingSettingsTypeindex: 0,
      sharingSettingsDatas: [
        {
          taype: ''
        },
        {
          taype: ''
        }
      ],
      currencyDatas: [
        {
          currency: 'USD'
        },
        {
          currency: 'CNY'
        },
        {
          currency: 'HKD'
        },
        {
          currency: 'CAD'
        },
        {
          currency: 'KRW'
        },
        {
          currency: 'BTC'
        },
        {
          currency: 'LTC'
        },
        {
          currency: 'ETH'
        },
        {
          currency: 'XRP'
        },
        {
          currency: 'BCH'
        },
        {
          currency: 'SIE'
        }
      ],
      contactListDatas: [
        {
          type: 'Wechat',
          manner: '12345678910',
          del: '删除'
        },
        {
          type: 'QQ',
          manner: '312239448',
          del: '删除'
        }
      ]
    }
  },
  methods: {
    sharingSettingstype (index) {
      this.sharingSettingsTypeindex = index
      console.log('sss')
    }
  }
}
</script>

<style lang="less" scoped>
  .shareRechargeSettings-wrap{
    width: 100%;
    height: auto;
    background-color: #fcfafa;
    .shareRechargeSettings{
      width: 1550px;
      margin: auto;
      .title{
        font-size: 34px;
        font-weight: bold;
        color: #1a1a1a;
        padding: 60px 0;
      }
      .formTable{
        width: 580px;
        padding-bottom: 128px;
        margin: auto;
        .sharing-Settings{
          font-size: 20px;
          line-height: 50px;
          color: #1a1a1a;
          font-weight: bold;
        }
        .infoBox{
          width: 100%;
          line-height: 44px;
          border: 1px solid #c4c6cc;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 16px;
          color: #666;
          .type{
            flex: 1;
            height: 100%;
            text-align: center;
            border-right: 1px solid #c4c6cc;
          }
          .pay{
            width: 140px;
            height: 100%;
            text-align: center;
            border-right: 1px solid #c4c6cc;
          }
          .withdrawal{
            width: 140px;
            height: 100%;
            text-align: center;
          }
        }
        .infoBoxBot{
          width: 100%;
          line-height: 44px;
          border: 1px solid #c4c6cc;
          background-color: #fcfcfc;
          border-top: none;
          &:nth-child(3){
            border-right: none;
          }
          .pay {
            width: 140px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.active{
              width: 16px;
              height: 16px;
              background: url("../../assets/images/applySharers/selected.png") no-repeat;
              background-size: 100%;
              border: none;
              cursor: pointer;
            }
            .payBtn {
              width: 16px;
              height: 16px;
              border-radius: 4px;
              border: 1px solid #c4c6cc;
              cursor: pointer;
            }
          }
          .withdrawal{
            width: 140px;
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            .withdBtn{
              width: 16px;
              height: 16px;
              border-radius: 4px;
              border: 1px solid #c4c6cc;
              cursor: pointer;
            }
          }
        }
        .top-up-fees{
          width: 100%;
          height: 44px;
          margin: 30px auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title{
            padding-right: 102px;
            font-size: 16px;
            font-weight: normal;
            color: #1a1a1a;
          }
          .num{
            flex: 1;
          }
          .modification{
            width: 140px;
            text-align: center;
            color: #ffba14;
            font-weight: bold;
          }
        }
        .withdrawal-rate{
          width: 100%;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title{
            font-size: 16px;
            color: #1a1a1a;
            padding-right: 72px;
            font-weight: normal;
          }
          .input{
            flex: 1;
            height: 100%;
            line-height: 34px;
            padding-left: 30px;
            border: 1px solid #c4c6cc;
            border-radius: 4px;
            background-color: #fff;
            input {
              font-size: 16px;
              color: #666;
            }
          }
          .btn-box{
            width: auto;
            height: 34px;
            line-height: 34px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-align: center;
            font-size: 16px;
            .save{
              width: 60px;
              height: 34px;
              background-color: #ffba14;
              color: #fff;
              border-radius: 4px;
              margin: 0 20px 0 34px;
            }
            .cancel{
              color: #F75050;
              width: 60px;
            }
          }
        }
        .currency-type{
          margin: 60px auto;
          width: 100%;
          .table{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title{
              flex: 1;
              display: inline-block;
              font-size: 20px;
              color: #1a1a1a;
              font-weight: bold;
            }
            .account-information{
              width: 140px;
              height: 34px;
              line-height: 34px;
              background-color: #fff;
              text-align: center;
              color: #ffba14;
              border: 1px solid #ffba14;
              border-radius: 4px;
              cursor: pointer;
              position: relative;
              z-index: 1;
              &:hover{
                color: #fff;
                border: 1px solid #ffba14;
            }
            }
            .button--aylen:hover::after {
              -webkit-transition-delay: .175s;
              transition-delay: .175s;
            }
            .button--aylen:hover::before,.button--aylen:hover::after {
              -webkit-transform: translate3d(0,100%,0);
              transform: translate3d(0,100%,0);
            }
            .button--aylen::before,.button--aylen::after {
              content: '';
              position: absolute;
              height: 100%;
              width: 100%;
              bottom: 100%;
              left: 0;
              z-index: -1;
              -webkit-transition: -webkit-transform .3s;
              transition: transform .3s;
              -webkit-transition-timing-function: cubic-bezier(.75,0,.125,1);
              transition-timing-function: cubic-bezier(.75,0,.125,1);
            }
            .button--border-thin {
              border: 1px solid;
            }
            .button--round-s {
              border-radius: 4px;
            }
            .account-information,.button--aylen{
              overflow: hidden;
              background-color: #fff;
              -webkit-transition: color .3s;
              transition: color .3s;
            }
            .button--aylen::after {
              background: #ffba14;
              opacity: .8;
            }
          }
          .form{
            width: 100%;
            margin-top: 20px;
            .list-title{
              width: 100%;
              height: 44px;
              background-color: #fff;
              line-height: 44px;
              text-align: center;
              color: #666;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid #e7e8ec;
              .type{
                flex: 1;
              }
              .recharge{
                width: 140px;
                text-align: center;
                border-right: 1px solid #e7e8ec;
                border-left: 1px solid #e7e8ec;
              }
              .withdrawal{
                width: 140px;
              }
            }
            .currency-list{
              width: 100%;
              height: 44px;
              background-color: #fff;
              line-height: 44px;
              text-align: center;
              color: #666;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid #e7e8ec;
              border-top: none;
              &:nth-child(2n){
                background-color: #fcfcfc;
              }
              .currency{
                flex: 1;
                color: #1a1a1a;
                font-weight: bold;
              }
              .recharge{
                width: 140px;
                height: 100%;
                text-align: center;
                border-right: 1px solid #e7e8ec;
                border-left: 1px solid #e7e8ec;
                display: flex;
                align-items: center;
                .checkbox{
                  width: 16px;
                  height: 16px;
                  border-radius: 4px;
                  margin: auto;
                  border: 1px solid #c4c6cc;
                }
              }
              .withdrawal{
                width: 140px;
                display: flex;
                align-items: center;
                .checkbox{
                  width: 16px;
                  height: 16px;
                  border-radius: 4px;
                  margin: auto;
                  border: 1px solid #c4c6cc;
                }
              }
            }
          }
        }
        .personal-information{
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
          margin: 60px auto 30px;
        }
        .username{
          width: 100%;
          height: 44px;
          line-height: 44px;
          .user{
            display: inline-block;
            padding-right: 138px;
            font-size: 16px;
            color: #666;
          }
          .name{
            display: inline-block;
            font-size: 16px;
            color: #1a1a1a;
          }
        }
        .address{
          line-height: 44px;
          margin: 20px auto;
          .addr,.name{
            display: inline-block;
            padding-right: 138px;
            padding-bottom: 60px;
            color: #666;
          }
          .name{
            color: #1a1a1a;
          }
        }
        .contact-information{
          line-height: 50px;
          padding-bottom: 20px;
          font-size: 20px;
          font-weight: bold;
          color: #1a1a1a;
        }
        .contact-title,.contact-list,.weixi{
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          text-align: center;
          background-color: #fff;
          justify-content: space-between;
          border: 1px solid #e7e8ec;
          .type{
            width: 140px;
          }
          .manner{
            flex: 1;
            line-height: 44px;
            border-left: 1px solid #e7e8ec;
            border-right: 1px solid #e7e8ec;
          }
          .operation{
            width: 140px;
          }
        }
        .contact-list{
          border-top: none;
          background-color: #fff;
          &:nth-child(2n){
            background-color: #fcfcfc;
          }
          .operation{
            .del{
              width: 100%;
              line-height: 44px;
              color: #f75050;
              cursor: pointer;
            }
          }
        }
        .weixi{
          border-top: none;
          background-color: #fcfcfc;
          .type{
            display: flex;
            align-items: center;
            justify-content: center;
            .tit{
              padding-right: 10px;
            }
            .img{
              width: 11px;
              height: 6px;
              background: url("../../assets/images/applySharers/down_black.png") no-repeat;
            }
          }
          .manner{
            input{
              width: 100%;
              height: 100%;
              font-size: 16px;
              color: #999;
              text-align: center;
            }
          }
          .operation{
            display: flex;
            align-items: center;
            justify-content: center;
            .save{
              padding-right: 10px;
              color: #1a1a1a;
              line-height: 14px;
              cursor: pointer;
              border-right: 1px solid #e7e8ec;
            }
            .cancel{
              line-height: 14px;
              color: #F75050;
              cursor: pointer;
              margin-left: 10px;
            }
          }
        }
        .addnew{
          width: 100%;
          height: 50px;
          line-height: 50px;
          margin: 30px auto 0;
          background-color: #fff;
          border: 1px solid #ffba14;
          border-radius: 4px;
          text-align: center;
          font-size: 16px;
          color: #ffba14;
          cursor: pointer;
        }
      }
    }
  }
</style>
