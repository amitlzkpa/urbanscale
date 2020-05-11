import Vue from 'vue';
import VueRouter from 'vue-router';
import urbanscale from '../components/urbanscale.vue';
import login from '../components/login.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: urbanscale
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
});
