<template>
  <div class="page">
    <div class="location">
      <a href="">我的抢购</a><span>>> </span>订单详情
    </div>
    <div class="title">订单详情</div>
    <div class="content">
      <div class="detail-step">
        <div class="line">
          <div class="line-item active"></div>
          <div class="line-item"></div>
        </div>
        <ul>
          <li class="complete">
            <p>抢购成功</p>
            <span>2018.12.12 11：45</span>
          </li>
          <li class="current">
            <p>商家发货</p>
          </li>
          <li class="default">
            <p>订单完成</p>
          </li>
        </ul>
      </div>
      <div class="info">
        <div class="section address">
          <div class="sub-title justify">收货人信息</div>
          <div class="address-item">
            <div>收货人：啊大大 <span>（+86）12345678910</span></div>
            <div class="justify">
              <p>收货地址：广东省深圳市广东省深圳市广东省深圳市广东省深圳市广东省深圳市</p>
              <a href="">修改</a>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="sub-title justify">物流信息</div>
          <div class="express">
            <div class="express-head">
              <span>物流公司： 中通快递</span>
              <span>物流编号： 213456</span>
            </div>
            <div class="express-step">
              <p>物流进度</p>
              <ul>
                <li>
                  <span class="intro">商家发货</span>
                  <span class="time">2018-8-21 16:00:03</span>
                </li>
                <li>
                  <span class="intro">快递员正在往你家里送快递</span>
                  <span class="time">2018-8-21 16:00:03</span>
                </li>
                <li>
                  <span class="intro">等待您确认收货</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="section prod">
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
              <div class="btn">确认发货</div>
            </div>
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
  .detail-step{
    margin-bottom: 50px;
    position: relative;
    ul{
      position: relative;
      display: flex;
      justify-content: center;
      text-align: center;
      color: #666;
      font-size: 18px;
      line-height: 1;
    }
    li{
      width: 260px;
      &:before{
        content: '';
        width: 30px;
        height: 30px;
        display: inline-block;
        margin-bottom: 15px;
      }
      &.complete{
        color: #000;
        &:before{
          background: url(~@/assets/images/limitlessPai/icon_right.png);
        }
      }
      &.current:before{
        background: url(~@/assets/images/limitlessPai/icon_current.png);
      }
      &.default:before{
        background: url(~@/assets/images/limitlessPai/icon_circle.png);
      }
      p{
        padding-bottom: 5px;
      }
      span{
        font-size: 14px;
      }
    }
    .line{
      position: absolute;
      top: 12px;
      .hor-center;
      display: flex;
      &-item{
        background: #c4c6cc;
        width: 260px;
        height: 2px;
        &.active{
          background: @blue;
        }
      }
    }
  }
  .info{
    background: #fff;
    border: 1px solid #e7e8ec;
    padding: 28px 50px 86px;
    .section{
      padding-left: 50px;
      padding-right: 50px;
      border-bottom: 1px solid #e7e8ec;
      &:last-child{
        border-bottom: none;
      }
    }
  }
  .address{
    padding-bottom: 50px;
    margin-bottom: 20px;
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
  .express{
    padding-bottom: 30px;
    margin-bottom: 50px;
    border: 1px solid #e7e8ec;
    &-head{
      border-bottom: 1px solid #e7e8ec;
      padding: 0 30px;
      line-height: 48px;
      span + span{margin-left: 140px;}
    }
    &-step{
      padding: 0 30px;
      p{
        line-height: 1;
        padding: 20px 0 30px;
      }
      .time{
        font-size: 12px;
        color: #999;
      }
    }
    &-step{
      ul{
        position: relative;
      }
      ul:after{
        content: '';
        width: 2px;
        height: 93%;
        background: @blue;
        top: 4px;
        left: 7px;
        position: absolute;
      }
      li{
        .justify;
        width: 530px;
        position: relative;
        padding-left: 36px;
        &:before{
          .circle(16px);
          content: '';
          background: @blue;
          position: absolute;
          left: 0;
          top: 4px;
        }
        & + li{
          margin-top: 50px;
        }
        &:last-child:before{
          background: url(~@/assets/images/limitlessPai/icon_current.png) no-repeat -2px;
          background-size: 20px;
          width: 20px;
          height: 20px;

        }
      }
    }
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
