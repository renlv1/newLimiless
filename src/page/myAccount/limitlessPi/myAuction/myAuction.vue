<template>
  <div class="page">
    <div class="title">我的竞拍</div>
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
                <td>6</td>
                <td>
                  <p>1,000,000π</p>
                  <p>用户昵称</p>
                </td>
                <td>小猪佩奇</td>
                <td>2018-8-21 14:23:33</td>
                <td>领先</td>
                <td>
                  <router-link to="/account">查看详情</router-link>
                  <router-link to="/account">奖励记录</router-link>
                </td>
              </tr>
              <tr>
                <td class="img-wrap">
                  <div>
                    <img src="http://jjysilk.com/Upload/Gimg/20170227064556.jpg" width="110" height="100" alt="">
                    <span>我是商品名称我是商品名称我是商品名称我是商品名称</span>
                  </div>
                </td>
                <td>6</td>
                <td>
                  <p>1,000,000π</p>
                  <p>用户昵称</p>
                </td>
                <td>小猪佩奇</td>
                <td>2018-8-21 14:23:33</td>
                <td>领先</td>
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
      tabMenu: ['抢购中', '抢购成功', '抢购失败'],
      tableHead: ['竞品', '轮次', '当前价', '商家', '剩余抢购时间', '竞拍状态', '操作']
    }
  },
  components: {
    tab
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      // this.$postAxios.post('http://boss.pigamegroup.com/infinite/queryMyBidRecordList', {
      //   queryType: 1,
      //   pageIndex: 1,
      //   pageSize: 1
      // }).then(res => {

      // }).catch(err => {

      // })
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/limitlessPi';
</style>
