<template>
  <div class="wrapper-account">
    账户预览 > 我的账户
    <h2>账户信息</h2>
    <h4>个人资产</h4>
    <!-- 个人资产列表 -->
    <ul>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img01.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">π富基金</div>
          <div class="assets-value">{{account.fundBalance | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img02.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">π付钱包</div>
          <div class="assets-value">{{account.paiPurseBalance | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img03.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">USD余额</div>
          <div class="assets-value">{{account.usdBalance | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img04.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">代金券</div>
          <div class="assets-value">{{account.voucherBalance | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img04.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">π资产</div>
          <div class="assets-value">{{balances[0] | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img05.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">{{currencys[1]}}资产</div>
          <div class="assets-value">{{balances[1] | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img06.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">{{currencys[2]}}资产</div>
          <div class="assets-value">{{balances[2] | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img08.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">{{currencys[3]}}资产</div>
          <div class="assets-value">{{balances[3] | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img09.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">{{currencys[4]}}资产</div>
          <div class="assets-value">{{balances[4] | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img10.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">{{currencys[5]}}资产</div>
          <div class="assets-value">{{balances[5] | fourNumber}}</div>
        </div>
      </li>
      <li>
        <div class="assets-left">
          <img width="80" height="80" src="../../../assets/images/account/img10.png"/>
        </div>
        <div class="assets-right">
          <div class="assets-title">{{currencys[6]}}资产</div>
          <div class="assets-value">{{balances[6] | fourNumber}}</div>
        </div>
      </li>
    </ul>
    <h4>待处理事项</h4>
    <div class="assets-wrapper">
      <div class="tab-wrapper">
        <!--<div @click="changeTab(index)" :class="{active: currentIndex === index}" class="assets-tab" v-for="(item, index) in tabsTitle" :key="item.index">{{item}}</div>-->
        <div @click="changeTab(0)" :class="{active: currentIndex === 0}" class="assets-tab">充值 ({{TopUpLength}})</div>
        <div @click="changeTab(1)" :class="{active: currentIndex === 1}" class="assets-tab">提现 ({{drawLength}})</div>
        <div @click="changeTab(2)" :class="{active: currentIndex === 2}" class="assets-tab">代理商竞拍 ({{infiniteLength}})</div>
        <div @click="changeTab(3)" :class="{active: currentIndex === 3}" class="assets-tab">数字货币交易 ({{queryCoinEntrustLength}})</div>
        <div @click="changeTab(4)" :class="{active: currentIndex === 4}" class="assets-tab">共享者订单 ({{drawSharersCount + depositSharersCount}})</div>
      </div>
      <div class="table-container">
        <!-- 充值内容 -->
        <table v-show="currentIndex === 0">
          <thead>
          <tr>
            <td v-for="(item,index) in topUpHead" :key="index">
              {{item.title}}
            </td>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in topUpList" :key="item.index">
            <td>{{item.id}}</td>
            <td>{{item.amount | formattingMoney}} {{item.currency}}</td>
            <td>{{item.givemoneyname}}</td>
            <td>{{$changeDate(item.createAt, '-')}}</td>
            <td class="changeRed">{{changeText(item.orderState)}}</td>
            <td class="changeRed">查看详情</td>
          </tr>
          </tbody>
          <div class="null-data" v-if="topUpList.length === 0">
            {{$t('myAccount.text1')}}
          </div>
          <v-turnPage v-if="topUpList.length !== 0" :propsPage="totalPage1" @orderLogTrunPage="topUpTurnPage" ref="turnPage1"></v-turnPage>
        </table>
        <!-- 提现内容 -->
        <table v-show="currentIndex === 1">
          <thead>
          <tr>
            <td v-for="(item,index) in withdrawalHead" :key="index">
              {{item.title}}
            </td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in drawList" :key="item.index">
            <td>{{item.id}}</td>
            <td>{{item.amount | formattingMoney}} {{item.currency}}</td>
            <td>{{item.bossNick}}</td>
            <td>{{$changeDate(item.createAt, '-')}}</td>
            <td class="changeRed">{{changeText(item.orderState)}}</td>
            <td class="changeRed">查看详情</td>
          </tr>
          </tbody>
          <div class="null-data" v-if="drawList.length === 0">
            {{$t('myAccount.text1')}}
          </div>
          <v-turnPage v-if="drawList.length !== 0" :propsPage="totalPage2" @orderLogTrunPage="drawTurnPage" ref="turnPage2"></v-turnPage>
        </table>
        <!-- 代理商竞拍内容 -->
        <table v-show="currentIndex === 2">
          <thead>
          <tr>
            <td v-for="(item,index) in agentHead" :key="index">
              {{item.title}}
            </td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in infiniteBidList" :key="item.index">
            <td>{{item.infiniteSaleProduct.id}}</td>
            <td>{{item.infiniteSaleProduct.productName}}</td>
            <td>{{item.infiniteSaleProduct.nowBidPrice}}</td>
            <td>{{item.infiniteSaleProduct.merchantName}}</td>
            <td class="changeRed">{{item.infiniteSaleProduct.productUserName}}</td>
            <td class="changeRed">查看详情</td>
          </tr>
          </tbody>
          <div class="null-data" v-if="infiniteBidList.length === 0">
            {{$t('myAccount.text1')}}
          </div>
          <v-turnPage v-if="infiniteBidList.length !== 0" :propsPage="totalPage3" @orderLogTrunPage="DigitalCoinTradingTurnPage" ref="turnPage3"></v-turnPage>
        </table>
        <!-- 数字货币交易内容 -->
        <table v-show="currentIndex === 3">
          <thead>
          <tr>
            <td v-for="(item,index) in digitalHeade" :key="index">
              {{item.title}}
            </td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in queryCoinEntrustList" :key="item.index">
            <td>{{item.id}}</td>
            <td>{{item.tradeAmount}}</td>
            <td>{{item.price}}</td>
            <td>{{item.amount - item.tradeAmount}}</td>
            <td class="changeRed">{{changeEtype(item.etype)}}</td>
            <td class="changeRed">{{$changeDate(item.createAt, '-')}}</td>
          </tr>
          </tbody>
          <div class="null-data" v-if="queryCoinEntrustLength === 0">
            {{$t('myAccount.text1')}}
          </div>
          <v-turnPage v-if="queryCoinEntrustLength !== 0" :propsPage="totalPage4" @orderLogTrunPage="infiniteTurnPage" ref="turnPage4"></v-turnPage>
        </table>
        <!-- 共享者订单 -->
        <table v-show="currentIndex === 4">
          <thead>
          <tr>
            <td v-for="(item,index) in sharersHead" :key="index">
              {{item.title}}
            </td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in sharersList" :key="item.index">
            <td>{{item.id}}</td>
            <td>{{item.amount | formattingMoney}} {{item.currency}}</td>
            <td>{{item.userNick}}</td>
            <td>{{$changeDate(item.createAt, '-')}}</td>
            <td class="changeRed">{{changeText(item.orderState)}}</td>
            <td class="changeRed">查看详情</td>
          </tr>
          </tbody>
          <div class="null-data" v-if="(drawSharersCount + depositSharersCount) === 0">
            {{$t('myAccount.text1')}}
          </div>
          <v-turnPage v-if="(drawSharersCount + depositSharersCount) !== 0" :propsPage="totalPage5" @orderLogTrunPage="parentTurnPage" ref="turnPage5"></v-turnPage>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex'
export default {
  data () {
    return {
      // 充值
      topUpHead: [{title: '订单号'}, {title: '充值金额'}, {title: '共享者'}, {title: '时间'}, {title: '状态'}, {title: '操作'}],
      // 提现
      withdrawalHead: [{title: '订单号'}, {title: '充值金额'}, {title: '共享者'}, {title: '时间'}, {title: '状态'}, {title: '操作'}],
      // 代理商竞拍
      agentHead: [{title: '编号'}, {title: '商品名称'}, {title: '当前价'}, {title: '商家'}, {title: '领先者'}, {title: '操作'}],
      // 数字货币交易
      digitalHeade: [{title: '订单号'}, {title: '已成交数量'}, {title: '已成交金额'}, {title: '剩余数量'}, {title: '类型'}, {title: '发起时间'}],
      // 共享者订单
      sharersHead: [{title: '订单号'}, {title: '充提金额'}, {title: '充提者'}, {title: '时间'}, {title: '状态'}, {title: '操作'}],
      currentIndex: 0,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      totalPage1: 0,
      totalPage2: 0,
      totalPage3: 0,
      totalPage4: 0,
      totalPage5: 0,
      currentPage: 1, // 默认当前页为1
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      currentPage4: 1,
      startDate: '1997-10-10', // 查询充值记录(开始时间 参数)
      endDate: '2118-10-10', // 查询充值记录(结束时间 参数)
      orderState: '',
      balances: [], // 我的账户信息中下面七个li的余额
      currencys: [], // 我的账户信息中下面七个li的单位
      topUpList: [], // 我的账户里面充值记录列表
      TopUpLength: 0, // 我的账户里面充值记录列表总的长度
      drawList: [], // 我的账户里面提现记录列表
      drawLength: 0, // 我的账户里面提现记录列表总的长度
      infiniteBidList: [], // 竞价列表
      queryCoinEntrustList: [], // 数字货币交易列表
      queryCoinEntrustLength: 0, // 数字货币订单总条数
      drawSharersCount: 0, // 提现共享者订单总条数
      depositSharersCount: 0, // 充值共享者订单总条数
      infiniteLength: 0, // 代理商总条数
      totalRecord: 0, // 充提共享者订单
      sharersList: [], // 共享者订单
      drawSharersList: [], // 提现共享者订单
      depositSharersList: [] // 充值共享者订单
    }
  },
  created () {
    this.getCoinUserAccount()
    this.getTopUp(1)
    this.getDraw(1)
    this.infinite(1)
    this.DigitalCoinTrading(1)
    this.drawSharers()
    this.depositSharers()
    // console.log(this.queryCoinEntrustLength)
  },
  components: {
    vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve)
  },
  computed: {
    ...mapGetters([
      'account' // 用户信息
    ])
  },
  methods: {
    changeText (num) {
      if (num === 1) {
        return '创建订单'
      } else if (num === 2) {
        return '老板接单'
      } else if (num === 3) {
        return '老板接单成功'
      } else if (num === 4) {
        return '订单完成'
      } else if (num === 5) {
        return '进入仲裁'
      } else if (num === 6) {
        return '取消订单'
      }
    },
    changeEtype (num) {
      if (num === 1) {
        return '买入'
      } else if (num === 2) {
        return '卖出'
      }
    },
    ...mapActions([
      'getUserBalance'
    ]),
    changeTab (index) {
      this.currentIndex = index
      if (index === 0) {
        if (this.$refs.turnPage1) {
          this.$refs.turnPage1.resetPage(1)
        }
      } else if (index === 1) {
        if (this.$refs.turnPage2) {
          this.$refs.turnPage2.resetPage(1)
        }
      } else if (index === 2) {
        if (this.$refs.turnPage3) {
          this.$refs.turnPage3.resetPage(1)
        }
      } else if (index === 3) {
        if (this.$refs.turnPage4) {
          this.$refs.turnPage4.resetPage(1)
        }
      } else if (index === 4) {
        this.$refs.turnPage5.resetPage(1)
        this.concatSharersList()
      }
    },
    topUpTurnPage (page) {
      this.currentPage = page
      this.getTopUp(page)
      console.log('123')
    },
    drawTurnPage (page) {
      this.currentPage1 = page
      this.getDraw(page)
    },
    infiniteTurnPage (page) {
      this.currentPage2 = page
      this.infinite(page)
    },
    DigitalCoinTradingTurnPage (page) {
      this.currentPage3 = page
      this.DigitalCoinTrading(page)
    },
    parentTurnPage (page) { // 页码
      this.currentPage4 = page
      // this.getTopUp(page)
      // this.getDraw(page)
      // this.infinite(page)
      // this.DigitalCoinTrading(page)
      this.concatSharersList(page)
    },
    // 查询最新余额 接口地址 http://boss.pigamegroup.com/user/balance
    // 查询用户多种货币 接口地址 http://boss.pigamegroup.com/coinaccount/queryCoinUserAccount
    getCoinUserAccount () {
      this.$http.post(`${this.$api}/coinaccount/queryCoinUserAccount`).then((res) => {
        if (res.data.success === true) {
          let presonBalance = res.data.data
          // console.log(presonBalance)
          for (let i = 0; i < presonBalance.length; i++) {
            this.balances.push(presonBalance[i].balance)
            this.currencys.push(presonBalance[i].currency)
          }
        }
      })
    },
    // 查询充值记录
    getTopUp (page) {
      this.$http.post(`${this.$api2}/deposit/queryMyOrderList?pageIndex=${page}&pageSize=${this.pageSize}&startDate=${this.startDate}&endDate=${this.endDate}&orderState=${this.orderState}`).then((res) => {
        if (res.data.status === 'success') {
          this.topUpList = res.data.data.list // 充值记录列表
          this.totalPage1 = res.data.data.totalPage
          this.TopUpLength = res.data.data.totalCount
          // console.log(this.topUpList)
        }
      })
    },
    // 查询提现
    getDraw (page) {
      this.$http.post(`${this.$api2}/draw/queryMyOrderList?pageIndex=${page}&pageSize=${this.pageSize}&startDate=${this.startDate}&endDate=${this.endDate}&orderState=${this.orderState}`).then((res) => {
        if (res.data.status === 'success') {
          this.drawList = res.data.data.list // 提现记录列表
          this.totalPage2 = res.data.data.totalPage
          this.drawLength = res.data.data.totalCount
          // console.log(res.data.data)
        }
      })
    },
    // 代理商竞拍
    infinite (page) {
      this.$http.post(`${this.$api2}/infinite/queryMyBidRecordList?pageIndex=${page}&pageSize=${this.pageSize}&queryType=0`).then((res) => {
        if (res.data.status === 'success') {
          this.infiniteBidList = res.data.data.infiniteBidList
          this.totalPage3 = res.data.data.totalPage
          this.infiniteLength = res.data.data.totalCount
          // console.log(this.infiniteBidList)
        }
      })
    },
    // 数字货币交易
    DigitalCoinTrading (page) {
      this.$http.post(`${this.$api}/coinentrust/queryCoinEntrustList?pageIndex=${page}&pageSize=${this.pageSize}&state=0&etype=0&orderId=&startDate=${this.startDate}&endDate=${this.endDate}`).then((res) => {
        if (res.data.status === 'success') {
          this.queryCoinEntrustList = res.data.data.list // 数字货币交易列表
          this.totalPage4 = res.data.data.totalPage
          if (this.queryCoinEntrustLength !== 0) {
            this.queryCoinEntrustLength = res.data.data.totalCount
          }
        }
      })
    },
    // 提现共享者订单
    drawSharers () {
      this.$http.post(`${this.$api2}/draw/queryMyOrderList?pageIndex=1&pageSize=10000&startDate=${this.startDate}&endDate=${this.endDate}&orderState=${this.orderState}&orderType='pigame'`).then((res) => {
        if (res.data.status === 'success') {
          this.drawSharersList = res.data.data.list
          this.drawSharersCount = res.data.data.totalCount
        }
      })
    },
    // 充值共享者订单
    depositSharers () {
      this.$http.post(`${this.$api2}/deposit/queryMyOrderList?pageIndex=1&pageSize=10000&startDate=${this.startDate}&endDate=${this.endDate}&orderState=${this.orderState}&orderType='pigame'`).then((res) => {
        if (res.data.status === 'success') {
          this.depositSharersList = res.data.data.list
          this.depositSharersCount = res.data.data.totalCount
        }
      })
    },
    concatSharersList (page) {
      this.totalRecord = this.drawSharersList.concat(this.depositSharersList).length
      this.sharersList = this.drawSharersList.concat(this.depositSharersList).splice((page - 1) * this.pageSize, this.pageSize)
      this.totalPage5 = Math.ceil(this.totalRecord / this.pageSize)
      // console.log(this.sharersList)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrapper-account
  h2
    margin-top 30px
    font-weight bold
  h4
    font-weight bold
    margin 50px 0 20px
  ul
    display flex
    flex-wrap wrap
    li
      margin 0 40px 40px 0
      width 330px
      height 130px
      display flex
      flex-direction row
      justify-content center
      align-items center
      padding 40px 20px
      border 1px solid #e7e8ec
      box-shadow 0 0 5px #e7e8ec
      border-radius 4px
      &:hover
        cursor pointer
        border none
        box-shadow 0 0 5px #ffba14
      &:active
        opacity 0.6
        user-select none
      .assets-left
       margin-right 60px
      .assets-right
        .assets-title
           font-size 20px
           margin-bottom 10px
           color #1a1a1a
        .assets-value
           font-size 24px
           font-weight bold
           span
             color #ffba14
  .assets-wrapper
    .tab-wrapper
      height 60px
      line-height 60px
      display flex
      flex-direction row
      border-bottom 1px solid #ffba14
      justify-content space-between
      .assets-tab
        flex 1
        text-align center
        &:hover
          cursor pointer
        &:active
          user-select none
          opacity 0.6
      .active
        color #fff
        border-radius 4px 4px 0 0
        background #ffba14
</style>
