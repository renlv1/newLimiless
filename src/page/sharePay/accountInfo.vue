<template>
    <div class="accountMoney">
      <div class="goodsParticular-box">
        <div class="goodsParticular-content">
          <div class="goodsParticular-title">
            <h6><router-link to="/setSharePay" class="property">共享充提 <span style="margin:0 10px"> > </span>  </router-link>  <router-link to="/accountMoney" class="property">账户信息 </router-link><span style="margin:0 10px">> </span><i> 账户</i></h6>
          </div>
          <div class="title-box">
            <div class="accountMoney-title">账户信息</div>
            <div class="btn-add" @click="addAccount()"><span>添加新账户</span></div>
          </div>
          <div class="account-box">
            <ul>
              <li v-for="(item,index) in infoList" :key="index" @click="delAccount()">
                <div class="account-type">
                  <div class="name-box">
                    <div class="bank-icon"><img :src="item.imgBank"></div>
                    <div class="bank-name">{{item.bank}}</div>
                  </div>
                  <div class="account-num">{{item.num}}</div>
                </div>
                <div class="right-box">
                  <img src="../../assets/images/accountInfo/delete.png" alt="">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="account-dialog" v-show="delAccountShow">
        <div class="myPopup-box">
          <a class="close" @click="delAccountShow = false"><img src="../../assets/images/home/Shutdown.png" alt=""></a>
          <h3 class="dialog-title">确认移除账户</h3>
          <ul>
            <li>
              <div class="account-type">
                <div class="bank-icon"><img src="../../assets/images/accountInfo/bank.png" alt=""><span>中国银行</span></div>
                <div class="bank-name">钱老板</div>
              </div>
              <div class="down-box">
                5555555
              </div>
            </li>
          </ul>
          <button class="tradingCenter-btn">确认移除</button>
        </div>
      </div>
      <div class="add-dialog" v-show="addAccountShow">
        <div class="myPopup-box">
          <a class="close" @click="addAccountShow = false"><img src="../../assets/images/home/Shutdown.png" alt=""></a>
          <h3 class="dialog-title">添加USD账户</h3>
          <ul>
            <li v-for="(item,index) in infoList" :key="index">
              <div class="dialog-box">
                <div class="account-type">
                  <div class="bank-icon"><img src="../../assets/images/accountInfo/bank.png" alt=""><span>{{item.bank}}</span></div>
                  <div class="bank-name">钱老板</div>
                </div>
                <div class="down-box">
                  5555555
                </div>
              </div>
              <div class="check-box">
                <input type="checkbox" @click="chooseBox(item)" :class="{checkActive: checkBox}" class="choose-account">
              </div>
            </li>
            <button class="tradingCenter-btn">确认添加</button>
          </ul>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      currentIndex: '',
      delAccountShow: false,
      addAccountShow: false,
      checkBox: false,
      checked: [],
      currLi: '', // 獲取當前的li
      infoList: [
        {
          imgBank: require('../../assets/images/accountInfo/bank.png'),
          imgDet: require('../../assets/images/accountInfo/bank.png'),
          bank: '中国银行1',
          num: '121135464565468'
        },
        {
          imgBank: require('../../assets/images/accountInfo/bank.png'),
          imgDet: require('../../assets/images/accountInfo/bank.png'),
          bank: '中国银行2',
          num: '121135464565468'
        },
        {
          imgBank: require('../../assets/images/accountInfo/bank.png'),
          imgDet: require('../../assets/images/accountInfo/bank.png'),
          bank: '中国银行',
          num: '121135464565468'
        },
        {
          imgBank: require('../../assets/images/accountInfo/bank.png'),
          imgDet: require('../../assets/images/accountInfo/bank.png'),
          bank: '中国银行',
          num: '121135464565468'
        },
        {
          imgBank: require('../../assets/images/accountInfo/bank.png'),
          imgDet: require('../../assets/images/accountInfo/bank.png'),
          bank: '中国银行',
          num: '121135464565468'
        },
        {
          imgBank: require('../../assets/images/accountInfo/bank.png'),
          imgDet: require('../../assets/images/accountInfo/bank.png'),
          bank: '中国银行',
          num: '121135464565468'
        }
      ]
    }
  },
  mounted () {
    this.infoList.forEach(val => {
      val.flag = false
      console.log(val)
    })
  },
  methods: {
    // 点击添加账户
    addAccount () {
      this.addAccountShow = true
    },
    // 点击移除账户
    delAccount () {
      this.delAccountShow = true
    },
    chooseBox (item) {
      this.checkBox = !this.checkBox
      // let arr = this.$refs.chooseAccount
      // this.currLi = arr[index].checkBox
      // console.log(arr, this.currLi)
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
        h6
          a
            font-size 16px
            color #1a1a1a
      .accountMoney-title
        margin-bottom 60px
      .title-box
        display flex
        justify-content space-between
        .accountMoney-title
          font-size 34px
          color #1a1a1a
          font-weight bold
        .btn-add
          width 200px
          height 50px
          background-color #ffba14
          border-radius 4px
          text-align center
          cursor pointer
          outline none
          user-select none
          span
            line-height 50px
            color #fff
            font-size 18px
      .account-box
        ul
          width 100%
          display flex
          flex-wrap wrap
          li
            width 500px
            height 120px
            border-radius 4px
            background-color #fcfcfc
            border 1px solid #e7e8ec
            display flex
            align-items center
            justify-content space-between
            margin-bottom 24px
            margin-right 24px
            padding 0 30px 0 20px
            .account-type
              .name-box
                display flex
                margin-bottom 20px
                .bank-icon
                  margin-right 10px
                  width 20px
                  height 20px
                  img
                    width 100%
                    height 100%
                .bank-name
                  font-size 16px
                  color #1a1a1a
              .account-num
                font-size 16px
                color #1a1a1a
            .right-box
              cursor pointer
              outline none
              user-select none
              width 20px
              height 20px
.add-dialog
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  position fixed
  left 0
  top 0
  background-color rgba(0,0,0,0.5)
  z-index 99
  .myPopup-box
    width 600px
    height 500px
    background-color #fff
    padding 60px 60px
    border-radius 12px
    position relative
    .close
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      z-index: 999;
      cursor: pointer;
      user-select none
    .dialog-title
      padding-left 40px
      text-align center
      font-size 20px
      color #1a1a1a
      font-weight bold
    ul
      width 100%
      max-height 100%
      overflow: auto
      height auto
      padding-right 10px
      li
        font-size 16px
        color #1a1a1a
        margin-top 40px
        margin-bottom 30px
        width 100%
        height 100px
        border-radius 4px
        border 1px solid #e7e8ec
        background-color #fff
        display flex
        .dialog-box
          padding 0 20px
          display flex
          flex-direction column
          justify-content center
          width 90%
          height 100%
          border-right 1px solid #e7e8ec
          .account-type
            display flex
            justify-content space-between
            margin-bottom 10px
            .bank-icon
              display flex
              align-items center
              img
                width 18px
                height 18px
                margin-right 10px
        .check-box
          display flex
          align-items center
          padding-left 12px
          .choose-account
            width 16px
            height 16px
            border-radius 4px
            border 1px solid #c4c6cc
            cursor pointer
            outline none
            user-select none
            &.checkActive
              &:before
                content ''
                background-image url("../../assets/images/accountInfo/selected.png")
                background-position center
                background-repeat no-repeat
                display block
                width 16px
                height 16px
</style>
