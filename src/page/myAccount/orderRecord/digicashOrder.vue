<template>
  <div class="myaccount-bill">
    <!--数字货币交易-->
    <h3 class="my-title">数字货币交易</h3>
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
        <li class="table-list">货币对</li>
        <li class="table-list">价格</li>
        <li class="table-list">委托数量</li>
        <li class="table-list">已成交数量</li>
        <li class="table-list">状态</li>
        <li class="table-list">操作</li>
      </ul>
      <v-loading v-show="loadingShow"></v-loading>
      <div class="no-result" v-show="noResult">暂无数据</div>
      <ul class="table-uls cursor" v-for="(item, index) in orderData" :key="index" @click="gotoInfo(item.id, item.orderState)">
        <li class="table-list">{{item.id}}</li>
        <li class="table-list">{{$changeDate(item.createAt, '-', 8)}}</li>
        <li class="table-list">{{orderEtype(item.etype)}}</li>
        <li class="table-list">{{item.buyCurrency}}/{{item.sellCurrency}}</li>
        <li class="table-list">{{item.price | fourNumber}}</li>
        <li class="table-list">{{item.amount}}</li>
        <li class="table-list">{{item.tradeAmount}}</li>
        <li class="table-list">{{finishState(item.finishState)}}</li>
        <li class="table-list point-info">查看详情</li>
      </ul>
      <div class="page-w">
        <div class="pre-page page cursor" :class="{'disabled': pstart}" @click="gotoPage(current_page - 1)">&lt; 上一页</div>
        <div class="current-page page">{{current_page}}</div>
        <div class="next-page page cursor" :class="{'disabled': pend}" @click="gotoPage(current_page + 1)">下一页 &gt;</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      current_page: 0,
      orderData: [],
      pend: false,
      etypeOrder: '',
      noResult: false,
      currentStatus: '全部',
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
      statusArr: ['全部', '买入', '卖出'],
      startTime: '',
      endTime: ''
    }
  },
  created () {
    this.gotoPage(1)
  },
  methods: {
    // 订单列表
    gotoPage (page) {
      this.current_page = page
      this.orderData = []
      this.loadingShow = true
      let dataObj = {
        pageIndex: page,
        pageSize: '20'
      }
      if (this.etypeOrder) {
        dataObj.etype = this.etypeOrder
      }
      if (this.startTime) {
        dataObj.startDate = this.$changeDate(this.startTime, '-')
      }
      if (this.endTime) {
        dataObj.endDate = this.$changeDate(this.endTime, '-', 3)
      }
      this.$postAxios.post(`${this.$api}coinentrust/queryCoinEntrustList`, dataObj).then(res => {
        this.loadingShow = false
        if (res.data.status === 'success') {
          this.orderData = res.data.data
          if (this.orderData.length < 20) {
            this.pend = true
          } else {
            this.pend = false
          }
          if (this.orderData.length === 0) {
            this.noResult = true
          } else {
            this.noResult = false
          }
        }
      })
    },
    gotoInfo (id) {
      this.$router.push({path: '/account/digicashOrder/digicashOrderDetail', query: {id: id}})
    },
    checkOne (item, index) {
      if (index === 0) {
        this.etypeOrder = ''
      } else {
        this.etypeOrder = index
      }
      this.currentStatus = item
      this.isSelectBox = false
    },
    orderEtype (status) { // 1: 买入  2:卖出
      if (status === 1) {
        return '买入'
      } else if (status === 2) {
        return '卖出'
      }
    },
    // 订单是否完成 1: 未完成 2:已完成
    finishState (status) {
      if (status === 1) {
        return '未完成'
      } else if (status === 2) {
        return '已完成'
      }
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
