var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("\n *START* \n");
  var content = fs.readFileSync("./database/gamestate.json");
  console.log("Output Content : \n"+ content);
  var clearState = {
    grid: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ],
    inserts: 0,
    votes: [0, 0, 0, 0, 0, 0, 0]
  }
  res.json(clearState);
});

module.exports = router;
