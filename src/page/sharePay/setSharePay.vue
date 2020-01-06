<template>
  <div class="setSharePay">
    <div class="setSharePay-content">
      <div class="setSharePay-title">
        共享充提设置
      </div>
      <div class="setSharePay-box">
        <h3>共享设置</h3>
        <table class="shareTableList">
          <thead>
          <tr>
            <td class="support-type">支持类型</td>
            <td>充值</td>
            <td>提现</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="support-type">共享充提</td>
            <td><input type="checkbox" @click="chooseBox(1)" :class="{checkActive: checkBox1}"></td>
            <td><input type="checkbox" @click="chooseBox(2)" :class="{checkActive: checkBox2}"></td>
          </tr>
          </tbody>
        </table>
        <div class="fees-box">
          <div class="fees-content">
            <div class="fees">充值费率</div>
            <span>36%</span>
            <div class="revise" @click="reviseBtn()">修改</div>
          </div>
        </div>
        <div class="withdraw-rate">
          <div class="rate-box">
            <div class="rate">提现费率</div>
            <input type="text" placeholder="请输入提现费率" disabled  ref="inputRate">
            <div class="save-btn" @click="saveBtn()">保存</div>
            <div class="cancel-btn">取消</div>
          </div>
        </div>
        <div class="support-box">
          <div class="support-type">
            <div class="support-set">支持币种设置</div>
            <div class="account-info" @click="$router.push({path: '/accountInfo'})">账户信息</div>
          </div>
        </div>
        <table class="shareTableList">
          <thead>
          <tr>
            <td class="support-type">支持币种</td>
            <td>充值</td>
            <td>提现</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="support-type">USD</td>
            <td><input type="checkbox" @click="chooseBox(3)" :class="{checkActive: checkBox3}"></td>
            <td><input type="checkbox" @click="chooseBox(4)" :class="{checkActive: checkBox4}"></td>
          </tr>
          <tr>
            <td class="support-type">CNY</td>
            <td><input type="checkbox" @click="chooseBox(5)" :class="{checkActive: checkBox5}"></td>
            <td><input type="checkbox" @click="chooseBox(6)" :class="{checkActive: checkBox6}"></td>
          </tr>
          <tr>
            <td class="support-type">HKD</td>
            <td><input type="checkbox" @click="chooseBox(7)" :class="{checkActive: checkBox7}"></td>
            <td><input type="checkbox" @click="chooseBox(8)" :class="{checkActive: checkBox8}"></td>
          </tr>
          <tr>
            <td class="support-type">CAD</td>
            <td><input type="checkbox" @click="chooseBox(9)" :class="{checkActive: checkBox9}"></td>
            <td><input type="checkbox" @click="chooseBox(10)" :class="{checkActive: checkBox10}"></td>
          </tr>
          <tr>
            <td class="support-type">KRW</td>
            <td><input type="checkbox" @click="chooseBox(11)" :class="{checkActive: checkBox11}"></td>
            <td><input type="checkbox" @click="chooseBox(12)" :class="{checkActive: checkBox12}"></td>
          </tr>
          <tr>
            <td class="support-type">BTC</td>
            <td><input type="checkbox" @click="chooseBox(13)" :class="{checkActive: checkBox13}"></td>
            <td><input type="checkbox" @click="chooseBox(14)" :class="{checkActive: checkBox14}"></td>
          </tr>
          <tr>
            <td class="support-type">LTC</td>
            <td><input type="checkbox" @click="chooseBox(15)" :class="{checkActive: checkBox15}"></td>
            <td><input type="checkbox" @click="chooseBox(16)" :class="{checkActive: checkBox16}"></td>
          </tr>
          <tr>
            <td class="support-type">ETH</td>
            <td><input type="checkbox" @click="chooseBox(17)" :class="{checkActive: checkBox17}"></td>
            <td><input type="checkbox" @click="chooseBox(18)" :class="{checkActive: checkBox18}"></td>
          </tr>
          <tr>
            <td class="support-type">XRP</td>
            <td><input type="checkbox" @click="chooseBox(19)" :class="{checkActive: checkBox19}"></td>
            <td><input type="checkbox" @click="chooseBox(20)" :class="{checkActive: checkBox20}"></td>
          </tr>
          <tr>
            <td class="support-type">BCH</td>
            <td><input type="checkbox" @click="chooseBox(21)" :class="{checkActive: checkBox21}"></td>
            <td><input type="checkbox" @click="chooseBox(22)" :class="{checkActive: checkBox22}"></td>
          </tr>
          <tr>
            <td class="support-type">SIE</td>
            <td><input type="checkbox" @click="chooseBox(23)" :class="{checkActive: checkBox23}"></td>
            <td><input type="checkbox" @click="chooseBox(24)" :class="{checkActive: checkBox24}"></td>
          </tr>
          </tbody>
        </table>
        <h3 class="personal-info">个人信息</h3>
        <div class="personal-box">
          <div class="personal-content">
            <div class="name">姓名</div>
            <div class="personal-name">灭霸</div>
          </div>
          <div class="personal-content">
            <div class="name">地址</div>
            <div class="personal-name">广东省深圳市罗湖区鸿隆世纪广场</div>
          </div>
        </div>
        <h3 class="contact-info">联系信息</h3>
        <table class="shareTable">
          <thead>
          <tr>
            <td class="type">类型</td>
            <td class="contact">联系方式</td>
            <td class="operation">操作</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(newList,i) in NewContactList" :key="newList.type" v-if="NewContactList.length !==0 ">
            <td class="type">{{newList.type}}</td>
            <td class="contact">{{newList.info}}</td>
            <td class="operation"><span style="color: #e93a3a" @click="deleteContact(i)">删除</span></td>
          </tr>
          <tr v-for="(item,index) in ContactList" :key="index">
            <td class="type">
              <input class="transfer-input  select-input" type="text" readonly disabled :placeholder="typeValue">
              <a class="discount-btn" ref="discountBtn" @click="btnChoose(index)">
                <i class="arrowDown" :class="{arrowActive: typeShow === index}"></i>
              </a>
              <ul class="selectMenu" :class="{selectMenuActive: typeShow === index}">
                <li :class="{liActive: transferIndex === index}" v-for="(item, index) in lianxiOption" :key="item.name" @click="chooseType(item.name, index)">{{item.name}}</li>
              </ul>
            </td>
            <td class="contact"><input type="text" class="contact-input" placeholder="请输入联系方式" v-model="contactType"></td>
            <td class="operation"><span style="color: #1a1a1a" @click="saveType(item.index)">保存</span> <i @click="cancelContact(item.index)">取消</i></td>
          </tr>
          <p class="errinMsg">{{errText}}</p>
          <p class="errinMsg">{{errMsg}}</p>
          </tbody>
        </table>
        <div class="add-contact" @click="contactBtn()">
          <span>+新增联系方式</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      checkBox1: false,
      checkBox2: false,
      checkBox3: false,
      checkBox4: false,
      checkBox5: false,
      checkBox6: false,
      checkBox7: false,
      checkBox8: false,
      checkBox9: false,
      checkBox10: false,
      checkBox11: false,
      checkBox12: false,
      checkBox13: false,
      checkBox14: false,
      checkBox15: false,
      checkBox16: false,
      checkBox17: false,
      checkBox18: false,
      checkBox19: false,
      checkBox20: false,
      checkBox21: false,
      checkBox22: false,
      checkBox23: false,
      checkBox24: false,
      lianxiOption: [
        {name: '微信'},
        {name: 'QQ'},
        {name: 'Facebook'},
        {name: 'skype'},
        {name: 'Twitter'},
        {name: 'WhatsApp'},
        {name: 'Line'}
      ],
      num: 0,
      newContact: {
        type: '',
        info: '',
        operation: ''
      },
      NewContactList: [],
      ContactList: [
        {
          type: '',
          info: '',
          operation: ''
        }
      ],
      typeShow: -1,
      transferSelectShow: false,
      typeValue: '微信',
      transferIndex: 0,
      contactType: '', // 联系方式
      errText: '', // 保存错误提示
      errMsg: '' // 删除错误提示
    }
  },
  methods: {
    chooseBox (val) {
      if (val === 1) {
        this.checkBox1 = !this.checkBox1
      } else if (val === 2) {
        this.checkBox2 = !this.checkBox2
      } else if (val === 3) {
        this.checkBox3 = !this.checkBox3
      } else if (val === 4) {
        this.checkBox4 = !this.checkBox4
      } else if (val === 5) {
        this.checkBox5 = !this.checkBox5
      } else if (val === 6) {
        this.checkBox6 = !this.checkBox6
      } else if (val === 7) {
        this.checkBox7 = !this.checkBox7
      } else if (val === 8) {
        this.checkBox8 = !this.checkBox8
      } else if (val === 9) {
        this.checkBox9 = !this.checkBox9
      } else if (val === 10) {
        this.checkBox10 = !this.checkBox10
      } else if (val === 11) {
        this.checkBox11 = !this.checkBox11
      } else if (val === 12) {
        this.checkBox12 = !this.checkBox12
      } else if (val === 13) {
        this.checkBox13 = !this.checkBox13
      } else if (val === 14) {
        this.checkBox14 = !this.checkBox14
      } else if (val === 15) {
        this.checkBox15 = !this.checkBox15
      } else if (val === 16) {
        this.checkBox16 = !this.checkBox16
      } else if (val === 17) {
        this.checkBox17 = !this.checkBox17
      } else if (val === 18) {
        this.checkBox18 = !this.checkBox18
      } else if (val === 19) {
        this.checkBox19 = !this.checkBox19
      } else if (val === 20) {
        this.checkBox20 = !this.checkBox20
      } else if (val === 21) {
        this.checkBox21 = !this.checkBox21
      } else if (val === 22) {
        this.checkBox22 = !this.checkBox22
      } else if (val === 23) {
        this.checkBox23 = !this.checkBox23
      } else if (val === 24) {
        this.checkBox24 = !this.checkBox24
      }
    },
    // 点击修改
    reviseBtn () {
      this.$refs.inputRate.disabled = false
    },
    // 点击保存
    saveBtn () {
    },
    // 点击新增联系方式
    contactBtn () {
      if (this.ContactList.length <= 0) {
        this.ContactList.push({
          type: '',
          info: '',
          operation: ''
        })
      } else {
        this.errText = '请保存再新增'
        this.errMsg = ''
      }
      this.errMsg = ''
    },
    btnChoose (index) {
      if (this.typeShow !== -1) {
        this.typeShow = -1
      } else {
        this.typeShow = index
      }
    },
    // 点击下拉框
    chooseType (val, index) {
      this.typeValue = val
      this.typeShow = -1
    },
    // 新增联系方式保存
    saveType (index) {
      if (this.contactType) {
        this.NewContactList.push({
          type: this.typeValue,
          info: this.contactType
        })
        this.errText = ''
        this.errMsg = ''
        this.ContactList.splice(index, 1)
      } else {
        console.log('123')
        this.errText = '请输入联系方式'
        this.errMsg = ''
      }
      this.contactType = ''
    },
    // 新增联系方式取消
    cancelContact (index) {
      if (this.ContactList.length >= 1) {
        this.ContactList.splice(index, 1)
      }
      this.errText = ''
      this.errMsg = ''
    },
    // 点击删除联系方式
    deleteContact (index) {
      if (this.NewContactList.length <= 1) {
        this.errMsg = '只能保留一个联系方式'
        this.errText = ''
      } else {
        this.NewContactList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  input
    outline none
.setSharePay
  .setSharePay-content
    .setSharePay-title
      font-size 34px
      color #1a1a1a
      font-weight bold
    .setSharePay-box
      width 580px
      margin 0 auto
      padding-top 60px
      h3
        font-size 20px
        color #1a1a1a
        font-weight bold
        height 50px
        line-height 50px
        margin-bottom 10px
    .fees-box
      padding-top 30px
      .fees-content
        display flex
        height 44px
        align-items center
        font-size 16px
        color #1a1a1a
        .fees
          margin-right 102px
        .revise
          margin-left 290px
          color #ffba14
          cursor pointer
          outline none
          user-select none
    .withdraw-rate
      padding-top 30px
      .rate-box
        display flex
        height 44px
        align-items center
        font-size 16px
        color #1a1a1a
        .rate
          margin-right 72px
        input
          border 1px solid #c4c6cc
          border-radius 4px
          padding 0 20px
          height 40px
          width 280px
          margin-right 20px
        .save-btn
          width 60px
          height 34px
          background-color #ffba14
          border-radius 4px
          margin-right 20px
          color #fff
          text-align center
          line-height 34px
          cursor pointer
          outline none
          user-select none
        .cancel-btn
          color #e93a3a
          cursor pointer
          outline none
          user-select none
    .support-box
      padding-top 60px
      .support-type
        display flex
        justify-content space-between
        font-size 16px
        color #1a1a1a
        .account-info
          cursor pointer
          outline none
          user-select none
          height 34px
          width 140px
          border 1px solid #ffba14
          border-radius 4px
          color #ffba14
          text-align center
          line-height 34px
        .support-set
          font-size 20px
          color #1a1a1a
          font-weight bold
    .personal-info
      padding-top 60px
    .personal-box
      font-size 16px
      color #1a1a1a
      padding-top 60px
      .personal-content
        display flex
        height 44px
        line-height 44px
        .name
          margin-right 138px
    .contact-info
      margin-top 60px
      margin-bottom 20px
    .add-contact
      margin-top 30px
      width 580px
      height 50px
      border 1px solid #ffba14
      border-radius 4px
      color #ffba14
      font-size 16px
      text-align center
      line-height 50px
      cursor pointer
      outline none
      user-select none
  .shareTable
    width 100%
    display: block;
    margin-top 20px
    thead
      display: block;
      tr
        display flex
        align-items center
        height 44px
        width 100%
        font-size 16px
        color #666
        background-color #fff
        td
          height 100%
          line-height 44px
          text-align center
          border 1px solid #e7e8ec
          &.type
            width 140px
          &.contact
            width 300px
          &.operation
            width 140px
    tbody
      width 100%
      display block
      tr
        display flex
        align-items center
        height 44px
        width 100%
        font-size 16px
        color #1a1a1a
        &:nth-child(odd)
          background-color #fcfcfc
        &:nth-child(even)
          background-color #fff
        td
          height 100%
          line-height 44px
          text-align center
          border 1px solid #e7e8ec
          &.type
            width 140px
            position relative
            z-index 20
            .transfer-input
              display block
              width 80%
              height 44px
              line-height 44px
              text-align center
              font-size 16px
              color #1a1a1a
              outline none
              box-sizing border-box
              transition: border-color .15s ease-in-out
            input::-webkit-input-placeholder{
              color:#1a1a1a
             }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
              color:#1a1a1a
            }
            input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
              color:#1a1a1a
            }
            input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
              color:#1a1a1a
            }
            .discount-btn
              right 30px
              height 100%
              position absolute
              font-size 0
              top 2px
              display flex
              align-items center
              justify-content center
              cursor pointer
              user-select none
              .arrowDown
                background url("../../assets/images/share/down_black.png") no-repeat
                display inline-block
                width 11px
                height 6px
                background-size cover!important
                transition .2s
                &.arrowActive
                  transform rotate(180deg)
            .selectMenu
              width 140px
              height 0
              position absolute
              top 42px
              left 0
              background-color #fff
              transition all 0.3s linear
              z-index 20
              overflow hidden
              &.selectMenuActive
                height 308px
              li
                font-size 16px
                border 1px solid #e7e8ec
                height 44px
                line-height 44px
                color #999
                user-select none
                cursor pointer
                &:hover
                  color #1a1a1a
                  background-color #fcfcfc
          &.contact
            width 300px
            .contact-input
              width 100%
              height 100%
              border-radius 0
              border 0
              padding 0 10px 0 40px
              text-align center
              line-height 44px
          &.operation
            color #e93a3a
            cursor pointer
            outline none
            user-select none
            width 140px
      .errinMsg
        color #e93a3a
        font-size 14px
        margin-top 10px
</style>
