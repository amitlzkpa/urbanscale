<template>
  <div>
    <div>
      <p>Connect with your local government.</p>
    </div>
    <img :src="'/imgs/img.png'" />
    <br />
    <button @click="onClickGetAllBtn">TestGetAll</button>
    <br />
    <button @click="onClickAddUserBtn">TestAddUser</button>
    <br />
    <input type="text" v-model="getId" />
    <button @click="onClickGetByIdBtn">TestGetById</button>
    <br />
    <input type="text" v-model="getEmail" />
    <button @click="onClickGetByEmailBtn">TestGetByEmail</button>
    <br />
    <input type="text" v-model="getUsername" />
    <button @click="onClickGetByUsernameBtn">TestGetByUsername</button>
    <br />
    Result:
    <pre><code>
{{ result }}
    </code></pre>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Landing',
  data() {
    return {
      getId: null,
      getEmail: null,
      getUsername: null,
      result: null
    }
  },
  methods: {
    async onClickGetByIdBtn() {
      let resp = await axios.get(`/api/users/id/${this.getId}`);
      let user = resp.data;
      console.log(user);
      this.result = JSON.stringify(user, null, 4);
    },
    async onClickGetByEmailBtn() {
      let resp = await axios.get(`/api/users/email/${this.getEmail}`);
      let user = resp.data;
      console.log(user);
      this.result = JSON.stringify(user, null, 4);
    },
    async onClickGetByUsernameBtn() {
      let resp = await axios.get(`/api/users/username/${this.getUsername}`);
      let user = await resp.data;
      console.log(user);
      this.result = JSON.stringify(user, null, 4);
    },
    async onClickGetAllBtn() {
      let resp = await axios.get('/api/users/all');
      let users = await resp.data;
      console.log(users);
      this.result = JSON.stringify(users, null, 4);
    },
    async onClickAddUserBtn() {
      const user = this.$auth.user;
      console.log(user);
      const resp = await axios.post('/api/users', user);
      const savedUser = await resp.data;
      console.log(savedUser);
      this.result = JSON.stringify(savedUser, null, 4);
    }
  }
}
</script>

<style scoped>
</style>
