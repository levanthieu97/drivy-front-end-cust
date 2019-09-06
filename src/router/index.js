'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';

import store from 'store';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  routes
});

// router.beforeEach(async (to, from, next) => {
//   let isCart = to.matched.some(p => p.path.indexOf('/cart') === 0);
//   try {
//     console.log(isCart);
//     // let isAuthenticated = store.getters['dashboard/isAuthenticated'];
//     // let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//     if (isCart === true) {
//       console.log("abc");
//       return next('/');
//     }else{
//       return next('')
//     }

//   } catch (err) { }

// })

router.afterEach(async (to, from, next) => {
  document.title = to.meta.title || 'Drivy';
  NProgress.start();
  store.dispatch('global/setLoading', false);

  let isLoginPage = to.matched.some(p => p.path.indexOf('/cart') === 0);
  //   let isRegisTer = to.matched.some(p => p.path.indexOf('/register') === 0);

  try {
    // let role = store.getters['login/role'];
    // if (!requiresAuth) {
    //   if (isAuthenticated) return next('/');
    //   return next();
    // }
    // if (isRegisTer && !requiresAuth) {
    //   return next('/');
    // }
    // if (requiresAuth && !isAuthenticated) {
    //   if (isLoginPage) return next();
    //   return next('/');
    // } else next('/');
  } catch (err) {}
});

// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
