<template>
  <div>



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
              step=10000
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


        <b-field label="Number of Tokens">
          <b-field>
            <p class="control">
              <button class="button is-static">#</button>
            </p>
            <b-numberinput
              v-model="tokenSupply"
              min=0
              expanded
              controlsPosition="compact"
            />
          </b-field>
        </b-field>

        
        <b-field label="Location">
          <b-input maxlength="100" type="textarea" v-model="location"></b-input>
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
        <b-field label="Prospectus:" style="margin-top: 7px">
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




    <b-field label="Description">
      <b-input maxlength="400" type="textarea" v-model="description"></b-input>
    </b-field>



    <hr />

    <div class="buttons">
      <b-button type="is-primary" @click="onSubmit" expanded>Submit</b-button>
    </div>


    <br />
    <br />


  </div>
</template>

<script>
import axios from 'axios';
import Web3 from 'web3';

let web3;

export default {
  name: 'CreateListing',
  data() {
    return {
      emmaId: null,
      cusipNo: null,
      name: null,
      issuer: null,
      description: null,
      location: null,
      file: null,
      emmaUrl: null,
      maturity_date: null,
      principal: 0,
      coupon: 0,
      tokenSupply: 0
    }
  },
  async created() {
    if(window.ethereum) {
      await window.ethereum.enable();
      web3 = new Web3(window.web3.currentProvider);
    }
  },
  methods: {
    async onEmmaUpdate() {
      this.emmaUrl = `https://emma.msrb.org/Security/Details/${this.emmaId}`;
    },
    async onSubmit() {
      
      // deploy contract
      // get contract details
      // send user contract and pool data to backend

      let abiRes = await axios.get("/contracts/FundToken.abi");
      let abiDefinition = abiRes.data;
      
      let byteCodeRes = await axios.get("/contracts/FundToken.bytecode");
      let byteCode = byteCodeRes.data.object;

      let Contract = new web3.eth.Contract(abiDefinition);


      // contract arg order
      //  constructor (string memory _name,
      //               string memory _cusipNo,
      //               string memory _emmaId,
      //               uint256 _maturityDate,
      //               uint256 _principal,
      //               uint256 _coupon,
      //               uint256 totalSupply)

      let matDt_unix = new Date(this.maturity_date).getTime() / 1000;
      let coupon_int = parseInt(this.coupon * 1000000);

      let args = [
        this.name,
        this.cusipNo,
        this.emmaId,
        matDt_unix,
        this.principal,
        coupon_int,
        this.tokenSupply
      ];
      
      let tx = await Contract.deploy({
        arguments: args,
        data: byteCode,
      });

      let acc = (await web3.eth.getAccounts())[0];

      let contract = await tx.send({from: acc});

      this.$buefy.toast.open('Submitting your request. Please stay on this page.');

      let user = this.$auth.user;
      let data = {
        user: user,
        name: this.name,
        cusipNo: this.cusipNo,
        emmaId: this.emmaId,
        maturityDate: this.maturity_date,
        principal: this.principal,
        coupon: coupon_int,
        tokenSupply: this.tokenSupply,
        description: this.description,
        location: this.location,
        contractAddress: contract._address
      };
      const resp = await axios.post('/api/listing', data);
      const savedListing = await resp.data;
      console.log(savedListing);
      
      this.$buefy.toast.open({
          message: 'Successflly submitted!',
          type: 'is-success'
      });

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