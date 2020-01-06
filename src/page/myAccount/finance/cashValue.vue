<template>
  <div class="paiWallet">
    <h3>充值/提现</h3>
    <div class="userInfo">
      <div class="info-top">
        <i></i><span>USD资产</span>
      </div>
      <div class="info-center">
        <span>{{formatMoney(account.usdBalance).split('.')[0]}}.</span><b>{{formatMoney(account.usdBalance).split('.')[1]}}</b><i> USD</i>
      </div>
      <div class="info-bottom">
        <span @click="$router.push('/account/transferAccounts')">转账</span>
        <span @click="$router.push('/account/recharge')">充值</span>
        <span @click="$router.push('/account/withdraw')">提现</span>
      </div>
    </div>
    <div class="record">
      <h6>充值提现记录</h6>
      <div class="tab">
        <span :class="{'active': tabIndex === 0}" @click="changeTab(0)">充值</span>
        <span :class="{'active': tabIndex === 1}" @click="changeTab(1)">提现</span>
      </div>
      <table>
        <tr>
          <td style="flex: 2">订单号</td>
          <td style="flex: 2.4">创建时间</td>
          <td style="flex: 2.8">交易金额</td>
          <td style="flex: 2">共享者</td>
          <td style="flex: 2">订单状态</td>
          <td style="flex: 1.9">操作</td>
        </tr>
        <tr @click="viewDetail(item.id)" v-for="(item, index) in cashValueList" :key="index">
          <td style="flex: 2">{{item.id}}</td>
          <td style="flex: 2.4">{{$changeDate(item.createAt)}}</td>
          <td style="flex: 2.8">{{item.amount | formattingMoney}}{{item.currency}}</td>
          <td style="flex: 2">{{item.bossNick}}</td>
          <td style="flex: 2">{{parseOrderState(item.orderState)}}</td>
          <td style="flex: 1.9">查看详情</td>
        </tr>
      </table>
    </div>
    <!--转出弹窗-->
    <div class="pop-box" v-if="outFlag">
      <div class="dialogBox">
        <h5>转出到余额</h5>
        <div class="content">
          <p><input type="text" placeholder="输入转出金额"><i>π</i></p>
          <span>可转入<i>50000π</i></span>
        </div>
        <div class="btn">
          确定
        </div>
      </div>
    </div>
    <!--转入弹窗-->
    <div class="pop-box" v-if="transferFlag">
      <div class="dialogBox">
        <h5>转入π付钱包</h5>
        <div class="content">
          <p><input type="text" placeholder="输入转入金额"><i>π</i></p>
          <span>可转入<i>50000π</i>,可转入上限为寻宝总金额</span>
        </div>
        <div class="btn">
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      outFlag: false, // 转出弹窗
      transferFlag: false,
      tabIndex: 0,
      pageIndex: 1,
      pageIndex2: 1,
      pageSize: 5,
      cashValueList: []
    }
  },
  mounted () {
    this.queryMyDepositOrderList()
  },
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  methods: {
    ...mapActions([
      'getUserBalance'
    ]),
    // tab切换
    changeTab (index) {
      this.tabIndex = index
      if (index === 1) {
        this.queryMyOrderList()
      } else {
        this.queryMyDepositOrderList()
      }
    },
    // 派钱包App 》 充值提现 》 1.82 查询提现记录 /draw/queryMyOrderList
    queryMyOrderList () {
      let url = `${this.$api2}draw/queryMyOrderList?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        console.log(res)
        if (res.data.status === 'success') {
          this.cashValueList = res.data.data.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 派钱包App 》 充值提现 》 1.83 查询充值记录 /deposit/queryMyOrderList
    queryMyDepositOrderList () {
      let url = `${this.$api2}deposit/queryMyOrderList?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        console.log(res)
        if (res.data.status === 'success') {
          this.cashValueList = res.data.data.list
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看详情
    viewDetail (id) {
      var path = ''
      if (this.tabIndex === 0) {
        path = 'rechargeOrderDetail'
      } else {
        path = 'withdrawOrderDetail'
      }
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      })
    },
    // 解析订单状态
    parseOrderState (state) {
      switch (state) {
        case 1:
          return '创建订单'
        case 2:
          return '老板接单'
        case 3:
          return '老板接单成功'
        case 4:
          return '订单完成'
        case 5:
          return '进入仲裁'
        case 6:
          return '取消订单'
        default:
          return '--'
      }
    },
    formatMoney (value, tag = ',') {
      if (!value) {
        return '0.0000'
      } else {
        if (!isNaN(value) && value !== null) {
          if (value < 0) {
            value = Math.abs(value)
            let f = Math.floor(value * 100) * 100 / 10000
            let _value = f.toString()
            let rs = _value.indexOf('.')
            if (rs < 0) {
              rs = _value.length
              _value += '.'
            }
            while (_value.length <= rs + 4) {
              _value += '0'
            }
            let newStr = _value.split('.')
            if (newStr[0].length <= 3) {
              return newStr[0] + '.' + newStr[1]
            }
            let r = newStr[0].length % 3
            _value = r > 0 ? newStr[0].slice(0, r) + tag + newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag) : newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag)
            _value = _value + '.' + newStr[1]
            return '-' + _value
          } else {
            let f = Math.floor(value * 100) * 100 / 10000
            let _value = f.toString()
            let rs = _value.indexOf('.')
            if (rs < 0) {
              rs = _value.length
              _value += '.'
            }
            while (_value.length <= rs + 4) {
              _value += '0'
            }
            let newStr = _value.split('.')
            if (newStr[0].length <= 3) {
              return newStr[0] + '.' + newStr[1]
            }
            let r = newStr[0].length % 3
            _value = r > 0 ? newStr[0].slice(0, r) + tag + newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag) : newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag)
            _value = _value + '.' + newStr[1]
            return _value
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .paiWallet{
    background-color: #fafafc;
    width: 100%;
    padding: 60px;
    h3{
      font-size: 34px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 60px;
    }
    .userInfo{
      width: 750px;
      background-color: #fff;
      border: 1px solid #e7e8ec;
      border-radius: 4px;
      padding: 20px 30px;
      margin-bottom: 60px;
      .info-top{
        display: flex;
        margin-bottom: 20px;
        i{
          display: block;
          width: 34px;
          height: 34px;
          background-color: #ccc;
          border-radius: 50%;
          margin-right: 20px;
        }
        span{
          color: #1a1a1a;
          font-size: 20px;
        }
      }
      .info-center{
        margin-bottom: 45px;
        text-align: left;
        span{
          color: #1a1a1a;
          font-size: 30px;
        }
        i{
          color: #ffba14;
          font-size: 20px;
        }
        b{
          font-size: 20px;
          color: #1a1a1a;
        }
      }
      .info-bottom{
        display: flex;
        justify-content: space-between;
        span{
          width: 210px;
          height: 50px;
          border: 1px solid transparent;
          border-radius: 4px;
          display: block;
          text-align: center;
          line-height: 50px;
          color: #fff;
          cursor: pointer;
          user-select: none;
          &:active{
            opacity: 0.4;
          }
          &:nth-child(1) {
            background-color: #e93a3a;
          }
          &:nth-child(2) {
            background-color: #36ce88;
          }
          &:nth-child(3) {
            background-color: transparent;
            color: #1a1a1a;
            border: 1px solid #ffba14;
          }
        }
      }
    }
  }
  .record{
    width: 100%;
    .tab{
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ffba14;
      span{
        width: 200px;
        height: 45px;
        display: inline-block;
        text-align: center;
        color: #1a1a1a;
        line-height: 45px;
        cursor: pointer;
        user-select: none;
        &.active{
          background-color: #ffba14;
          color: #fff;
        }
      }
    }
    h6{
      font-size: 20px;
      color: #1a1a1a;
      font-weight:bold;
      line-height: 50px;
      height: 50px;
      margin-bottom: 10px;
    }
    table{
      width: 100%;
      tr{
        cursor: pointer;
      }
    }

  }
</style>
