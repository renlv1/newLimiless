<template>
  <div>
    <!--成为共享者-->
    <div class="sharer-wrap">
      <div class="sharer">
        <div class="catalogue">
          <span class="title">成为共享者</span>
          <router-link tag="span" to="/applySharer" class="now-apply-for">现在申请</router-link>
        </div>
        <div class="tit">贡献者协议</div>
        <div class="list-box">
          <div class="list" v-for="(item,index) in afqDatas" :key="index">
            <div class="in-box">
              <div class="issue">{{item.title}}</div>
              <div class="answer">{{item.text}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      afqDatas: [
        {
          title: '哈哈哈哈哈哈哈哈哈?',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
        },
        {
          title: '哈哈哈哈哈哈哈哈哈?',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
        },
        {
          title: '哈哈哈哈哈哈哈哈哈?',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
        },
        {
          title: '哈哈哈哈哈哈哈哈哈?',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
        },
        {
          title: '哈哈哈哈哈哈哈哈哈?',
          text: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈回答哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
  .sharer-wrap{
    width: 100%;
    height: 100vh;
    background-color: #FAFAFC;
    .sharer{
      width: 1550px;
      height: auto;
      margin: 0 auto;
      .catalogue{
        width: 100%;
        height: 50px;
        display: flex;
        padding: 60px 0;
        .title{
          height: 50px;
          font-size: 34px;
          font-weight: bold;
          color: #1a1a1a;
          padding-right: 60px;
          border-right: 1px solid #999;
        }
        .now-apply-for{
          display: inline-block;
          width: 200px;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          color: #fff;
          text-align: center;
          background-color: #FFBA14;
          border-radius: 4px;
          box-shadow: 0 2px 2px rgba(255, 153, 20, 0.4);
          margin-left: 60px;
          cursor: pointer;
        }
      }
      .tit{
        font-size: 20px;
        color: #1a1a1a;
        font-weight: bold;
        padding: 60px 0 20px;
      }
      .list-box{
        width: 100%;
        column-count: 3;
        -webkit-column-count: 3;
        -moz-column-count: 3;
        column-fill: auto;
        column-gap: 30px;
        .list{
          border-radius: 4px;
          background-color: #fff;
          border: 1px solid #e7e8ec;
          -webkit-column-break-inside: avoid;
          break-inside: avoid; // 避免在元素内部插入分页符
          margin-bottom: 40px;
          &.in-box{
              .answer{
                color: #999;
              }
            }
          &:hover{
            .in-box{
              .answer{
                color: #1a1a1a;
              }
            }
          }
          .in-box{
            width: 100%;
            height: auto;
            padding: 30px;
            font-size: 18px;
            color: #1a1a1a;
            .issue{
              font-weight: bold;
              padding-bottom: 40px;
            }
            .answer{
              line-height: 1.5;
              color: #999;
            }
          }
        }
      }
    }
  }

</style>
