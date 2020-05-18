<template>
  <div>
    
    <p v-for="listing in listings" :key="listing.cusipNo">
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