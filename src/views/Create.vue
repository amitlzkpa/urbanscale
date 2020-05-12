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
      const postBody = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      };
      const resp = await fetch('/api/listing', postBody);
      const savedListing = await resp.json();
      console.log(savedListing);
    }
  }
}
</script>

<style scoped>

</style>