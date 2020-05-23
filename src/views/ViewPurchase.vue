<template>
  <div>
    <img src="/imgs/certificate_template.svg" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
      purchaseItem: null,
    }
  },
  async created() {
    if (this.$route.params.userName) {
      let resp = await axios.get(`/api/users/username/${this.$route.params.userName}`);
      this.user = await resp.data;
    }
    if (this.$route.params.purchaseId) {
      let resp = await axios.get(`/api/purchase/id/${this.$route.params.purchaseId}`);
      this.purchaseItem = await resp.data;
    }
    console.log(this.user);
    console.log(this.purchaseItem);
  }
}
</script>

<style scoped>

</style>