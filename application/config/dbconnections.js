const { Pool } = require("pg");

let optionsConnetion = {};
optionsConnetion = require("./configDev.json");

module.exports = () => {
  return new Pool(optionsConnetion);
};
