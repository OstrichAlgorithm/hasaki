import router from './router'
import store from './store'
import Performance from '@/tools/performance'

var end = null
const whiteList = ['/picker', ] // 不重定向白名单
router.beforeEach((to, from, next) => {
  end = Performance.startExecute(`${from.path} => ${to.path} 路由耗时`) /// 路由性能监控

  if (store.getters.token) {
    if (to.path === '/picker') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/picker')
    }
  }
  setTimeout(() => {
    end()
  }, 0)
})

router.afterEach(() => { })
