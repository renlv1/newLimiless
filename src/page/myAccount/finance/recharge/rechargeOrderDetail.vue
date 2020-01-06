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
          <span class="order-text">{{orderDetail.id}}</span>
        </li>
        <li class="order-list">
          <span class="order-text">创建时间</span>
          <span class="order-text">{{$changeDate(orderDetail.createAt)}}</span>
        </li>
        <li class="order-list">
          <span class="order-text">类型</span>
          <span class="order-text order-type">{{orderDetail.typeTitle}} <i :class="{'active': activeFlag}"></i></span>
        </li>
        <li class="order-list">
          <span class="order-text">共享者</span>
          <span class="order-text">{{orderDetail.bossNick}}</span>
        </li>
        <li class="account-info-list">
          <div class="list-item">
            <p class="list-item-text">我的付款信息</p>
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
        <!--按钮-->
        <li class="btn-click-box">
          <div class="btn-click" @click="$router.push('/account/sharerOrder/rechargeAppeal')" v-if="orderDetail.canHelp !== 0 ">申诉</div>
          <div class="btn-click" v-if="orderDetail.orderState === 2 && (orderDetail.payState===1 || orderDetail.payState===2 || orderDetail.payState===3)" @click="cancleOrder()">取消订单</div>
          <div class="btn-click" v-if="orderDetail.orderState===2 && orderDetail.payState === 3" @click="confirmDeposit()">我已转账</div>
    </li>
      </ul>
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
            <div class="process-right" >
              <div class="flex-item" v-for="(item, index) in orderDetail.stepList" :key="index">
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
      id: this.$route.query.id,
      orderDetail: '',
      activeFlag: false,
      showDialog: true,
      stepListLen: 1,
      currentIndex: 0
    }
  },
  mounted () {
    this.queryOrderDetail()
  },
  methods: {
    // deposit/queryOrderDetail
    queryOrderDetail () {
      let url = `${this.$api2}deposit/queryOrderDetail?orderId=${this.id}`
      this.$http.post(url).then(res => {
        if (res.data.status === 'success') {
          this.orderDetail = res.data.data
          this.stepListLen = this.orderDetail.stepList.length
          this.currentIndex = this.orderDetail.onlineState - 1
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 我已转账 2.5 充值订单充确认流程 /deposit/confirmByStep
    confirmDeposit () {
      this.$postAxios.post(`${this.$api2}deposit/confirmByStep`, {
        orderId: this.id,
        confirmState: 2
      }).then(res => {
        if (res.data.status === 'success') {
          this.queryOrderDetail()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 取消订单
    cancleOrder () {
      this.$postAxios.post(`${this.$api2}deposit/confirmByStep`, {
        orderId: this.id
      }).then(res => {
        if (res.data.status === 'success') {
        }
      }).catch(err => {
        console.log(err)
      })
    },
    showProcess () {

    }
  }
}
</script>

<style lang="less" type="text/less" scoped>
  .order-type{
    color: #4b84ff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i{
      display: block;
      height: 0;
      width: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left:6px solid #4b84ff;
      margin-right: 30px;
      transition: all 0.5s;
      transform: rotate(0deg);
      &.active{
        transform: rotate(90deg);
      }
    }
  }
</style>
