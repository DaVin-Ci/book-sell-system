import Layout from '@/layout'

// 处理JSON菜单数据(JSON格式的String -> 组件Component, 直接赋值为字符串类型会报错)
// export function parseMenus(menus, isParent) {
//   if (menus && menus.length > 0) {
//     const menusList = []
//     for (let i = 0; i < menus.length; i++) {
//       const obj = {}
//       obj.path = menus[i].path
//       obj.name = menus[i].name
//       obj.redirect = menus[i].redirect
//       obj.meta = menus[i].meta
//       if (menus[i].component === 'Layout') {
//         obj.component = Layout
//       } else {
//         const component = menus[i].component
//         obj.component = (resolve) => require([`@/views/${component}`], resolve) // 注意这里只能用require而不能用import
//       }
//       // 注意 (嵌套)子菜单的递归方法 处理
//       if (isParent) {
//         obj.children = parseMenus(menus[i].children, true)
//       }
//       menusList.push(obj)
//     }

//     return menusList
//   }
//   return null
// }

export function subMenu(menus) {
  const arr = []
  if (menus && menus.length > 0) {
    for (let i = 0; i < menus.length; i++) {
      const obj = {}
      obj.path = menus[i].path
      obj.name = menus[i].name
      obj.redirect = menus[i].redirect
      obj.meta = menus[i].meta
      if (menus[i].component === 'Layout') {
        obj.component = Layout
      } else {
        const component = menus[i].component
        obj.component = (resolve) => require([`@/views/${component}`], resolve) // 注意这里只能用require而不能用import
      }
      // 注意 (嵌套)子菜单的递归方法 处理
      obj.children = subMenu(menus[i].children)
      arr.push(obj)
    }

    return arr
  }
}