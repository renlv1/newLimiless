<template>
  <div class="page">
    <div class="title">我的抢购</div>
    <div class="content">

      <tab
        :tabMenu="tabMenu"
        :tabIndex="1"
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
                <td>2018-8-21 14:23:23</td>
                <td>领先</td>
                <td>
                  <router-link to="/account">查看详情</router-link>
                  <router-link to="/account">奖励记录</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="limit-table" slot="slot2">
          <div class="sub-tab">
            <div
              v-for="(item, index) in subMenu"
              :key="index"
              class="sub-tab-hd"
              :class="{active: index === subMenuIndex}"
              @click="subMenuSwitch(index)"
            >
             <span>{{item}}</span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <td v-for="item in tableHead" :key="item">
                  {{item}}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in infiniteRecordList" :key="index">
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
                <td>2018-8-21 14:23:23</td>
                <td>领先</td>
                <td>
                  <router-link :to="{path:'/buyGoods',query: {id:item.id}}">查看详情</router-link>
                  <router-link to="/account">奖励记录</router-link>
                  <router-link to="/account">订单详情</router-link>
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
      pageSize: 10,
      infiniteRecordList: [], // 抢购成功的列表
      tabMenu: ['抢购中', '抢购成功', '抢购失败'],
      tableHead: ['商品', '轮次', '当前价', '商家', '剩余抢购时间', '竞拍状态', '操作'],
      subMenu: ['待申请发货（10）', '待商家发货（1）', '待确认收货（5）', '已完成（10）'],
      subMenuIndex: 0
    }
  },
  created () {
    this.getCanPancicList(1)
  },
  methods: {
    getCanPancicList (page) {
      let url = `${this.$api2}infinite/userQueryCanPancicList?pageIndex=${page}&pageSize=${this.pageSize}`
      this.$http.post(url).then(res => {
        if (res.data.status) {
          this.infiniteRecordList = res.data.data.infiniteRecordList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    subMenuSwitch (index) {
      this.subMenuIndex = index
    }
  },
  components: {
    tab
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/css/limitlessPi';
  .sub-tab{
    display: flex;
    background: #fff;
    border-bottom: 1px solid #e7e8ec;
    .sub-tab-hd{
      width: 300px;
      line-height: 69px;
      font-size: 16px;
      color: @blue;
      text-align: center;
      span{
        padding: 0 25px;
        border-bottom: 2px solid transparent;
        display: inline-block;
        cursor: default;
      }
      &.active span{
        border-bottom-color: @blue;
      }
    }
    margin-bottom: 10px;
  }
</style>
