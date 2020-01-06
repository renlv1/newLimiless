<template>
  <div class="account">
    <div class="nav-wrapper">
      <ul class="nav-uls">
        <!-- 0 账户预览-->
        <li class="nav-item">
          <div class="item-title">
            <div class="item">
              <div class="item-top isClick" @click="selectList(0)">
                <div class="item-left">
                  <div class="user-icon"><img width="22" height="20" src="../../assets/images/account/account.png" alt=""/></div>
                  <div class="item-text">账户预览</div>
                </div>
                <div class="arrow-icon"><img :class="{'active-arrow-icon': isFlag0}" width="11" height="6" src="../../assets/images/header/arrow.png" alt=""></div>
              </div>
              <ul class="uls-child" :class="{'active-nav': isFlag0}">
                <li class="child-item">
                  <router-link to="/account/myAccount" class="child-link">
                    <span>我的账户</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/gatheringManage" class="child-link">
                    <span>收款账户管理</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <!-- 1无限竞拍 -->
        <li class="nav-item">
          <div class="item-title">
            <div class="item">
              <div class="item-top isClick" @click="selectList(1)">
                <div class="item-left">
                  <div class="user-icon"><img width="22" height="22" src="../../assets/images/account/bidding.png" alt=""/></div>
                  <div class="item-text">无限竞拍</div>
                </div>
                <div class="arrow-icon"><img :class="{'active-arrow-icon': isFlag1}" width="11" height="6" src="../../assets/images/header/arrow.png" alt=""></div>
              </div>
              <ul class="uls-child" :class="{'active-nav': isFlag1}">
                <li class="child-item">
                  <router-link to="/account/myAuction" class="child-link">
                    <span>我的竞拍</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/buyGoodsMenage" class="child-link">
                    <span>商品抢购管理</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/regulationTemp" class="child-link">
                    <span>抢购规则模版</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/joinedSnap" class="child-link">
                    <span>可参与的抢购</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/myPurchase" class="child-link">
                    <span>我的抢购</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <!-- 2金融 -->
        <li class="nav-item">
          <div class="item-title">
            <div class="item">
              <div class="item-top isClick" @click="selectList(2)">
                <div class="item-left">
                  <div class="user-icon"><img width="22" height="22" src="../../assets/images/account/financial.png" alt=""/></div>
                  <div class="item-text">金融</div>
                </div>
                <div class="arrow-icon"><img :class="{'active-arrow-icon': isFlag2}" width="11" height="6" src="../../assets/images/header/arrow.png" alt=""></div>
              </div>
              <ul class="uls-child" :class="{'active-nav': isFlag2}">
                <li class="child-item">
                  <router-link to="/account/paiWallet" class="child-link">
                    <span>π付钱包</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/transferAccounts" class="child-link">
                    <span>转账</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/cashValue" class="child-link">
                    <span>充值/提现</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
        <!-- 3订单记录 -->
        <li class="nav-item">
          <div class="item-title">
            <div class="item">
              <div class="item-top isClick" @click="selectList(3)">
                <div class="item-left">
                  <div class="user-icon"><img width="22" height="22" src="../../assets/images/account/order.png" alt=""/></div>
                  <div class="item-text">订单记录</div>
                </div>
                <div class="arrow-icon"><img :class="{'active-arrow-icon': isFlag3}" width="11" height="6" src="../../assets/images/header/arrow.png" alt=""></div>
              </div>
              <ul class="uls-child" :class="{'active-nav': isFlag3}">
                <li class="child-item">
                  <router-link to="/account/myBill" class="child-link">
                    <span>我的账单</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/orderCashValue" class="child-link">
                    <span>充值/提现</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/digicashOrder" class="child-link">
                    <span>数字货币交易</span>
                  </router-link>
                </li>
                <li class="child-item">
                  <router-link to="/account/sharerOrder" class="child-link">
                    <span>共享者订单</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      isFlag0: true, // 控制四个左侧导航栏
      isFlag1: false,
      isFlag2: false,
      isFlag3: false
    }
  },
  created () {
    this.printPath()
  },
  mounted () {
    if (this.$route.path === '/account/gatheringManage') {
      this.isFlag0 = true
    }
  },
  methods: {
    printPath () {
      console.log(this.$route.path)
    },
    selectList (val) {
      if (val === 0) {
        this.isFlag0 = !this.isFlag0
      } else if (val === 1) {
        this.isFlag1 = !this.isFlag1
      } else if (val === 2) {
        this.isFlag2 = !this.isFlag2
      } else if (val === 3) {
        this.isFlag3 = !this.isFlag3
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .account
    margin-top 10px
    max-width 1920px
    display flex
    flex-direction row
    .right-content
      flex 1
    .nav-wrapper
      background #fff
      border-top 1px solid #e5e5e5
      border-right 1px solid #e5e5e5
      border-bottom 1px solid #e5e5e5
      .nav-uls
        position relative
        padding 0 40px
        width 290px
        min-height 100vh
        .nav-item
          .item-title
            .item
              display flex
              flex-direction column
              .item-top
                display flex
                flex-direction row
                height 100px
                align-items center
                justify-content space-between
                .item-left
                  display flex
                  flex-direction row
                  .user-icon
                    img
                      vertical-align middle
                  .item-text
                    margin-left 20px
                    font-size 16px
                    color #1a1a1a
                .arrow-icon
                  height auto
                  img
                    margin-top -3px
                    vertical-align middle
                    transform rotate(-90deg)
                  .active-arrow-icon
                    transform rotate(0deg)
              .uls-child
                display none
                .child-item
                  height 50px
                  a
                    &.router-link-active
                      border-left 4px solid #ffba14
                      padding-left: 78px;
                      position: absolute;
                      display: inline-block;
                      left: -42px;
                      right: 0;
                      width: 100%;
                      background-color: #fff7e5;
                      color: #fff;
                  .child-link
                    display flex
                    line-height 50px
                    margin-left 42px
                    span
                      display inline-block
                      color #1a1a1a
                      text-align center
                      font-size 16px
              .active-nav
                display block
    .right-content
      width 100%
      background #fafafc
</style>
