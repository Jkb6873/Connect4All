// Two member variables
// name: To keep track of username
// move: To keep track if user has made a move
// id: To keep track of the user's ID
class User {
	// Constructor when a user object is created
	constructor(name, id){
		this.name = name;
		this.move = false;
		this.id = id;
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

	getID(){
		return this.id;
	}
}
