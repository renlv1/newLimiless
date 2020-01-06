<template>
    <div>
        <div class="sharerAccount">
          <div class="sharerAccountwrap">
            <div class="tab">
              <router-link tag="span" to="/shareRechargeSettings">共享充提</router-link>
              <span>》</span>
              <router-link tag="span" to="sharerAccount">账户信息</router-link>
            </div>
            <div class="account-title">账户信息</div>
            <div class="account-box">
              <div class="list" v-for="(item,index) in sharerAccountDatas" :key="index">
                <div class="img"><img :src="item.urlImg" alt=""></div>
                <div class="currency-type">
                  <div class="type">{{item.currency}}</div>
                  <div class="binding">已绑定账号：<span class="num">{{item.num}}</span></div>
                </div>
                <div class="particulars"><div class="img"></div></div>
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
      sharerAccountDatas: [
        {
          urlImg: require('../../assets/images/applySharers/usd.png'),
          currency: 'USD',
          num: '1',
          urlImgBtn: require('../../assets/images/applySharers/right_gray.png')
        },
        {
          urlImg: require('../../assets/images/applySharers/cny.png'),
          currency: 'CNY',
          num: '2',
          urlImgBtn: require('../../assets/images/applySharers/right_gray.png')
        },
        {
          urlImg: require('../../assets/images/applySharers/HKD.png'),
          currency: 'HKD',
          num: '3',
          urlImgBtn: require('../../assets/images/applySharers/right_gray.png')
        },
        {
          urlImg: require('../../assets/images/applySharers/EUR.png'),
          currency: 'CAD',
          num: '4',
          urlImgBtn: require('../../assets/images/applySharers/right_gray.png')
        },
        {
          urlImg: require('../../assets/images/applySharers/KRW.png'),
          currency: 'KRW',
          num: '5',
          urlImgBtn: require('../../assets/images/applySharers/right_gray.png')
        },
        {
          urlImg: require('../../assets/images/applySharers/btc.png'),
          currency: 'BTC',
          num: '6',
          urlImgBtn: require('../../assets/images/applySharers/right_gray.png')
        }
      ]
    }
  },
  component: {}
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .sharerAccount{
    width: 100%;
    .sharerAccountwrap{
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
      .account-title{
        font-size: 34px;
        color: #1a1a1a;
        font-weight: bold;
        padding: 30px 0 60px;
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
          height: 160px;
          margin-bottom: 30px;
          border: 1px solid #e7e8ec;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          &:hover{
            border: 1px solid #ffaf0a;
            box-shadow: 0 0 8px 2px rgba(255,175,10, .2);
            .particulars{
              .img{
                background: url("../../assets/images/applySharers/right_yellow.png") no-repeat;
              }
            }
          }
          // 点击list激活
          &.active{
            border: 1px solid #ffaf0a;
            box-shadow: 0 0 8px 2px rgba(255,175,10, .2);
            .particulars{
              .img{
                background: url("../../assets/images/applySharers/right_yellow.png") no-repeat;
              }
            }
          }
          .img{
            width: 80px;
            height: 80px;
            border-radius: 100%;
            background-color: #999;
            margin: 0 20px 0 30px;
          }
          .currency-type{
            flex: 1;
            .type{
              font-size: 20px;
              color: #1a1a1a;
              font-weight: bold;
              padding-bottom: 30px;
            }
            .binding{
              font-size: 16px;
              color: #999;
              .num{
                padding-left: 6px;
              }
            }
          }
          .particulars{
            width: 66px;
            height: 66px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            .img{
              width: 6px;
              height: 11px;
              background: url("../../assets/images/applySharers/right_gray.png") no-repeat;
            }
          }
        }
      }
    }
  }

</style>
