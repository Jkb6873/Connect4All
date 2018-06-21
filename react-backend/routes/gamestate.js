var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET The State of the Game */
router.get('/', function(req, res, next) {

  console.log("\n *START* \n");

  var content = fs.readFileSync("./database/gamestate.json");
  console.log("Output Content : \n"+ content);

  res.json(JSON.parse(content));
});

/* POST vote to server */
router.post('/', function(req, res, next) {

  console.log("\n *Received* \n");
  //Stores vote as number
  var vote = req.body.vote;

  //Reads old state
  var content = fs.readFileSync("./database/gamestate.json");
  var oldState = JSON.parse(content);

  oldState.votes[vote]++;
  console.log(oldState.votes);

  fs.writeFileSync("./database/gamestate.json", JSON.stringify(oldState));

  //
  // FIGURE OUT HOW TO UPDATE JSON
  //


  res.json(JSON.stringify(oldState));
});

module.exports = router;
