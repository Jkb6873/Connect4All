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
  //var outputState = JSON.stringify(oldState, null, 2);


  console.log("OUTPUT OLD STATE " + outputState);

  var rowIndex = 5;
  var columnIndex = vote;

  console.log("VOTE INDEX " + vote);
  console.log("CHECKING OLDSTATE MEMBER " + oldState.grid[rowIndex][vote]);

  // LOGIC TO UPDATE JSON
  var flipped = false;
  
  while(oldState.grid[rowIndex][vote] != "0"){
    //console.log("FLIPPED " +flipped);
    if(oldState.grid[rowIndex][vote] == "0"){
      flipped = true;
    }
    else{
      rowIndex--;
    }
    //oldState.grid[rowIndex][vote] = 1;
  }

  console.log("Row index: " + rowIndex);


  // 1 is a placeholder. It's suppose to be the turn of the player
  oldState.grid[rowIndex][vote] = 1;
  //
  // FIGURE OUT HOW TO UPDATE JSON
  //
  var outputState = JSON.stringify(oldState, null, 2);

  console.log("\n NEW \n" + outputState);
  fs.writeFileSync("./database/gamestate.json", outputState);

  res.json(JSON.parse(content));
});

module.exports = router;
