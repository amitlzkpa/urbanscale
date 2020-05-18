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
    
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$auth.user);
  }
}
</script>

<style scoped>

</style>