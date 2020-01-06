<template>
  <div class="myaccount-bill">
    <!--共享者订单-->
    <h3 class="my-title">共享者订单</h3>
    <div class="flex-form">
      <span class="bold">时间</span>
      <div class="input-box">
        <el-date-picker
          v-model="startTime"
          :picker-options="pickerBeginDateBefore"
          format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <span class="text-l">至</span>
      <div class="input-box">
        <el-date-picker
          v-model="endTime"
          type="date"
          :picker-options="pickerBeginDateAfter"
          format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="line"></div>
      <span class="bold">类型</span>
      <div class="select-w">
        <div class="select-box" @click="isSelectBox = !isSelectBox">
          <div>{{currentStatus}}</div>
          <div class="icon" :class="{'rotate-icon': isSelectBox}"></div>
        </div>
        <ul class="select-uls" :class="{'hidden-box': isSelectBox}">
          <li class="select-list" v-for="(item, index) in statusArr" :key="index" @click="checkOne(item, index)">{{item}}</li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="send-cha" @click="gotoPage(1)">查询</div>
    </div>
    <div class="table-wrapper">
      <ul class="table-uls">
        <li class="table-list">编号</li>
        <li class="table-list">时间</li>
        <li class="table-list">类型</li>
        <li class="table-list">交易金额</li>
        <li class="table-list">充提用户</li>
        <li class="table-list">状态</li>
        <li class="table-list">操作</li>
      </ul>
      <v-loading v-show="loadingShow"></v-loading>
      <div class="no-result" v-show="noResult">暂无数据</div>
      <ul class="table-uls cursor" v-for="(item, index) in orderData" :key="index" @click="gotoInfo(item.id, item.orderState)">
        <li class="table-list">{{item.id}}</li>
        <li class="table-list">{{$changeDate(item.createAt)}}</li>
        <li class="table-list">{{isChongzhi(chongzhiStatus)}}</li>
        <li class="table-list">{{item.amount | fourNumber}} {{item.currency}}</li>
        <li class="table-list">{{item.userNick}}</li>
        <li class="table-list">{{item.typeTitle}}</li>
        <li class="table-list">查看详情</li>
      </ul>
    </div>
    <div class="page-w">
      <div class="pre-page page cursor" :class="{'disabled': pstart}" @click="gotoPage(current_page - 1)">&lt; 上一页</div>
      <div class="current-page page">{{current_page}}</div>
      <div class="next-page page cursor" :class="{'disabled': pend}" @click="gotoPage(current_page + 1)">下一页 &gt;</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      chongzhiStatus: 0,
      chongzhiStatus2: 0,
      currentStatus: '充值',
      current_page: 0,
      pend: false,
      noResult: false,
      orderData: [],
      loadingShow: true,
      isSelectBox: false,
      //        日期控件
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.endTime
          if (beginDateVal) {
            return time.getTime() > beginDateVal
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.startTime
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      statusArr: ['充值', '提现'],
      startTime: '',
      endTime: ''
    }
  },
  created () {
    this.gotoPage(1)
  },
  methods: {
    // 获取订单列表
    gotoPage (page) {
      this.chongzhiStatus = this.chongzhiStatus2
      this.current_page = page
      this.orderData = []
      this.loadingShow = true
      let dataObj = {
        pageIndex: page,
        pageSize: '20',
        orderType: 'pigame'
      }
      if (this.startTime) {
        dataObj.startDate = this.$changeDate(this.startTime, '-')
      }
      if (this.endTime) {
        dataObj.endDate = this.$changeDate(this.endTime, '-', 3)
      }
      // 提现的列表
      if (this.chongzhiStatus === 1) {
        this.$postAxios.post(`${this.$api2}draw/queryMyOrderList`, dataObj).then(res => {
          this.loadingShow = false
          if (res.data.status === 'success') {
            this.orderData = res.data.data.list
            if (res.data.data.list.length < 20) {
              this.pend = true
            }
            if (res.data.data.length === 0) {
              this.noResult = true
            }
          }
        })
      } else { // 充值的列表
        this.$postAxios.post(`${this.$api2}deposit/queryMyOrderList`, dataObj).then(res => {
          this.loadingShow = false
          if (res.data.status === 'success') {
            this.orderData = res.data.data.list
            if (this.orderData.length < 20) {
              this.pend = true
            }
            if (this.orderData.length === 0) {
              this.noResult = true
            }
          }
        })
      }
    },
    gotoInfo (id) {
      if (this.chongzhiStatus === 1) { // 提现详情
        this.$router.push({path: '/account/sharerOrder/withdraw', query: {id: id}})
      } else { // 充值详情
        this.$router.push({path: '/account/sharerOrder/rechargeOrderDetail', query: {id: id}})
      }
    },
    // 充值or提现
    isChongzhi (status) {
      if (status === 0) {
        return '充值'
      } else {
        return '提现'
      }
    },
    checkOne (item, index) {
      this.currentStatus = item
      this.isSelectBox = false
      this.chongzhiStatus2 = index
    }
  },
  computed: {
    pstart () {
      return this.current_page === 1
    }
  },
  components: {
    vLoading: resolve => require(['@/components/loading.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
