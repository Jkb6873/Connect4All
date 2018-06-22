import React, { Component } from 'react';
import Connect4Piece from './connect4piece';

export default class Connect4Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: this.props.grid,
            isActive: this.props.isActive
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({grid: newProps.grid,
                        isActive: newProps.isActive});
    }
    sendPosition = (position) => {
        console.log(position);
        this.props.insert(position);
    }
    render() {
        let activeView = this.state.isActive ? "activeTurn" : "inactiveTurn"
        const currentBoard = this.state.grid.map((row, col) => {
            if (this.props.isActive || true){
                return(<div key = {col}>
                {row.map((cell, index) => <Connect4Piece activeGame={this.state.isActive} position={index} key={index + col} value={cell} sendPosition={this.sendPosition.bind(this)}/>)}
            </div>)
            }
            
    })
        return (
            <div className={activeView}>
                {currentBoard}
            </div>
        )
    }
}