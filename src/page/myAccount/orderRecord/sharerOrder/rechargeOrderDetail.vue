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
            <span>{{orderData.typeTitle}}</span>
            <div class="icon-sanjiao"></div>
          </div>
        </li>
        <li class="order-list">
          <span class="order-text">充提者</span>
          <span class="order-text">{{orderData.userNick}}</span>
        </li>
        <li class="account-info-list">
          <div class="list-item">
            <p class="list-item-text">他的付款信息</p>
            <div class="bank-box">
              <div class="bank-text">
                <div class="bank-left">
                  <div class="circle"></div>
                  <p>{{orderData.givemoneybank}}</p>
                </div>
                <p class="bank-right">{{orderData.givemoneyname}}</p>
              </div>
              <p>{{orderData.givemoneyaccount}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="btn-click-box">
        <!--<div class="btn-click" @click="$router.push('/account/sharerOrder/rechargeAppeal')">申诉</div>-->
        <div class="btn-click" v-show="orderData.orderState === 2">拒绝接单</div>
        <div class="btn-click" v-show="orderData.orderState === 2">接收接单</div>
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
              <div v-for="(i, index) in (stepListLen - 1)" :key="index">
                <div class="circle" :class="{'current-stauts': currentIndex === index}"></div>
                <div class="line"></div>
              </div>
              <div class="circle" :class="{'current-stauts': currentIndex === stepListLen}"></div>
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
      stepListLen: 1,
      money: '',
      orderData: ''
    }
  },
  created () {
    this.getChongzhi()
  },
  methods: {
    // 充值详情
    getChongzhi () {
      this.$postAxios.post(`${this.$api2}deposit/queryOrderDetail`, {
        orderId: this.$route.query.id
      }).then(res => {
        if (res.data.status === 'success') {
          this.orderData = res.data.data
          this.money = this.orderData.amount.toFixed(4).split('.')
          this.stepListLen = this.orderData.stepList.length
          this.currentIndex = this.orderData.onlineState - 1
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
