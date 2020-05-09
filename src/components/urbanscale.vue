<template>
  <div>
    <router-link to="/login">Login</router-link>
    <hr />
    <h1>urbanscale</h1>
    <div>
      <p>An app to reuse in the future (hopefully).</p>
      <input type="button" value="foo" @click="onFoo" />
    </div>
    <img :src="'/imgs/img.png'" />
  </div>
</template>

<script>
export default {
  name: 'urbanscale',
  methods: {
    onFoo() {
      console.log('foo');
      fetch('/api/foo')
        .then(data => data.text())
        .then(res => console.log(res));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
