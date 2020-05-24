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
        <div class="level-item" v-if="$auth.dbUser._id === listing.createdBy">
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
        <b-tooltip label="Total amount" :delay="200">
          <b-field :label="'$ ' + Math.ceil(this.tokensToBuy * (this.listing.principal / this.listing.tokenSupply))">
          </b-field>
        </b-tooltip>
      </div>

      <div class="column is-narrow">

        <b-tooltip label="Buy" :delay="200">
          <b-button @click="buyTokens">
            Buy
          </b-button>
        </b-tooltip>

      </div>

    </div>

    <hr />

    <div class="columns">
      <div class="column">
    
        <b-field label="Recent Purchases">
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

import ListingCard from '@/components/ListingCard.vue';
import PurchaseCardList from '@/components/PurchaseCardList.vue';

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
      tokensToBuy: 0,
      ready: false,
      purchases: [],
      isLoading: false,
    }
  },
  async mounted() {
    let resp = await axios.get(`/api/listing/cusipNo/${this.$route.params.cusipNo}`);
    this.listing = resp.data;
    let abiRes = await axios.get("/contracts/FundToken.abi");
    abiDefinition = abiRes.data;
    this.purchases = (await axios.get(`/api/purchase/listing/${this.listing._id}`)).data;
    this.ready = true;
  },
  methods: {
    async buyTokens() {

      try {

        this.isLoading = true;
        let web3 = this.$store.getters.web3;

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

        
      } catch(ex) {
        console.log(ex);
      } finally {
        this.isLoading = false;
      }

    }
  }
}
</script>

<style>

</style>