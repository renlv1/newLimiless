<template>
  <div class="mybill-detail">
    <!--共享者订单--提现 详情-->
    <div class="router-navigation">
      <span class="link" @click="$router.push({path: '/account/sharerOrder', query: {isChongzhi: 1}})">共享者订单</span>
      <span class="icon">》</span>
      <span class="link">提现详情</span>
    </div>
    <h3 class="title-text">提现详情</h3>
    <div class="details-box">
      <h3 class="title-details">提现数额</h3>
      <h3 class="money" v-show="money"><span>{{money[0]}}</span>.<span class="xiaoshu">{{money[1]}}</span><span class="curren-money">{{orderData.currency}}</span></h3>
      <ul class="order-uls">
        <li class="order-list">
          <span class="order-text">订单编号</span>
          <span class="order-text">{{orderData.id}}</span>
        </li>
        <li class="order-list">
          <span class="order-text">创建时间</span>
          <span class="order-text" v-show="orderData.createAt">{{$changeDate(orderData.createAt)}}</span>
        </li>
        <li class="order-list" @click="showDialog = true">
          <span class="order-text">类型</span>
          <div class="order-text status-text">
            <span>{{orderData.tipMsg}}</span>
            <div class="icon-sanjiao"></div>
          </div>
        </li>
        <li class="order-list">
          <span class="order-text">充提者</span>
          <span class="order-text">{{orderData.bossNick}}</span>
        </li>
        <!-- 提现的收款信息-->
        <li class="account-info-list" v-show="orderData.drawAccount">
          <div class="list-item">
            <p class="list-item-text">他的收款信息</p>
            <div class="bank-box">
              <div class="bank-text">
                <div class="bank-left">
                  <div class="circle"></div>
                  <p>{{drawAccount.bankName}}</p>
                </div>
                <p class="bank-right">{{drawAccount.realName}}</p>
              </div>
              <p>{{drawAccount.accountNumber}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="btn-click-box">
        <div class="btn-click" v-show="orderData.orderState === 3">我已转账</div>
      </div>
    </div>
    <!-- 订单进程弹窗-->
    <div class="dialog-wrapper" v-show="showDialog" @click="showDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon">
            <div class="line line1"></div>
            <div class="line line2"></div>
          </div>
        </div>
        <div class="dialog-box">
          <h3 class="dialog-title">订单进程</h3>
          <div class="process-w">
            <div class="process-left">
              <div v-for="(i, index) in stepListLen" :key="index">
                <div class="circle" :class="{'current-stauts': i.finish === true}"></div>
                <div class="line" v-show="index < stepListLen.length - 1"></div>
              </div>
            </div>
            <div class="process-right">
              <div class="flex-item" v-for="(item, index) in orderData.stepList" :key="index">
                <span>{{item.title}}</span>
                <span class="time">{{$changeDate(item.time)}}</span>
              </div>
            </div>
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
      currentIndex: 0,
      showDialog: false,
      stepListLen: [],
      money: '',
      orderData: '',
      drawAccount: ''
    }
  },
  created () {
    this.getTixian()
  },
  methods: {
    // 提现详情
    getTixian () {
      this.$postAxios.post(`${this.$api2}draw/queryOrderDetail`, {
        orderId: this.$route.query.id
      }).then(res => {
        if (res.data.status === 'success') {
          this.orderData = res.data.data
          this.money = this.orderData.amount.toFixed(4).split('.')
          this.stepListLen = this.orderData.stepList
          this.currentIndex = this.orderData.onlineState - 1
          if (this.orderData.drawAccount) {
            this.drawAccount = JSON.parse(this.orderData.drawAccount)
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
