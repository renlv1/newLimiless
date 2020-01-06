<template>
  <div class="goodsParticular">
    <div class="goodsParticular-box">
      <div class="goodsParticular-content">
        <div class="goodsParticular-title">
          <h6>商品抢购</h6>
        </div>
        <div class="goods-box">
          <div class="goods-lt">
            <div class="goods-picture">
              <ul class="big-picture">
                <li>
                  <img :src="imgUrl" alt="">
                </li>
              </ul>
            </div>
            <ul class="small-picture">
              <li v-for="(item,index) in coverImg" :key="index" @click="toGoodsPicture(item,index)" :class="{activeImg: isActiveImg === index}">
                <img :src="item" alt="">
              </li>
            </ul>
          </div>
          <div class="goods-rt">
            <p>{{productName}}</p>
            <div class="kucun-box" v-show="shareUserName">
              <div class="kucun"><span>邀请人: </span><i>{{shareUserName}}</i></div>
            </div>
            <div class="my-invite" @click="showQrPopup"><span class="btn-invite">我的邀请链接</span></div>
          </div>
        </div>
        <div class="goods-content">
          <ul class="order-tab">
            <li :class="{tabActive: orderTab === 1}" @click="toChoose(1)">商品详情</li>
            <li :class="{tabActive: orderTab === 2}" @click="toChoose(2)">抢购轮次</li>
            <li :class="{tabActive: orderTab === 3}" @click="toChoose(3)">我的邀请</li>
          </ul>
        </div>
        <div class="goods-ct" v-if="orderTab === 1">
          <div class="introduce-box">
            <div class="shop-name"><span>店铺名称:</span><i>{{merchantName}}</i></div>
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
            <td class="round">轮次</td>
            <td class="status">抢购状态</td>
            <td class="auction">当前价</td>
            <td class="price">抢购剩余时间</td>
            <td class="time">抢购开始时间</td>
            <td class="detail">操作</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in infinitePanicRoundList" :key="index" class="cursor" @click="toBuyGoodsDetail(item)">
            <td class="round">{{item.roundCode}}</td>
            <td class="status">{{recordStatus(item.roundStatus)}}</td>
            <td class="auction">{{item.panicPrice}} π</td>
            <td class="price" v-show="item.roundStatus === 1">{{item.hour}}:{{item.min}}:{{item.sce}}</td>
            <td class="price" v-show="item.roundStatus === 2 || item.roundStatus === 3 || item.roundStatus === 4">-</td>
            <td class="time">{{$changeDate(item.infinitePaniceSet.startDate, '-')}}</td>
            <td class="detail">详情</td>
          </tr>
          </tbody>
          <div class="load-more-box" v-show="infinitePanicRoundList === ''">
            <div class="loading-img">
              <img src="../../assets/images/home/nodata.png" alt="">
            </div>
            <p class="desc">暂无数据</p>
          </div>
        </table>
        <table class="commonTableList" v-if="orderTab === 3" >
          <thead>
          <tr>
            <td class="round">编号</td>
            <td class="status">用户昵称</td>
            <td class="auction">加入时间</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in infiniteTreeList" :key="index">
            <td class="round">{{item.id}}</td>
            <td class="status">{{item.childUserName}}</td>
            <td class="auction">{{$changeDate(item.createAt, '-')}}</td>
          </tr>
          </tbody>
          <div class="load-more-box" v-show="infiniteTreeList === ''">
            <div class="loading-img">
              <img src="../../assets/images/home/nodata.png" alt="">
            </div>
            <p class="desc">暂无数据</p>
          </div>
        </table>
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
      coverImg: [], // 小的预览图
      contentImg: [], // 介绍图
      productName: '', // 产品名称
      merchantName: '', // 店铺名称
      shareUserName: '', // 用户昵称
      productContent: '', // 产品介绍
      infinitePanicRoundList: [], // 抢购轮次列表
      isActiveImg: 0,
      orderTab: 1,
      isLoadMore: true,
      copyBtn: null,
      qrPopupShow: false, // 二维码弹窗
      imgGoods: '', // 二维码商品图片
      imgUrl: '', // 大的预览图
      hour: '',
      min: '',
      sce: '',
      timer: null,
      pageSize: 10,
      infiniteTreeList: [], // 我的邀请列表
      purchaseShow: false,
      shareCode: '',
      inviteLink: '', // 邀请链接
      falg: true,
      sign: 1
    }
  },
  computed: {
    ...mapGetters([
      'userAccount',
      'userData'
    ])
  },
  created () {
    this.getGoodsTreeList(1)
    this.getMyPanicTreeList(1)
  },
  mounted () {
    this.copyBtn = new this.Clipboard(this.$refs.addressCopy)
  },
  methods: {
    getGoodsTreeList (page) {
      let url = `${this.$api2}infinite/panicRoundList?infiniteRecordId=${this.id}&pageIndex=${page}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.status === 'success') {
          // console.log(res.data.data.infiniteRecord)
          if (res.data.data.infiniteRecord.shareUserName) {
            this.shareUserName = res.data.data.infiniteRecord.shareUserName
          }
          this.merchantName = res.data.data.infiniteRecord.infiniteSaleProduct.merchantName
          this.productContent = res.data.data.infiniteRecord.infiniteSaleProduct.productContent
          let coverIMG = res.data.data.infiniteRecord.infiniteSaleProduct.coverImg
          if (coverIMG) {
            this.coverImg = res.data.data.infiniteRecord.infiniteSaleProduct.coverImg.split(',')
            this.imgUrl = res.data.data.infiniteRecord.infiniteSaleProduct.coverImg.split(',')[0]
          }
          let contentIMG = res.data.data.infiniteRecord.infiniteSaleProduct.contentImg
          if (contentIMG) {
            this.contentImg = res.data.data.infiniteRecord.infiniteSaleProduct.contentImg.split(',')
          }
          this.productName = res.data.data.infiniteRecord.infiniteSaleProduct.productName
          let list = res.data.data.infiniteRecord.infinitePanicRoundList
          this.timer = setInterval(() => {
            list.forEach((item) => {
              item.bidLastTime--
              if (item.bidLastTime <= 0) {
                item.hour = '00'
                item.min = '00'
                item.sce = '00'
                clearInterval(this.timer)
              } else {
                item.hour = parseInt(Number(item.bidLastTime) / 60 / 60 % 24)
                if (Number(item.hour) === 0) {
                  item.hour = '00'
                } else if (Number(item.hour) < 10) {
                  item.hour = '0' + item.hour
                } else {
                  item.hour = item.hour
                }
                item.min = parseInt(Number(item.bidLastTime) / 60 % 60)
                if (Number(item.min) === 0) {
                  item.min = '00'
                } else if (Number(item.min) < 10) {
                  item.min = '0' + item.min
                } else {
                  item.min = item.min
                }
                item.sce = parseInt(Number(item.bidLastTime) % 60)
                if (Number(item.sce) === 0) {
                  item.sce = '00'
                } else if (Number(item.sce) < 10) {
                  item.sce = '0' + item.sce
                } else {
                  item.sce = item.sce
                }
                // console.log(`${item.hour},${item.min},${item.sce}`)
              }
            })
            this.infinitePanicRoundList = list
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 我的邀请
    getMyPanicTreeList (page) {
      let url = `${this.$api2}infinite/queryMyPanicTreeList?infiniteRecordId=${this.id}&pageIndex=${page}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.status === 'success') {
          this.infiniteTreeList = res.data.data.infiniteTreeList
          this.shareCode = res.data.data.infiniteRecord.shareCode
          this.makeInfiniteTree()
          this.inviteLink = window.location.host + '/#' + this.$route.path + '?id=' + this.id + '&shareCode=' + this.shareCode
          // console.log(window.location.href + '&shareCode=' + this.shareCode)
          // this.url2 = `${this.$api2}infinite/makeInfiniteTree?recommendCode=${this.shareCode}`
        } else {
          this.shareCode = this.$route.query.shareCode
          this.$router.push({path: '/login', query: {id: this.id, shareCode: this.shareCode}})
        }
      })
    },
    // 抢购状态
    recordStatus (status) {
      if (status === 1) {
        return '抢购中'
      } else if (status === 2) {
        return '交易成功'
      } else if (status === 3) {
        return '交易失败'
      } else if (status === 4) {
        return '待抢购'
      }
    },
    toGoodsPicture (item, index) {
      this.imgUrl = item
      this.isActiveImg = index
    },
    // 切换tab
    toChoose (num) {
      if (num === 1) {
        this.orderTab = 1
      } else if (num === 2) {
        this.orderTab = 2
        this.getGoodsTreeList(1)
      } else if (num === 3) {
        this.orderTab = 3
        this.getMyPanicTreeList(1)
      }
    },
    toBuyGoodsDetail (item) {
      this.$router.push({path: '/buyGoodsDetail', query: {id: this.$route.query.id, purchaseId: item.id}})
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
    makeInfiniteTree () {
      let url2 = `${this.$api2}infinite/makeInfiniteTree?recommendCode=${this.shareCode}`
      this.$http.post(url2).then(res => {
        if (res.data.status === 'failed') {
          this.falg = false
          // this.sign = 2
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
      // let url2 = `${this.$api2}infinite/makeInfiniteTree?recommendCode=${this.shareCode}`
      // this.$http.post(url2).then(res => {
      //   console.log('123')
      //   if (res.data.status === 'failed') {
      //     // console.log(res.data.msg)
      //     this.purchaseShow = true
      //     console.log(res.data.resultCode)
      //     if (res.data.resultCode === 'NOT_LOGGEDIN') {
      //       this.$router.push({path: '/login', query: {id: this.id, shareCode: this.shareCode}})
      //     }
      //   } else {
      //     this.qrPopupShow = true
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
      // let downloadUrl
      // if (this.url3 !== '') {
      //   // 绘制二维码
      //   downloadUrl = this.$utf16to8(this.url3)
      // }
      // $('#qrcodeBox').qrcode({
      //   render: 'canvas', //     table方式
      //   width: 200, //            宽度
      //   height: 200, //            高度
      //   text: downloadUrl //      任意内容
      // })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.goodsParticular
  .goodsParticular-box
    .goodsParticular-content
      .goodsParticular-title
        h6
          font-size 24px
          color #1a1a1a
          font-weight bold
      .goods-box
         .goods-rt
           .my-invite
              height 50px
              width 200px
              background-color #ffba14
              border-radius 4px
              display flex
              justify-content center
              align-items center
              cursor pointer
              outline none
              user-select none
              .btn-invite
                color #fff
                font-size 16px
      .goods-ct
        .introduce-box
          margin-bottom 40px
          .shop-name
            margin-bottom 30px
      .commonTableList
        thead
          tr
            color: #666;
        tbody
          tr
            color: #1a1a1a;
</style>
