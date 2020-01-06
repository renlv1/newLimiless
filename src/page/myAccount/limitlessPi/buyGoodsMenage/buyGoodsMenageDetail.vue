<template>
  <div class="page">
    <div class="location">
      <a href="">商品抢购管理</a><span>>> </span>查看详情
    </div>
    <div class="content">
      <div class="signle-detail">
        <div class="justify">
          <div class="justify">
            <img src="http://jjysilk.com/Upload/Gimg/20170227064556.jpg" width="110" height="100" alt="">
            <div class="signle-detail-text">
              <div>我是商品名称我是商品名称我是商品名称我是商品名称</div>
              <p>轮次：5</p>
              <p>竞拍成交价：100000.0000</p>
            </div>
          </div>
          <div class="link">邀请链接</div>
        </div>
      </div>
      <tab
        :tabMenu="tabMenu"
        :tabIndex="1"
      >
        <div class="limit-table" slot="slot1">
          <div class="btn-wrap">
            <div class="btn">批量编辑规则</div>
            <div class="btn">规则模板管理</div>
          </div>
          <table>
            <thead>
              <tr>
                <td v-for="(item, index) in tableHead" :key="index">
                  <span v-if="index === 0"><input type="checkbox"></span>
                  <span v-else>{{item}}</span>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox"></td>
                <td>1</td>
                <td>110000.0000π</td>
                <td>110000.0000π</td>
                <td>待开始</td>
                <td>模板名称</td>
                <td>2018.12.12 16:00</td>
                <td>
                  <router-link to="/account">抢购规则</router-link>
                  <router-link to="/account">抢购详情</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="prod-detial" slot="slot2">
          <div class="intro">
            <div class="flex">
              <p>商品名称：我是商品名称贡献名称</p>
              <p>店铺名称：我是商品名称贡献名称</p>
              <p>库存：10000</p>
            </div>
            <div class="intro-text">
              <span>商品介绍：</span>flejfej elfjeljef jefoejoel f lkefjlekjflekfjlke  ejlfelfjelfejlfejflejle ej elfjeljef jefoejoel f lkefjlekjflekfjlke  ejlfelfjelfejlfejflejleej elfjeljef jefoejoel f lkefjlekjflekfjlke  ejlfelfjelfejlfejflejle
            </div>
          </div>
          <div class="detail-wrap"></div>
        </div>
      </tab>
    </div>
  </div>
</template>

<script>
import tab from '@/components/tab'
export default {
  data () {
    return {
      tabMenu: ['抢购轮次', '商品详情'],
      tableHead: ['', '轮次', '初始价', '当前价格', '状态', '规则模板', '抢购时间', '操作']
    }
  },
  components: {
    tab
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/limitlessPi';
  .btn-wrap{
    display: flex;
    margin: 20px 0;
    .btn{
      padding: 0 30px;
      color: #ffffff;
      font-size: 14px;
      border: 1px solid #999;
      background: #999;
      line-height: 34px;
      border-radius: 4px;
      cursor: pointer;
      &:last-child{
        color: @color;
        border-color: @color;
        margin-left: 30px;
        background: none;
      }
    }
  }
  .limit-table{
    thead{
      td:first-child{
        width: 90px;
      }
    }
    tbody{
      td{
        height: 70px;
        line-height: 26px;
      }
    }
  }
  .intro{
    background: #fcfcfc;
    padding: 10px 30px 20px;
    line-height: 28px;
    .intro-text{
      color: #999999;
      span{
        color: #1a1a1a;
      }
    }
    .flex{
      display: flex;
      padding: 20px 0;
      p{
        width: 30%;
      }
    }
  }
</style>
