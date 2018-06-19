import React, { Component } from 'react';
import Connect4Board from './connect4board.js';
import axios from 'axios';


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
            inserts: 0
        };
      }
    render() {
        return (
            <div>
                Welcome to Connect4All
                <Connect4Board grid={this.state.grid}/>
            </div>
        )
    }
}