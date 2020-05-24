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
      <div class="column">


        <div class="columns">
          <div class="column">
            <span class="has-text-weight-bold">
              Unsold Tokens:
            </span>
            <span class="has-text-grey">
              {{ parseInt(unsold).toLocaleString() }}
            </span>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <span class="has-text-weight-bold">
              Tokens to add:
            </span>
            <b-field>
              <b-numberinput
                v-model="tokensToAdd"
                min=0
                expanded
                controlsPosition="compact"
              />
              <p class="control">
                <button class="button is-static">$ {{ dollarValue.toFixed(2) }}</button>
              </p>
            </b-field>
          </div>
        </div>

        <b-button
          v-if="!hasTradingEnabled"
          size="is-large"
          type="is-primary"
          :disabled="tokensToAdd < 1"
          expanded
          @click="createExchange">
            Enable Trading
        </b-button>

        <b-button
          v-else
          size="is-large"
          type="is-primary"
          :disabled="tokensToAdd < 1"
          expanded
          outlined
          @click="addFunds">
            Add Funds
        </b-button>

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
import Web3 from 'web3';
import PurchaseCardList from '@/components/PurchaseCardList.vue';

import ListingCard from '@/components/ListingCard.vue';

let listingABI;
let uniswapABI;
let exchangeABI;
let uniswapRopsten = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351';
let uniswapFctContract;

let web3;

// approve(delegateAddress, numTokens)
// transfer(receiverAddress, numTokens)
// transferFrom(ownerAddress, receiverAddress, numTokens)
// allowance(ownerAddress, delegateAddress)
// balanceOf(address)

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
      tokensToAdd: 0,
      exchangeAddress: null,
      purchases: []
    }
  },
  async mounted() {
    let resp = await axios.get(`/api/listing/cusipNo/${this.$route.params.cusipNo}`);
    this.listing = resp.data;
    let listingABIRes = await axios.get("/contracts/FundToken.abi");
    listingABI = listingABIRes.data;
    let uniswapABIRes = await axios.get("/contracts/UniswapFactory.abi");
    uniswapABI = uniswapABIRes.data;
    let exchangeABIRes = await axios.get("/contracts/UniswapExchange.abi");
    exchangeABI = exchangeABIRes.data;
    await window.ethereum.enable();
    web3 = new Web3(window.web3.currentProvider);
    this.contract = new web3.eth.Contract(listingABI, this.listing.contractAddress);
    this.deployer = await this.contract.methods.deployer().call();
    this.unsold = await this.contract.methods.balanceOf(this.deployer).call();
    this.purchases = (await axios.get(`/api/purchase/listing/${this.listing._id}`)).data;
    uniswapFctContract = new web3.eth.Contract(uniswapABI, uniswapRopsten);
    this.exchangeAddress = await uniswapFctContract.methods.getExchange(this.listing.contractAddress).call();
    this.ready = true;
  },
  computed: {
    hasTradingEnabled() {
      return this.exchangeAddress !== "0x0000000000000000000000000000000000000000";
    },
    dollarValue() {
      return this.tokensToAdd * (this.listing.principal / this.listing.tokenSupply);
    }
  },
  methods: {
    async createExchange() {
      let acc = (await web3.eth.getAccounts())[0];

      let options = {
        from: acc
      };
      
      let ex = await uniswapFctContract.methods.createExchange(this.listing.contractAddress).send(options);

      console.log(ex);

      let postData = {
        user: this.$auth.user,
        listing: this.listing,
        exchangeAddress: ex.events.NewExchange.address
      };

      console.log(postData);

      let tpool = await axios.post("/api/trading-pool/", postData);
      
      console.log(tpool);

      this.exchangeAddress = ex.events.NewExchange.address;

    },
    async addFunds() {
      
      
      let acc = (await web3.eth.getAccounts())[0];

      let total = this.dollarValue;
      let sendVal = web3.utils.toWei((Math.ceil(total) * this.USD_TO_ETH).toString());

      let opts = {
        from: acc,
        value: sendVal
      };

      let exContract = new web3.eth.Contract(exchangeABI, this.exchangeAddress);

      console.log(exContract);

      let expiryTime = Math. round((new Date().getTime() / 1000) + (60 * 60 * 30));
      
      let rx = await exContract.methods.addLiquidity(1, this.tokensToAdd, expiryTime).send(opts);
      console.log(rx);

      
    }
  }
}
</script>

<style>

</style>