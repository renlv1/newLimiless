<template>
  <div class="goodsParticular">
    <div class="goodsParticular-box">
      <div class="goodsParticular-content">
        <div class="goodsParticular-title">
          <h6><router-link :to="{path:'/buyGoods',query: {id:this.$route.query.id}}" class="property">商品抢购 >  </router-link> <span> 抢购详情</span></h6>
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
              <div class="kucun"><span>库存: </span><i>{{saleNum}} π</i></div>
              <div class="shop-name"><span>店铺名称: </span><i>{{merchantName}}</i></div>
            </div>
            <!--确认出价-->
            <div class="time-content" v-if="true">
              <div class="time-box">
                <div class="finishTime-box">
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
                <div class="addTime-box">
                  <div class="add-tip">出价后增加</div>
                  <div class="add-time">
                    <span class="hour">{{addHour}}</span>
                    <span class="colon">:</span>
                    <span class="min">{{addMin}}</span>
                    <span class="colon">:</span>
                    <span class="seconds">{{addSec}}</span>
                  </div>
                </div>
              </div>
              <div class="price-box">
                <div class="now-price"><span>当前价 </span><i>{{nowBidPrice}} π</i></div>
                <div class="price-name"><span>出价人: </span><i>{{nowPanicUserName}}</i></div>
              </div>
              <div class="pools-box">
                <span>奖金池累计: </span><i>{{rewardPool}} π</i>
              </div>
              <div class="line"></div>
              <div class="begin-price">
                <span>初始价</span><i>{{startPanicPrice}} π</i>
              </div>
              <div class="calculate-box">
                <div class="calculate">
                  <div class="minus" @click="btnMinus"><div class="minus-icon"></div></div>
                  <div class="money-input usernone">
                    <input type="text" v-model.trim="inputPrice" @input="checkInputPrice()">
                    <p class="pai">π</p>
                  </div>
                  <div class="add" @click="btnAdd"><div class="add-icon"></div></div>
                </div>
                <div class="add-price" v-show="ruleAddPriceType === 1">加价增幅: <span>{{rulePriceRate}}%</span><i v-show="ruleAddPriceMode === 1">（{{startPanicPrice}} π）</i><i v-show="ruleAddPriceMode === 2">（{{nowBidPrice}} π）</i></div>
                <div class="add-price" v-show="ruleAddPriceType === 2">加价增幅: <span>{{rulePriceRate}} π</span></div>
              </div>
              <div class="account-money"><span>账户余额: </span><i>{{account.piBalance}} π</i></div>
              <ul class="btn-box">
                <li class="btn-confirm" @click="btnConfirm()">确认抢购</li>
                <li class="btn-invite btn-confirm" @click="showQrPopup()">邀请链接</li>
              </ul>
              <p class="errTip">{{errTipShow}}</p>
            </div>
          </div>
        </div>
        <div class="goods-content">
          <ul class="order-tab">
            <li :class="{tabActive: orderTab === 1}" @click="toChoose(1)">抢购详情</li>
            <li :class="{tabActive: orderTab === 2}" @click="toChoose(2)">抢购记录</li>
            <li :class="{tabActive: orderTab === 3}" @click="toChoose(3)">奖励发放记录</li>
          </ul>
        </div>
        <div class="goods-ct" v-if="orderTab === 1">
          <ul class="buy-box">
            <li class="li-first">
              <h3>抢购规则</h3>
              <ul class="rule-box">
                <li class="price">
                  <h5>初始价格</h5>
                  <span>1π</span>
                </li>
                <li v-show="ruleAddPriceType ===1">
                  <h5>加价增幅</h5>
                  <span>{{rulePriceRate}} %</span>
                </li>
                <li v-show="ruleAddPriceType ===1">
                  <h5 class="add-method">加价计算方式</h5>
                  <span v-show="ruleAddPriceMode === 1">{{startPanicPrice}} π</span>
                  <span v-show="ruleAddPriceMode === 2">{{nowBidPrice}} π</span>
                </li>
                <li v-show="ruleAddPriceType ===2">
                  <h5>加价增幅</h5>
                  <span>{{rulePriceRate}} π</span>
                </li>
                <li>
                  <div class="add-hour">
                    <h5 class="add-price">有效时间上限</h5>
                    <p>(小时)</p>
                  </div>
                  <span>{{topHourTime}}</span>
                </li>
                <li>
                  <div class="add-minute">
                    <h5 class="add-price">每次出价增加</h5>
                    <p>时间(分钟)</p>
                  </div>
                  <span>{{ruleAddTime}}</span>
                </li>
                <li>
                  <h5>抢购时间</h5>
                  <span>{{$changeDate(startDate, '-')}}</span>
                </li>
              </ul>
            </li>
            <li class="award">
              <h3 class="tall-award">最高出价奖励</h3>
              <p class="reward-ratio">奖励比例：</p>
              <span>{{panicMoreRate}}%</span>
            </li>
            <li class="award">
              <h3 class="agent-award">代理商奖励</h3>
              <p class="reward-ratio">奖励比例：</p>
              <span>{{daiLiRate}}%</span>
            </li>
            <li class="award tree">
              <div class="tree-award">
                <h3>树形奖励</h3>
                <p><span>总计 ：</span><i> 20%</i></p>
              </div>
              <table class="TableList">
                <thead>
                <tr>
                  <td>奖励代数</td>
                  <td>奖励比例 (%)</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in parentJson" :key="index">
                  <td>向上第{{item.index}}代</td>
                  <td>{{item.rate}}%</td>
                </tr>
                </tbody>
              </table>
            </li>
            <li class="award duilie-award">
              <div class="tree-award">
                <h3>队列奖励</h3>
                <p><span>总计 ：</span><i> 80%</i></p>
              </div>
              <table class="TableList">
                <thead>
                <tr>
                  <td>队列位置</td>
                  <td>奖励比例 (%)</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in roundJson" :key="index">
                  <td>向前第{{item.index}}位</td>
                  <td>{{item.rate}}%</td>
                </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
        <table class="commonTableList" v-if="orderTab === 2" >
          <thead>
          <tr>
            <td class="duilie">队列位置</td>
            <td class="status">状态</td>
            <td class="auction">抢购金额</td>
            <td class="price">用户昵称</td>
            <td class="time">抢购时间</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="duilie">4</td>
            <td class="status">领先</td>
            <td class="auction">1000π</td>
            <td class="price">库里</td>
            <td class="time">2018.12.12 11:35:35</td>
          </tr>
          <tr>
            <td class="duilie">3</td>
            <td class="status">出局</td>
            <td class="auction">1000π</td>
            <td class="price">欧文</td>
            <td class="time">2018.12.12 11:35:35</td>
          </tr>
          </tbody>
          <div class="load-more-box" v-show="isLoadMore">
            <div class="loading-img">
              <img src="../../assets/images/home/nodata.png" alt="">
            </div>
            <p class="desc">暂无数据</p>
          </div>
        </table>
        <div class="reward-record" v-if="orderTab === 3">
          <ul>
            <li @click="toChange(1)">
              <div class="agent" :class="{changeActive: changeTab === 1}">
                代理商奖励<span>（12π）</span>
              </div>
            </li>
            <li @click="toChange(2)">
              <div class="agent" :class="{changeActive: changeTab === 2}">
                树形奖励<span>（12π）</span>
              </div>
            </li>
            <li @click="toChange(3)">
              <div class="agent" :class="{changeActive: changeTab === 3}">
                队列奖励<span>（12π）</span>
              </div>
            </li>
            <li>
              <div class="agent tall-agent" :class="{changeActive: changeTab === 4}">
                最高出价奖励<span>（12π）</span>
              </div>
            </li>
            <li></li>
          </ul>
          <table class="commonTableList" v-if="changeTab === 1" >
            <thead>
            <tr>
              <td class="duilie">奖励编号</td>
              <td class="status">奖励金额</td>
              <td class="auction">抢购用户</td>
              <td class="price">抢购金额</td>
              <td class="time">发放时间</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="duilie">4225</td>
              <td class="status">12π</td>
              <td class="auction">用户昵称</td>
              <td class="price">1200π</td>
              <td class="time">2018.12.12 11:35:35</td>
            </tr>
            <tr>
              <td class="duilie">4225</td>
              <td class="status">12π</td>
              <td class="auction">用户昵称</td>
              <td class="price">1200π</td>
              <td class="time">2018.12.12 11:35:35</td>
            </tr>
            </tbody>
            <div class="load-more-box" v-show="isLoadMore">
              <div class="loading-img">
                <img src="../../assets/images/home/nodata.png" alt="">
              </div>
              <p class="desc">暂无数据</p>
            </div>
          </table>
          <table class="commonTableList" v-if="changeTab === 2" >
            <thead>
            <tr>
              <td class="duilie">奖励编号</td>
              <td class="status">奖励金额</td>
              <td class="status">奖励用户</td>
              <td class="auction">抢购用户</td>
              <td class="price">抢购金额</td>
              <td class="time">发放时间</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="duilie">4225</td>
              <td class="status">12π</td>
              <td class="status">用户昵称</td>
              <td class="auction">用户昵称</td>
              <td class="price">1200π</td>
              <td class="time">2018.12.12 11:35:35</td>
            </tr>
            <tr>
              <td class="duilie">4225</td>
              <td class="status">12π</td>
              <td class="status">用户昵称</td>
              <td class="auction">用户昵称</td>
              <td class="price">1200π</td>
              <td class="time">2018.12.12 11:35:35</td>
            </tr>
            </tbody>
            <div class="load-more-box" v-show="isLoadMore">
              <div class="loading-img">
                <img src="../../assets/images/home/nodata.png" alt="">
              </div>
              <p class="desc">暂无数据</p>
            </div>
          </table>
          <table class="commonTableList" v-if="changeTab === 3" >
            <thead>
            <tr>
              <td class="duilie">奖励编号</td>
              <td class="status">奖励金额</td>
              <td class="status">奖励用户</td>
              <td class="status">奖励位置</td>
              <td class="auction">抢购用户</td>
              <td class="price">抢购金额</td>
              <td class="time">发放时间</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="duilie">4225</td>
              <td class="status">12π</td>
              <td class="status">用户昵称</td>
              <td class="status">4</td>
              <td class="auction">用户昵称</td>
              <td class="price">1200π</td>
              <td class="time">2018.12.12 11:35:35</td>
            </tr>
            <tr>
              <td class="duilie">4225</td>
              <td class="status">12π</td>
              <td class="status">用户昵称</td>
              <td class="status">4</td>
              <td class="auction">用户昵称</td>
              <td class="price">1200π</td>
              <td class="time">2018.12.12 11:35:35</td>
            </tr>
            </tbody>
            <div class="load-more-box" v-show="isLoadMore">
              <div class="loading-img">
                <img src="../../assets/images/home/nodata.png" alt="">
              </div>
              <p class="desc">暂无数据</p>
            </div>
          </table>
        </div>
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
          <li class="tradingCenter-btn" @click="sharerShow = false">去申请</li>
        </ul>
      </div>
    </div>
    <!--邀请链接弹窗-->
    <div class="myInvitePopup" v-show="qrPopupShow">
      <div class="myPopup-box">
        <a class="close" @click="closeInvite()"><img src="../../assets/images/home/Shutdown.png" alt=""></a>
        <div class="myPopup-tip">
          <div class="img-box"><img :src="imgUrl" alt=""></div>
          <p class="qrCode-p">{{productName}}</p>
        </div>
        <!--<div id="qrcodeBox"></div>-->
        <p class="link" id="userLink">{{inviteLink}}</p>
        <button class="secret-btn" ref="addressCopy" @click="closeQrPopup()" data-clipboard-action="copy" data-clipboard-target="#userLink">复制链接</button>
        <p class="share-text">分享链接，邀请好友加入该商品抢购</p>
      </div>
    </div>
    <div class="myInvitePopup" v-show="purchaseShow">
      <div class="myPopup-box">
        <p class="share-text" style="margin-bottom: 20px">加入抢购失败</p>
        <button class="secret-btn" @click="$router.push('/home')">确定</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import $ from 'jquery'
// import '../../assets/js/jquery.qrcode.min'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      id: this.$route.query.id,
      purchaseId: this.$route.query.purchaseId,
      imgArr: [], // 小的预览图
      productName: '', // 商品名称
      saleNum: '', // 库存
      merchantName: '', // 商家店名
      nowPanicUserName: '', // 出价人
      mineSalePrice: '', // 初始价
      nowBidPrice: '', // 当前价
      rewardPool: '', // 资金池总金额
      addPriceType: '', // 加价方式
      addPriceRate: '', // 加价幅度
      addPriceMode: '', // 百分比加价计算方式
      hour: '',
      min: '',
      sec: '',
      addHour: '', // 出价增加小时
      addMin: '', // 出价增加分钟
      addSec: '', // 出价增加秒
      isActiveImg: 0,
      orderTab: 1,
      changeTab: 1,
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
      sendBtnValue: '获取验证码',
      codeType: '', // 验证码类型（谷歌验证码。手机验证码）
      sendBtnTimes: 60,
      timer: null,
      timer2: null,
      isDisabled: false,
      maxInput: 0,
      activeVerifier: true,
      qrPopupShow: false, // 二维码弹窗
      imgGoods: '', // 二维码商品图片
      copyBtn: null,
      pageSize: 10,
      shareCode: '', // 二维码
      url2: '', // 二维码地址
      imgUrl: '', // 大的预览图
      purchaseShow: false,
      falg: true,
      sign: 1,
      startPanicPrice: '', // 抢购规则初始价格
      rulePriceRate: '', // 抢购规则加价幅度
      ruleAddPriceMode: '', // 抢购规则百分比加价计算方式
      ruleAddPriceType: '', // 抢购规则加价方式
      topHourTime: '', // 有效时间上限
      ruleAddTime: '', // 抢购增加时间（分钟）
      startDate: '', // 抢购开始时间
      panicMoreRate: '', // 奖励给出资最多的人的比例
      daiLiRate: '', // 代理商奖励比例
      parentJson: [], // 上级(树形)奖励json
      roundJson: [], // 轮循(队列)奖励json
      timer3: null,
      inviteLink: '' // 邀请链接
    }
  },
  mounted () {
    this.copyBtn = new this.Clipboard(this.$refs.addressCopy)
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'account',
      'userData'
    ])
  },
  created () {
    this.getPanicRoundPlayerList(1)
    // this.timer3 = setInterval(() => {
    //   this.getPanicRoundPlayerList(1)
    // }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer3)
  },
  methods: {
    // 4.5 商品轮次抢购记录-抢购详情中
    getPanicRoundPlayerList (page) {
      let url = `${this.$api2}/infinite/panicRoundPlayerList?roundId=${this.purchaseId}&pageIndex=${page}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.status === 'success') {
          let productDetail = res.data.data.infinitePanicRound.infiniteSaleProduct // 产品信息
          this.imgUrl = productDetail.coverImg.split(',')[0]
          this.imgArr = productDetail.coverImg.split(',')
          this.productName = productDetail.productName
          this.merchantName = productDetail.merchantName
          this.saleNum = productDetail.saleNum
          this.nowBidPrice = productDetail.nowBidPrice
          this.inputPrice = this.nowBidPrice
          // this.productUserName = productDetail.productUserName
          this.nowPanicUserName = res.data.data.infinitePanicRound.nowPanicUserName
          this.rewardPool = res.data.data.infinitePanicRound.rewardPool
          this.mineSalePrice = productDetail.mineSalePrice
          this.addPriceType = productDetail.addPriceType
          this.addPriceRate = productDetail.addPriceRate
          this.addPriceMode = productDetail.addPriceMode
          this.shareCode = res.data.data.infinitePanicRound.shareCode
          this.makeInfiniteTree()
          this.inviteLink = window.location.host + '/#' + this.$route.path + '?id=' + this.id + '&purchaseId=' + this.purchaseId + '&shareCode=' + this.shareCode
          let addTime = res.data.data.infinitePanicRound.infinitePaniceSet.addTime
          let increaseTime = addTime * 60
          // 出价后时间
          if (!increaseTime) {
            this.addHour = '00'
            this.addMin = '00'
            this.addSec = '00'
          } else {
            this.addHour = parseInt(Number(increaseTime) / 60 / 60 % 24)
            if (Number(this.addHour) === 0) {
              this.addHour = '00'
            } else if (Number(this.hour) < 10) {
              this.addHour = '0' + this.hour
            } else {
              this.addHour = this.addHour
            }
            this.addMin = parseInt(Number(increaseTime) / 60 % 60)
            if (Number(this.addMin) === 0) {
              this.addMin = '00'
            } else if (Number(this.addMin) < 10) {
              this.addMin = '0' + this.addMin
            } else {
              this.addMin = this.addMin
            }
            this.addSec = parseInt(Number(increaseTime) % 60)
            if (Number(this.addSec) === 0) {
              this.addSec = '00'
            } else if (Number(this.addSec) < 10) {
              this.addSec = '0' + this.addSec
            } else {
              this.addSec = this.addSec
            }
          }
          // console.log(increaseTime)
          // 距离结束时间
          let bidLastTime = productDetail.bidLastTime
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
          // 抢购规则信息
          let infinitePaniceSet = res.data.data.infinitePanicRound.infinitePaniceSet
          this.startPanicPrice = infinitePaniceSet.startPanicPrice
          this.rulePriceRate = infinitePaniceSet.priceRate
          this.ruleAddPriceMode = infinitePaniceSet.addPriceMode
          this.ruleAddPriceType = infinitePaniceSet.addPriceType
          this.topHourTime = infinitePaniceSet.topHourTime
          this.ruleAddTime = infinitePaniceSet.addTime
          this.startDate = infinitePaniceSet.startDate
          this.panicMoreRate = infinitePaniceSet.panicMoreRate
          this.daiLiRate = infinitePaniceSet.daiLiRate
          this.parentJson = JSON.parse(infinitePaniceSet.parentJson)
          this.roundJson = JSON.parse(infinitePaniceSet.roundJson)
          // console.log(JSON.parse(treeList))
          // this.parentJson = eval('(' + treeList + ')')
        } else {
          this.shareCode = this.$route.query.shareCode
          this.$router.push({path: '/login', query: {id: this.id, purchaseId: this.purchaseId, shareCode: this.shareCode}})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toGoodsPicture (item, index) {
      this.imgUrl = item
      this.isActiveImg = index
    },
    toChoose (num) {
      if (num === 1) {
        this.orderTab = 1
      } else if (num === 2) {
        this.orderTab = 2
      } else if (num === 3) {
        this.orderTab = 3
      }
    },
    toChange (val) {
      if (val === 1) {
        this.changeTab = 1
      } else if (val === 2) {
        this.changeTab = 2
      } else if (val === 3) {
        this.changeTab = 3
      } else if (val === 4) {
        this.changeTab = 4
      }
    },
    // 减
    btnMinus () {
      if (this.inputPrice > 0) {
        if (this.ruleAddPriceType === 1) {
          if (this.ruleAddPriceMode === 1) {
            this.inputPrice = (Number(this.inputPrice) - Number(this.startPanicPrice) * (Number(this.rulePriceRate) / 100))
          } else {
            this.inputPrice = (Number(this.inputPrice) - Number(this.nowBidPrice) * (Number(this.rulePriceRate) / 100))
          }
        } else {
          this.inputPrice = (Number(this.inputPrice) - (Number(this.rulePriceRate)))
        }
      } else {
        this.inputPrice = 0
      }
    },
    // 加
    btnAdd () {
      if (this.inputPrice >= 0) {
        if (this.ruleAddPriceType === 1) {
          if (this.ruleAddPriceMode === 1) {
            this.inputPrice = (Number(this.inputPrice) + Number(this.startPanicPrice) * (Number(this.rulePriceRate) / 100))
          } else {
            this.inputPrice = (Number(this.inputPrice) + Number(this.nowBidPrice) * (Number(this.rulePriceRate) / 100))
          }
        } else {
          this.inputPrice = (Number(this.inputPrice) + (Number(this.rulePriceRate)))
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
    makeInfiniteTree () {
      let url2 = `${this.$api2}infinite/makeInfiniteTree?recommendCode=${this.shareCode}`
      this.$http.post(url2).then(res => {
        if (res.data.status === 'failed') {
          this.falg = false
          this.sign = 2
          // if (res.data.resultCode === 'NOT_LOGGEDIN') {
          //   this.$router.push({path: '/login', query: {id: this.id, shareCode: this.shareCode}})
          // }
        } else {
          this.shareUserName = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 关闭按钮二维码
    closeInvite () {
      this.qrPopupShow = false
      // $('#qrcodeBox').html('')
    },
    closeQrPopup () { // 关闭二维码
      this.qrPopupShow = false
      // $('#qrcodeBox').html('')
      let clipboard = this.copyBtn
      clipboard.on('success', () => {
        alert('复制成功')
        clipboard.destroy()
        this.copyBtn = new this.Clipboard(this.$refs.addressCopy) // 复制
      })
    },
    showQrPopup () { // 显示二维码
      if (this.falg === true) {
        this.qrPopupShow = true
      } else {
        this.purchaseShow = true
      }
      // if (this.shareCode) {
      //   this.falg = true
      //   if (this.falg === true && this.sign === 1) {
      //     this.qrPopupShow = true
      //   } else {
      //     this.purchaseShow = true
      //   }
      // } else {
      //   this.falg = false
      //   if (this.falg === true) {
      //     this.qrPopupShow = true
      //   } else {
      //     this.purchaseShow = true
      //   }
      // }
      // this.qrPopupShow = true
      // let downloadUrl
      // if (this.url2 !== '') {
      //   // 绘制二维码
      //   downloadUrl = this.$utf16to8(this.url2)
      // }
      // $('#qrcodeBox').qrcode({
      //   render: 'canvas', //     table方式
      //   width: 200, //            宽度
      //   height: 200, //            高度
      //   text: downloadUrl //      任意内容
      // })
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
      } else if (this.inputPrice === '') {
        this.errTipShow = '请输入出价金额'
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
    // 1.7 用户对竞价产品进行出价
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
.goodsParticular
  .goodsParticular-box
    .goodsParticular-content
      .goods-box
        .goods-rt
          .time-content
            .time-box
              justify-content space-between
              .finishTime-box
                display flex
                margin-right 160px
              .addTime-box
                white-space:nowrap;
                display flex
                align-items center
                font-size 16px
                color #fff
                .add-time
                  display flex
                  align-items center
                  margin 5px 20px 0 10px
                  .hour, .min, .seconds
                    display flex
                    justify-content center
                    align-items center
                    height 28px
                    width 28px
                  .colon
                    color #fff
                    font-size 18px
            .pools-box
              margin-left 20px
              margin-top 20px
              span
                font-size 16px
                color #1a1a1a
      .commonTableList
        thead
          tr
            color: #666;
        tbody
          tr
            color: #1a1a1a;
    .goods-ct
      background-color #fcfcfc
      height auto
      .buy-box
        margin-bottom 180px
        li
          height auto
          display flex
          &.li-first
            height 380px
            padding-top 50px
            padding-left 120px
            border-bottom 1px solid #e5e5e5
          &.award
            padding 50px 0 20px 120px
            height 120px
            border-bottom 1px solid #e5e5e5
            &.tree
              height auto
              display block
            &.duilie-award
              height auto
              display block
            .tall-award
              margin-right 160px
            .reward-ratio
              margin-right 134px
            .agent-award
              margin-right 182px
            .tree-award
              display flex
              p
                font-size 16px
                color #1a1a1a
                margin-left 680px
                i
                  font-size 20px
                  font-weight bold
            .TableList
              max-width 580px
              display: block;
              margin-top 20px
              margin-left 280px
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
                    flex 1
                    text-align center
                    border 1px solid #e7e8ec
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
                    flex 1
                    text-align center
                    border 1px solid #e7e8ec
          h3
            font-size 20px
            color #1a1a1a
            font-weight bold
          .rule-box
            padding-left 204px
            li
              display flex
              align-items center
              margin-top 30px
              &.price
                margin-top 0
              h5
                font-size 16px
                color #1a1a1a
                margin-right 142px
                &.add-price
                  margin-right 108px
                &.add-method
                  margin-right 108px
              span
                font-size 16px
                color #1a1a1a
    .reward-record
      margin-top 10px
      ul
        display flex
        background-color #fff
        height 70px
        li
          align-items center
          height 100%
          line-height 70px
          text-align center
          font-size 16px
          color #1a1a1a
          flex 1
          cursor pointer
          outline none
          user-select none
          &:nth-child(4)
            cursor default
          .agent
            width 180px
            margin 0 auto
            &.changeActive
              border-bottom 2px solid #4b84ff
              color #4b84ff
          .tall-agent
            color #999
</style>c
