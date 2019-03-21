import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path: '/login',
      component: () => import('./views/login/index')
    }
  ]
})
