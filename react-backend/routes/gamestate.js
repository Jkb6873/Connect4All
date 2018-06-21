var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET Updated Board after end of turn */
router.get('/turn', function(req, res, next) {

  console.log("\n *VOTE TALLY* \n");

  //Read game state from JSON
  var content = fs.readFileSync("./database/gamestate.json");
  var oldState = JSON.parse(content);

  //Check the position with the most votes
  const votingArray = oldState.votes
  console.log(votingArray);
  let maxValue = votingArray[0];
  let maxIndex = 0;
  for (let scoreCheck in votingArray) {
      console.log("CURRENT: ",scoreCheck, " MAX: ",maxIndex, " ",maxValue)
      if (votingArray[scoreCheck] > maxValue){
          maxIndex = scoreCheck;
          maxValue = votingArray[scoreCheck];
      }
  }

  //Add piece to Grid
  let newGrid = oldState.grid;
  let piecePlaced = false;
  console.log(newGrid);
  for (let row in newGrid) {
    let firstSpot = 5 - row;
    console.log(firstSpot);
    if (newGrid[firstSpot][maxIndex] == 0 && !piecePlaced) {
      console.log("IF");
      newGrid[firstSpot][maxIndex] = (oldState.inserts % 2) + 1;
      piecePlaced = true;
    }
  }

  //Update gamestate
  oldState.grid = newGrid;
  oldState.inserts++;
  oldState.votes = [0,0,0,0,0,0,0];
  console.log("WINNDER: ", maxIndex)

  //Write gamestate to database
  fs.writeFileSync("./database/gamestate.json", JSON.stringify(oldState))

  //Return updated gamestate
  res.json(JSON.stringify(oldState));
});

/* GET Restart Game */
router.get('/restart', function(req, res, next) {

  console.log("\n *RESTART* \n");

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
    votes: [0, 0, 0, 0, 0, 0, 0],
    currentTeam: 1
  }

  //Write gamestate to database
  fs.writeFileSync("./database/gamestate.json", JSON.stringify(clearState))

  //Return updated gamestate
  res.json(JSON.stringify(clearState));
});

/* GET The State of the Game */
router.get('/', function(req, res, next) {

  console.log("\n *START* \n");

  //Read gamestate from file
  var content = fs.readFileSync("./database/gamestate.json");
  console.log("Output Content : \n"+ content);

  //Return state to client
  res.json(JSON.parse(content));
});

/* POST vote to server */
router.post('/vote', function(req, res, next) {

  console.log("\n *Received* \n");
  //Stores vote as number
  var vote = req.body.vote;

  //Reads old state
  var content = fs.readFileSync("./database/gamestate.json");
  var oldState = JSON.parse(content);

  //Updates vote array
  oldState.votes[vote]++;
  console.log(oldState.votes);

  //Writes updated voting array to file
  fs.writeFileSync("./database/gamestate.json", JSON.stringify(oldState));

  //Returns updated vote count
  res.json(JSON.stringify(oldState));
});

module.exports = router;
