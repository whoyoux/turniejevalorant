import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basicURL: "https://turniejevalorant.herokuapp.com",
    lastTournamentId: "",
  },
  mutations: {
    setLastTournamentId(state, id) {
      state.lastTournamentId = id;
    },
  },
  actions: {},
  modules: {},
});
