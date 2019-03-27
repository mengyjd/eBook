import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/store/shelf'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index.vue'),
      children: [
        {
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader.vue')
        }
      ]
    },
    {
      path: '/store',
      component: () => import('./views/store/index.vue'),
      children: [
        {
          path: 'shelf',
          meta: { key: 10 },
          component: () => import('./views/store/StoreShelf.vue')
        },
        {
          path: 'home',
          meta: { key: 20 },
          component: () => import('./views/store/StoreHome.vue')
        },
        {
          path: 'detail',
          meta: { key: 30 },
          component: () => import('./views/store/StoreDetail.vue')
        },
        {
          path: 'list',
          meta: { key: 40 },
          component: () => import('./views/store/BookList.vue')
        },
        {
          path: 'group',
          meta: { key: 20 },
          component: () => import('./views/store/ShelfGroup.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('./views/user/index.vue'),
      redirect: '/login',
      children: [
        {
          path: '/login',
          component: () => import('./views/user/login.vue')
        },
        {
          path: '/register',
          component: () => import('./views/user/register.vue')
        },
        {
          path: ':username',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: () => import('./views/user/userInfo.vue')
        }
      ]
    }
  ]
})
