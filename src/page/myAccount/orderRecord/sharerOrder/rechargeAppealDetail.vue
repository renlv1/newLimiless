<template>
  <div class="mybill-detail">
    <!--共享者订单--充值 申诉 详情-->
    <div class="router-navigation">
      <span class="link" @click="$router.push('/account/sharerOrder')">共享者订单</span>
      <span class="icon">》</span>
      <span class="link">申诉详情</span>
    </div>
    <h3 class="title-text">申诉详情</h3>
    <div class="shensu-box">
      <h3 class="title-details center-text">充值金额</h3>
      <div class="money-box center-text">
        <span class="money1">52</span>
        <span class="money2">.0000</span>
        <span class="money3"> USD</span>
      </div>
      <ul class="order-uls">
        <li class="order-list">
          <span class="order-text">订单编号</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">创建时间</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">订单状态</span>
          <div class="order-text status-text" @click="showOrderStatus">
            <span>待接单</span>
            <div class="icon"></div>
          </div>
        </li>
      </ul>
      <div class="shensu-yuan">
        <div class="title-label">申诉原因</div>
        <ul class="check-uls">
          <li class="check-list checked">
            <div class="circle">
              <span class="gou1 icon-gou"></span>
              <span class="gou2 icon-gou"></span>
            </div>
            <span>充值不到账</span>
          </li>
        </ul>
      </div>
      <div class="shensu-cont">
        <div class="title-label">申诉内容</div>
        <div class="shensu-text-box">
          <div class="textarea">申诉内容申诉内容申诉内容申诉内容申诉内容申诉内容申诉内容</div>
        </div>
      </div>
      <div  class="upload-wrapper">
        <div class="img-lis" v-for="(item, index) in imgDataObj" :key="index" @click="showBigImg(item)">
          <img :src="item" alt="" @error="errorImg(item, index)">
        </div>
      </div>
      <button class="text-look">点击可查看大图</button>
      <div class="shensu-cont">
        <div class="title-label">对方提供的描述</div>
        <div class="shensu-text-box">
          <div class="textarea">申诉内容申诉内容申诉内容申诉内容申诉内容申诉内容申诉内容</div>
        </div>
      </div>
      <div  class="upload-wrapper">
        <div class="img-lis" v-for="(item, index) in imgDataObj" :key="index" @click="showBigImg(item)">
          <img :src="item" alt="">
        </div>
      </div>
      <p class="text-look">点击可查看大图</p>
      <div class="shensu-cont">
        <div class="title-label">系统判定：共享者胜</div>
        <div class="shensu-text-box">
          <div class="textarea">申诉内容申诉内容申诉内容申诉内容申诉内容申诉内容申诉内容</div>
        </div>
      </div>
      <div class="button-w">
        <div class="button button-color">关闭申诉</div>
      </div>
    </div>
    <!-- 订单进程弹窗-->
    <div class="dialog-wrapper" v-show="showDialog" @click="showDialog = false">
      <div class="dialog-content" @click.stop>
        <div class="close-confirm" @click="showDialog = false">
          <div class="close-icon">
            <div class="line line1"></div>
            <div class="line line2"></div>
          </div>
        </div>
        <div class="dialog-box">
          <h3 class="dialog-title">订单进程</h3>
          <div class="process-w">
            <div class="process-left">
              <div class="circle"></div>
              <div class="line"></div>
              <div class="circle"></div>
              <div class="line"></div>
              <div class="circle current-stauts"></div>
              <div class="line"></div>
              <div class="circle"></div>
              <div class="line"></div>
              <div class="circle"></div>
              <div class="line"></div>
              <div class="circle"></div>
              <div class="line"></div>
              <div class="circle"></div>
            </div>
            <div class="process-right">
              <div class="flex-item">
                <span>创建订单</span>
                <span class="time">2018-8-21 16:00:03</span>
              </div>
              <div class="flex-item">
                <span>选择共享者</span>
                <span class="time">2018-8-21 16:00:03</span>
              </div>
              <div class="flex-item">
                <span>我已接单</span>
                <span class="time">2018-8-21 16:00:03</span>
              </div>
              <div class="flex-item">
                <span>我已支付保证金</span>
                <span class="time">2018-8-21 16:00:03</span>
              </div>
              <div class="flex-item">
                <span>对方已转账</span>
                <span class="time">2018-8-21 16:00:03</span>
              </div>
              <div class="flex-item">
                <span>我已确认收款</span>
                <span class="time">2018-8-21 16:00:03</span>
              </div>
              <div class="flex-item">
                <span>订单已完成</span>
                <span class="time">2018-8-21 16:00:03</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-wrapper" v-show="showDialog2" @click="showDialog2 = false">
      <div class="dialog-content img-dialog" @click.stop>
        <div class="close-confirm" @click="showDialog2 = false">
          <div class="close-icon">
            <div class="line line1"></div>
            <div class="line line2"></div>
          </div>
        </div>
        <div class="dialog-img-box">
          <img :src="bigImg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      bigImg: '',
      showDialog: false,
      showDialog2: false,
      currentIndex: 0,
      reasonData: ['充值不到账', '订单出错', '接单后不确定收款'],
      isLoading: true,
      isMaxLoading: true,
      imgDataObj: [require('../../../../assets/images/commons/upload_add.svg'), require('../../../../assets/images/commons/upload_add.svg')]
    }
  },
  methods: {
    checkOne (index) {
      this.currentIndex = index
    },
    showOrderStatus () {
      this.showDialog = true
    },
    showBigImg (item) {
      this.bigImg = item
      this.showDialog2 = true
    },
    errorImg () {},
    fileChange () {},
    deleteIndex () {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
