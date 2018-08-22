import React, { Component } from 'react';


export default class Connect4Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: this.props.votes,
            currentPlayer: this.props.team
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({currentPlayer: newProps.team,
                        results: newProps.votes});
    }
    submitMove() {
        this.props.submitMove();
    }
    restart() {
        this.props.restart();
    }
    render() {
        var voteList = this.state.results.map(score => {
            return (
                    <a style={{color: "red", padding: 42}}>{score}</a>
            )
        })
        return (
            <div>
                {voteList}
                <br />
                Inserts = {this.props.inserts}
                <br />
                Current Player = {this.state.currentPlayer}
                <br />
                <button onClick={this.submitMove.bind(this)}> Submit Move </button>
                <br />
                <button onClick={this.restart.bind(this)}> Restart Game </button>
            </div>
        )
    }
}