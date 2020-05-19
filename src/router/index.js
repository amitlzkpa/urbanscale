import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Profile from '@/views/Profile.vue';
import CreateListing from '@/views/CreateListing.vue';
import ViewListing from '@/views/ViewListing.vue';
import ManageListing from '@/views/ManageListing.vue';
import ViewAllListing from '@/views/ViewAllListing.vue';

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
      component: CreateListing,
      beforeEnter: authGuard
    },
    {
      path: '/view/:cusipNo',
      name: 'view',
      component: ViewListing,
      beforeEnter: authGuard
    },
    {
      path: '/manage/:cusipNo',
      name: 'manage',
      component: ManageListing,
      beforeEnter: authGuard
    },
    {
      path: '/listings',
      name: 'view-all',
      component: ViewAllListing
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