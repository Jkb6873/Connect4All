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
                [0, 1, 2, 1, 0, 0, 0]
            ],
            inserts: 0,
            votes: [0, 0, 0, 0, 0, 0, 0],
            userName: "",
            currentTeam: 1
        };
    }
    componentDidMount() {
        if(!this.state.userName){
            //this.promptUserName();
        }
        fetch('/gamestate')
            .then(res => res.json())
            .then(newState => {
                let gamestate = newState.grid;
                this.setState({grid: gamestate});
                console.log(gamestate);
            })
        //this.setState(newState)
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
        this.setState({
            grid: newGrid,
            inserts: (this.state.inserts+1),
            votes: newVotes,
            currentTeam: nextTeam
        })
    }  
    render() {
        return (
            <div>
                <Connect4Board insert={this.insertPiece.bind(this)} grid={this.state.grid}/>
                <Connect4Status team= {this.state.currentTeam} inserts={this.state.inserts} votes={this.state.votes}/>
            </div>
        )
    }
}