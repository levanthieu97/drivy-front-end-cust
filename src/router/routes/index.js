import _ from 'lodash';

const DEFAULT_ROUTES = [
  {
    path: '*',
    meta: {
      title: 'Not Found'
    },
    redirect: {
      path: '/404'
    }
  },
  {
    path: '/403',
    meta: {
      title: 'Access Denied'
    },
    name: 'AccessDenied',
    component: () => import('modules/pages/Deny.vue')
  },
  {
    path: '/404',
    meta: {
      title: 'Not Found'
    },
    name: 'NotFound',
    component: () => import('modules/pages/NotFound.vue')
  },
  {
    path: '/500',
    meta: {
      title: 'Internal Error Server'
    },
    name: 'ServerError',
    component: () => import('modules/pages/Error.vue')
  },
  // {
  //   path: '/',
  //   redirect: {
  //     path: '/dashboard'
  //   }
  // },
  {
    path: '/',
    // meta: {
    //   requiresAuth: false
    // },
    name: 'Dashboard',
    component: require('modules/dashboard').default
  },
  {
    path: '/category/:category',
    meta: {
      title: 'Danh mục'
    },
    name: 'category',
    component: () => import('modules/category')
  },
  {
    path: '/product/:product',
    meta: {
      title: 'Sản phẩm'
    },
    name: 'product',
    component: () => import('modules/products')
  },
  {
    path: '/search',
    meta: {
      title: 'Tìm kiếm sản phẩm'
    },
    props: route => ({ query: route.query.productName }),
    component: () => import('modules/searchs')
  },
  {
    path: '/cart',
    meta: {
      title: 'Giỏ hàng | Drivy',
      requiresAuth: true
    },
    name: 'cart',
    component: () => import('modules/cart')
  },
  {
    path: '/check-out',
    meta: {
      title: 'Thông tin giao hàng',
      requiresAuth: true
    },
    component: () => import('modules/checkout')
  },
  {
    path: '/list-item/:item',
    meta: {
      title: 'Drivy'
    },
    name: 'item',
    component: () => import('modules/list-item')
  },
  {
    path: '/confirm-order',
    meta: {
      title: 'Xin Cảm Ơn',
      requiresAuth: true
    },
    component: () => import('modules/confirm-order')
  }

  // {
  //   path:'/checkout',
  //   redirect:{
  //     path: '/checkout'
  //   }
  // },
  // {
  //   path: '/checkout',
  //   name: 'Giỏ hàng',
  //   component: () => import('modules/checkout'),
  //   meta: {
  //     title: 'Giỏ hàng'
  //   }
  // },
  //   {
  //     path: '/register',
  //     meta: {
  //       title: 'Đăng ký bán hàng cùng TP Shop'
  //     },
  //     name: 'Register',
  //     component: () => import('modules/register')
  //   }
];

export default DEFAULT_ROUTES;
