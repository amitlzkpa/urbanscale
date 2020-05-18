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
import ListingCard from '@/components/ListingCard.vue';

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
  },
  methods: {
  }
}
</script>

<style>

</style>