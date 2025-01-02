import { constantRoutes } from '@/router'
import { parseMenus, subMenu } from '@/utils/routes'
import store from '..'
import Layout from '@/layout'

/**
 * 通过meta.role字段判断当前用户的角色是否有权限访问该路由
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 采取前端过滤后端返回的全局路由表的方式，筛选出所有当前用户可以访问的路由生成路由表
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // console.log("走到了合并！！！");
    // 把静态路由和动态路由合并到一起
    state.routes = constantRoutes.concat(routes)
    console.log('【after】合并之后的路由', state.routes);
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      let asyncRoutes = []
      // 向后端异步请求获取动态路由(在用户登录的时候已经存储进了state)
      const originMenu = store.getters.menus

      if (originMenu && originMenu.length > 0) {
        let menuList = []
        for (let i = 0; i < originMenu.length; i++) {
          const obj = {}
          obj.path = originMenu[i].path
          obj.name = originMenu[i].name
          obj.redirect = originMenu[i].redirect
          obj.meta = originMenu[i].meta
          if (originMenu[i].component === 'Layout') {
            obj.component = Layout
          } else {
            const component = originMenu[i].component
            obj.component = (resolve) => require([`@/views/${component}`], resolve)
          }
          obj.children = subMenu(originMenu[i].children)
          menuList.push(obj)
        }
        asyncRoutes = menuList
      }

      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}