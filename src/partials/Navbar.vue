<template>
  <div>


    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="/imgs/img(circle)_inverted.png" id="logo-img">
          <span class="is-size-5 has-text-weight-semibold">UrbanScale</span>
        </b-navbar-item>
      </template>

      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/about' }">
          About
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/create' }">
          Create
        </b-navbar-item>
      </template>

      <template slot="end">

        <b-navbar-item tag="div" v-if="!$auth.isAuthenticated">
          <div class="buttons">
            <a class="button is-primary"
              @click="login"
            >
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"
              @click="login"
            >
              Log in
            </a>
          </div>
        </b-navbar-item>
        
        <b-navbar-dropdown :label="$auth.user.name" v-if="$auth.isAuthenticated">
          <b-navbar-item
            tag="router-link"
            :to="{ path: '/profile' }"
          >
            Profile
          </b-navbar-item>
          <b-navbar-item @click="logout">Logout</b-navbar-item>
        </b-navbar-dropdown>

      </template>
    </b-navbar>

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

<style scope>

#logo-img {
  margin-right: 6px;
}

</style>