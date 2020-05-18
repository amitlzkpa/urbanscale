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
          expanded
          controlsPosition="compact"
        />

      </div>

      <div class="column is-narrow">

        <b-button @click="buyToken">
          <b-icon
            pack="fas"
            icon="shopping-cart"
            size="is-small">
          </b-icon>
          Buy
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

const portis = new Portis('c9972761-699b-441e-a522-56b5bc729b65', 'mainnet');
const portisWeb3 = new Web3(portis.provider);

let web3;

export default {
  name: 'ViewListing',
  components: {
    ListingCard
  },
  data() {
    return {
      listing: null,
      contract: null,
      tokensToBuy: 0,
      ready: false
    }
  },
  async created() {
    let resp = await axios.get(`/api/listing/cusipNo/${this.$route.params.cusipNo}`);
    this.listing = resp.data;
    this.ready = true;
    console.log(portisWeb3);
  },
  methods: {
    async buyToken() {

      try {

        let rate = this.listing.principal / this.listing.tokenSupply;
        let tokens = Math.floor(this.tokensToBuy);
        let total = rate * tokens;

        let acc = (await web3.eth.getAccounts())[0];
        let send = Math.ceil(total * 1.1);

        let options = {
          from: acc,
          value: send
        };

        this.$buefy.toast.open('Submitting your request. Please stay on this page.');
        
        let tx = await this.contract.methods.buy(tokens).send(options);
        console.log(tx);
        
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