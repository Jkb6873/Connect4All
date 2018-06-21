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
            currentTeam: 1
        };
    }
    componentDidMount() {
        //Check if user is logged in
        if(!this.state.userName){
            //this.promptUserName();
        }
        //Fetch state of game
        fetch('/gamestate')
            .then(res => res.json())
            .then(newState => {
                let gamestate = newState.grid;
                this.setState({grid: gamestate});
                console.log(newState);
            })
        //this.setState(newState)
      }
    finishTurn = () => {
        const votingArray = this.state.votes
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
        console.log("WINNDER: ", maxIndex)

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
        fetch('/gamestate', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(move), // data can be `string` or {object}!
            headers:{
            'Content-Type': 'application/json'
            }
      }).then(res => res.json())
        .then(newState => {
            //let gamestate = newState.grid;
            //this.setState({grid: gamestate});
            newState = JSON.parse(newState);
            this.setState(newState);
        })
                
        // this.setState({
        //     grid: newGrid,
        //     inserts: (this.state.inserts+1),
        //     votes: newVotes,
        //     currentTeam: nextTeam
        // })
    }  
    render() {
        return (
            <div>
                <Connect4Board insert={this.insertPiece.bind(this)} grid={this.state.grid}/>
                <Connect4Status submitMove={this.finishTurn.bind(this)} team={this.state.currentTeam} inserts={this.state.inserts} votes={this.state.votes}/>
            </div>
        )
    }
}