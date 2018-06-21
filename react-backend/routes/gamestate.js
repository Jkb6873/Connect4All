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

  oldState.votes[vote]++;
  console.log(oldState.votes);

  fs.writeFileSync("./database/gamestate.json", JSON.stringify(oldState));

  console.log("OUTPUT OLD STATE " + outputState);

  var rowIndex = 5;
  var columnIndex = vote;

  console.log("VOTE INDEX " + vote);
  console.log("CHECKING OLDSTATE MEMBER " + oldState.grid[rowIndex][vote]);

  // LOGIC TO UPDATE JSON
  
  while(oldState.grid[rowIndex][vote] != "0"){
    if(oldState.grid[rowIndex][vote] == "0"){
      flipped = true;
    }
    else{
      rowIndex--;
    }
  }

  console.log("Row index: " + rowIndex);


  // 1 is a placeholder. It's suppose to be the turn of the player
  oldState.grid[rowIndex][vote] = 1;
  
  var outputState = JSON.stringify(oldState, null, 2);

  console.log("\n NEW \n" + outputState);
  fs.writeFileSync("./database/gamestate.json", outputState);


  res.json(JSON.stringify(oldState));
});

module.exports = router;
