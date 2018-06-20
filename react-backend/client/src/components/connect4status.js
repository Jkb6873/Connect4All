import React, { Component } from 'react';


export default class Connect4Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.votes,
            currentPlayer: 'red'
        }
    }
    render() {
        var voteList = this.state.results.map(score => {
            return (
                    <a style={{color: "red"}}>{score}</a>
            )
        })
        return (
            <div>
                {voteList}
                Inserts = {this.props.inserts}
            </div>
        )
    }
}