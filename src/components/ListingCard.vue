<template>
  <div>

    <div class="card">

      <div class="card-content">

          <div class="columns">

            <div class="column">
              <p class="is-size-6 has-text-weight-bold">
                {{ listing.name }}
              </p>
              <i class="has-text-grey">
                {{ listing.issuer }}
              </i>
              <p>
                {{ listing.location }}
              </p>
            </div>
            

            <div class="column is-one-quarter">

              <div class="columns">
                
                <div class="column">
                  <span class="has-text-grey">
                    <b-icon
                        pack="fas"
                        icon="coins"
                        size="is-small">
                    </b-icon>
                  </span>
                  {{ listing.tokenSupply }}
                </div>

                <div class="column">
                  <span class="has-text-grey">
                    <b-icon
                        pack="fas"
                        icon="piggy-bank"
                        size="is-small">
                    </b-icon>
                  </span>
                  {{ (listing.coupon / 1000000).toFixed(2) }} %
                </div>

              </div>
              
              <p>
                <span class="is-size-2 has-text-weight-semibold">
                  $ {{ (listing.principal / listing.tokenSupply).toFixed(0) }} 
                </span> /token
              </p>
            </div>

          </div>

      </div>

    </div>

  </div>
</template>

<script>


export default {
  name: 'ListingCard',
  props: ['listing'],
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>