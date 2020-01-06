<template>
  <div class="paiWallet">
    <h3>π付钱包</h3>
    <div class="userInfo">
      <div class="info-top">
        <i></i><span>当前派付账户余额</span>
      </div>
      <div class="info-center">
        <span>{{formatMoney(account.piBalance).split('.')[0]}}.</span><b>{{formatMoney(account.piBalance).split('.')[1]}}</b><i>π</i>
      </div>
      <div class="info-bottom">
        <span class="active" @click="shiftTo()">转入</span>
        <span @click="rollOut()">转出</span>
      </div>
    </div>
    <div class="record">
      <h6>账户余额变化记录</h6>
      <table>
          <tr>
            <td style="flex: 2">编号</td>
            <td style="flex: 3">类型</td>
            <td style="flex: 3.4">时间</td>
            <td style="flex: 3.4">金额</td>
            <td style="flex: 3.7">操作</td>
          </tr>
          <tr @click="$router.push('paiwalletDetail')" v-for="(item, index) in userPaiPurseList" :key="index">
            <td style="flex: 2">{{item.id}}</td>
            <td style="flex: 3">{{parseChangeType(item.changeType)}}</td>
            <td style="flex: 3.4">{{$changeDate(item.createAt)}}</td>
            <!--changeAmount-->
            <td style="flex: 3.4">{{item.changeAmount | formattingMoney}} π</td>
            <td style="flex: 3.7">查看详情</td>
          </tr>
      </table>
      <div class="page"><span @click="toPage('pre')">上一页</span><i>{{pageIndex}}</i><span @click="toPage('next')">下一页</span></div>
    </div>
    <!--转出弹窗-->
    <div class="pop-box" v-if="outFlag">
      <div class="dialogBox">
        <h5>转出到余额</h5>
        <div class="content">
          <p><input type="text" placeholder="输入转出金额" v-model="outputTotal"><i>π</i></p>
          <span>可转入<i>{{purseQuota.outputQuota}}π</i></span>
        </div>
        <div class="errmsg" style="color: #e60000;" v-if="errmsg1">
          {{errmsg1}}
        </div>
        <div class="btn" @click="sureRollOut()">
          确定
        </div>
        <i @click="outFlag = false"></i>
      </div>
    </div>
    <!--转入弹窗-->
    <div class="pop-box" v-if="transferFlag">
      <div class="dialogBox">
        <h5>转入π付钱包</h5>
        <div class="content">
          <p><input type="text" placeholder="输入转入金额" v-model="inputTotal"><i>π</i></p>
          <span>可转入<i>{{purseQuota.inputQuota}}π</i>,可转入上限为寻宝总金额</span>
        </div>
        <div class="errmsg" style="color: #e60000;" v-if="errmsg2">
          {{errmsg2}}
        </div>
        <div class="btn" @click="sureShiftTo()">
          确定
        </div>
        <i @click="transferFlag = false"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import Dialog from '@/components/dialog/dialog'
export default {
  data () {
    return {
      outFlag: false, // 转出弹窗
      transferFlag: false,
      pageIndex: 1,
      pageSize: 5,
      userPaiPurseList: [],
      outputTotal: '', // 转出金额
      inputTotal: '', // 转入金额
      errmsg1: '',
      errmsg2: ''
    }
  },
  mounted () {
    this.getPaiPurseRecordList()
    this.getPurseQuota()
    // this.getUserBalance()
  },
  computed: {
    ...mapGetters([
      'account',
      'purseQuota'
    ])
  },
  methods: {
    ...mapActions([
      'getUserBalance',
      'getPurseQuota'
    ]),
    // 转入
    shiftTo () {
      this.transferFlag = true
    },
    // 确认转入
    sureShiftTo () {
      if (this.inputTotal === '') {
        this.errmsg2 = '请输入转入金额'
      } else if (this.inputTotal > this.purseQuota.inputQuota) {
        this.errmsg2 = '超过最大可转入金额'
      } else {
        this.errmsg2 = ''
        let url = `${this.$api}purse/inputPaiPurse?inputTotal=${this.inputTotal}`
        this.$http.post(url).then(res => {
          if (res.data.status === 'success') {
            this.transferFlag = false
            Dialog({
              title: '提示',
              content: '转入成功'
            })
          } else {
            Dialog({
              title: '提示',
              content: res.data.msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },

    // 转出
    rollOut () {
      this.outFlag = true
    },
    // 确认转出
    sureRollOut () {
      if (this.inputTotal === '') {
        this.errmsg1 = '请输入转出金额'
      } else if (this.inputTotal > this.purseQuota.inputQuota) {
        this.errmsg1 = '超过最大可转入金额'
      } else {
        this.errmsg1 = ''
        let url = `${this.$api}purse/outputPaiPurse?outputTotal=${this.outputTotal}`
        this.$http.post(url).then(res => {
          console.log(res.data.status)
          if (res.data.status === 'success') {
            this.outFlag = false
            Dialog({
              title: '提示',
              content: '转出成功'
            })
          } else {
            Dialog({
              title: '提示',
              content: res.data.msg
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    toPage (type) {
      if (type === 'pre') {
        if (this.pageIndex > 1) {
          this.pageIndex--
          this.getPaiPurseRecordList()
        }
      } else if (type === 'next') {
        this.pageIndex++
        this.getPaiPurseRecordList()
      }
    },
    // 派付 》 6.01 帐户余额变化记录
    getPaiPurseRecordList () {
      let url = `${this.$api}purse/getPaiPurseRecordList?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.status === 'success') {
          this.userPaiPurseList = res.data.data.userPaiPurseList
          if (res.data.data.userPaiPurseList.length === 0 && this.pageIndex > 1) {
            this.pageIndex = this.pageIndex - 1
            this.getPaiPurseRecordList()
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 解析changeType Integer 变动类型 1:余额转入 2:余额转出 3:派付消费 4:寻宝奖励 5:上级购买 6:卖给下级 7:派付退款 查询所有无需传递该参数
    parseChangeType (type) {
      switch (type) {
        case 1 :
          return '余额转入'
        case 2 :
          return '余额转出'
        case 3 :
          return '派付消费'
        case 4 :
          return '寻宝奖励'
        case 5 :
          return '上级购买'
        case 6 :
          return '卖给下级'
        case 7 :
          return '派付退款'
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
    width: 510px;
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
      text-align: center;
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
        border: 1px solid #ffba14;
        border-radius: 4px;
        display: block;
        text-align: center;
        line-height: 50px;
        color: #1a1a1a;
        cursor: pointer;
        user-select: none;
        &.active{
          background-color: #ffba14;
          color: #fff;
        }
        &:active{
          opacity: 0.4;
        }
      }
    }
  }
}
.record{
  width: 100%;
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
