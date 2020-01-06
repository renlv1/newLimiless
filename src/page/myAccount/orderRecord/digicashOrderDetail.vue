<template>
  <div class="mybill-detail">
    <!--数字货币交易  详情-->
    <div class="router-navigation">
      <span class="link">数字货币交易</span>
      <span class="icon">》</span>
      <span class="link">账单记录</span>
      <span class="icon">》</span>
      <span>账单详情</span>
    </div>
    <h3 class="title-text">账单详情</h3>
    <div class="account-info">
      <h3 class="account-title">数字货币交易订单</h3>
      <div class="account-flex">
        <div class="money-box">
          <span class="money1">52</span>
          <span class="money2">.0000</span>
          <span class="money3"> USD</span>
        </div>
        <div class="button">撤销委托</div>
      </div>
      <ul class="order-uls">
        <li class="order-list">
          <span class="order-text">订单编号</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">创建时间</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">方向</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">交易对</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">价格</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">挂单数量</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">成交数量</span>
          <span class="order-text">12345</span>
        </li>
      </ul>
      <div class="title-list">撮单记录</div>
      <div class="table-box">
        <ul class="table-uls">
          <li class="table-list">时间</li>
          <li class="table-list">价格</li>
          <li class="table-list">数量</li>
        </ul>
        <ul class="table-uls">
          <li class="table-list">时间34534</li>
          <li class="table-list">价格211</li>
          <li class="table-list">数量2131</li>
        </ul>
        <ul class="table-uls">
          <li class="table-list">时间34534</li>
          <li class="table-list">价格211</li>
          <li class="table-list">数量2131</li>
        </ul>
        <ul class="table-uls">
          <li class="table-list">时间34534</li>
          <li class="table-list">价格211</li>
          <li class="table-list">数量2131</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.account-info
  width: 1500px
  background-color: #fff
  border: 1px solid #e7e8ec
  padding: 40px 100px 100px
  .account-title
    line-height: 50px
    font-size: 20px
    color #1a1a1a
    font-weight bold
  .account-flex
    height: 44px
    display flex
    align-items center
    justify-content space-between
    margin: 20px 0 40px
    .money-box
      color #1a1a1a
      font-weight bold
      .money1
        font-size: 30px
      .money2
        font-size: 20px
      .money3
        font-size: 20px
        color #ffba14
    .button
      width: 200px
      height: 44px
      display flex
      align-items center
      justify-content center
      background-color: #ffba14
      color #ffffff
      font-size: 20px
      cursor pointer
      border-radius 4px
  .title-list
    font-size: 20px
    font-weight bold
    color #1a1a1a
    margin: 60px 0 40px
  .table-box
    .table-uls
      display flex
      align-items center
      height: 50px
      border-bottom: 1px solid #e7e8ec
      &:nth-child(odd)
        background-color: #fcfcfc
      &:nth-child(even)
        background-color: #fff
      .table-list
        flex 1
        display flex
        align-items center
        &:nth-child(1)
          padding-left: 30px
        &:nth-child(2)
          padding-left: 70px
        &:nth-child(2)
          padding-left: 70px
</style>
