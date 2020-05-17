<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from '@/partials/Navbar.vue'
// import Footer from '@/partials/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    // Footer
  }
}
</script>

<style>
</style>
