<template>
  <div>
    
    <p v-for="listing in intListings" :key="listing.cusipNo">
      <router-link :to="{ name: 'view', params: { cusipNo: listing.cusipNo } }">
        <ListingCard :listing="listing" />
      </router-link>
      <br />
    </p>
    
  </div>
</template>

<script>
import axios from 'axios';
import ListingCard from '@/components/ListingCard.vue';

export default {
  name: 'ListingCardList',
  components: {
    ListingCard
  },
  props: ['listings'],
  data() {
    return {
      intListings: []
    }
  },
  async created() {
    if (this.listings) {
      this.intListings = this.listings;
    } else {
      let resp = await axios.get('/api/listing/all');
      this.intListings = resp.data;
    }
  },
  watch: { 
    listings: function(newVal) {
      this.intListings = newVal
    }
  }
}
</script>

<style>

</style>