import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/IndexView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'game',
        component: () => import('../views/GameView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'order',
        component: () => import('../views/OrderView.vue')
      },
      {
        path: 'pay',
        component: () => import('../views/PayView.vue')
      },
      {
        path: 'finish',
        component: () => import('../views/FinishView.vue')
      },
      {
        path: 'favorite',
        component: () => import('../views/FavoriteView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponsView.vue')
      }
    ]
  },
  {
    path: '/log-in',
    component: () => import('../views/LogIn.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
