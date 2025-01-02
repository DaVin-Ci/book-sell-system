const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  visitedViews: state => state.tagsViews.visitedViews,
  cachedViews: state => state.tagsViews.cachedViews,
  permission_routes: state => state.permission.routes
}
export default getters