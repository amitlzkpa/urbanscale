import Vue from 'vue';
import Vuex from 'vuex';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import { Auth0Plugin } from "./auth";

import Portis from "@portis/web3";
import Web3 from "web3";

Vue.use(Vuex);

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(Buefy, { defaultIconPack: 'fas' });

Vue.prototype.ETH_TO_USD = 203;
Vue.prototype.USD_TO_ETH = 1/Vue.prototype.ETH_TO_USD;

const store = new Vuex.Store({
  state: {
    web3: null
  },
  mutations: {
    web3Provider (state, web3) {
      state.web3 = web3;
    }
  },
  getters: {
    web3: state => state.web3
  }
});

async function main() {

  let resp = await axios.get('/api/auth0-secrets');
  let secrets = resp.data;
  let domain = secrets.AUTH0_DOMAIN;
  let clientId = secrets.AUTH0_CLIENT_ID;

  await window.ethereum.enable();
  Vue.prototype.mmask_Web3 = new Web3(window.web3.currentProvider);

  Vue.prototype.portis_Web3 = new Web3(new Portis('c9972761-699b-441e-a522-56b5bc729b65', 'ropsten').provider);

  Vue.prototype.web3 = Vue.prototype.portis_Web3;

  Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: appState => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    }
  });
  
  Vue.config.productionTip = false;
  
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');

  store.commit("web3Provider", Vue.prototype.portis_Web3);

}

main();