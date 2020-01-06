<template>
  <div class="footer container">
    <div class="link">
      <div class="friend-link">友情链接：<a class="isClick" href="https://www.baidu.com" target="_blank">百度</a></div>
    </div>
    <div class="text">@DISCOVERY 2018</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {}
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .footer{
    width: 100%;
    min-height:59px;
    text-align: center;
    color: #666;
    font-size: 14px;
    display: flex;
    flex-direction row
    justify-content: space-between;
    align-items center
    .friend-link{
      a{
        display inline-block
        float right
        font-size 14px
        color #666
      }
    }
  }
</style>
