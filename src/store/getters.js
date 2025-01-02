const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  visitedViews: state => state.tagsViews.visitedViews,
  cachedViews: state => state.tagsViews.cachedViews,
  permission_routes: state => { console.log("[getter]##############", state.permission.routes); return state.permission.routes; }
}
export default getters
