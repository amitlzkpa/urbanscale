<template>
  <div>
    <h1>Create</h1>
    <label>Name: </label>
    <input type="text" v-model="name" />
    <br />
    <label>Description: </label>
    <br />
    <textarea v-model="description" />
    <br />
    <label>Files: </label>
    <input type="file" multiple />
    <br />
    <button @click="onSubmit" >Submit</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create',
  data() {
    return {
      name: null,
      description: null,
      files: [],
    }
  },
  methods: {
    async onSubmit() {
      const user = this.$auth.user;
      const data = {
        user: user,
        name: this.name,
        description: this.description
      };
      const resp = await axios.post('/api/group', data);
      const savedGroup = await resp.data;
      console.log(savedGroup);
    }
  }
}
</script>

<style scoped>

</style>