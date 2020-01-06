<template>
  <div class="myaccount-bill">
    <!--我的账单-->
    <h3 class="my-title">我的账单</h3>
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
      <!--<span class="bold">类型</span>-->
      <!--<div class="select-w">-->
        <!--<div class="select-box" @click="isSelectBox = !isSelectBox">-->
          <!--<div>{{currentStatus}}</div>-->
          <!--<div class="icon" :class="{'rotate-icon': isSelectBox}"></div>-->
        <!--</div>-->
        <!--<ul class="select-uls" :class="{'hidden-box': isSelectBox}">-->
          <!--<li class="select-list" v-for="(item, index) in statusArr" :key="index" @click="checkOne(item)">{{item}}</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--<div class="line"></div>-->
      <div class="send-cha" @click="gotoPage(1)">查询</div>
    </div>
    <div class="table-wrapper">
      <ul class="table-uls">
        <li class="table-list">编号</li>
        <li class="table-list">时间</li>
        <li class="table-list">类型</li>
        <li class="table-list">变化金额</li>
        <li class="table-list">状态</li>
        <li class="table-list">操作</li>
      </ul>
      <v-loading v-show="loadingShow"></v-loading>
      <ul class="table-uls cursor" v-for="(item, index) in orderData" :key="index" @click="gotoDetails(item, paymentTypeOrder(item.paymentType, item.orderType))">
        <li class="table-list">{{item.id}}</li>
        <li class="table-list">{{$changeDate(item.createAt, '-', 8)}}</li>
        <li class="table-list">{{paymentTypeOrder(item.paymentType, item.orderType)}}</li>
        <li class="table-list">{{plusOrMin(item.receiveAddress)}}{{item.amount | fourNumber}} {{item.currency}}</li>
        <li class="table-list">{{orderState(item.state)}}</li>
        <li class="table-list point-info red-color">查看详情</li>
      </ul>
      <div class="no-result" v-show="noResult">暂无数据</div>
    </div>
    <div class="page-w">
      <div class="pre-page page cursor" :class="{'disabled': pstart}" @click="gotoPage(current_page - 1)">&lt; 上一页</div>
      <div class="current-page page">{{current_page}}</div>
      <div class="next-page page cursor" :class="{'disabled': pend}" @click="gotoPage(current_page + 1)">下一页 &gt;</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      pend: false,
      current_page: 1,
      loadingShow: true,
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
      orderData: [],
      statusArr: ['全部', '完成', '待接单', '申诉中', '订单已取消'],
      startTime: '',
      endTime: '',
      pages: ''
    }
  },
  created () {
    this.gotoPage(1)
    /*
    *  receiveAddress !=  userAddress 变化金额为 - 否则 为 +
    *
    * orderType(1),TRADE(2),MONEY_BOSS(3),MINE_GAME(4),SCAN_MINE(5),HEROCARD(6),REDENVELOPE(7),PRODUCT(8),
      // 13 申请连环派 14 用户地块拍出交易
      SHOPMINE(9),STOCK(10),WORLD_MAP(11),WORLD_MAP_PROFITASSIGN(12),ApplyGiveArLink(13),WORLD_MAP_TRADE(14),
      //15 AR夺宝 16 余额宝 17 基金交易  18 第三方商城交易   20派运之星提成 22 派誉之星订单
      ARGAME(15),YUEBAO(16),FUND_TRADE(17),THIRD_TRADE(18),PAI_TO_DISCOVERY(19),LUCKSTARUNIT(20),OPENPLATFORM_TRADE(21),TRUST_ORDER(22),
      //23 商家保证金 24 生态餐券  26 服务中心补贴  27 连锁商家订单
      MERCHANT_BAIL(23),VOUCHER_ENTRUST(24),VOUCHER_TRADE(25),SUBSIDY_ORDER(26),CHAIN_ORDER(27),
      //27 广告位竞拍  28 数字交易委托  29 数字交易  30 第三方付款码 31 红包功能
      ADVERTISE_BID(27),COIN_ENTRUST(28),COIN_TRADE(29),THIRD_CODE(30),LUCK_MONEY(31),
      //32 第三方平台转账   33 ICO认购发行 34 微博钱包 35 区块链投票箱
      OPEN_TO_DISCOVERY(32),ICO_BUY_ISSUE(33),WEIBO_PURSE(34),BLOCK_CHAIN_VOTE(35),
      // 36 开通AI机器人 37团购订单 38无限竞派
      OPEN_AI_ROBOT(36),GROUP_SHOP(37),INFINITE(38);
    * */
  },
  methods: {
    gotoDetails (item, leixing) {
      let data = {
        leixing: leixing,
        id: item.id,
        amount: item.amount,
        time: item.createAt
      }
      this.$router.push({
        path: '/account/myBill/billDetail',
        query: {
          dataInfo: JSON.stringify(data)
        }
      })
    },
    // 获取订单列表
    gotoPage (page) {
      this.current_page = page
      this.orderData = []
      this.loadingShow = true
      let dataObj = {
        page: page,
        pageSize: '20'
      }
      if (this.startTime) {
        dataObj.startDate = this.$changeDate(this.startTime, '-')
      }
      if (this.endTime) {
        dataObj.endDate = this.$changeDate(this.endTime, '-', 3)
      }
      this.$postAxios.post(`${this.$api}tx/transactionlist`, dataObj).then(res => {
        this.loadingShow = false
        if (res.data.success === true) {
          this.orderData = res.data.data
          if (this.orderData.length < 20) {
            this.pend = true
          }
          if (this.orderData.length === 0) {
            this.noResult = true
          }
        }
      })
    },
    checkOne (item) {
      this.currentStatus = item
      this.isSelectBox = false
    },
    // 变化金额 + -
    plusOrMin (type) {
      if (type === this.userData.address) {
        return '+'
      } else {
        return '-'
      }
    },
    // 状态
    orderState (state) {
      if (state === 0) {
        return '创建订单'
      }
      if (state === 2) {
        return '处理成功'
      }
    },
    // 类型
    paymentTypeOrder (status, orderType) {
      if (status === 1) {
        return '转账' // 转账
      }
      if (status === 2) {
        return '收款' // 收款
      }
      if (status === 11) {
        return '藏宝支付' // 藏宝支付
      }
      if (status === 12) {
        return '合并藏宝图' // 合并藏宝图
      }
      if (status === 13) {
        return '更换藏宝图' // 更换藏宝图
      }
      if (status === 14) {
        return '获得藏宝宝藏' // 获得藏宝宝藏
      }
      if (status === 15) {
        return '发布英雄帖' // 发布英雄帖
      }
      if (status === 16) {
        return '获得英雄帖金额' // 获得英雄帖金额
      }
      if (status === 17) {
        return '已过期英雄帖退款' // 已过期英雄帖退款
      }
      if (status === 18) {
        return '领取红包' // 领取红包
      }
      if (status === 19) {
        return '连环派红包奖励' // 连环派红包奖励
      }
      if (status === 21) {
        return '老板支付充值保证金' // 老板支付充值保证金
      }
      if (status === 22) {
        return '系统收到老板保证金成功' // 系统收到老板保证金成功
      }
      if (status === 23) {
        return '充值成功系统给用户打款' // 充值成功系统给用户打款
      }
      if (status === 24) {
        return '充值成功用户收到钱' // 充值成功用户收到钱
      }
      if (status === 25) {
        return '充值失败系统给退款' // 充值失败系统给退款
      }
      if (status === 26) {
        return '充值失败老板收到退款' // 充值失败老板收到退款
      }
      if (status === 27) {
        return '充值失败，用户冲裁收到退款' // 充值失败，用户冲裁收到退款
      }
      if (status === 31) {
        return '提现用户支付保证金' // 提现用户支付保证金
      }
      if (status === 32) {
        return '系统收到用户保证金' // 系统收到用户保证金
      }
      if (status === 33) {
        return '提现成功系统给老板打款' // 提现成功系统给老板打款
      }
      if (status === 34) {
        return '提现成功老板收到款' // 提现成功老板收到款
      }
      if (status === 35) {
        return '提现失败系统给用户转款' // 提现失败系统给用户转款
      }
      if (status === 36) {
        return '提现失败用户收到退款' // 提现失败用户收到退款
      }
      if (status === 37) {
        return '提现失败' // 提现失败
      }
      if (status === 40) {
        return '买入委托' // 买入委托
      }
      if (status === 41) {
        return '卖出委托' // 卖出委托
      }
      if (status === 42) {
        return '取消买委托' // 取消买委托
      }
      if (status === 43) {
        return '取消卖委托' // 取消卖委托
      }
      if (status === 44) {
        return '买成交记录' // 买成交记录
      }
      if (status === 45) {
        return '卖成交记录' // 卖成交记录
      }
      if (status === 73) {
        return '效率卡购买' // 效率卡购买
      }
      if (status === 74) {
        return '发放红包' // 发放红包
      }
      if (status === 75) {
        return '发送红包撤单退款' // 发送红包撤单退款
      }
      if (status === 76) {
        return 'AR宝箱失效退款' // AR宝箱失效退款
      }
      if (status === 77) {
        return '商家收款' // 商家收款
      }
      if (status === 78) {
        return '退单或退货' // 退单或退货
      }
      if (status === 79) {
        return '订单支付' // 订单支付
      }
      if (status === 81) {
        return '派付线上订单支付' // 派付线上订单支付
      }
      if (status === 82) {
        return '派付线上订单支付后退款' // 派付线上订单支付后退款
      }
      if (status === 83) {
        return '申请连环派' // 申请连环派
      }
      if (status === 84) {
        return '申请连环派退款' // 申请连环派退款
      }
      if (status === 110) {
        return '世界地图拍卖' // 世界地图拍卖
      }
      if (status === 111) {
        return '世界地图收益' // 世界地图收益
      }
      if (status === 112) {
        return '世界地图派别收益' // 世界地图派别收益
      }
      if (status === 113) {
        return '支付宝扫码充值' // 支付宝扫码充值
      }
      if (status === 114) {
        return '微信扫码充值' // 微信扫码充值
      }
      if (status === 115) {
        return '拍地收款' // 拍地收款
      }
      if (status === 123) {
        return '转入余额宝' // 转入余额宝
      }
      if (status === 124) {
        return '转出余额宝' // 转出余额宝
      }
      if (status === 126) {
        return '买入委托' // 买入委托
      }
      if (status === 127) {
        return '卖出委托' // 卖出委托
      }
      if (status === 128) {
        return '取消买委托' // 取消买委托
      }
      if (status === 129) {
        return '取消卖委托' // 取消卖委托
      }
      if (status === 130) {
        return '买成交记录' // 买成交记录
      }
      if (status === 131) {
        return '卖成交记录' // 卖成交记录
      }
      if (status === 132) {
        return '第三方商城买家付款' // 第三方商城买家付款
      }
      if (status === 133) {
        return '第三方商城确认收货' // 第三方商城确认收货
      }
      if (status === 134) {
        return '第三方商城入住商户退款' // 第三方商城入住商户退款
      }
      if (status === 135) {
        return '中间商户退款' // 中间商户退款
      }
      if (status === 235) {
        return '手续费退款' // 手续费退款
      }
      if (status === 140) {
        return '派运之星提成' // 派运之星提成
      }
      if (status === 151) {
        return '开放平台买家付款' // 开放平台买家付款
      }
      if (status === 152) {
        return '开放平台确认收货' // 开放平台确认收货
      }
      if (status === 153) {
        return '开放平台入住商户退款' // 开放平台入住商户退款
      }
      if (status === 154) {
        return '开放平台中间商户退款' // 开放平台中间商户退款
      }
      if (status === 156) {
        return '购买派誉之星付款' // 购买派誉之星付款
      }
      if (status === 157) {
        return '派誉之星奖励支出' // 派誉之星奖励支出
      }
      if (status === 158) {
        return '派誉之星奖励退款' // 派誉之星奖励退款
      }
      if (status === 159) {
        return '商家支付保证金' // 商家支付保证金
      }
      if (status === 160) {
        return '商家赔付用户保证金' // 商家赔付用户保证金
      }
      if (status === 161) {
        return '商家保证金退款' // 商家保证金退款
      }
      if (status === 162) {
        return '餐券买入委托' // 餐券买入委托
      }
      if (status === 163) {
        return '餐券卖出委托' // 餐券卖出委托
      }
      if (status === 164) {
        return '取消餐券买委托' // 取消餐券买委托
      }
      if (status === 165) {
        return '取消餐券卖委托' // 取消餐券卖委托
      }
      if (status === 166) {
        return '餐券买成交记录' // 餐券买成交记录
      }
      if (status === 167) {
        return '餐券卖成交记录' // 餐券卖成交记录
      }
      if (status === 171) {
        return '服务中心补贴' // 服务中心补贴
      }
      if (status === 172) {
        return '连锁商家PV预扣' // 连锁商家PV预扣
      }
      if (status === 173) {
        return '连锁商家PV返还' // 连锁商家PV返还
      }
      if (status === 174) {
        return '连锁商家生态奖励发放' // 连锁商家生态奖励发放
      }
      if (status === 175) {
        return '连锁商家补贴发放' // 连锁商家补贴发放
      }
      if (status === 176) {
        return '连锁商家佣金发放' // 连锁商家佣金发放
      }
      if (status === 177) {
        return '广告位竞拍成交' // 广告位竞拍成交
      }
      if (status === 178) {
        return '数字交易买入委托' // 数字交易买入委托
      }
      if (status === 179) {
        return '数字交易卖出委托' // 数字交易卖出委托
      }
      if (status === 180) {
        return '数字交易取消买委托' // 数字交易取消买委托
      }
      if (status === 181) {
        return '数字交易取消卖委托' // 数字交易取消卖委托
      }
      if (status === 182) {
        return '数字交易买成交记录' // 数字交易买成交记录
      }
      if (status === 183) {
        return '数字交易卖成交记录' // 数字交易卖成交记录
      }
      if (status === 184) {
        return '第三方付款码支付' // 第三方付款码支付
      }
      if (status === 185) {
        return '数字交易手续费' // 数字交易手续费
      }
      if (status === 186) {
        return '红包发放' // 红包发放
      }
      if (status === 187) {
        return '红包获得' // 红包获得
      }
      if (status === 188) {
        return '红包退款' // 红包退款
      }
      if (status === 195) {
        return 'ICO认购支出' // ICO认购支出
      }
      if (status === 196) {
        return '获得商家代币' // 获得商家代币
      }
      if (status === 197) {
        return 'ICO认购收入' // ICO认购收入
      }
      if (status === 198) {
        return '认购代币退回' // 认购代币退回
      }
      if (status === 201) {
        return '微博打赏' // 微博打赏
      }
      if (status === 202) {
        return '微博钱包提现' // 微博钱包提现
      }
      if (status === 203) {
        return '虚拟币充值(币币充值)' // 虚拟币充值(币币充值)
      }
      if (status === 204) {
        return '区块链投票冻结用户π' // 区块链投票冻结用户π
      }
      if (status === 205) {
        return '区块链投票退回用户π' // 区块链投票退回用户π
      }
      if (status === 206) {
        return '开通ai机器人' // 开通ai机器人
      }
      if (status === 207) {
        return '团购订单支付' // 团购订单支付
      }
      if (status === 208) {
        return '团购订单退款' // 团购订单退款
      }
      if (status === 209) {
        return '团购订单打款给商家' // 团购订单打款给商家
      }
      if (status === 210) {
        return '无限竞派竞价成功扣款' // 无限竞派竞价成功扣款
      }
      if (status === 211) {
        return '无限竞派抢购支付' // 无限竞派抢购支付
      }
      if (status === 212) {
        return '无限竞派奖励' // 无限竞派奖励
      }
      if (status === 213) {
        return '无限竞派打款给商家' // 无限竞派打款给商家
      }
      if (orderType === 15) {
        return 'AR夺宝' // AR夺宝
      }
    }
  },
  computed: {
    pstart () {
      return this.current_page === 1
    },
    ...mapGetters([
      'userData'
    ])
  },
  components: {
    vLoading: resolve => require(['@/components/loading.vue'], resolve)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
