import React, { Component } from 'react';
import Connect4Board from './connect4board.js';
import Connect4Status from './connect4status.js';


export default class Connect4 extends Component {
    constructor() {
        super();
    
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
            assignedTeam: 1,

            currentTeam: 1,
            redPlayers: 0,
            yellowPlayers: 0,

            timer: 0
        };
    }
    componentDidMount() {
        this.refreshState();

        //Check if user is logged in
        if(!this.state.userName){
            this.newUserPage();
        }
        this.interval = setInterval(() => this.refreshState(), 1000)

    }
    //Fetch state of game
    refreshState = () => {
        fetch('/gamestate')
            .then(res => res.json())
            .then(newState => {
                this.setState(newState);
                console.log(newState);
            })
    }
    finishTurn = () => {
        fetch('/gamestate/turn')
            .then(res => res.json())
            .then(newState => {
                console.log(newState);
                this.setState(JSON.parse(newState));
                
            })

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
        for (let row in newGrid) {
            let firstSpot = 5-row;
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
        })
                

    }  

    newUserPage() {
        //GET USERNAME
        let username = "andgly95";
        var yourTeam;
        if (this.state.yellowPlayers < this.state.redPlayers) {
            yourTeam = 2
        }
        else yourTeam = 1;
        let logIn = {
            userName: username,
            assignedTeam: yourTeam
        }
        this.setState(logIn);
    }

    render() {
        return (
            <div>
                <Connect4Board isActive={this.state.currentTeam == this.state.assignedTeam} insert={this.insertPiece.bind(this)} grid={this.state.grid}/>
                <Connect4Status restart={this.restartGame.bind(this)} submitMove={this.finishTurn.bind(this)} team={this.state.currentTeam} inserts={this.state.inserts} votes={this.state.votes}/>
            </div>
        )
    }
}