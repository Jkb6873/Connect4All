// Two member variables
// Name: To keep track of username
// move: To keep track if user has made a move
class User {
	// Constructor when a user object is created
	constructor(name){
		this.name = name;
		this.move = false;
	}
	// Player has made a move
  	setMove(){
  		this.move = true;
  	}
  	// Reset move based on refresh or clicking new slot
	resetMove(){
		this.move = false;
	}
	// Get their move boolean
	getMoveState(){
	  	return this.move;
	}
}
