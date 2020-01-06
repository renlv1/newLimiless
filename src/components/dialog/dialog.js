/*
  * 公共弹窗组件
  * @param {Option}
  * 调用方式
  * import Dialog from '@/components/dialog/dialog'
  * Dialog({option})
*/

import Vue from 'vue'
import dialogVue from './dialog.vue'

let defaults = {
  type: 'alert', // 弹框类型 alert、confirm
  title: '提示', // 标题
  content: '内容提示文字', // 内容文字
  okText: '确定', // 确定按钮文字
  cancleText: '取消', // 取消按钮文字
  okFn: null, // 确定按钮回调函数
  cancleFn: null, // 取消按钮回调函数
  align: 'center' // 内容文字对齐方式
}
let instance = null
let DialogConstructor = Vue.extend(dialogVue)
let initInstance = () => {
  instance = null
  instance = new DialogConstructor({
    el: document.createElement('div')
  })
}

const Dialog = (options = {}) => {
  initInstance()
  let mergeOptions = Object.assign({}, defaults, options)

  Object.keys(mergeOptions).forEach(prop => {
    instance[prop] = mergeOptions[prop]
  })

  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
  })
}

export default Dialog
