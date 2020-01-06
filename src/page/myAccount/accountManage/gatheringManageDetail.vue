<template>
  <div class="wrapper-account">
    <div class="top-wrapper">
      <h2>{{this.$route.query.currency}} 账户</h2>
      <button class="add" @click="addAccount">添加新账户</button>
    </div>
    <div class="Info-box">
      <ul>
        <li v-for="(item,index) in infoList" :key="index" :class="{activeInfo: isActiveInfo === index}">
          <div class="li-left">
            <div class="Info-icon">
              <img :src="item.img" alt="">
              <span class="name">{{item.name}}</span>
            </div>
            <div class="account-type">{{item.account}}</div>
          </div>
          <div class="li-right isClick" @click="openDialog(index)">
            <img width="20" height="20" src="../../../assets/images/bank/delete.png" alt="删除">
          </div>
        </li>
      </ul>
    </div>
    <div class="dialog-box" v-if="isDialog">
      <div class="dialog-content">
        <div class="dialog">
          <div class="rule">
            <p>确认是否删除</p>
          </div>
          <button class="btn-dialog" @click="sure">确认</button>
          <button class="btn-dialog" @click="closeIsDialog">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      infoList: [
        {
          img: require('../../../assets/images/bank/chinaBank.png'),
          name: '中国银行',
          account: 1231546514564
        },
        {
          img: require('../../../assets/images/bank/chinaBank.png'),
          name: '中国银行',
          account: 1231546514564
        },
        {
          img: require('../../../assets/images/bank/chinaBank.png'),
          name: '中国银行',
          account: 1231546514564
        },
        {
          img: require('../../../assets/images/bank/chinaBank.png'),
          name: '中国银行',
          account: 1231546514564
        },
        {
          img: require('../../../assets/images/bank/chinaBank.png'),
          name: '中国银行',
          account: 1231546514564
        },
        {
          img: require('../../../assets/images/bank/chinaBank.png'),
          name: '中国银行',
          account: 1231546514564
        }
      ],
      isDialog: false,
      isActiveInfo: 0,
      currentIndex: ''
    }
  },
  methods: {
    addAccount () {
      this.$router.push({path: '/account/addAccount', query: {currency: this.$route.query.currency}})
    },
    sure () {
      // 需要调用删除接口
      this.infoList.splice(this.currentIndex, 1)
      this.isDialog = false
    },
    openDialog (index) {
      this.isDialog = true
      this.currentIndex = index
    },
    closeIsDialog () {
      this.isDialog = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .wrapper-account
    width 100%
    position relative
    .top-wrapper
      width 100%
      height auto
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      margin-bottom 60px
      h2
        font-weight bold
      .add
        padding 15px 0
        width 200px
        background #ffba14
        border-radius 4px
        border 1px solid #ffba14
        cursor pointer
        user-select none
        font-size 18px
        font-weight 800
        letter-spacing 2px
        color #fff
    .Info-box
      width 100%
      display flex
      justify-content center
      ul
        display flex
        flex-wrap wrap
        float left
        margin 10px 30px
        @media screen and (max-width: 1600px)
          float none
          justify-content center
        li
          float left
          margin 10px
          padding 0 30px 0 20px
          width 450px
          height 160px
          border 1px solid #e7e8ec
          background-color #fff
          display flex
          justify-content space-between
          align-items center
          @media screen and (max-width: 1500px)
            margin 30px
            width 400px
          .li-left
            .Info-icon
              display flex
              align-items center
              margin-bottom 15px
              .name
                margin-left 10px
    .dialog-box
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      display flex
      justify-content center
      align-items center
      background-color:rgba(0,0,0,.5)
      z-index 999
      .dialog-content
        height 40%
        width 40%
        position relative
        @media screen and (max-width: 1024px) {
          width 90%
        }
        .dialog
          overflow: auto
          margin 0 auto
          text-align: center
          border-radius: 8px;
          box-shadow: 0 0 5px #d7d9db;
          width 60%
          // height 100%
          max-height 100%
          height auto
          background #fff
          position relative
          .rule
            width 90%
            text-align: center
            margin: 40px auto
            line-height 2
            font-size 24px
            @media screen and (max-width: 1024px) {
              width 80%
            }
          .btn-dialog
            padding 10px 0
            text-align center
            background #ffba14
            border-radius 4px
            border 1px solid #ffba14
            cursor pointer
            user-select none
            font-family "Microsoft YaHei UI"
            font-size 18px
            color #fff
            width 40%
            margin-bottom 50px
</style>
