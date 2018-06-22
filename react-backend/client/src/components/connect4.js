import React, { Component } from 'react';
import Connect4Board from './connect4board.js';
import Connect4Status from './connect4status.js';
//import LogInForm from './loginform.js';


export default class Connect4 extends Component {
    constructor(props) {
        super(props);
        var voted = false;
        this.state = {
            grid: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 0],
                [0, 1, 2, 1, 1, 1, 0]
            ],
            inserts: 0,
            votes: [0, 0, 0, 0, 0, 0, 0],

            userName: "",
            assignedTeam: 0,

            currentTeam: 1,
            redPlayers: 0,
            yellowPlayers: 0,

            timer: 0,
            entry: ""
        };
    }
    componentDidMount() {
        this.refreshState();

        //Check if user is logged in
        if(!this.state.userName){
            console.log("NOT LOGED IN")
        }

        this.interval = setInterval(() => this.refreshState(), 1000)
        

    }

    handleSubmit(){
     const username = this.state.entry;
     this.logIn(username);
    //  this.setState({
    //     username: username
    //  })
    }

    handleChange(event) {
        this.setState({entry: event.target.value});
    }

    logIn(username) {
        var yourTeam;
        if (this.state.yellowPlayers < this.state.redPlayers) {
            yourTeam = 2
        }
        else yourTeam = 1;
        let log = {
            userName: username,
            assignedTeam: yourTeam
        }
        fetch('/gamestate/login', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(log), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(newState => {
            newState = JSON.parse(newState);
            newState["username"] = log.userName;
            newState["assignedTeam"] = log.assignedTeam;
            console.log("LOGIN", newState);
            this.setState(newState);
    })
    }
    //Fetch state of game
    refreshState = () => {
        fetch('/gamestate')
            .then(res => res.json())
            .then(newState => {
                this.setState(newState);
                console.log(newState);
            });
        //this.setState(newState)
      }
    finishTurn = () => {
        fetch('/gamestate/turn')
            .then(res => res.json())
            .then(newState => {
                console.log(newState);
                this.setState(JSON.parse(newState));
            }).then(this.voted = false);

    }
    restartGame = () => {
       
        fetch('/gamestate/restart')
            .then(res => res.json())
            .then(newState => {
                console.log(newState);
                this.setState(JSON.parse(newState));
                
            })
    }
    insertPiece = (column) => {
        let newGrid = this.state.grid;
        let piecePlaced = false;
        //for row in grid
        for (let row in newGrid) {
            //going backwards
            let firstSpot = 5-row;
            //if not placed and free, place
            if (newGrid[firstSpot][column] == 0 && !piecePlaced){
                    newGrid[firstSpot][column] = this.state.currentTeam;
                    piecePlaced = true;
                }
            console.log("END ROW")
            //console.log(newGrid);
        }
        console.log(column + " added")
        let newVotes = this.state.votes;
        let nextTeam = 0;
        if (this.state.currentTeam == 1){
            nextTeam = 2;
        }
        else nextTeam = 1;
        newVotes[column] = 1;

        let move = {
            vote: column
        }
        if(!this.voted){
            fetch('/gamestate/vote', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(move), // data can be `string` or {object}!
                headers:{
                'Content-Type': 'application/json'
                }
        }).then(res => res.json())
        .then(newState => {
            newState = JSON.parse(newState);
            this.setState(newState);
            //Connect4Board.setState({isActive:true});
        })
    }
                

    }  



    render() {
        const user = (this.state.username)? this.state.username: "";
        console.log("user:", user)
        var userfield = user ? ("Welcome: " + user ) : "Please Log In";
        var teamname;
        if (this.state.assignedTeam == 1) {
            teamname = "Red"
        } else if (this.state.assignedTeam == 2) {
            teamname = "Yellow"
        }
        else teamname = "unassigned";
        return (
            <div>
                {userfield}<br />
                You are on team {teamname}<br />
                <button onClick={this.handleSubmit.bind(this)}>
                Login: </button><input type="text" value={this.state.entry} onChange={this.handleChange.bind(this)}/>
                <Connect4Board isActive={this.state.currentTeam == this.state.assignedTeam} insert={this.insertPiece.bind(this)} grid={this.state.grid}/>
                <Connect4Status login={this.logIn.bind(this)} restart={this.restartGame.bind(this)} submitMove={this.finishTurn.bind(this)} team={this.state.currentTeam} inserts={this.state.inserts} votes={this.state.votes}/>
            </div>
        )
    }
}