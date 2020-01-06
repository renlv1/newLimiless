<template>
  <div class="mybill-detail">
    <!--共享者订单--充值 详情-->
    <div class="router-navigation">
      <span class="link">共享者订单</span>
      <span class="icon">》</span>
      <span class="link">充值详情</span>
    </div>
    <h3 class="title-text">充值详情</h3>
    <div class="details-box">
      <h3 class="title-details">充值数额</h3>
      <h3 class="money">123121 <span class="curren-money">USD</span></h3>
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
          <span class="order-text">类型</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">共享者</span>
          <span class="order-text">12345</span>
        </li>
        <li class="account-info-list">
          <div class="list-item">
            <p class="list-item-text">提现者</p>
            <div class="bank-box">
              <div class="bank-text">
                <div class="bank-left">
                  <div class="circle"></div>
                  <p>中国银行</p>
                </div>
                <p class="bank-right">钱多多</p>
              </div>
              <p>43534 345 54534</p>
            </div>
          </div>
          <div class="list-item">
            <p class="list-item-text">提现者</p>
            <div class="bank-box">
              <div class="bank-text">
                <div class="bank-left">
                  <div class="circle"></div>
                  <p>中国银行</p>
                </div>
                <p class="bank-right">钱多多</p>
              </div>
              <p>43534 345 54534</p>
            </div>
          </div>
        </li>
        <li class="btn-click-box">
          <div class="btn-click" @click="$router.push('/account/sharerOrder/rechargeAppeal')">申诉</div>
        </li>
      </ul>
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

<style lang="less" scoped>
</style>
