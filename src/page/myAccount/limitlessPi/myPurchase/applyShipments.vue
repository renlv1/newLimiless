<template>
  <div class="page">
    <div class="location">
      <a href="">我的抢购</a><span>>> </span>申请发货
    </div>
    <div class="title">申请发货</div>
    <div class="content">
      <div class="info">
        <div class="address">
          <div class="sub-title justify">
            <div>收货人信息</div>
            <a href="javascript:;" class="add-new">+ 新增收货地址</a>
          </div>
          <div class="address-item">
            <div>收货人：啊大大 <span>（+86）12345678910</span></div>
            <div class="justify">
              <p>收货地址：广东省深圳市广东省深圳市广东省深圳市广东省深圳市广东省深圳市</p>
              <a href="">修改</a>
            </div>
          </div>
        </div>
        <div class="prod">
          <div class="sub-title">商品信息</div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <td>商品</td>
                  <td>商家</td>
                  <td>订单编号</td>
                  <td>轮次</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="img-wrap">
                    <div>
                      <img src="http://jjysilk.com/Upload/Gimg/20170227064556.jpg" width="60" height="60" alt="">
                      <span>我是商品名称我是商品名称我是商品名称我是商品名称</span>
                    </div>
                  </td>
                  <td>我是商家名称</td>
                  <td>12345678910</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
            <div class="total">
              <div class="t1">出价：10000.000π</div>
              <div class="t2">折算金额：10000.000CNY</div>
              <div class="t3">订单金额总计：<span>10000.000π</span></div>
              <div class="btn">申请发货</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增地址弹框  -->
    <div class="mask" v-show="maskShow">
      <div class="mask-wrap">
        <i class="mask-close" @click="maskShow = !maskShow"></i>
        <div class="mask-title">新增收货地址</div>
        <div class="mask-content">
          <div class="mask-from">
            <div class="field">
              <label for="">收货人姓名</label>
              <input class="input" type="text">
            </div>
            <div class="field">
              <label for="">联系电话</label>
              <input class="input" type="text">
            </div>
            <div class="field">
              <label for="">邮政编码</label>
              <input class="input" type="text">
            </div>
            <div class="field">
              <label for="">所在国家</label>
              <input class="input" type="text">
            </div>
            <div class="field">
              <label for="">所在地区</label>
              <input class="input" type="text">
            </div>
            <div class="field">
              <label for="">所在地区</label>
              <textarea class="input"></textarea>
            </div>
            <button class="btn">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/limitlessPi';
  .info{
    background: #fff;
    border: 1px solid #e7e8ec;
    padding: 28px 50px 86px;
    > div{
      padding-left: 50px;
      padding-right: 50px;
    }
  }
  .address{
    padding-bottom: 50px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e7e8ec;
    .address-item{
      border: 1px solid #e7e8ec;
      padding: 12px 30px 20px;
      line-height: 34px;
    }
    a{
      color: @blue
    }
    .add-new{
      color: @yellow;
      font-size: 16px;
      font-weight: normal;
    }
  }
  .sub-title{
    font-size: 20px;
    font-weight: bold;
    line-height: 70px;
  }
  .table-wrap{
    thead{
      td{
        height: 44px;
        vertical-align: middle;
        background: @gray;
      }
    }
    td{
      padding: 0 25px;
      border: 1px solid #e7e8ec;
    }
    tbody{
      td{
        vertical-align: top;
        padding: 20px 25px;
        font-size: 14px;
      }
    }
    .img-wrap{
      width: 320px;
      padding: 20px;
      text-align: left;
      line-height: 20px;
      div{
        .justify
      }
      img{
        margin-right: 20px;
      }
  }
  }
  .total{
    line-height: 36px;
    padding: 10px 30px 30px;
    text-align: right;
    border: 1px solid #e7e8ec;
    border-top: none;
    font-size: 14px;
    .t2{
      color: #999;
    }
    .t3{
      font-weight: bold;
      font-size: 16px;
      span{
        color: @yellow;
      }
    }
    .btn{
      display: inline-block;
      margin-top: 20px;
    }
  }

</style>
