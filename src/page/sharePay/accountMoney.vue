<template>
  <div class="accountMoney">
    <div class="goodsParticular-box">
      <div class="goodsParticular-content">
        <div class="goodsParticular-title">
          <h6><router-link to="/setSharePay" class="property">共享充提 >  </router-link>  <span>  账户信息</span></h6>
        </div>
        <div class="accountMoney-title">账户信息</div>
        <div class="Info-box">
          <ul>
            <li v-for="(item,index) in infoList" :key="index" :class="{activeInfo: isActiveInfo === index}" @click="toDetail(item)">
              <div class="Info-icon">
                <img :src="item.img" alt="">
                <div class="account-type">
                  <div class="name">{{item.currency}}</div>
                  <div class="account-num"><span>已绑定账号：</span><i>{{item.count}}</i></div>
                </div>
              </div>
              <div class="right-box">
                <img src="../../assets/images/accountInfo/right_yellow.png" alt="">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      infoList: [
        {
          img: require('../../assets/images/accountInfo/usd.png'),
          currency: 'USD',
          count: 6
        },
        {
          img: require('../../assets/images/accountInfo/cny.png'),
          currency: 'CNY',
          count: 6
        },
        {
          img: require('../../assets/images/accountInfo/HKD.png'),
          currency: 'HKD',
          count: 6
        },
        {
          img: require('../../assets/images/accountInfo/EUR.png'),
          currency: 'CAD',
          count: 6
        },
        {
          img: require('../../assets/images/accountInfo/KRW.png'),
          currency: 'KRW',
          count: 6
        },
        {
          img: require('../../assets/images/accountInfo/btc.png'),
          currency: 'BTC',
          count: 6
        }
      ],
      isActiveInfo: 0
    }
  },
  methods: {
    toDetail (item) {
      this.$router.push({
        path: '/accountInfo',
        query: {
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.accountMoney
  .goodsParticular-content
    padding-top 40px
    .goodsParticular-title
      margin-bottom 30px
    .accountMoney-title
      margin-bottom 60px
    .accountMoney-title
      font-size 34px
      color #1a1a1a
      font-weight bold
    .Info-box
      width 100%
      ul
        width 100%
        display flex
        flex-wrap wrap
        li
          width 500px
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
          padding 0 30px 0 20px
          &:nth-child(3n)
            margin-right 0
            @media screen and (max-width: 1700px)
              margin-right 24px
          &:hover,&.activeInfo
            box-shadow: 0px 1px 1px #FFAF0A;
            border 1px solid #ffba14
          .Info-icon
            display flex
            align-items center
            img
              display inline-block
              width 80px
              height 80px
          .account-type
            margin-left 20px
            .name
              font-size 20px
              color #1a1a1a
              font-weight bold
            .account-num
              margin-top 20px
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
