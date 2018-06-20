var gameField = [
  [0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,1,1,2,1,0,0],
  [0,0,0,2,1,0,0],
  [0,0,0,2,0,0,0],
];

var currentCol;
var currentRow;
var currentPlayer;
var id = 1;

prepareField();
placeDisc(2, 1);
placeDisc(1, 1);
placeDisc(1, 1);
placeDisc(1, 1);
placeDisc(1, 2);
placeDisc(1, 2);
placeDisc(1, 2);
placeDisc(1, 3);
placeDisc(1, 3);
placeDisc(1, 4);

function checkForVictory(player,row,col){
  if(checkVert(row, col) || checkHori(row, col) || checkLeftDiag(row, col) || checkRightDiag(row, col)){
    console.log("Player ", player, " wins!");
    prepareField();
    printField();
    return true;
  }
  return false;
}

function checkVert(row,col){
  var output = true;
  var i;  
  for(i = row; i < row+4 && i < 6; i++){
    output = output && (gameField[i][col] == gameField[row][col]);
  }
  return i == row+4 ? output : false;
}

function checkHori(row,col){
  var output = true;
  var x1 = col;
  var i;
  while(x1 > 1 && gameField[row][col] == gameField[row][x1-1])
    x1--;
  for(i = x1; i < x1+4 && i < 7; i++)
    output = output && (gameField[row][i] == gameField[row][col]);
  return i == x1 + 4 ? output : false;
}

function checkRightDiag(row, col){
  var output = true;
  var x1 = row; var y1 = col; var i;
  while(x1 < 5 && y1 > 1 && gameField[row][col] == gameField[x1+1][y1-1]){
    x1++;
    y1--;
  }
  for(i = 0; i < 4 && x1 > 0 && y1 < 7; i++){
    output = output && (gameField[x1][y1] == gameField[row][col]);
    x1--;
    y1++;
  }
  return i == 4 ? output : false;
}

function checkLeftDiag(row,col){
  var output = true;
  var x1 = row; var y1 = col; var i;
  while(x1 > 0 && y1 > 0 && gameField[row][col] == gameField[x1-1][y1-1]){
    x1--;
    y1--;
  }
  for(i = 0; i < 4 && x1 < 6 && y1 < 7; i++){
    output = output && (gameField[x1][y1] == gameField[row][col]);
    x1++;
    y1++;
  }
  return i == 4 ? output : false;
}

function placeDisc(player, col){
  console.log("PLACING DISC IN ", col);
  if(col > 6 || gameField[0][col] != 0)
    return;
  var row = 0;
  while(row < 5 && gameField[row+1][col] == 0)
    row++;
  gameField[row][col] = player;
  printField();
  checkForVictory(player, row, col);
}

function prepareField(){
  for(var i=0; i<6; i++){
    for(var j=0; j<7; j++){
      gameField[i][j] = 0;
    }
  }
}


function printField(){
  for(var i=0; i<6; i++){
    console.log(gameField[i][0], gameField[i][1], gameField[i][2], gameField[i][3], 
                gameField[i][4], gameField[i][5], gameField[i][6]);
  }
}