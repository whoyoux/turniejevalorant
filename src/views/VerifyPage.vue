<template>
  <v-container centered>
    <h1>Czekamy na potwierdzenie...</h1>
    <h2>Sprawdź na emailu</h2>
    <v-btn color="success" @click="sendMail">Wyślij maila jeszcze raz</v-btn>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "VerifyPage",
  methods: {
    async sendMail() {
      try {
        const result = await axios.post(
          this.$store.state.basicURL + "/api/tournament/sendMail",
          { id: this.$store.state.lastTournamentId }
        );
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>