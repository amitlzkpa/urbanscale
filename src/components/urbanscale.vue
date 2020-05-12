<template>
  <div>
    <h1>UrbanScale</h1>
    <div>
      <p>Connect with your local government.</p>
    </div>
    <img :src="'/imgs/img.png'" />
    <br />
    <button @click="onClickGetBtn">TestGet</button>
    <br />
    <button @click="onClickPostBtn">TestPost</button>
  </div>
</template>

<script>
export default {
  name: 'urbanscale',
  methods: {
    async onClickGetBtn() {
      let resp = await fetch('api/users/abc');
      let txt = await resp.text();
      console.log(txt);
    },
    async onClickPostBtn() {
      const user = this.$auth.user;
      const postBody = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const resp = await fetch('/api/users', postBody);
      const conf = await resp.json();
      console.log(conf);
    }
  }
}
</script>

<style scoped>
</style>
