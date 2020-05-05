const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "http://turniejevalorant.herokuapp.com/api": {
        target: "http://localhost:3000",
      },
    },
  },
};
