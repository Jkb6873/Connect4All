import React, { Component } from 'react';
import Connect4Piece from './connect4piece'

export default class Connect4Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.props.grid,
            currentPlayer: 'red',
            isActive: true
        }
    }
    render() {
        const currentBoard = this.state.grid.map((row, col) => {
            return(<div key = {col}>
                {row.map((cell, index) => <Connect4Piece key={index} value={cell}/>)}
            </div>)
    })
        return (
            <div>
                {currentBoard}
            </div>
        )
    }
}