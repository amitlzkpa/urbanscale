<template>
  <div v-if="ready">

    <div class="columns">
      <div class="column">
        <i class="has-text-grey">
          CUSIP: {{ listing.cusipNo }} / EMMA: {{ listing.emmaId }}
        </i>
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
          :step="Math.ceil(listing.tokenSupply/1000)"
          expanded
          controlsPosition="compact"
        />

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
      ready: false
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
    async buyTokenThroughMetaMask() {

      try {

        await window.ethereum.enable();
        let web3 = new Web3(window.web3.currentProvider);
        let contract = new web3.eth.Contract(abiDefinition, this.listing.contractAddress);

        let rate = this.listing.principal / this.listing.tokenSupply;
        let tokens = Math.floor(this.tokensToBuy);
        let total = rate * tokens;
        let sendVal = Math.ceil(total);

        let acc = (await web3.eth.getAccounts())[0];

        let options = {
          from: acc,
          value: sendVal
        };

        this.$buefy.toast.open('Submitting your request. Please stay on this page.');
        
        let tx = await contract.methods.buy(tokens).send(options);
        console.log(tx);
        
        this.$buefy.toast.open({
          message: 'Successflly bought!',
          type: 'is-success'
        });

      } catch(exc) {
        console.log(exc);
      }

      
    },
    async buyTokenThroughPortis() {
      
      try {

        let portis = new Portis('c9972761-699b-441e-a522-56b5bc729b65', 'ropsten');
        let portisWeb3 = new Web3(portis.provider);
        let contract = new portisWeb3.eth.Contract(abiDefinition, this.listing.contractAddress);

        let rate = this.listing.principal / this.listing.tokenSupply;
        let tokens = Math.floor(this.tokensToBuy);
        let total = rate * tokens;
        let sendVal = Math.ceil(total);
        
        let acc = (await portisWeb3.eth.getAccounts())[0];

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
        
      } catch(exc) {
        console.log(exc);
      }

    }
  }
}
</script>

<style>

</style>