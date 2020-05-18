<template>
  <div>
    <br /><br />
    
    <p v-for="listing in listings" :key="listing.cusipNo">
      <ListingCard 
        :listing="listing"
      />
      <br />
    </p>
    
  </div>
</template>

<script>
import axios from 'axios';
import ListingCard from '@/components/ListingCard.vue';

export default {
  name: 'ViewAllListing',
  components: {
    ListingCard
  },
  data() {
    return {
      listings: []
    }
  },
  async created() {
    let resp = await axios.get('/api/listing/all');
    this.listings = resp.data;
  },
  methods: {
  }
}
</script>

<style>

</style>