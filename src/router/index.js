import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/IndexView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/frontend/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/frontend/ProductView.vue')
      },
      {
        path: 'game',
        component: () => import('../views/frontend/GameView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/CartView.vue')
      },
      {
        path: 'order',
        component: () => import('../views/frontend/OrderView.vue')
      },
      {
        path: 'pay',
        component: () => import('../views/frontend/PayView.vue')
      },
      {
        path: 'finish',
        component: () => import('../views/frontend/FinishView.vue')
      },
      {
        path: 'favorite',
        component: () => import('../views/frontend/FavoriteView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashBoard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/dashboard/AdminProducts.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/AdminOrders.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/dashboard/CouponsView.vue')
      }
    ]
  },
  {
    path: '/log-in',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  path: '/:pathMatch(.*)*'
})

export default router
