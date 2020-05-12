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
    <input type="file" ref="files" multiple />
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
      const formData = new FormData();
      const files = this.$refs.files.files;
      Object.keys(files).forEach(f => { formData.append(`file-${f}`, files[f]); } );
      // Array.from(formData.entries()).forEach(i => console.log(i) );
      const data = {
        user: user,
        name: this.name,
        description: this.description,
        files: formData
      };
      console.log(data);
      const resp = await axios.post('/api/group', data);
      const savedGroup = await resp.data;
      console.log(savedGroup);
    }
  }
}
</script>

<style scoped>

</style>