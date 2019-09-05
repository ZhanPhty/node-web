export default function({ route, store, redirect }) {
  if (route.meta.length > 0 && route.meta[0].requireAuth) {
    if (!store.state.login.isLogin) {
      redirect('/login')
    }
  }
}
