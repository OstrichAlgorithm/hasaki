import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
// 引用element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission'
// 日志
import './error'
import './icons'
import '@/styles/index.scss'
import '@/styles/dark-mode.scss'

// 引入 i18n 语言包
import VueI18n from 'vue-i18n'
import loadLanguage from "./i18n"
const languages = loadLanguage()

if (!process.env.IS_WEB) {
  if (!require('../../config').IsUseSysTitle) {
    require('@/styles/custom-title.scss')
  }
}

// renderer/index.js
// 如果是多页面程序，且需要统计每个页面流量的话
// 则需要在每个页面加下面的代码
// 代码尽量靠前

// import Vue from 'vue'
// import Router from 'vue-router'
// import routerConfig from './router/router-config.js'
import { ipcRenderer } from 'electron'
import { ebtRenderer } from 'electron-baidu-tongji'

// 替换为你自己的 百度统计 siteId
const BAIDU_SITE_ID = 'e57bc909ef54c356798319a0097d0fa9'

// Vue.use(Router)

// const router = new Router(routerConfig)

// 百度统计
console.log('--------e57bc909ef54c356798319a0097d0fa9----------') 
ebtRenderer(ipcRenderer, BAIDU_SITE_ID)
// ebtRenderer(ipcRenderer, BAIDU_SITE_ID, router)
console.log('--------e57bc909ef54c356798319a0097d0fa9----------') 









// 创建 i18n
Vue.use(VueI18n) // 新版本必须要这个，不知道为什么
const i18n = new VueI18n({
  locale: 'zh-CN', // 设置默认语言
  messages: languages, // 设置语言包
});

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
/* eslint-disable no-new */
const vue = new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')

export default vue
