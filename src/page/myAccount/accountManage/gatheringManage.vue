<template>
  <div class="wrapper-account">
    <h2>收款账户管理</h2>
    <div class="Info-box">
      <ul>
        <router-link :to="{path:'/account/gatheringManageDetail', query: {currency: item.currency}}" tag="li" class="isClick" v-for="(item,index) in infoList" :key="index" :class="{activeInfo: isActiveInfo === index}" @click="toDetail(item)">
          <div class="Info-icon">
            <img width="80" height="80" :src="item.img" alt="">
            <div class="account-type">
              <div class="name">{{item.currency}}</div>
              <div class="account-num"><span>已绑定账号：</span><i>{{item.count}}</i></div>
            </div>
          </div>
          <div class="right-box">
            <img width="6" height="11" src="../../../assets/images/accountInfo/right_yellow.png" alt="">
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      infoList: [
        {
          img: require('../../../assets/images/accountInfo/usd.png'),
          currency: 'USD',
          count: 6
        },
        {
          img: require('../../../assets/images/accountInfo/cny.png'),
          currency: 'CNY',
          count: 6
        },
        {
          img: require('../../../assets/images/accountInfo/HKD.png'),
          currency: 'HKD',
          count: 6
        },
        {
          img: require('../../../assets/images/accountInfo/EUR.png'),
          currency: 'CAD',
          count: 6
        },
        {
          img: require('../../../assets/images/accountInfo/KRW.png'),
          currency: 'KRW',
          count: 6
        },
        {
          img: require('../../../assets/images/accountInfo/btc.png'),
          currency: 'BTC',
          count: 6
        }
      ],
      isActiveInfo: 0
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper-account
  h2
    font-weight bold
    margin-bottom 60px
  .Info-box
    width 100%
    ul
      width 100%
      display flex
      flex-wrap wrap
      li
        padding 0 30px 0 20px
        width 480px
        height 160px
        border-radius 4px
        margin-right 24px
        border 1px solid #e7e8ec
        background-color #fff
        margin-bottom 30px
        cursor pointer
        user-select none
        display flex
        justify-content space-between
        align-items center
        &:nth-child(3n)
          margin-right 0
          @media screen and (max-width: 1700px)
            margin-right 24px
        &:hover,&.activeInfo
          box-shadow: 0px 1px 1px #FFAF0A;
          border 1px solid #ffba14
        .Info-icon
          display flex
          flex-direction row
          align-items center
        .account-type
          margin-left 20px
          .name
            font-size 20px
            color #1a1a1a
            font-weight bold
          .account-num
            font-size 16px
            color #999
        .right-box
          width 6px
          height 11px
          img
            display block
            width 6px
            height 11px
</style>
