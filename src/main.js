import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import { Auth0Plugin } from "./auth";

Vue.use(Buefy)

async function main() {

  let resp = await axios.get('/api/auth0-secrets');
  let secrets = resp.data;
  let domain = secrets.AUTH0_DOMAIN;
  let clientId = secrets.AUTH0_CLIENT_ID;

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
    render: h => h(App),
  }).$mount('#app');


}

main();