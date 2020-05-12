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
    <input type="file" ref="file" />
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
      file: null,
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
      
      const formData = new FormData();
      const file = this.$refs.file.files[0];
      formData.append('file', file);
      const imgUpResp = await axios.post(`/api/group/${savedGroup._id}/image/upload`, formData);
      const savedImage = await imgUpResp.data;
      console.log(savedImage);
      
    }
  }
}
</script>

<style scoped>

</style>