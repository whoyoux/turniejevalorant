<template>
  <v-container fluid>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="tournament in list_of_tournaments" v-bind:key="tournament._id">
        <v-expansion-panel-header>{{tournament.name}}</v-expansion-panel-header>
        <v-expansion-panel-content>{{tournament.desc}}</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      panel: "",
      list_of_tournaments: []
    };
  },
  mounted() {
    this.list_of_tournaments = [];
    axios
      .get(this.$store.state.basicURL + "/api/tournament/getAllConfirmed")
      .then(res => {
        this.list_of_tournaments = res.data;
      })
      .catch(err => console.log(err.data));
  }
};
</script>

<style lang="scss" scoped>
</style>