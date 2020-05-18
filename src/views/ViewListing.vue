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
import ListingCard from '@/components/ListingCard.vue';

import Web3 from 'web3';

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
    try {
      if(window.ethereum) {
        await window.ethereum.enable();
        web3 = new Web3(window.web3.currentProvider);
      }
      let resp = await axios.get(`/api/listing/cusipNo/${this.$route.params.cusipNo}`);
      this.listing = resp.data;
      
      let abiRes = await axios.get("/contracts/FundToken.abi");
      let abiDefinition = abiRes.data;
      this.contract = new web3.eth.Contract(abiDefinition, this.listing.contractAddress);

      this.ready = true;

    } catch(exc) {
      console.log(exc);
    }
  },
  methods: {
    async buyToken() {

      try {

        let rate = this.listing.principal / this.listing.tokenSupply;
        let tokens = Math.floor(this.tokensToBuy);
        let total = rate * tokens;
        console.log(`${tokens} token @ ${rate} => ${total}`);

        let acc = (await web3.eth.getAccounts())[0];

        let options = {
          from: acc,
          value: Math.ceil(total * 1.1)
        };
        let tx = await this.contract.methods.buy(tokens).send(options);
        console.log(tx);

      } catch(exc) {
        console.log(exc);
      }

      
    }
  }
}
</script>

<style>

</style>