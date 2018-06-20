var express = require('express');
var router = express.Router();
var fs = require("fs");
var gamestate = require('../database/gamestate.json')

/* GET The State of the Game */
router.get('/', function(req, res, next) {
  console.log("\n *START* \n");
  var newState = gamestate;
  console.log("JSON ", newState);

  var content = fs.readFileSync("./database/gamestate.json");
  console.log("Output Content : \n"+ content);

  res.json(JSON.parse(content));
});

module.exports = router;
