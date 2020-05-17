<template>
  <div>

    <section>
      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>

      <b-field label="Description">
        <b-input maxlength="400" type="textarea" v-model="description"></b-input>
      </b-field>
    </section>



    <div class="columns">

      <div class="column is-narrow">
        <b-field label="File">
        </b-field>
      </div>
      
      <div class="column">
        <b-field class="file">
          <b-upload v-model="file">
            <a class="button is-primary">
              <span>Click to upload</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="file">
            {{ file.name }}
          </span>
        </b-field>
      </div>

    </div>



    <div class="buttons">
      <b-button type="is-primary" @click="onSubmit" expanded>Submit</b-button>
    </div>






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
      const resp = await axios.post('/api/listing', data);
      const savedGroup = await resp.data;
      console.log(savedGroup);
      
      const formData = new FormData();
      const file = this.file;
      formData.append('file', file);
      const imgUpResp = await axios.post(`/api/listing/${savedGroup._id}/image/upload`, formData);
      const savedImage = await imgUpResp.data;
      console.log(savedImage);
      
    }
  }
}
</script>

<style scoped>

</style>