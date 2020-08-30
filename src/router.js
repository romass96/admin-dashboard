import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: 'auth',
        requiredAuth: false
      },
      component: () => import('./views/Login.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/createCategory',
      name: 'create-category',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/CreateCategory.vue')
    },
    {
      path: '/viewCategory',
      name: 'view-category',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/ViewCategory.vue')
    },
    {
      path: '/editCategory',
      name: 'edit-category',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/EditCategory.vue')
    },
    {
      path: '/products',
      name: 'products',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/Products.vue')
    },
    {
      path: '/createProduct',
      name: 'create-product',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/CreateProduct.vue')
    },
    {
      path: '/viewProduct',
      name: 'view-product',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/ViewProduct.vue')
    },
    {
      path: '/editProduct',
      name: 'edit-product',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/EditProduct.vue')
    },
    {
      path: '*',
      name: 'pageNotFound',
      meta: {
        layout: 'main',
        requiredAuth: true
      },
      component: () => import('./views/PageNotFound.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = store.state.AuthModule.user;
  const requiredAuth = to.matched.some(record => record.meta.requiredAuth);

  if (requiredAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
