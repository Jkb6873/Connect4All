var express = require('express');
var router = express.Router();
var fs = require("fs");

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
  var victory = placeDisc(newGrid, ((oldState.inserts % 2) + 1), maxIndex);
  console.log(newGrid);
  oldState.grid = newGrid;
  oldState.inserts++;
  oldState.votes = [0,0,0,0,0,0,0];
  console.log("WINNDER: ", maxIndex)

  if (victory){  
    fs.writeFileSync("./database/gamestate.json", JSON.stringify(clearState));
    res.json(JSON.stringify(clearState));
  }
  else{
    fs.writeFileSync("./database/gamestate.json", JSON.stringify(oldState))
    res.json(JSON.stringify(oldState));
  }
});

/* GET Restart Game */
router.get('/restart', function(req, res, next) {

  console.log("\n *RESTART* \n");

  //Write gamestate to database
  fs.writeFileSync("./database/gamestate.json", JSON.stringify(clearState));

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
  //var outputState = JSON.stringify(oldState, null, 2);

  //Updates vote array
  oldState.votes[vote]++;
  console.log(oldState.votes);

  //Writes updated voting array to file
  fs.writeFileSync("./database/gamestate.json", JSON.stringify(oldState));


  //Returns updated vote count
  res.json(JSON.stringify(oldState));
});

function checkForVictory(player,field,row,col){

  if(checkVert(field, row, col) || 
    checkHori(field, row, col) || 
    checkLeftDiag(field, row, col) || 
    checkRightDiag(field, row, col)){
  
    console.log("WINNER WINNER CHICKEN DINNER");
    return true;
  }
  return false;
}
function checkVert(field,row,col){
  console.log("VERT");
  var output = true;
  var i;
  console.log(row, col);
  for(i = row; i < row+4 && i < 6; i++){
    output = output && (field[i][col] == field[row][col]);
  }

  return i == row+4 ? output : false;
}
function checkHori(field,row,col){
  console.log("HORI");
  var output = true;
  var x1 = col;
  var i;
  while(x1 > 1 && field[row][col] == field[row][x1-1])
    x1--;
  for(i = x1; i < x1+4 && i < 7; i++)
    output = output && (field[row][i] == field[row][col]);
  return i == x1 + 4 ? output : false;
}
function checkRightDiag(field, row, col){
  console.log("RDIAG");
  var output = true;
  var x1 = row; var y1 = col; var i;
  while(x1 < 5 && y1 > 1 && field[row][col] == field[x1+1][y1-1]){
    x1++;
    y1--;
  }
  for(i = 0; i < 4 && x1 > 0 && y1 < 7; i++){
    output = output && (field[x1][y1] == field[row][col]);
    x1--;
    y1++;
  }
  return i == 4 ? output : false;
}
function checkLeftDiag(field,row,col){
  console.log("LDIAG");
  var output = true;
  var x1 = row; var y1 = col; var i;
  while(x1 > 0 && y1 > 0 && field[row][col] == field[x1-1][y1-1]){
    x1--;
    y1--;
  }
  for(i = 0; i < 4 && x1 < 6 && y1 < 7; i++){
    output = output && (field[x1][y1] == field[row][col]);
    x1++;
    y1++;
  }
  return i == 4 ? output : false;
}

function placeDisc(field, player, col){
  console.log("PLACING DISC IN ", col);
  if(col > 6 || field[0][col] != 0)
    return;
  var row = 0;
  while(row < 5 && field[row+1][col] == 0)
    row++;
  field[row][col] = player;
  console.log("BEFORE CHCK VIC");
  return checkForVictory(player, field, row, col);
}

module.exports = router;
