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

router.post('/', function(req, res, next) {
  console.log("\n *Received* \n");
  var vote = req.body.vote;
  var content = fs.readFileSync("./database/gamestate.json");
  var oldState = JSON.parse(content);
  console.log(oldState);
  res.json(JSON.parse(content));
});

module.exports = router;
