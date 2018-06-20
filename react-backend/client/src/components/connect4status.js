import React, { Component } from 'react';


export default class Connect4Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [0, 0, 0, 0, 0, 0, 0],
            currentPlayer: 'red'
        }
    }
    render() {
        var voteList = this.state.results.map(score => {
            return (
                    <a>{score}</a>
            )
        })
        return (
            <div>
                {voteList}
            </div>
        )
    }
}