<template>
  <div v-if="ready">
    
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>

    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <p class="has-text-grey is-italic">
            CUSIP: {{ listing.cusipNo }} / EMMA: {{ listing.emmaId }}
          </p>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item" v-if="$auth.dbUser && $auth.dbUser.permissions.admin">
          <i class="has-grey-text">
            <router-link :to="{ name: 'manage', params: { cusipNo: listing.cusipNo } }">
              Manage
            </router-link>
          </i>
        </div>
         
        <div class="level-item">
          <i class="has-grey-text">
            <a :href="'https://emma.msrb.org/Security/Details/' + listing.emmaId" target="_blank">Check on EMMA</a>
          </i>
        </div>
      </div>
    </div>
    
    <ListingCard :listing="listing" />

    <hr />

    <div class="columns">

      <div class="column is-narrow" style="margin-top: 6px;">

        <b-field label="Tokens">
        </b-field>

      </div>
      
      <div class="column">

        <b-numberinput
          v-model="tokensToBuy"
          min=1
          step=10
          expanded
          controlsPosition="compact"
        />

      </div>

      <div class="column is-narrow" style="margin-top: 6px;">
        
        <b-field :label="'$ ' + Math.ceil(this.tokensToBuy * (this.listing.principal / this.listing.tokenSupply))">
        </b-field>
      </div>

      <div class="column is-narrow">

        <b-button @click="buyTokenThroughMetaMask">
          <b-icon
            pack="fas"
            icon="shopping-cart"
            size="is-small">
          </b-icon>
          Buy
        </b-button>

      </div>

      <div class="column is-narrow">

        <b-button @click="buyTokenThroughPortis">
          <b-icon
            pack="fas"
            icon="plus"
            size="is-small">
          </b-icon>
          Portis
        </b-button>

      </div>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';
import Portis from '@portis/web3';
import Web3 from 'web3';

import ListingCard from '@/components/ListingCard.vue';

let abiDefinition;

export default {
  name: 'ViewListing',
  components: {
    ListingCard
  },
  data() {
    return {
      listing: null,
      tokensToBuy: 0,
      ready: false,
      isLoading: false,
    }
  },
  async created() {
    let resp = await axios.get(`/api/listing/cusipNo/${this.$route.params.cusipNo}`);
    this.listing = resp.data;
    let abiRes = await axios.get("/contracts/FundToken.abi");
    abiDefinition = abiRes.data;
    this.ready = true;
  },
  methods: {
    async executeOrder(web3) {

      let contract = new web3.eth.Contract(abiDefinition, this.listing.contractAddress);

      let rate = this.listing.principal / this.listing.tokenSupply;
      let tokens = Math.floor(this.tokensToBuy);
      let total = rate * tokens;
      let sendVal = web3.utils.toWei((Math.ceil(total) * this.USD_TO_ETH).toString());

      let acc = (await web3.eth.getAccounts())[0];

      let options = {
        from: acc,
        value: sendVal
      };

      this.$buefy.toast.open('Submitting your request. Please stay on this page.');
      
      let tx = await contract.methods.buy(tokens).send(options);
      console.log(tx);

      let postBody = {
        user: this.$auth.user,
        listingId: this.listing._id,
        tokens: tokens,
        ownerEthAccAddress: acc,
        txHash: tx.transactionHash
      };
    
      let p = await axios.post('/api/purchase', postBody);
      console.log(p);
      

      this.$buefy.toast.open({
        message: 'Successflly bought!',
        type: 'is-success'
      });

    },
    async buyTokenThroughMetaMask() {

      try {

        this.isLoading = true;
        await window.ethereum.enable();
        let mmaskWeb3 = new Web3(window.web3.currentProvider);

        this.executeOrder(mmaskWeb3);

      } catch(exc) {
        console.log(exc);
      } finally {
        this.isLoading = false;
      }

      
    },
    async buyTokenThroughPortis() {
      
      try {

        this.isLoading = true;
        let portis = new Portis('c9972761-699b-441e-a522-56b5bc729b65', 'ropsten');
        let portisWeb3 = new Web3(portis.provider);

        this.executeOrder(portisWeb3);
        
      } catch(exc) {
        console.log(exc);
      } finally {
        this.isLoading = false;
      }

    }
  }
}
</script>

<style>

</style>