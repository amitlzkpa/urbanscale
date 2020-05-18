<template>
  <div>

    <div class="card">

      <div class="card-content">

          <div class="columns">

            <div class="column">
              <p class="is-size-6 has-text-weight-semibold">
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

                  <b-tooltip label="Token supply" :delay="200">
                    <span class="has-text-grey" style="margin-right:6px;">
                      <b-icon
                          pack="fas"
                          icon="coins"
                          size="is-small">
                      </b-icon>
                    </span>
                    {{ (listing.tokenSupply).toLocaleString() }}
                  </b-tooltip>
                  
                </div>

                <div class="column">


                  <b-tooltip label="Coupon rate" :delay="200">
                    <span class="has-text-grey" style="margin-right:6px;">
                      <b-icon
                          pack="fas"
                          icon="piggy-bank"
                          size="is-small">
                      </b-icon>
                    </span>
                    {{ (listing.coupon / 1000000).toFixed(2) }} %
                  </b-tooltip>
                  
                </div>

              </div>

              <div class="columns">
                <div class="column">
                  <b-tooltip label="Maturity date" :delay="200">
                    {{ new Date(listing.maturityDate).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'} ) }}
                  </b-tooltip>
                </div>
              </div>
              
              <div class="columns">
                <div class="column">
                  <span class="is-size-2 has-text-weight-bold">
                    <b-tooltip label="Price per token" :delay="200">
                      ${{ (listing.principal / listing.tokenSupply).toFixed(0) }} 
                    </b-tooltip>
                  </span> /token
                </div>
              </div>
              
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