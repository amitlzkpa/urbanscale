<template>
  <div>

    <br />
    
    <div class="card">

      <div class="card-content">

          <div class="columns">

            <div class="column is-narrow">
              <figure class="image is-128x128">
                <img class="is-rounded" :src="$auth.user.picture" />
              </figure>
            </div>

            <div class="column">
              <p class="is-size-4 has-text-weight-bold">
                {{ $auth.user.name }}
              </p>
              <i class="has-text-grey">
                {{ $auth.user.nickname }}
              </i>
              <p>
                {{ $auth.user.email }}
              </p>
            </div>

          </div>

      </div>

    </div>

    <hr />
    
    <PurchaseCardList :purchases="purchases" />
    
  </div>
</template>

<script>
import axios from "axios";
import PurchaseCardList from '@/components/PurchaseCardList.vue';

export default {
  components: {
    PurchaseCardList
  },
  data() {
    return {
      purchases: []
    }
  },
  async mounted() {
    let resp = await axios.get(`/api/purchase/user/${this.$auth.user.nickname}`);
    this.purchases = resp.data;
    // console.log(this.purchases);
  }
}
</script>

<style scoped>

</style>