<template>
  <div class="goodsParticular">
    <div class="goodsParticular-box">
      <div class="goodsParticular-content">
        <div class="goodsParticular-title">
          <h6><router-link to="/home" class="property">代理商竞拍 >  </router-link> <span> 商品详情111</span></h6>
        </div>
        <div class="goods-box">
          <div class="goods-lt">
            <div class="goods-picture">
              <ul class="big-picture">
                <li>
                  <img :src="imgUrl" alt="">
                  <!--<div class="picture-title">{{item.text}}</div>-->
                </li>
              </ul>
            </div>
            <ul class="small-picture">
              <li v-for="(item,index) in imgArr" :key="index" @click="toGoodsPicture(item,index)" :class="{activeImg: isActiveImg === index}">
                <img :src="item" alt="">
              </li>
            </ul>
          </div>
          <div class="goods-rt">
            <p>{{productName}}</p>
            <div class="kucun-box">
              <div class="kucun"><span>库存: </span><i>{{saleNum}} </i></div>
              <div class="shop-name"><span>店铺名称: </span><i>{{merchantName}}</i></div>
            </div>
            <!--确认出价-->
            <div class="time-content" v-if="status === 2">
              <div class="time-box">
                <div class="time-icon"><div class="icon"></div></div>
                <div class="time-title">距离结束</div>
                <div class="countDown-box">
                  <span class="hour">{{hour}}</span>
                  <span class="colon">:</span>
                  <span class="min">{{min}}</span>
                  <span class="colon">:</span>
                  <span class="seconds">{{sec}}</span>
                </div>
              </div>
              <div class="price-box">
                <div class="now-price"><span>当前价 </span><i>{{nowBidPrice}} π</i></div>
                <div class="price-name"><span>出价人: </span><i>{{productUserName}}</i></div>
              </div>
              <div class="line"></div>
              <div class="begin-price">
                <span>初始价</span><i>{{mineSalePrice}} π</i>
              </div>
              <div class="calculate-box">
                <div class="calculate">
                  <div class="minus" @click="btnMinus"><div class="minus-icon"></div></div>
                  <div class="money-input usernone">
                    <input type="text" v-model.trim="inputPrice" @input="checkInputPrice()" @focus="focusInput()">
                    <p class="pai">π</p>
                  </div>
                  <div class="add" @click="btnAdd"><div class="add-icon"></div></div>
                </div>
                <div class="add-price" v-show="addPriceType === 1">加价增幅: <span>{{addPriceRate}}%</span><i v-show="addPriceMode === 1">（{{mineSalePrice}} π）</i><i v-show="addPriceMode === 2">（{{nowBidPrice}} π）</i></div>
                <div class="add-price" v-show="addPriceType === 2">加价增幅: <span>{{addPriceRate}} π</span></div>
              </div>
              <div class="account-money"><span>账户余额: </span><i>{{account.piBalance}} π</i></div>
              <div class="btn-box">
                <div class="btn-confirm" @click="btnConfirm()">确认出价</div>
                <p>出价后将会冻结对应金额,其他用户出价后会解冻或抢购成功后扣除</p>
              </div>
              <p class="errTip">{{errTipShow}}</p>
            </div>
            <!--开拍时间-->
            <div class="time-content" v-if="status === 6">
              <p><span>起拍价</span><i>{{nowBidPrice}} π</i></p>
              <div class="btn-begin"><span>开拍时间</span><i>{{$changeDate(startSaleDate, '.')}}</i></div>
            </div>
            <!--竞拍结束-->
            <div class="time-content" v-if="status === 4 || status === 5">
              <p><span>成交价</span><i>{{nowBidPrice}} π</i><span>代理商:</span><span>{{productUserName}}</span></p>
              <div class="btn-begin"><span>竞拍结束</span></div>
            </div>
          </div>
        </div>
        <div class="goods-content">
          <ul class="order-tab">
            <li :class="{tabActive: orderTab === 1}" @click="toChoose(1)">商品详情</li>
            <li :class="{tabActive: orderTab === 2}" @click="toChoose(2)">竞拍记录</li>
          </ul>
        </div>
        <div class="goods-ct" v-if="orderTab === 1">
          <div class="introduce-box">
            <p><span>商品介绍:</span>{{productContent}}</p>
          </div>
          <div class="line"></div>
          <div class="introduce-pt">
            <ul>
              <li v-for="(item,index) in contentImg" :key="index">
                <img :src="item" alt="">
              </li>
            </ul>
          </div>
        </div>
        <table class="commonTableList" v-if="orderTab === 2" >
          <thead>
          <tr>
            <td class="kong"></td>
            <td class="status">状态</td>
            <td class="auction">竞拍用户</td>
            <td class="price">价格</td>
            <td class="time">时间</td>
            <td class="kong"></td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in ProductOfBidRecordList" :key="index">
            <td class="kong"></td>
            <td class="status">{{recordStatus(item.status)}}</td>
            <td class="auction">{{(item.userAddress)}}</td>
            <td class="price">{{(item.bidPrice)}}π</td>
            <td class="time">{{$changeDate(item.createAt, '.')}}</td>
            <td class="kong"></td>
          </tr>
          </tbody>
          <div class="load-more-box" v-show="ProductOfBidRecordList.length === 0">
            <div class="loading-img">
              <img src="../../assets/images/home/nodata.png" alt="">
            </div>
            <p class="desc">暂无数据</p>
          </div>
        </table>
      </div>
    </div>
    <!--确定弹窗-->
    <div class="myPopup" v-show="payPopupShow">
      <div class="myPopup-box">
        <div class="close" @click="closeIcon"><img src="../../assets/images/home/Shutdown.png" alt=""></div>
        <div class="formDiv">
          <h3 class="title">支付金额</h3>
          <p class="pay-price">{{inputPrice}}π</p>
          <h5 class="trade-password">交易密码</h5>
          <input class="payPassword tradingCenter-input" type="password" v-model.trim="payPassword"  value="" placeholder="请输入交易密码">
          <ul class="verifier-tab">
            <li :class="{activeVerify:!isgogoleDuanxin}" @click="toVerify(1)" v-if="userData.openGoogleCode === 2">谷歌验证</li>
            <li :class="{activeVerify:isgogoleDuanxin}" @click="toVerify(2)" v-if="userData.openMobileCode === 2">短信验证</li>
          </ul>
          <!-- 短信-->
          <div class="shortMsg" v-show="isgogoleDuanxin">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode"  placeholder="请输入短信验证码" type="text" value="">
              <button class="sendMsg" @click="getCode()" ref="sendMsg" :class="{'disable': isDisabled}">{{sendBtnValue}}</button>
            </div>
          </div>
          <!--谷歌-->
          <div class="shortMsg" v-show="!isgogoleDuanxin">
            <div class="payMsg-box">
              <input class="payMsg tradingCenter-input" v-model.trim="payCode"   placeholder="请输入谷歌验证码" type="text" value="">
            </div>
          </div>
          <div class="errmsg-tips">{{payFailTip}}</div>
          <button class="tradingCenter-btn pay-btn" @click="confirmPay()">确认支付</button>
        </div>
      </div>
    </div>
    <!--完成弹窗-->
    <div class="myPopup" v-show="confirmShow">
      <div class="myPopup-box">
        <a class="close" @click="closeIcon"><img src="../../assets/images/home/Shutdown.png" alt=""></a>
        <!--支付成功弹窗-->
        <div v-show="isSuccess">
          <h3 class="title">支付成功</h3>
          <button class="tradingCenter-btn" @click="successPay">好的</button>
        </div>
        <!--支付失败弹窗-->
        <div v-show="!isSuccess" class="isFailed">
          <span class="title">支付失败:</span>
          <span class="failed-errinMsg">{{errinMsgText}}</span>
          <button class="tradingCenter-btn" @click="failedDialog">好的</button>
        </div>
      </div>
    </div>
    <!-- 未设置验证码-->
    <div class="myPopup" v-if="setSafeVerific">
      <div class="myPopup-box" >
        <div class="close" @click="setSafeVerific = false"><img src="../../assets/images/home/Shutdown.png" alt=""></div>
        <p class="error-text">您还未设置安全验证，暂时无法交易</p>
        <div class="tradingCenter-btn" @click="setSafeVerific = false">确定</div>
      </div>
    </div>
    <!--请先绑定手机号码-->
    <div class="myPopup" v-show="noBindPhoneShow">
      <div class="myPopup-box">
        <div class="close" @click="oBindPhoneShow = false"><img src="../../assets/images/home/Shutdown.png" alt=""></div>
        <h3 class="error-text">请先绑定好手机号码</h3>
        <button class="tradingCenter-btn" @click="noBindPhoneShow = false">确定</button>
      </div>
    </div>
    <!--申请共享者-->
    <div class="myPopup" v-show="sharerShow">
      <div class="myPopup-box">
        <div class="close" @click="sharerShow = false"><img src="../../assets/images/home/Shutdown.png" alt=""></div>
        <h3 class="tip-title">仅共享者能参与代理商竞拍,请您先申请共享者</h3>
        <ul class="toShare">
          <li class="tradingCenter-btn" @click="sharerShow = false">取消</li>
          <li class="tradingCenter-btn" @click="$router.push('/becomeSharer')">去申请</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: this.$route.query.id,
      productName: '', // 商品名称
      saleNum: '', // 库存
      merchantName: '', // 商家店名
      nowBidPrice: '', // 当前价
      productUserName: '', // 出价人
      mineSalePrice: '', // 初始价
      imgArr: [], // 小的预览图
      productContent: '', // 产品介绍
      startSaleDate: '', // 开拍时间
      hour: '',
      min: '',
      sec: '',
      addPriceType: '', // 加价方式
      addPriceRate: '', // 加价幅度
      addPriceMode: '', // 百分比加价计算方式
      status: '', // 2.开拍时间 4、5.竞拍结束 6.竞价中
      ProductOfBidRecordList: [], // 记录列表
      pageSize: 10,
      isActiveImg: 0,
      orderTab: 1,
      isLoadMore: true,
      inputPrice: '', // 出价金额
      errTipShow: '', // 错误提示
      payPopupShow: false, // 确定弹窗
      isgogoleDuanxin: false, // 判断短信还是谷歌 默认谷歌
      confirmShow: false, // 完成弹窗
      setSafeVerific: false, // 未设置安全验证弹窗
      isSuccess: true,
      payFailTip: '', // 确认支付提示
      errinMsgText: '', // 支付失败提示
      noBindPhoneShow: false, // 未绑定手机弹窗
      sharerShow: false, // 申请共享着弹窗
      payPassword: '', // 安全码
      payCode: '', // 验证码
      codeType: '', // 验证码类型（谷歌验证码。手机验证码）
      sendBtnValue: '获取验证码',
      sendBtnTimes: 60,
      timer: null,
      timer2: null,
      isDisabled: false,
      maxInput: 0,
      activeVerifier: true,
      imgUrl: '', // 预览图
      contentImg: '' // 介绍图
    }
  },
  computed: {
    ...mapGetters([
      'account',
      'userData'
    ])
  },
  created () {
    this.getProductDetail()
    this.getProductOfBidRecordList(1)
  },
  methods: {
    // 1.4 竞价产品详情
    getProductDetail () {
      let url = `${this.$api2}infinite/infiniteProductDetail?productId=${this.id}`
      this.$http.post(url).then(res => {
        if (res.data.status) {
          this.productName = res.data.data.productName
          this.saleNum = res.data.data.saleNum
          this.merchantName = res.data.data.merchantName
          this.nowBidPrice = res.data.data.nowBidPrice
          this.mineSalePrice = res.data.data.mineSalePrice
          this.inputPrice = this.nowBidPrice
          this.addPriceType = res.data.data.addPriceType
          this.addPriceRate = res.data.data.addPriceRate
          this.addPriceMode = res.data.data.addPriceMode
          this.imgUrl = res.data.data.coverImg.split(',')[0]
          this.imgArr = res.data.data.coverImg.split(',')
          let contentIMG = res.data.data.contentImg
          if (contentIMG) {
            this.contentImg = res.data.data.contentImg.split(',')
          }
          this.status = res.data.data.status
          this.productContent = res.data.data.productContent
          this.startSaleDate = res.data.data.startSaleDate
          if (res.data.data.productUserName) {
            this.productUserName = res.data.data.productUserName
          }
          let bidLastTime = res.data.data.bidLastTime
          this.timer2 = setInterval(() => {
            if (!bidLastTime) {
              this.hour = '00'
              this.min = '00'
              this.sec = '00'
              clearInterval(this.timer2)
            } else {
              this.hour = parseInt(Number(bidLastTime) / 60 / 60 % 24)
              if (Number(this.hour) === 0) {
                this.hour = '00'
              } else if (Number(this.hour) < 10) {
                this.hour = '0' + this.hour
              } else {
                this.hour = this.hour
              }
              this.min = parseInt(Number(bidLastTime) / 60 % 60)
              if (Number(this.min) === 0) {
                this.min = '00'
              } else if (Number(this.min) < 10) {
                this.min = '0' + this.min
              } else {
                this.min = this.min
              }
              this.sec = parseInt(Number(bidLastTime) % 60)
              if (Number(this.sec) === 0) {
                this.sec = '00'
              } else if (Number(this.sec) < 10) {
                this.sec = '0' + this.sec
              } else {
                this.sec = this.sec
              }
            }
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 竞拍记录列表
    getProductOfBidRecordList (page) {
      let url = `${this.$api2}infinite/queryProductOfBidRecordList?productId=${this.id}&pageIndex=${page}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.status) {
          this.ProductOfBidRecordList = res.data.data.infiniteBidList
        }
      })
    },
    toGoodsPicture (item, index) {
      this.imgUrl = item
      this.isActiveImg = index
    },
    toChoose (num) {
      if (num === 1) {
        this.orderTab = 1
        this.getProductDetail()
      } else if (num === 2) {
        this.orderTab = 2
        this.getProductOfBidRecordList(1)
      }
    },
    // 记录状态
    recordStatus (status) {
      if (status === 1 || status === 3) {
        return '领先'
      } else if (status === 2) {
        return '出局'
      } else if (status === 4) {
        return '处理中'
      }
    },
    // 减
    btnMinus () {
      if (this.inputPrice > 0) {
        if (this.addPriceType === 1) {
          if (this.addPriceMode === 1) {
            this.inputPrice = (Number(this.inputPrice) - Number(this.mineSalePrice) * (Number(this.addPriceRate) / 100))
          } else {
            this.inputPrice = (Number(this.inputPrice) - Number(this.nowBidPrice) * (Number(this.addPriceRate) / 100))
          }
        } else {
          this.inputPrice = (Number(this.inputPrice) - (Number(this.addPriceRate)))
        }
      } else {
        this.inputPrice = 0
      }
    },
    // 加
    btnAdd () {
      if (this.inputPrice >= 0) {
        if (this.addPriceType === 1) {
          if (this.addPriceMode === 1) {
            this.inputPrice = (Number(this.inputPrice) + Number(this.mineSalePrice) * (Number(this.addPriceRate) / 100))
          } else {
            this.inputPrice = (Number(this.inputPrice) + Number(this.nowBidPrice) * (Number(this.addPriceRate) / 100))
          }
        } else {
          this.inputPrice = (Number(this.inputPrice) + (Number(this.addPriceRate)))
        }
      } else {
        this.inputPrice = 0
      }
    },
    checkInputPrice () {
      if (!/^[0-9]+\.?[0-9]{0,4}$/.test(this.inputPrice)) {
        this.inputPrice = ''
      } else if (this.inputPrice <= 0) {
        this.inputPrice = ''
      }
    },
    focusInput () {
    },
    // 确认出价按钮
    btnConfirm () {
      this.errTipShow = ''
      if (this.inputPrice < this.nowBidPrice) {
        this.errTipShow = '出价金额不可低于当前价'
        return false
      } else if (this.inputPrice > this.account.piBalance) {
        this.errTipShow = '出价金额大于账户余额'
        return false
      }
      this.payPassword = ''
      this.payCode = ''
      if (this.inputPrice !== '') {
        if (this.userData.openTradePassword !== 2) {
          this.setSafeVerific = true
        } else {
          this.payPopupShow = true
          // 有谷歌
          if (this.userData.openGoogleCode === 2) {
            this.isgogoleDuanxin = false
            this.codeType = '1'
            // 如果只有短信
          } else if (this.userData.openMobileCode === 2 && this.userData.openGoogleCode !== 2) {
            this.isgogoleDuanxin = true
            this.codeType = '2'
          }
        }
      }
    },
    toVerify (index) {
      this.codeType = index
      if (this.userData.openMobileCode === 2 && this.userData.openGoogleCode === 2) {
        this.isgogoleDuanxin = !this.isgogoleDuanxin
      }
    },
    // 支付确定按钮
    confirmPay () {
      this.errinMsgText = ''
      if (this.payPassword === '') {
        this.payFailTip = '请输入交易密码'
        return false
      } else if (this.payCode === '') {
        this.payFailTip = '请输入验证码'
        return false
      }
      let fmData = new FormData()
      fmData.append('tradePwd', this.payPassword)
      fmData.append('mobileCode', this.payCode)
      fmData.append('codeType', this.codeType)
      this.$http.post(`${this.$api}tx/unlock`, fmData).then(res => {
        if (res.data.success) {
          let formData = new FormData()
          formData.append('productId', this.id)
          formData.append('userBidPrice', this.inputPrice)
          this.$http.post(`${this.$api2}infinite/bidInfiniteProduct`, formData).then(res => {
            if (res.data.success) {
              this.noBindPhoneShow = false
              this.payPopupShow = false
              this.confirmShow = true
              this.isSuccess = true
            } else {
              this.errinMsgText = res.data.msg
              this.noBindPhoneShow = false
              this.payPopupShow = false
              this.confirmShow = true
              this.isSuccess = false
            }
          }).catch(err => {
            console.log(err)
            this.payPopupShow = false
            this.confirmShow = true
            this.isSuccess = false
            this.errinMsgText = '网络错误'
          })
        } else {
          this.payFailTip = res.data.msg
          // this.noBindPhoneShow = false
          // this.payPopupShow = false
          // this.confirmShow = true
          // this.isSuccess = false
        }
      }).catch(err => {
        console.log(err)
        this.payPopupShow = false
        this.confirmShow = true
        this.isSuccess = false
        this.errinMsgText = '网络错误'
      })
    },
    // 发送短信按钮
    getCode () {
      if (this.sendBtnValue === '获取验证码') {
        this.countDown()
        let formData2 = new FormData()
        formData2.append('json', JSON.stringify({'type': 'code'}))
        this.isDisabled = true
        this.$http.post(this.$api + '/user/sendSmsCode', formData2).then(res => {
          if (res.data.success) {
            this.payFailTip = ''
          } else {
            if (res.data.msg) {
              this.payFailTip = res.data.msg
              this.isDisabled = false
              this.sendBtnValue = '获取验证码'
              this.sendBtnTimes = 60
              clearTimeout(this.timer)
            } else {
              this.payFailTip = '网络错误'
              this.sendBtnValue = '获取验证码'
              this.sendBtnTimes = 60
            }
          }
        }).catch(err => {
          console.log(err)
          this.isDisabled = false
          clearTimeout(this.timer)
          this.sendBtnValue = '获取验证码'
          this.sendBtnTimes = 60
          this.payFailTip = '网络错误'
        })
      }
    },
    // 短信倒计时
    countDown () {
      if (this.sendBtnValue === 0) {
        this.sendBtnValue = '获取验证码'
        this.sendBtnTimes = 60
        this.isDisabled = false
        clearTimeout(this.timer)
      } else {
        this.sendBtnTimes--
        this.sendBtnValue = this.sendBtnTimes
        this.isDisabled = true
        this.timer = setTimeout(() => this.countDown(), 1000)
      }
    },
    // 关闭图标
    closeIcon () {
      this.payPopupShow = false
      this.payFailTip = ''
      this.setSafeVerific = false
      this.confirmShow = false
      this.inputPrice = this.nowBidPrice
    },
    // 支付成功按钮
    successPay () {
      this.payPassword = ''
      this.payCode = ''
      this.payFailTip = ''
      this.confirmShow = false
      this.inputPrice = this.nowBidPrice
    },
    // 支付失败按钮
    failedDialog () {
      this.payPassword = ''
      this.payCode = ''
      this.payFailTip = ''
      this.confirmShow = false
      this.inputPrice = this.nowBidPrice
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
