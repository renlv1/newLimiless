<template>
  <div class="page">
    <div class="location">
      <a href="">抢购规则模板</a><span>>> </span>模板详情
    </div>
    <div class="title">抢购规则模板</div>
    <div class="content">
      <div class="section">
        <div class="flex">
          <div class="sub-title">模板设置</div>
          <div class="sub-content from">
            <div class="field">
              <label for="">规则模板</label>
              <div class="input-wrap">
                <el-select v-model="addPriceType"  placeholder="默认模板">
                  <el-option
                    v-for="item in addPriceTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="default-temp">
              <el-checkbox v-model="defaultTemp">创建为新模板</el-checkbox>
            </div>
            <div class="field">
              <label for="">模板名称</label>
              <div class="input-wrap">
                <input class="input" ref="panicSetName" placeholder="请输入模板名称" @focus="checkVal('panicSetName')" @blur="checkInput('panicSetName', $event)" v-model="panicSetName" type="text">
                <span class="error-tips" :class="{active: panicSetNameTips}">{{panicSetNameTips}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="flex">
          <div class="sub-title">抢购规则</div>
          <div class="sub-content from">
            <div class="field">
              <label for="">初始价格</label>
              <div class="input-wrap">
                <input class="input" ref="startPanicPrice" placeholder="请输入初始价格" v-model="startPanicPrice" @focus="checkVal('startPanicPrice')" @blur="checkInput('startPanicPrice', $event)" type="text">
                <span class="error-tips" :class="{active: startPanicPriceTips}">{{startPanicPriceTips}}</span>
              </div>
            </div>
            <div class="field">
              <label for="">加价方式</label>
              <div class="input-wrap">
                <el-select v-model="addPriceType"  placeholder="请选择加价方式">
                  <el-option
                    v-for="item in addPriceTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="error-tips" :class="{active: addPriceTypeTips}">{{addPriceTypeTips}}</span>
              </div>
            </div>
            <!--  根据百分比价格加价  -->
            <div v-if="addPriceType === 1" style="margin: 20px 0;">
              <div class="field">
                <label for="">加价计算方式</label>
                <div class="input-wrap">
                  <el-select v-model="calcPriceType" placeholder="请选择加价计算方式">
                    <el-option
                      v-for="item in calcPriceTypeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span class="error-tips" :class="{active: calcPriceTypeTips}">{{calcPriceTypeTips}}</span>
                </div>
              </div>
              <div class="field">
                <label for="">加价增幅</label>
                <div class="input-wrap">
                  <input class="input" ref="priceRate" placeholder="请输入增幅" v-model="priceRate" @focus="checkVal('priceRate')" @blur="checkInput('priceRate', $event)" type="text">
                  <span class="unit">%</span>
                  <span class="error-tips" :class="{active: priceRateTips}">{{priceRateTips}}</span>
                </div>
              </div>
            </div>
            <!--  根据固定价格加价  -->
            <div class="field" v-if="addPriceType === 2">
              <label for="">加价增幅</label>
              <div class="input-wrap">
                <input class="input" placeholder="请输入增幅" v-model="priceRate" @focus="checkVal('priceRate')" @blur="checkInput('priceRate', $event)" type="text">
                <span class="unit">π</span>
                <span class="error-tips" :class="{active: priceRateTips}">{{priceRateTips}}</span>
              </div>
            </div>
            <div class="field">
              <label for="">有效时间上限(小时)</label>
              <div class="input-wrap">
                <input class="input" ref="topHourTime" placeholder="请输入有效时间上限" v-model="topHourTime" @focus="checkVal('topHourTime')" @blur="checkInput('topHourTime', $event)" type="text">
                <span class="error-tips" :class="{active: topHourTimeTips}">{{topHourTimeTips}}</span>
              </div>
            </div>
            <div class="field">
              <label for="">每次出价增加时间(分钟)</label>
              <div class="input-wrap">
                <input class="input" ref="addTime" placeholder="请输入增加时间" v-model="addTime" @focus="checkVal('addTime')" @blur="checkInput('addTime', $event)" type="text">
                <span class="error-tips" :class="{active: addTimeTips}">{{addTimeTips}}</span>
              </div>
            </div>
            <div class="field">
              <label for="">抢购时间</label>
              <div class="input-wrap">
                <el-date-picker
                  v-model="startDate"
                  type="datetime"
                  :picker-options="pickerOptions"
                  :default-time="defaultTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="checkTime"
                  placeholder="请选择抢购时间">
                </el-date-picker>
                <span class="error-tips" ref="startDate" placeholder="请选择抢购时间" :class="{active: startDateTips}">{{startDateTips}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="flex">
          <div class="sub-title">最高出价奖励</div>
          <div class="sub-content from">
            <div class="field">
              <label for="">奖励比例</label>
              <div class="input-wrap">
                <input class="input" ref="panicMoreRate" placeholder="请输入奖励比例" v-model="panicMoreRate" @focus="checkVal('panicMoreRate')" @blur="checkInput('panicMoreRate', $event)" type="text">
                <span class="unit">%</span>
                <span class="error-tips" :class="{active: panicMoreRateTips}">{{panicMoreRateTips}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="flex">
          <div class="sub-title">代理商奖励</div>
          <div class="sub-content from">
            <div class="field">
              <label for="">奖励比列</label>
              <div class="input-wrap">
                <input class="input" ref="daiLiRate" placeholder="请输入奖励比例" v-model="daiLiRate" @focus="checkVal('daiLiRate')" @blur="checkInput('daiLiRate', $event)" type="text">
                <span class="unit">%</span>
                <span class="error-tips" :class="{active: daiLiRateTips}">{{daiLiRateTips}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="flex">
          <div class="sub-title">树形奖励</div>
          <div class="sub-content table">
            <div class="fr">总计：<span>{{totalTreeReward}}%</span></div>
            <table>
              <thead>
                <tr>
                  <td width="40%">奖励代数（向上第N代）</td>
                  <td width="40%">奖励比例（%）</td>
                  <td width="20%">操作</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in treeArray"
                  :key="index"
                >
                  <template v-if="item.state">
                    <td>{{item.algebra}}</td>
                    <td>{{item.scale}}%</td>
                    <td>
                      <a href="javascript:;" class="red-color" @click="execItem({type: 'delete', index: index, arr: 'treeArray'})">删除</a>
                    </td>
                  </template>
                  <template v-else>
                    <td>
                      <div class="table-select">
                        <el-select v-model="item.algebra"  placeholder="请选择">
                          <el-option
                            v-for="item in 10"
                            :key="item"
                            v-if="checkOption(item)"
                            :value="item">
                          </el-option>
                        </el-select>
                      </div>
                    </td>
                    <td>
                      <input type="text" v-model="item.scale" class="table-input" placeholder="输入奖励比例">
                    </td>
                    <td>
                      <a href="javascript:;" class="blue-color" @click="execItem({type: 'save', index: index, arr: 'treeArray'})">保存</a>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
            <a href="javascript:;" v-show="treeArray.length < 10" class="add" @click="addItem('treeArray')">+ 新增代数</a>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="flex">
          <div class="sub-title">队列奖励</div>
          <div class="sub-content table">
            <div class="fr">总计：<span>{{totalQueueReward}}%</span></div>
            <table>
              <thead>
                <tr>
                  <td width="40%">队列位置</td>
                  <td width="40%">奖励比例（%）</td>
                  <td width="20%">操作</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in queueArray"
                  :key="index"
                >
                  <template v-if="item.state">
                    <td>向前第{{index + 1}}位</td>
                    <td>{{item.scale}}%</td>
                    <td>
                      <a href="javascript:;" class="red-color" @click="execItem({type: 'delete', index: index, arr: 'queueArray'})">删除</a>
                    </td>
                  </template>
                  <template v-else>
                    <td>向前第{{index + 1}}位</td>
                    <td>
                      <input type="text" v-model="item.scale" class="table-input" placeholder="输入奖励比例">
                    </td>
                    <td>
                      <a href="javascript:;" class="blue-color" @click="execItem({type: 'save', index: index, arr: 'queueArray'})">保存</a>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
            <a href="javascript:;" class="add" v-show="queueArray.length < 10" @click="addItem('queueArray')">+ 新增位置</a>
            <p class="gray-tips">各个队列位置的奖励比例必须大于0</p>
            <div class="tips">最高出价奖励、树形奖励、代理商奖励、队列奖励的总和必须等于100%才能保存</div>
            <div class="btn-wrap">
              <button class="cancle">取消</button>
              <button class="btn" @click="submit">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dialog from '@/components/dialog/dialog'
export default {
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7 // 禁选当前以前的日期
        }
      },
      panicSetName: '', // 规则名称
      startPanicPrice: '', // 初始价格
      priceRate: '', // 加价涨幅比例或固定价格
      addTime: '', // 抢购增加时间
      topHourTime: '', // 增加时间上限
      startDate: '', // 抢购开始时间
      defaultTemp: false, // 是否设置为默认模板
      panicMoreRate: '', // 最高出价奖励
      daiLiRate: '', // 代理商奖励比例
      addPriceType: 1, // 加价方式
      addPriceTypeOption: [{ // 加价方式选项
        label: '百分比',
        value: 1
      }, {
        label: '固定金额',
        value: 2
      }],
      calcPriceType: 1, // 加价计算方式
      calcPriceTypeOption: [{ // 加价计算选项
        label: '根据初始价格',
        value: 1
      }, {
        label: '根据最新价格',
        value: 2
      }],
      treeArray: [], // 树形奖励
      queueArray: [], // 队列奖励
      // 表单验证提示
      panicSetNameTips: '',
      startPanicPriceTips: '',
      priceRateTips: '',
      addTimeTips: '',
      topHourTimeTips: '',
      addPriceTips: '',
      panicMoreRateTips: '',
      daiLiRateTips: '',
      calcPriceTypeTips: '',
      addPriceTypeTips: '',
      startDateTips: ''
    }
  },
  computed: {
    defaultTime () {
      let d = new Date()
      let time = ''
      time = `${d.getHours()}:${d.getMinutes() + 30}:00`
      return time
    },
    totalTreeReward () {
      return this.calcReward(this.treeArray)
    },
    totalQueueReward () {
      return this.calcReward(this.queueArray)
    }
  },
  mounted () {
    // console.log(this.$data)
  },
  methods: {
    checkTime () {
      if (new Date(this.startDate).getTime() < Date.now()) {
        this.startDateTips = '抢购时间不能小于当前时间'
      } else {
        this.startDateTips = ''
      }
    },
    // 增加一条item
    addItem (arr) {
      // 如果数组不为空，并且最后一条的state为false的话，说明未保存
      let len = this[arr].length
      if (len && !this[arr][len - 1].state) {
        Dialog({
          title: '提示',
          content: '请先保存正在编辑的代数'
        })
      } else {
        let item = {
          scale: '', // 比列
          state: false // 状态
        }
        // 如果是树形奖励增加algebra字段
        if (arr === 'treeArray') {
          item.algebra = '' // 代数
        }
        this[arr].push(item)
      }
    },
    // 保存或删除item
    execItem ({type, index, arr}) {
      if (type === 'save') {
        // 保存记录
        let currentItem = this[arr][index]
        let scaleVal = currentItem.scale
        let algebraFlag = false
        // 如果是树形奖励需要检测algebra字段
        if (currentItem.hasOwnProperty('algebra')) {
          if (!currentItem.algebra) {
            Dialog({
              title: '提示',
              content: '请选择代数'
            })
            return
          }
          algebraFlag = true
        }
        if (!scaleVal) {
          Dialog({
            type: 'confirm',
            title: '提示',
            content: '请选择比例',
            okFn: () => {
              alert(1)
            }
          })
        } else {
          let item = {
            scale: scaleVal,
            state: true
          }
          if (algebraFlag) {
            item.algebra = currentItem.algebra
          }
          // 修改数组对应index的记录
          this[arr].splice(index, 1, item)
        }
      } else {
        // 删除数组对应index的记录
        this[arr].splice(index, 1)
      }
    },
    checkInput (field, e) {
      let val = this[field]
      if (val === '') {
        this[field + 'Tips'] = e.target.getAttribute('placeholder')
        return
      }
      if (field === 'startPanicPrice') {
        let reg = /^(?=.{0,10}$)\d+(\.\d{1,2})?$/
        if (!reg.test(val)) {
          this[field + 'Tips'] = '最多两位小数，最多10位数'
        }
      }
      // 加价增幅、所有奖励比例：只能填写两位整数
      if (field === 'priceRate' || field === 'panicMoreRate' || field === 'daiLiRate') {
        let reg = /^\d{1,2}$/
        if (!reg.test(val)) {
          this[field + 'Tips'] = '只能填写两位整数'
        }
      }
      // 有效时间上限：只能填写整数
      if (field === 'topHourTime') {
        let reg = /^([1-9][0-9]*)$/
        if (!reg.test(val)) {
          this[field + 'Tips'] = '只能填写非零开头的整数'
        }
      }
      // 每次出价增加时间：只能填写整数，不能大于有效时间上限
      if (field === 'addTime') {
        let reg = /^([1-9][0-9]*)$/
        if (!reg.test(val) || val > this.topHourTime * 60) {
          this[field + 'Tips'] = '只能填写非零开头的整数，不能大于有效时间上限'
        }
      }
    },
    checkVal (field) {
      this[field + 'Tips'] = ''
    },
    // 检查当前option能否显示
    checkOption (index) {
      // 如果当前option的值已经存在于已保存treeArray数组里algebra(代数)字段，不让其显示
      let result = this.treeArray.some(item => {
        return item.algebra === index
      })
      return !result
    },
    // 计算总奖励
    calcReward (arr) {
      let sum = 0
      arr.forEach(item => {
        sum += parseInt(item.scale) || 0
      })
      return sum
    },
    submit () {
      this.checkAllFidld()
    },
    checkAllFidld () {
      // 需要验证的字段
      let fields = [
        'panicSetName',
        'startPanicPrice',
        'startPanicPriceTips',
        'priceRate',
        'priceRateTips',
        'topHourTime',
        'topHourTimeTips',
        'addTime',
        'addTimeTips',
        'startDate',
        'startDateTips',
        'panicMoreRate',
        'panicMoreRateTips',
        'daiLiRate',
        'daiLiRateTips'
      ]

      fields.every(field => {
        let res = false
        let str = this[field]

        if (field.includes('Tips')) {
          // 验证格式要求
          if (str) {
            let cutField = field.replace('Tips', '')
            let el = this.$refs[cutField]
            this.scroll(this.elOffset(el))
          } else {
            res = true
          }
        } else {
          // 验证是否非空
          if (!str) {
            let el = this.$refs[field]
            this[field + 'Tips'] = el.getAttribute('placeholder')
            this.scroll(this.elOffset(el))
          } else {
            res = true
          }
        }
        return res
      })
    },
    scroll (offset) {
      document.documentElement.scrollTop = offset
    },
    elOffset (el) {
      return el.getBoundingClientRect().top + document.documentElement.scrollTop - 200
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../../../assets/css/limitlessPi';
  .content{
    background: #fff;
  }
  .section{
    line-height: 20px;
    padding: 40px 0;
    & + .section{
      border-top: 1px solid #e7e8ec;
    }
    .flex{
      display: flex;
    }
    .sub-title{
      padding-top: 9px;
      font-size: 20px;
      font-weight: bold;
      padding-left: 10%;
      margin-right: 80px;
      width: 280px;
    }
    .sub-content{
      width: 580px;
    }
    .field{
      .justify;
      & + .field{
        margin-top: 20px;
      }
      position: relative;
      /deep/ .el-input__inner{
        font-size: 16px;
        padding-left: 30px;
      }
    }
    label{
      width: 140px;
      padding-right: 36px;
    }
    .input{
      padding: 10px 30px;
      height: 42px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      width: 440px;
      font-size: 16px;
      transition: border-color .2s;
      &:hover{
        border-color: #c0c4cc;
      }
      &:focus{
        border-color: #409EFF;
      }
    }
    .unit{
      position: absolute;
      top: 0;
      right: 14px;
      line-height: 44px;
    }
    td{
      border: 1px solid #e7e8ec;
      height: 44px;
      text-align: center;
    }
    thead td{
      color: #666;
    }
    .fr{
      text-align: right;
      margin-bottom: 30px;
      span{
        font-size: 20px;
        font-weight: bold;
      }
    }
    .add{
      border: 1px solid @yellow;
      color: @yellow;
      font-size: 16px;
      text-align: center;
      display: block;
      line-height: 48px;
      border-radius: 4px;
      margin-top: 20px;
    }
    .cancle{
      border: 1px solid @yellow;
      color: @yellow;
      font-size: 20px;
      text-align: center;
      line-height: 48px;
      border-radius: 4px;
      width: 200px;
      display: inline-block;
    }
    .gray-tips{
      font-size: 14px;
      color: #999;
      padding-top: 8px;
    }
    .tips{
      background: url('../../../../assets/images/limitlessPai/icon_wran.png') no-repeat left 0;
      padding-left: 30px;
      margin: 30px 0;
    }
    .btn-wrap{
      text-align: center;
      .btn{
        margin-left: 38px;
      }
    }
    .delete{
      color: @red;
    }
  }
  .default-temp{
    margin: 5px 0 20px 142px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 440px;
  }
  .no-data{
    text-align: center;
  }
  .input-wrap{
    position: relative;
    width: 440px;
    /deep/ .el-select {
      width: 100%;
    }
    .error-tips{
      position: absolute;
      top: 40px;
      left: 0;
      color: @red;
      font-size: 14px;
      line-height: 1;
      background: url('../../../../assets/images/limitlessPai/icon_wran.png') no-repeat left center;
      background-size: 12px;
      padding-left: 18px;
      transition: .3s;
      &.active{
        top: 46px;
      }
    }
  }
  .table-input{
    text-align: center;
    line-height: 36px;
    font-size: 16px;
  }
  .table-select{
    // deep: 穿透子组件
    /deep/ .el-input__inner{
      text-align: center;
      border: none;
      text-align: center;
    }
    /deep/ ::-webkit-input-placeholder {
      color: #000;
    }
    /deep/ .el-input__inner{
      font-size: 16px;
    }
    /deep/ .el-input__suffix{
      right: 75px;
    }
    /deep/ .el-select .el-input .el-select__caret {
      color: #333;
    }
  }
</style>
<style>
  .el-checkbox__inner{
    border-color: #666;
    color: #333;
  }
  .el-input__inner{
    color: #000000;
  }
</style>
