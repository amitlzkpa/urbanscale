<template>
  <div>

    <div class="card" v-if="purchase">

      <div class="card-content">

          <div class="columns">

            <div class="column is-one-quarter has-text-right">
              
              <span class="is-size-2 has-text-weight-bold">
                <b-tooltip label="Total holding" :delay="200">
                  ${{ Math.ceil(purchase.listing.principal / purchase.listing.tokenSupply) * purchase.tokens }}
                </b-tooltip>
              </span>
              <p>
                in 
                {{ purchase.tokens }}
                tokens
              </p>
              
            </div>

            <div class="column">
              <p class="is-size-6 has-text-weight-semibold">
                {{ purchase.listing.name }}
              </p>
              <i class="has-text-grey">
                {{ purchase.listing.issuer }}
              </i>

              <div>
                
                <b-tooltip label="Token supply" :delay="200">
                  <span class="has-text-grey" style="margin-right:6px;">
                    <b-icon
                        pack="fas"
                        icon="coins"
                        size="is-small">
                    </b-icon>
                  </span>
                  {{ (purchase.listing.tokenSupply).toLocaleString() }}
                </b-tooltip>

                &nbsp;&nbsp;|&nbsp;&nbsp;

                <b-tooltip label="Coupon rate" :delay="200">
                  <span class="has-text-grey" style="margin-right:6px;">
                    <b-icon
                        pack="fas"
                        icon="piggy-bank"
                        size="is-small">
                    </b-icon>
                  </span>
                  {{ (purchase.listing.coupon / 1000000).toFixed(2) }} %
                </b-tooltip>
                
                &nbsp;&nbsp;|&nbsp;&nbsp;

                <b-tooltip label="Maturity date" :delay="200">
                  <span class="has-text-grey" style="margin-right:6px;">
                    <b-icon
                        pack="fas"
                        icon="stopwatch"
                        size="is-small">
                    </b-icon>
                  </span>
                  {{ new Date(purchase.listing.maturityDate).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'} ) }}
                </b-tooltip>

                &nbsp;&nbsp;|&nbsp;&nbsp;

                <b-tooltip label="Price per token" :delay="200">
                  <span class="has-text-grey" style="margin-right:6px;">
                    <b-icon
                        pack="fas"
                        icon="dollar-sign"
                        size="is-small">
                    </b-icon>
                  </span>
                  {{ Math.ceil(purchase.listing.principal / purchase.listing.tokenSupply) }}
                </b-tooltip>

              </div>

            </div>
            
          </div>

      </div>

    </div>

  </div>
</template>

<script>


export default {
  name: 'PurchseCard',
  props: ['purchase'],
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