// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable*/
import Vue from 'vue'
import store from './vuex/store'
import { i18n } from './i18n/config'
import App from './App'
import router from './router'
import './assets/css/mixin.styl'
import axios from 'axios'
import clipboard from 'clipboard' // 复制插件
// 引入echarts
import echarts from 'echarts'
// 引用post请求方法
import postAxios from './api/api'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$echarts = echarts

Vue.prototype.$utf16to8 = function (str) { // 二维码转码
  var out, i, len, c
  out = ''
  len = str.length
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}
axios.defaults.withCredentials = true // 存cookie
Vue.prototype.$http = axios
Vue.prototype.$postAxios = postAxios
Vue.prototype.$api = 'http://wallet.pigamegroup.com/'
Vue.prototype.$api2 = 'http://boss.pigamegroup.com/'
Vue.prototype.Clipboard = clipboard

Vue.config.productionTip = false
// 时间戳转换
Vue.prototype.$changeDate = function (time, str = '-', type = 1) {
  function ifTime (value) { // 判断时间是否是个位数
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  let newTime = new Date(time)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let hours = newTime.getHours()
  let min = newTime.getMinutes()
  let sec = newTime.getSeconds()
  switch (type) {
    case 1:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min)
    case 2:
      return year + str + ifTime(month) + str + ifTime(day) + ' 00:00:00'
    case 3:
      return year + str + ifTime(month) + str + ifTime(day) + ' 23:59:59'
    case 4:
      return year + str + ifTime(month) + str + ifTime(day)
    case 5:
      return year + str + ifTime(month) + str + ifTime(day)
    case 6:
      return ifTime(hours) + ':' + ifTime(min)
    case 7:
      return ifTime(hours) + ':' + ifTime(min) + ':' + ifTime(sec)
    case 8:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min) + ':' + ifTime(sec)
  }
}
// 截取四位小数, 并格式化金额
Vue.filter('formattingMoney', function (value, tag = '') {
  if (!value) {
    return '0.0000'
  } else {
    if (!isNaN(value) && value !== null) {
      if (value < 0) {
        // 小于零  取绝对值 后连接减号
        value = Math.abs(value)
        let f = Math.floor(value * 100) * 100 / 10000
        let _value = f.toString()
        let rs = _value.indexOf('.')
        if (rs < 0) {
          rs = _value.length
          _value += '.'
        }
        while (_value.length <= rs + 4) {
          _value += '0'
        }
        let newStr = _value.split('.')
        if (newStr[0].length <= 3) {
          return newStr[0] + '.' + newStr[1]
        }
        let r = newStr[0].length % 3
        _value = r > 0 ? newStr[0].slice(0, r) + tag + newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag) : newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag)
        _value = _value + '.' + newStr[1]
        return '-' + _value
      } else {
        let f = Math.floor(value * 100) * 100 / 10000
        let _value = f.toString()
        let rs = _value.indexOf('.')
        if (rs < 0) {
          rs = _value.length
          _value += '.'
        }
        while (_value.length <= rs + 4) {
          _value += '0'
        }
        let newStr = _value.split('.')
        if (newStr[0].length <= 3) {
          return newStr[0] + '.' + newStr[1]
        }
        let r = newStr[0].length % 3
        _value = r > 0 ? newStr[0].slice(0, r) + tag + newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag) : newStr[0].slice(r, newStr[0].length).match(/\d{3}/g).join(tag)
        _value = _value + '.' + newStr[1]
        return _value
      }
    }
  }
})

Vue.filter('fourNumber', function (value) { // 保留4位小数点,不四舍五入
  if (!isNaN(value) && value !== null) {
    let f = Math.floor(value * 10000) / 10000
    let s = f.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 4) {
      s += '0'
    }
    return s
  }
})

// 解析奖励类型
Vue.filter('parseRewardType', (value) => {
  let lang = 'CN'
  if (window.localStorage.getItem('kleinLang')) {
    lang = window.localStorage.getItem('kleinLang')
  } else {
    lang = 'CN'
  }
  switch (value) {
    case 1:
      return i18n.vm.messages[lang].orderManage.text15
    case 2:
      return i18n.vm.messages[lang].orderManage.text16
    case 3:
      return i18n.vm.messages[lang].orderManage.text17
    case 4:
      return i18n.vm.messages[lang].orderManage.text18
    default:
      return ' '
  }
})
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
