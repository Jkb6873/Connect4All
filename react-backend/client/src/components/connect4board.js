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
    sendPosition = (position) => {
        console.log(position);
        this.props.insert(position);
    }
    render() {
        const currentBoard = this.state.grid.map((row, col) => {
            return(<div key = {col}>
                {row.map((cell, index) => <Connect4Piece position={index} key={index + col} value={cell} sendPosition={this.sendPosition.bind(this)}/>)}
            </div>)
    })
        return (
            <div>
                {currentBoard}
            </div>
        )
    }
}