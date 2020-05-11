<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      &nbsp;|&nbsp;
      <router-link to="/login">Login</router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
</style>
