<template>
  <v-container centered>
    <h1>{{this.res.msg}}</h1>
    <h2>Sprawdź na emailu</h2>
    <h4>Możesz już zamknąć to okno...</h4>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "VerifySpecificPage",
  data() {
    return {
      res: {},
      err: {}
    };
  },
  created() {
    console.log(this.$route.params.id);
    axios
      .post(this.$store.state.basicURL + "/api/verify", { id: this.$route.params.id })
      .then(result => (this.res = result.data))
      .catch(err => (this.err = err.data));
  }
};
</script>

<style lang="scss" scoped>
</style>