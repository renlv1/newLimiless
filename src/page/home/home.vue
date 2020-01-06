<template>
  <div class="home">
    <div class="home-box">
      <div class="home-content">
        <div class="content-title">
          <h3>代理商竞拍</h3>
          <div class="my-bidding" @click="$router.push('/account')">我的竞拍</div>
        </div>
        <div class="order-content">
          <ul class="order-tab">
            <li :class="{tabActive: orderTab === 1}" @click="toChoose(1)">竞拍中</li>
            <li :class="{tabActive: orderTab === 2}" @click="toChoose(2)">待开始</li>
          </ul>
          <div class="search-goods">
            <div class="input-item">
              <input type="text" class="input-goods" placeholder="输入商品名称" v-model="goodsName"/>
            </div>
            <div class="search" @click="searchGoods()">
              <div class="icon-fangdajing"></div>
            </div>
          </div>
        </div>
        <!--竞拍中列表-->
        <div class="order-box" v-if="orderTab === 1">
          <ul class="goods-item">
            <li v-for="(item,index) in bidList" :key="index" @click="toDetail(item)">
              <div class="img-box"><img :src="item.coverImg.split(',')[0]"/></div>
              <div class="goods-dc">
                <p>{{item.productName}}</p>
                <div class="kucun"><span>库存: </span><i>{{item.saleNum}}</i></div>
                <div class="line"></div>
                <div class="price-box">
                  <span>当前价: </span><i>{{item.nowBidPrice}} π</i>
                </div>
                <div class="time-box">
                  <span>剩余时间: </span>
                  <div class="time">
                    <span class="hour">{{item.hour}}</span>
                    <span class="colon">:</span>
                    <span class="min">{{item.min}}</span>
                    <span class="colon">:</span>
                    <span class="seconds">{{item.sce}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="load-more-box" v-if="bidList.length === 0">
            <div class="loading-img">
              <img src="../../assets/images/home/nodata.png" alt="">
            </div>
            <p class="desc">暂无数据</p>
          </div>
        </div>
        <!--待开始列表-->
        <div class="order-box" v-if="orderTab === 2">
          <ul class="goods-item">
            <li v-for="(item,index) in startList" :key="index" @click="toDetail(item)">
              <div class="img-box"><img :src="item.coverImg.split(',')[0]"/></div>
              <div class="goods-dc">
                <p>{{item.productName}}</p>
                <div class="kucun"><span>库存: </span><i>{{item.saleNum}}</i></div>
                <div class="line"></div>
                <div class="price-box">
                  <span>初始价: </span><i>{{item.nowBidPrice}} π</i>
                </div>
                <div class="time-box">
                  <span>开拍时间: </span>
                  <div class="time">
                    <span class="year">{{$changeDate(item.startSaleDate, '-')}}</span>
                    <!--<span class="colon">-</span>-->
                    <!--<span class="year">月</span>-->
                    <!--<span class="colon">-</span>-->
                    <!--<span class="year">{{item.day}}</span>-->
                    <!--<span class="hour">{{item.hour}}</span>-->
                    <!--<span class="colon">：</span>-->
                    <!--<span class="min">{{item.min}}</span>-->
                    <!--<span class="colon">：</span>-->
                    <!--<span class="seconds">{{item.sce}}</span>-->
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="load-more-box" v-if="startList.length === 0">
            <div class="loading-img">
              <img src="../../assets/images/home/nodata.png" alt="">
            </div>
            <p class="desc">暂无数据</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      orderTab: 1,
      isLoadMore: true,
      bidList: [], // 竞拍中列表
      startList: [], // 待开始列表
      bidLastTime: '', // 剩余时间
      goodsName: '', // 搜索商品名称
      hour: '',
      min: '',
      sce: '',
      year: '',
      month: '',
      day: '',
      timer: null,
      timeArr: [],
      pageSize: 10,
      goodsList: [
        {img: 111, text: '三只松鼠', price: '10000π'}
      ]
    }
  },
  created () {
    this.getBidList(1)
  },
  methods: {
    /*eslint-disable*/
    getBidList (page) { // 竞拍中列表
      let url = {}
      url.queryType = 1
      url.pageSize = this.pageSize
      url.pageIndex = page
      url.productName = this.goodsName
      // if (this.goodsName) {
      //    url = `${this.$api2}infinite/userQueryProductList?queryType=1&pageSize=${this.pageSize}&pageIndex=${page}&productName=${this.goodsName}`
      // }else {
      //    url = `${this.$api2}infinite/userQueryProductList?queryType=1&pageSize=${this.pageSize}&pageIndex=${page}&productName=${this.goodsName}`
      // }
      this.$postAxios.post(`${this.$api2}infinite/userQueryProductList`, url).then(res => {
        if (res.data.status) {
          // this.bidList = res.data.data.infiniteSaleProductList
          let list = res.data.data.infiniteSaleProductList
          this.timer = setInterval(() => {
            list.forEach((item) => {
              item.bidLastTime--
              if (item.bidLastTime <=0) {
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
            this.bidList = list
          }, 1000)
        }
      })
    },
    getStartList (page) { // 待开始列表
      let url = {}
      url.queryType = 2
      url.pageSize = this.pageSize
      url.pageIndex = page
      url.productName = this.goodsName
      // if (this.goodsName) {
      //   url = `${this.$api2}infinite/userQueryProductList?queryType=2&pageSize=${this.pageSize}&pageIndex=${page}&productName=${this.goodsName}`
      // }else {
      //   url = `${this.$api2}infinite/userQueryProductList?queryType=2&pageSize=${this.pageSize}&pageIndex=${page}&productName=${this.goodsName}`
      // }
      this.$postAxios.post(`${this.$api2}infinite/userQueryProductList`, url).then(res => {
        if (res.data.status) {
          // console.log(res.data)
          this.startList = res.data.data.infiniteSaleProductList
        }
      })
    },
    searchGoods () {
      if (this.orderTab === 1) {
        this.getBidList(1)
      } else {
        this.getStartList(1)
      }
    },
    toChoose (num) {
      if (num === 1) {
        this.orderTab = 1
        this.getBidList(1)
      } else if (num === 2) {
        this.orderTab = 2
        this.getStartList(1)
      }
    },
    toDetail (item) {
      this.$router.push({
        path: '/goodsParticular',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.home
  .home-box
    background-color #fafafc
    width 100%
    height 100%
    .home-content
      width 100%
      padding 0 5%
      background-color #fafafc
      padding-top 80px
      .content-title
        display flex
        justify-content space-between
        h3
          font-size 34px
          font-weight bold
          color #1a1a1a
        .my-bidding
          width 160px
          height 50px
          background-color #fcfcfc
          border-radius 4px
          border 1px solid #ffba14
          color #ffba14
          text-align center
          line-height 50px
          cursor pointer
          user-select none
          font-size 20px
      .order-content
        display flex
        justify-content space-between
        width 100%
        border-bottom 1px solid #ffba14
        .order-tab
          margin-top 40px
          display flex
          height 50px
          li
            width 260px
            height 100%
            text-align center
            line-height 50px
            font-size 20px
            color #1a1a1a
            cursor pointer
            user-select none
            &.tabActive
              background-color #ffba14
              color #fff
              border-radius 4px
              border 1px solid #ffba14
              border-bottom-left-radius 0
              border-bottom-right-radius 0
        .search-goods
          margin-top 32px
          display flex
          align-items center
          .input-item
            flex 1
            .input-goods
              height 44px
              width 410px
              padding 0 40px
              font-size 16px
              color #999
              box-sizing border-box
              display block
              border-radius 4px 0 0 4px
              border: 1px solid #999
              border-right none
        .search
          border-radius 0 4px 4px 0
          cursor pointer
          width 54px
          height 44px
          display: flex
          align-items center
          justify-content center
          background-color #ffba14
          .icon-fangdajing
            width: 24px
            height: 24px
            background: url("../../assets/images/home/search.png") no-repeat center
      .order-box
        padding-top 40px
        .goods-item
          width 100%
          display flex
          flex-wrap wrap
          li
            width 385px
            height 410px
            border 1px solid #f0f1f4
            margin-right 20px
            margin-bottom 30px
            cursor pointer
            user-select none
            &:nth-child(4n)
              margin-right 0
            .img-box
              width 100%
              height 230px
              img
                display block
                width 100%
                height 100%
            .goods-dc
              background-color #fdfdfe
              padding 10px 24px 0
              height 180px
              p
                line-height 1.5
                font-size 16px
                color #1a1a1a
              .kucun
                font-size 16px
                color #1a1a1a
                margin-top 16px
                margin-bottom 10px
              .line
                width 100%
                height 1px
                background-color #e7e8ec
              .price-box
                display flex
                justify-content space-between
                margin-top 10px
                margin-bottom 10px
                span
                  font-size 14px
                  color #1a1a1a
                i
                  font-size 16px
                  color #ffba14
              .time-box
                display flex
                justify-content space-between
                span
                  font-size 14px
                  color #1a1a1a
                .time
                  span
                    font-size 16px
                    color #ffba14
                    &.colon
                      width 8px
                      display inline-block
        //正在加载中样式
        .load-more-box
          padding-bottom: 30px
          .desc
            font-size: 20px
            color #999
            text-align: center
            margin-top 20px
          .loading-img
            width: 50px
            height: 50px
            margin: 30px auto 0
            img
              width: 100%
              height: 100%
</style>
