<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <h2>Utwórz nowy turniej</h2>
      <v-text-field
        v-model="nameTournament"
        :counter="100"
        :rules="nameTournamentRules"
        label="Nazwa turnieju*"
        required
      ></v-text-field>

      <v-textarea v-model="desc" label="Opis turnieju" :counter="1000"></v-textarea>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail organizatora*" required></v-text-field>

      <v-text-field
        v-model="fullname"
        :rules="basicRules"
        label="Imię i Nazwisko organizatora*"
        required
      ></v-text-field>

      <v-dialog
        ref="closeDateRef"
        v-model="closeDateModal"
        :return-value.sync="closeDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="closeDate"
            label="Wybierz dzień zakończenia zbierania podań*"
            prepend-icon="event"
            readonly
            :rules="basicRules"
            v-on="on"
            required
          ></v-text-field>
        </template>
        <v-date-picker v-model="closeDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="danger" @click="closeDateModal = false">Przerwij</v-btn>
          <v-btn text color="primary" @click="$refs.closeDateRef.save(closeDate)">Zatwierdź</v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog
        ref="tournamentDateRef"
        v-model="tournamentDateModal"
        :return-value.sync="tournamentDate"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="tournamentDate"
            label="Wybierz dzień turnieju*"
            prepend-icon="event"
            readonly
            v-on="on"
            :rules="basicRules"
            required
          ></v-text-field>
        </template>
        <v-date-picker v-model="tournamentDate" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="danger" @click="tournamentDateModal = false">Przerwij</v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.tournamentDateRef.save(tournamentDate)"
          >Zatwierdź</v-btn>
        </v-date-picker>
      </v-dialog>

      <v-text-field v-model="prize" label="Nagroda" placeholder="1. xxxx 2. yyyy 3. zzzz"></v-text-field>

      <v-text-field v-model="linkToDiscord" label="Link do Discorda/komunikatora"></v-text-field>

      <v-checkbox v-model="terms" :rules="[(v) => !!v || 'You must agree to continue!']" required>
        <template v-slot:label>
          Akceptuje&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Regulamin</a>
          &nbsp;i&nbsp;
          <a
            href="#"
            @click.stop.prevent="dialog = true"
          >Politykę prywatności</a>*
        </template>
      </v-checkbox>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Stwórz turniej!</v-btn>
    </v-form>

    <v-dialog v-model="dialog" absolute max-width="650" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-3">Regulamin i ochrona danych osobowych</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click="(terms = false), (dialog = false)">Rezygnuję</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="(terms = true), (dialog = false)">Akceptuję</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "CreateTournament",
  data: () => ({
    valid: true,
    nameTournament: "",
    desc: "",
    email: "",
    fullname: "",
    prize: "",
    linkToDiscord: "",
    dialog: false,
    tournamentDate: "",
    closeDate: "",
    tournamentDateModal: false,
    closeDateModal: false,
    nameTournamentRules: [
      v => !!v || "Nazwa jest wymagana!",
      v => (v && v.length <= 100) || "Nazwa musi być mniejsza niż 100 znaków!"
    ],
    basicRules: [v => !!v || "To pole jest wymagana!"],
    emailRules: [
      v => !!v || "E-mail jest wymagany!",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    terms: false
  }),
  methods: {
    async validate() {
      this.$refs.form.validate();
      if (this.$refs.form.validate()) {
        try {
          const result = await axios.post(
            this.$store.state.basicURL + "/api/tournament/create",
            {
              name: this.nameTournament,
              desc: this.desc,
              email: this.email,
              fullname: this.fullname,
              prize: this.prize,
              dateStart: this.tournamentDate,
              dateClose: this.closeDate
            }
          );
          if (result.status === 200) {
            this.$store.commit("setLastTournamentId", result._id);
            this.$router.push("/verify");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
