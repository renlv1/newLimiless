<template>
  <div class="paiwalletDetail">
    <div class="bread">
      <router-link to="/account/paiWallet" tag="i">派付钱包</router-link>》
      <span>记录详情</span>
    </div>
    <h3>π付钱包</h3>
    <div class="orderDetail">
      <h5>账变金额</h5>
      <p><span>50000</span><b>.0000</b> <i>π</i></p>
      <ul>
        <li><span>订单编号</span><span>600000</span></li>
        <li><span>创建时间</span><span>2018-05-03 12:12:12</span></li>
        <li><span>类型</span><span class="type">寻宝</span></li>
        <li><span>关联藏宝图</span><span>623135</span></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .paiwalletDetail{
    background-color: #fafafc;
    width: 100%;
    padding: 40px 60px;
    h3{
      font-size: 34px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 60px;
    }
    .orderDetail{
      width: 100%;
      height: 600px;
      background-color: #fff;
      padding: 40px 100px;
      h5{
        height: 50px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        line-height: 50px;
      }
      p{
        margin: 10px 0 30px;
        text-align: center;
        font-weight: bold;
        span{
          color: #1a1a1a;
          font-size: 30px;
        }
        b{
          color: #1a1a1a;
          font-size: 20px;
          font-weight: bold;
        }
        i{
          color: #ffba14;
          font-size: 20px;
          font-weight: bold;
        }
      }
      ul{
        border: 1px solid #e7e8ec;
        li{
          display: flex;
          height: 50px;
          border-bottom: 1px solid #e7e8ec;
          align-items: center;
          &:nth-last-child(1) {
            border-bottom: none;
          }
          &:nth-child(odd) {
            background-color: #fff;
          }
          &:nth-child(even) {
            background-color: #fcfcfc;
          }
          span{
            flex: 1;
            text-align: left;
            padding-left: 30px;
            &.type{
              color: #12a041;
            }
          }
        }
      }
    }
  }
</style>
