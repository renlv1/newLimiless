<template>
  <div class="wrapper-account">
    <div class="goodsParticular-title">
      <h6><router-link to="/account/gatheringManage" class="property">收款账户管理 >  </router-link>  <span>  添加新账户</span></h6>
    </div>
    <h2>添加新账户</h2>
    <!-- 添加新账户(法币) -->
    <div class="fiat" v-show="isFiat">
      <div class="input-group">
        <div class="must-text-group">
          <p class="input-group-text">必填项</p>
          <div class="inputs">
            <ul>
              <li>
                <div class="title-group">
                  <span>银行名称</span>
                  <input v-model="bankName" placeholder="请输入银行名称" @blur="noBankName"/>
                </div>
                <div class="err-text">银行名称不能为空！</div>
              </li>
              <li>
                <div class="title-group">
                  <span>银行账号</span>
                  <input v-model="bankAccount" placeholder="请输入银行账号"/>
                </div>
                <div class="err-text">银行账号不能为空！</div>
              </li>
              <li>
                <div class="title-group">
                  <span>持卡人姓名</span>
                  <input v-model="holdName" placeholder="请输入持卡人姓名"/>
                </div>
                <div class="err-text">持卡人姓名不能为空！</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="optional-text-group">
          <p class="input-group-text">选填项</p>
          <div class="inputs">
            <ul>
              <li>
                <span>国家</span>
                <input/>
              </li>
              <li>
                <span>分行支行</span>
                <input/>
              </li>
              <li>
                <span>SWIFT</span>
                <input/>
              </li>
              <li>
                <span>IBAN</span>
                <input/>
              </li>
            </ul>
          </div>
        </div>
        <button class="save isClick">保存</button>
      </div>
    </div>
    <!-- 添加新账户(数字货币1) -->
    <div class="currency-one" v-show="isCurrencyOne" style="display: none">
      <ul>
        <li>
          <span>账户地址</span>
          <div class="input-text-group">
            <input placeholder="请输入账户地址"/>
            <div class="err-text" style="color: #E93A3A">请输入账户地址！</div>
          </div>
        </li>
        <li>
          <span>用户名称/地址标签</span>
          <div class="input-text-group">
            <input placeholder="请输入地址标签"/>
            <div class="err-text">如被要求填写地址标签, 数字IC, 备注, 账户名称，请在此处填写！</div>
          </div>
        </li>
      </ul>
      <button class="save isClick">保存</button>
    </div>
    <!-- 添加新账户(数字货币2) -->
    <div class="currency-two" v-show="isCurrencyTwo" style="display: none">
      <div class="input-group">
        <span>账户地址</span>
        <div class="input-text-group">
          <input placeholder="请输入账户地址"/>
          <div class="err-text" style="color: #E93A3A">请输入账户地址！</div>
        </div>
      </div>
      <button class="save isClick">保存</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      isFiat: false,
      isCurrencyOne: false,
      isCurrencyTwo: false,
      bankName: '', // 银行名称
      bankAccount: '', // 银行账号
      holdName: '', // 持卡人姓名
      noBankNameErrText: false, // 银行名称不能为空的提示
      noBankAccountErrText: false, // 银行名称不能为空的提示
      noHoldNameErrTetx: false
    }
  },
  created () {
    this.chooseAddWays()
  },
  methods: {
    chooseAddWays () {
      let currency = this.$route.query.currency
      if (currency === 'USD' || currency === 'CNY' || currency === 'HKD' || currency === 'CAD' || currency === 'KRW') {
        this.isFiat = true
      } else if (currency === 'BTC') {
        this.isCurrencyOne = true
      }
    },
    noBankName () {
      if (this.bankName === '') {
        this.noBankNameErrText = true
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .goodsParticular-title
    margin-bottom 30px
    h6
      font-size 18px
      a
        color #1a1a1a
  h2
   font-weight bold
   letter-spacing 2px
  .fiat
    .input-group
      margin 0 auto
      width 550px
      display flex
      flex-direction column
      align-items stretch
      .must-text-group, .optional-text-group
        margin-top 60px
        display flex
        flex-direction column
        align-items flex-start
        .input-group-text
          font-size 18px
          font-weight bold
      .must-text-group
        ul
          li
            display flex
            flex-direction column
            span
              font-size 16px
              color #1a1a1a
            .title-group
              margin-top 30px
              width 580px
              display flex
              align-items center
              justify-content space-between
              input
                width 400px
                height 44px
                line-height 44px
                font-size 16px
                background #fff
                border-radius 4px
                border 1px solid #e7e8ec
                padding-left 30px
            .err-text
              font-size 14px
              letter-spacing 1px
              margin 12px 0 0 180px
              color #E93A3A
      .optional-text-group
        ul
          margin-top 50px
          li
            width 580px
            display flex
            flex-direction row
            align-items center
            justify-content space-between
            margin-bottom 50px
            span
              font-size 16px
              color #1a1a1a
            input
              width 400px
              height 44px
              line-height 44px
              font-size 16px
              background #fff
              border-radius 4px
              border 1px solid #e7e8ec
              padding-left 30px
      .save
        margin 0 auto
        width 200px
        color #fff
        padding 10px 0
        border-radius 4px
        background-color #ffba14
        font-size 18px
        letter-spacing 4px
  .currency-one
    display flex
    flex-direction column
    align-items center
    height 460px
    margin-top 60px
    background #fff
    ul
      margin 0 auto
      width 600px
      li
        margin 60px 0
        display flex
        flex-direction row
        justify-content space-between
        span
          margin-top 12px
          font-size 16px
          color #1a1a1a
        input
          width 400px
          height 44px
          line-height 44px
          font-size 16px
          background #fff
          border-radius 4px
          border 1px solid #e7e8ec
          padding-left 30px
        .err-text
          width 400px
          margin-top 10px
          font-size 14px
          letter-spacing 1px
          color #999
    .save
      margin 0 auto
      width 200px
      color #fff
      padding 11px 0
      border-radius 4px
      background-color #ffba14
      font-size 18px
      letter-spacing 4px
  .currency-two
    padding-top 50px
    background #fff
    margin-top 60px
    display flex
    flex-direction column
    align-items center
    .input-group
      display flex
      flex-direction row
      span
        margin-top 12px
        font-size 16px
        color #1a1a1a
      .input-text-group
        input
          margin-left 70px
          width 400px
          height 44px
          line-height 44px
          font-size 16px
          background #fff
          border-radius 4px
          border 1px solid #e7e8ec
          padding-left 30px
        .err-text
          font-size 14px
          letter-spacing 1px
          margin 10px 0 0 70px
    .save
      margin 100px auto
      width 200px
      color #fff
      padding 11px 0
      border-radius 4px
      background-color #ffba14
      font-size 18px
      letter-spacing 4px
</style>
