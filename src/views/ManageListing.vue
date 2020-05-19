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
      <div class="column">

        <p class="has-text-grey is-italic">
          Deploying Address: {{ deployer }}
        </p>

      </div>
    </div>

    <hr />

    <div class="columns">
      <div class="column">
    
        <span class="has-text-weight-bold">
          Unsold Tokens:
        </span>
        <span class="has-text-grey">
          {{ parseInt(unsold).toLocaleString() }}
        </span>
    
        <b-field label="Recent Sales">
        </b-field>
        
        <PurchaseCardList :purchases="purchases" />

      </div>

      <div class="column">
      </div>

    </div>
    
  </div>
</template>

<script>
import axios from 'axios';
import Web3 from 'web3';
import PurchaseCardList from '@/components/PurchaseCardList.vue';

import ListingCard from '@/components/ListingCard.vue';

let abiDefinition;

export default {
  name: 'ViewListing',
  components: {
    ListingCard,
    PurchaseCardList
  },
  data() {
    return {
      listing: null,
      ready: false,
      isLoading: false,
      contract: null,
      deployer: null,
      unsold: null,
      purchases: []
    }
  },
  async mounted() {
    let resp = await axios.get(`/api/listing/cusipNo/${this.$route.params.cusipNo}`);
    this.listing = resp.data;
    let abiRes = await axios.get("/contracts/FundToken.abi");
    abiDefinition = abiRes.data;
    await window.ethereum.enable();
    let web3 = new Web3(window.web3.currentProvider);
    this.contract = new web3.eth.Contract(abiDefinition, this.listing.contractAddress);
    this.deployer = await this.contract.methods.deployer().call();
    this.unsold = await this.contract.methods.balanceOf(this.deployer).call();
    this.purchases = (await axios.get(`/api/purchase/listing/${this.listing._id}`)).data;
    console.log(this.purchases);
    this.ready = true;
  },
  methods: {
  }
}
</script>

<style>

</style>