import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条 style
import { getToken } from '@/utils/auth' // 从Cookie中获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // N配置进度条

const whiteList = ['/login'] // 不需要权限 可以直接跳转的 白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开启进度条

  document.title = getPageTitle(to.meta.title) // 获取页面title

  const hasToken = getToken() // 获取token，判断当前用户是否已经登陆

  if (hasToken) {
    if (to.path === '/login') { // 存在token说明已经登录了，此时前往 login 页面需要重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')

          // 根据用户信息中的角色权限列表，去生成对应的路由表
          const role = store.getters.roles
          const accessedRoutes = await store.dispatch('permission/generateRoutes', role)

          router.addRoutes(accessedRoutes) // 动态挂载到路由当中

          next({ ...to, replace: true }) // replace设置为true，重新进入当前页面，进行权限判断
        } catch (error) {
          console.log("[src/permission/error]", error);
          // 获取信息失败，需要移除token，并且重定向到登录页 进行重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          console.log("[message]弹窗提示", error);
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 没有token的情况

    if (whiteList.indexOf(to.path) !== -1) {
      // 对于白名单当中的页面，不需要权限，可以直接跳转
      next()
    } else {
      // 没有token，且访问的页面需要权限，则重定向到登录页，进行登录
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 进度条加载完毕
  NProgress.done()
})
