<template>
  <div>

    <section>


      <b-field label="CUSIP No.">
        <b-input v-model="cusipNo"></b-input>
      </b-field>


      <b-field label="EMMA Id">
      </b-field>

      <b-field>
        <b-input v-model="emmaId" @change.native="onEmmaUpdate" expanded></b-input>
        <a class="button" :href="emmaUrl" target="_blank">Check</a>
      </b-field>

      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>

      <b-field label="Issuer">
        <b-input v-model="issuer"></b-input>
      </b-field>

      <b-field label="Description">
        <b-input maxlength="400" type="textarea" v-model="description"></b-input>
      </b-field>
    </section>

    <section>

      <div class="columns">

        <div class="column">

        <b-field label="Prinicpal">
          <b-field>
            <p class="control">
              <button class="button is-static">$</button>
            </p>
            <b-numberinput
              v-model="principal"
              min=0
              step=1000
              expanded
              controlsPosition="compact"
            />
          </b-field>
        </b-field>


        <b-field label="Coupon">
          <b-field>
            <p class="control">
              <button class="button is-static">%</button>
            </p>
            <b-numberinput
              v-model="coupon"
              min=0
              max=100
              step=0.01
              expanded
              controlsPosition="compact"
            />
          </b-field>
        </b-field>

        </div>

        <div class="column is-narrow">
          
          <b-field label="Maturity">
          </b-field>
          <b-datepicker v-model="maturity_date" 
              inline 
              :unselectable-days-of-week="[0, 6]">
          </b-datepicker>

        </div>
        
      </div>




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


    </section>

    <hr />

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
      cusipNo: null,
      name: null,
      issuer: null,
      description: null,
      file: null,
      emmaUrl: null,
      maturity_date: null,
      principal: null,
      coupon: null
    }
  },
  created() {
    if(window.ethereum) {
      web3 = new Web3(window.web3.currentProvider);
    }
  },
  methods: {
    async onEmmaUpdate() {
      console.log(this.emmaUrl);
      this.emmaUrl = `https://emma.msrb.org/Security/Details/${this.emmaId}`;
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