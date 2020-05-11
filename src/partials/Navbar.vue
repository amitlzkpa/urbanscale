<template>
  <div>
    <router-link to="/">Home</router-link>
    &nbsp;|&nbsp;
    <span v-if="!$auth.loading">
      <a v-if="!$auth.isAuthenticated" @click="login">Log in</a>
      <a v-if="$auth.isAuthenticated" @click="logout">Log out({{ $auth.user.name }})</a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
}
</script>

<style>

</style>