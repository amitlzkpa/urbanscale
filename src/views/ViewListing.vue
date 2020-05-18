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
  </div>
</template>

<script>
import axios from 'axios';
import Portis from '@portis/web3';
import Web3 from 'web3';

import ListingCard from '@/components/ListingCard.vue';

const portis = new Portis('c9972761-699b-441e-a522-56b5bc729b65', 'mainnet');
const portisWeb3 = new Web3(portis.provider);

export default {
  name: 'ViewListing',
  components: {
    ListingCard
  },
  data() {
    return {
      listing: null,
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
  }
}
</script>

<style>

</style>