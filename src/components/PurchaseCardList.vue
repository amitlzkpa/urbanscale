<template>
  <div>
    
    <p v-for="purchase in purchases" :key="purchase._id">
      
      <router-link :to="{ name: 'purchase', params: { userName:$auth.user.nickname, purchaseId: purchase._id } }">
        <PurchaseCard :purchase="purchase" />
      </router-link>

      <br />
    </p>
    
  </div>
</template>

<script>
import PurchaseCard from '@/components/PurchaseCard.vue';

export default {
  name: 'PurchasCardList',
  components: {
    PurchaseCard
  },
  props: ['purchases'],
  data() {
    return {
    }
  },
  async created() {
  },
  methods: {
  }
}
</script>

<style>

</style>