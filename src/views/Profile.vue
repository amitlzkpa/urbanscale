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

            <div class="column is-narrow">
              <b-dropdown aria-role="list" position="is-bottom-left">
                <button class="button is-text" slot="trigger">
                  <span>Wallets</span>
                </button>

                <b-dropdown-item
                  aria-role="listitem"
                  v-for="(walletAddress, idx) in walletAddresses" :key="idx">
                  <a :href="'https://ropsten.etherscan.io/address/' + walletAddress" target="_blank">
                    {{ walletAddress }}
                  </a>
                </b-dropdown-item>
              </b-dropdown>
            </div>

          </div>

      </div>

    </div>

    <hr />
    
    <PurchaseCardList :purchases="purchases" />

    <hr />

    <b-field :label="'Managed (' + managedListings.length + '):'">
    </b-field>
    <br />
    
    <ListingCardList :listings="managedListings" />
    
  </div>
</template>

<script>
import axios from "axios";
import PurchaseCardList from '@/components/PurchaseCardList.vue';
import ListingCardList from '@/components/ListingCardList.vue';


export default {
  components: {
    PurchaseCardList,
    ListingCardList
  },
  data() {
    return {
      purchases: [],
      managedListings: [],
      walletAddresses: []
    }
  },
  async mounted() {
    let resp = await axios.get(`/api/purchase/user/${this.$auth.user.nickname}`);
    this.purchases = resp.data;
    this.walletAddresses = this.purchases.map(p => p.ownerEthAccAddress);
    resp = await axios.get(`/api/listing/owner/${this.$auth.user.nickname}`);
    this.managedListings = resp.data;
  }
}
</script>

<style scoped>

</style>