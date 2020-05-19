<template>
  <div>

    <div class="card">

      <div class="card-content">

          <div class="columns">

            <div class="column">
              <p class="is-italic is-size-7 has-text-grey">
                {{ fuzzyTime(new Date(listing.createdAt)) }}
              </p>
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
                    <span class="has-text-grey" style="margin-right:6px;">
                      <b-icon
                          pack="fas"
                          icon="stopwatch"
                          size="is-small">
                      </b-icon>
                    </span>
                    {{ new Date(listing.maturityDate).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'} ) }}
                  </b-tooltip>
                </div>
              </div>
              
              <div class="columns">
                <div class="column">
                  <span class="is-size-2 has-text-weight-bold">
                    <b-tooltip label="Price per token" :delay="200">
                      ${{ Math.ceil(listing.principal / listing.tokenSupply) }} 
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
    fuzzyTime(date) {

      var delta = Math.round((+new Date - date) / 1000);

      var minute = 60,
          hour = minute * 60,
          day = hour * 24;

      var fuzzy;

      if (isNaN(delta)) {
        fuzzy = '---';
      } else if (delta < 30) {
        fuzzy = 'just now';
      } else if (delta < minute) {
        fuzzy = `${delta} seconds ago`;
      } else if (delta < 2 * minute) {
        fuzzy = 'a minute ago'
      } else if (delta < hour) {
        fuzzy = `${Math.floor(delta / minute)} minutes ago`;
      } else if (Math.floor(delta / hour) == 1) {
        fuzzy = '1 hour ago'
      } else if (delta < day) {
        fuzzy = `${Math.floor(delta / hour)} hours ago`;
      } else if (delta < day * 2) {
        fuzzy = 'yesterday';
      } else if (delta < day * 10) {
        fuzzy = `${Math.floor(delta / day)} days ago`;
      } else {
        fuzzy = `${date.toDateString()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      }
      return fuzzy;
    }
  }
}
</script>

<style>

</style>