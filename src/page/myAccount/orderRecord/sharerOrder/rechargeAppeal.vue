<template>
  <div class="mybill-detail">
    <!--共享者订单--充值 申诉 -->
    <div class="router-navigation">
      <span class="link" @click="$router.push('/account/sharerOrder')">共享者订单</span>
      <span class="icon">》</span>
      <span class="link">充值详情</span>
      <span class="icon">》</span>
      <span class="link">申诉</span>
    </div>
    <h3 class="title-text">申诉</h3>
    <div class="shensu-box">
      <h3 class="title-details">充值金额</h3>
      <div class="money-box">
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
          <span class="order-text">类型</span>
          <span class="order-text">12345</span>
        </li>
        <li class="order-list">
          <span class="order-text">共享者</span>
          <span class="order-text">12345</span>
        </li>
      </ul>
      <div class="shensu-yuan">
        <div class="title-label">申诉原因</div>
        <ul class="check-uls">
          <li class="check-list" @click="checkOne(index)" v-for="(item, index) in reasonData" :key="index" :class="{'checked': currentIndex === index}">
            <div class="circle">
              <span class="gou1 icon-gou"></span>
              <span class="gou2 icon-gou"></span>
            </div>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="shensu-cont">
        <div class="title-label">申诉内容</div>
        <div class="shensu-text-box">
          <textarea placeholder="请在这里输入您的问题描述" class="textarea"></textarea>
          <div class="warm-num"><span class="text-count">0</span>/<span>500</span></div>
        </div>
        <p class="err-class">请输入申诉内容</p>
      </div>
      <div  class="upload-wrapper">
        <div class="img-lis" v-for="(item, index) in imgDataObj" :key="index">
          <img :src="item" alt="" @error="errorImg(item, index)">
          <div class="delete" @click.stop.prevent="deleteIndex(index)">
            <span class="icon icon1"></span>
            <span class="icon icon2"></span>
          </div>
        </div>
        <div  class="img-loading-box" v-show="isLoading">
          <img  src="../../../../assets/images/commons/loading.gif" alt="" class="img-loading">
        </div>
        <div  class="img-box" v-show="isMaxLoading">
          <input @change="fileChange()" ref="uploadFile" accept="image/*" placeholder="" type="file" id="upload_file"/>
          <div  class="text"><img class="upload_add" src="../../../../assets/images/commons/upload_add.svg" alt=""></div>
        </div>
      </div>
      <div class="button-w">
        <div class="button">取消申诉</div>
        <div class="button" @click="sendShensu">提交申诉</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
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
    sendShensu () {
      this.$router.push('/account/sharerOrder/rechargeAppealDetail')
    },
    errorImg () {},
    fileChange () {},
    deleteIndex () {}
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
