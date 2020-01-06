<template>
  <div class="transferAccounts">
    <h3>转账</h3>
    <div class="transferBox">
      <div class="transfer">
        <span>转账方式</span>
        <div class="right">
          <div class="right-box" :class="{'green': curType.tag === 2, 'blue': curType.tag === 1,'close': toggle}" @click="toggle = !toggle; toggle2 = false">
            <span>{{curType.text}}</span><i></i>
          </div>
          <ul :class="{'close': toggle}">
            <li v-for="(item, index) in trasnferType" :key="index" :class="{'active': item.tag === curType.tag}" @click="curType = item; toggle = false">{{item.text}}</li>
          </ul>
        </div>
      </div>
      <!--收款人-->
      <div class="payee" v-if="curType.tag === 1">
        <span>收款人</span>
        <div class="right">
          <div class="right-box" :class="{'close': toggle2}" @click="toggle2 = !toggle2; toggle = false">
            <span>{{friend ? friend.id : '请选择好友' }}</span><i></i>
          </div>
          <div class="friendBox" :class="{'close': toggle2}">
            <div class="tab">
              <span v-for="(item, index) in payeeTab" :key="index" @click="changeFriendTab(index)"><i :class="{'active': curTab === index}">{{item}}</i></span>
            </div>
            <ul class="payeeUl">
              <li v-for="(item, index) in friendList" :key="index" :class="{'active': friend.id === curType.id}" @click="selectFriend(item)"><i :class="{'select': friend.id === item.id}"></i><span>{{item.name}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <!--收款人地址-->
      <div class="address" v-if="curType.tag === 2">
        <span>收款人地址</span>
        <div class="right">
          <input type="text" placeholder="输入交易地址">
          <div class="errorMsg" v-if="errMsg1">{{errMsg1}}</div>
        </div>
      </div>
      <!--手机尾号-->
      <div class="phone" v-if="curType.tag === 1">
        <span>手机尾号</span>
        <div class="right">
          <input type="text" placeholder="输入手机号码后四位">
          <div class="errorMsg" v-if="errMsg2">{{errMsg2}}</div>
        </div>
      </div>
      <!--转帐金额-->
      <div class="money">
        <span>转账金额</span>
        <div class="right">
          <input type="text" placeholder="请输入转账金额">
          <div class="errorMsg" v-if="errMsg3">{{errMsg3}}</div>
        </div>
      </div>
      <div class="btn">确定</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      errMsg1: '请输入地址',
      errMsg2: '请输入手机尾号后四位数',
      errMsg3: '请输入转账金额',
      trasnferType: [ // 转账类型列表
        {
          text: '向好友转账',
          tag: 1
        },
        {
          text: '交易地址',
          tag: 2
        }
      ],
      curType: { // 当前转账方式
        text: '向好友转账',
        tag: 1
      },
      toggle: false, // 转账方式下拉开关
      toggle2: false, // 收款人下拉开关
      payeeTab: [
        '最近转账',
        '我的好友'
      ],
      friend: '',
      friendList: [ // 好友列表
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        }
      ],
      curTab: 0
    }
  },
  methods: {
    selectFriend (item) { // 选择朋友
      this.toggle2 = false
      if (this.friend !== '') {
        if (this.friend.id === item.id) {
          this.friend = ''
        } else {
          this.friend = item
        }
      } else {
        this.friend = item
      }
    },
    changeFriendTab (index) { // 切换朋友列表
      this.curTab = index
      this.friend = ''
    }
  }
}
</script>

<style lang="less" scoped>
.transferAccounts{
  padding: 60px 60px;
  h3{
    font-size: 34px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 60px;
    margin-right: 100px;
  }
  .transferBox{
    width: 760px;
    height: auto;
    padding: 40px 160px 40px 40px;
    background-color: #fff;
    border: 1px solid #e7e8ec;
    .transfer{
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      height: 50px;
      align-items: center;
      &>span{
        color: #1a1a1a;
        font-size: 16px;
      }
      .right{
        width: 440px;
        position: relative;
        .right-box{
          display: flex;
          justify-content: space-between;
          height: 50px;
          border: 1px solid #e7e8ec;
          padding: 0 30px;
          align-items: center;
          cursor: pointer;
          span{
            font-size: 16px;
            font-weight:bold;
          }
          i{
            display: inline-block;
            width: 0;
            height: 0;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            transition: all 0.5s;
            transform: rotate(180deg);
          }
          &.close{
            i{
              transform: rotate(0deg);
            }
          }
          &.blue{
            span{
              color: #4B84FF;
            }
            i{
              border-bottom: 6px solid #4B84FF;
            }
          }
          &.green{
            span{
              color: #2fd265;
            }
            i{
              border-bottom: 6px solid #2fd265;
            }
          }
        }
        ul{ // 下拉框
          position: absolute;
          top: 50px;
          left:0;
          z-index: 9;
          width: 100%;
          height: 0;
          overflow: hidden;
          transition: all 0.5s;
          box-shadow: 0px 1px 5px rgba(0,0,0,0.2);
          background-color: #fff;
          &.close{
            height: 88px;
          }
          li{
            height: 44px;
            width: 100%;
            border-bottom:1px solid #e7e8ec;
            line-height: 44px;
            text-align: center;
            cursor: pointer;
            color: #999;
            &:hover{
              color: #1a1a1a;
              font-weight:bold;
            }
            &.active{
              color: #1a1a1a;
              font-weight:bold;
            }
          }
        }
      }
    }
    .payee{
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
      height: 50px;
      align-items: center;
      &>span{
        color: #1a1a1a;
        font-size: 16px;
      }
      .right{
        width: 440px;
        position: relative;
        .right-box{
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          height: 50px;
          border: 1px solid #e7e8ec;
          padding: 0 30px;
          align-items: center;
          span{
            font-size: 16px;
            color: #999;
          }
          i{
            height: 21px;
            width: 21px;
            display: inline-block;
            background-image: url('../../../assets/images/finance/user.png');
            background-size: cover;
            background-position: center;
          }
        }
        .friendBox{
          position: absolute;
          top: 50px;
          left:0;
          z-index: 9;
          width: 100%;
          height: 0px;
          overflow: hidden;
          transition: all 0.5s;
          box-shadow: 0px 1px 5px rgba(0,0,0,0.2);
          background-color: #fff;
          &.close{
            height: 320px;
          }
          .tab{
            border-bottom: 1px solid #e7e8ec;
            width: 100%;
            height: 50px;
            display: flex;
            span{
              display: inline-block;
              flex: 1;
              text-align: center;
              i{
                display: inline-block;
                height: 50px;
                line-height: 50px;
                padding: 0 20px;
                border-bottom: 2px solid transparent;
                cursor: pointer;
                &.active{
                  color: #ffba14;
                  border-bottom: 2px solid #ffba14;
                }
              }
            }
          }
          ul{
            li{
              height: 44px;
              border-bottom: 1px solid #e7e8ec;
              display: flex;
              align-items: center;
              padding: 0 30px;
              i{
                display: inline-block;
                width: 18px;
                height: 18px;
                border: 1px solid #e7e8ec;
                border-radius: 50%;
                margin-right: 20px;
                &.select{
                  background-image: url("../../../assets/images/finance/complete_1.png");
                }
              }
              span{
                color: #1a1a1a;
                font-size: 16px;
              }
            }
          }
        }

      }
    }
    .address,.phone,.money{
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      height: 50px;
      align-items: center;
      &>span{
        color: #1a1a1a;
        font-size: 16px;
      }
      .right{
        width: 440px;
        height: 50px;
        position: relative;
        input{
          width: 100%;
          padding:0 20px;
          color: #999;
          font-size: 16px;
          height: 50px;
          border: 1px solid #e7e8ec;
        }
        .errorMsg{
          font-size: 14px;
          line-height: 30px;
          position: absolute;
          color: #F75050;
          top: 50px;
          left: 20px;
        }
      }
    }
    .btn{
      width: 200px;
      color: #fff;
      background-color: #ffba14;
      height: 50px;
      border-radius: 4px;
      margin-left: 120px;
      text-align: center;
      line-height: 50px;
      margin-top: 60px;
    }
  }
}
</style>
