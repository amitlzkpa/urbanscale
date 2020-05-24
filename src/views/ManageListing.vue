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
import PurchaseCardList from '@/components/PurchaseCardList.vue';

import ListingCard from '@/components/ListingCard.vue';

let listingABI;
let uniswapRouterAddress = '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a';
let uniswapRouterABI;
let daiAddress = '0xad6d458402f60fd3bd25163575031acdce07538d';

// approve(delegateAddress, numTokens)
// transfer(receiverAddress, numTokens)
// transferFrom(ownerAddress, receiverAddress, numTokens)
// allowance(ownerAddress, delegateAddress)
// balanceOf(address)

export default {
  name: 'ManageListing',
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
      purchases: []
    }
  },
  async mounted() {
    let resp = await axios.get(`/api/listing/cusipNo/${this.$route.params.cusipNo}`);
    this.listing = resp.data;
    let listingABIRes = await axios.get("/contracts/UniswapV2ERC20.abi");
    listingABI = listingABIRes.data;
    let uniswapRouterABIRes = await axios.get("/contracts/IUniswapV2Router01.abi");
    uniswapRouterABI = uniswapRouterABIRes.data.abi;
    let web3 = this.$store.getters.web3;
    this.contract = new web3.eth.Contract(listingABI, this.listing.contractAddress);
    this.deployer = await this.contract.methods.deployer().call();
    this.unsold = await this.contract.methods.balanceOf(this.deployer).call();
    this.purchases = (await axios.get(`/api/purchase/listing/${this.listing._id}`)).data;
    this.ready = true;
  },
  computed: {
    dollarValue() {
      return this.tokensToAdd * (this.listing.principal / this.listing.tokenSupply);
    }
  },
  methods: {
    async addFunds() {
      
      let web3 = this.$store.getters.web3;
      let acc = (await web3.eth.getAccounts())[0];
      let total = Math.ceil(this.dollarValue);

      let opts = {
        from: acc,
      };


      let listingABIRes = await axios.get("/contracts/UniswapV2ERC20.abi");
      let listingABI = listingABIRes.data;
      let listingContract = new web3.eth.Contract(listingABI, this.listing.contractAddress);

      // approve thr router for tokens
      await listingContract.methods.approve(uniswapRouterAddress, total).send(opts);
      
      let router = new web3.eth.Contract(uniswapRouterABI, uniswapRouterAddress);
      let expiryTime = Math.round((new Date().getTime() / 1000) + (60 * 60 * 12));


      console.log(router);
      console.log(
                  daiAddress,
                  this.listing.contractAddress,
                  total,
                  this.tokensToAdd,
                  Math.floor(total * 0.9),
                  Math.floor(this.tokensToAdd * 0.9),
                  acc,
                  expiryTime
                  );


      opts = {
        from: acc,
        gas: 10000000
        // gasPrice: web3.utils.toWei('2', 'gwei')
      };

      let tx = await router.methods.addLiquidity(
                                                  daiAddress,
                                                  this.listing.contractAddress,
                                                  total,
                                                  this.tokensToAdd,
                                                  Math.floor(total * 0.9),
                                                  Math.floor(this.tokensToAdd * 0.9),
                                                  acc,
                                                  expiryTime
                                                ).send(opts);
      console.log(tx);
      
      
    }
  }
}
</script>

<style>

</style>