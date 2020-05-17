import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Profile from '@/views/Profile.vue';
import Create from '@/views/Create.vue';

import { authGuard } from "@/auth/authGuard";

Vue.use(VueRouter);


const router =  new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
      beforeEnter: authGuard
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
});


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  
  document.title = "UrbanScale";

  next();
});


export default router;