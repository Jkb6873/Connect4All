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
            userName: ""
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
        for (let row in newGrid) {
            let next = Number(row) + 1;
            //console.log(newGrid);
        }
        console.log(column + " added")
        let newVotes = this.state.votes;
        newVotes[column] = 1;
        this.setState({
            grid: newGrid,
            inserts: (this.state.inserts+1),
            votes: newVotes
        })
    }  
    render() {
        return (
            <div>
                <Connect4Board insert={this.insertPiece.bind(this)} grid={this.state.grid}/>
                <Connect4Status inserts={this.state.inserts} votes={this.state.votes}/>
            </div>
        )
    }
}