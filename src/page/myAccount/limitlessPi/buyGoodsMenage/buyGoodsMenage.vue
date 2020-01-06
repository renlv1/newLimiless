<template>
  <div class="page">
    <div class="title">商品抢购管理</div>
    <div class="content">
      <tab
        :tabMenu="tabMenu"
      >
        <div class="limit-table" slot="slot1">
          <table>
            <thead>
              <tr>
                <td v-for="item in tableHead" :key="item">
                  {{item}}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="img-wrap">
                  <div>
                    <img src="http://jjysilk.com/Upload/Gimg/20170227064556.jpg" width="110" height="100" alt="">
                    <span>我是商品名称我是商品名称我是商品名称我是商品名称</span>
                  </div>
                </td>
                <td>999/9999</td>
                <td>
                  <p>1,000,000π</p>
                </td>
                <td>小猪佩奇</td>
                <td>
                  <router-link to="/account">查看详情</router-link>
                  <router-link to="/account">奖励记录</router-link>
                </td>
              </tr>
            </tbody>
          </table>
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
      tabMenu: ['待抢购', '已完结'],
      tableHead: ['商品', '剩余库存', '竞拍成交价', '商家', '操作']
    }
  },
  components: {
    tab
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/limitlessPi';
</style>
