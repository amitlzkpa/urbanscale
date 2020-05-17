<template>
  <div>

    <section>


      <b-field label="EMMA Id">
        <b-input v-model="emmaId"></b-input>
      </b-field>

      <div class="buttons">
        <b-button type="is-primary" @click="onUpdate" expanded>Update</b-button>
      </div>



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
import Web3 from 'web3';

let web3;

export default {
  name: 'create',
  data() {
    return {
      emmaId: null,
      name: null,
      description: null,
      file: null,
    }
  },
  created() {
    if(window.ethereum) {
      web3 = new Web3(window.web3.currentProvider);
      // web3 = new Web3(window.ethereum);
      // window.web3 = web3;
      // window.ethereum.enable();
    }
  },
  methods: {
    async onUpdate() {
      let url = `https://emma.msrb.org/Security/Details/${this.emmaId}`;
      console.log(url);
      
      let data = await axios.get(url)
      console.log(data.data);


    },
    async onSubmit() {

      let abiRes = await axios.get("/contracts/FundToken.abi");
      let abiDefinition = abiRes.data;
      
      let byteCodeRes = await axios.get("/contracts/FundToken.bytecode");
      let byteCode = byteCodeRes.data.object;

      let Contract = new web3.eth.Contract(abiDefinition);

      let tx = await Contract.deploy({
        arguments: ["FundToken", "FTC", 1000],
        data: byteCode,
      });

      let acc = (await web3.eth.getAccounts())[0];

      let q = await tx.send({
        from: acc,
        gas: 3000000,
        gasPrice: 8000000000
      });
      console.log(q);


      // const user = this.$auth.user;
      // const data = {
      //   user: user,
      //   name: this.name,
      //   description: this.description
      // };
      // const resp = await axios.post('/api/listing', data);
      // const savedGroup = await resp.data;
      // console.log(savedGroup);
      
      // const formData = new FormData();
      // const file = this.file;
      // formData.append('file', file);
      // const imgUpResp = await axios.post(`/api/listing/${savedGroup._id}/image/upload`, formData);
      // const savedImage = await imgUpResp.data;
      // console.log(savedImage);
      
    }
  }
}
</script>

<style scoped>

</style>