const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "https://turniejevalorant.herokuapp.com/api": {
        target: "http://localhost:3000",
      },
    },
  },
};
