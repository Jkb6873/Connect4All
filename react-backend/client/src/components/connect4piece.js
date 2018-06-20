import React, { Component } from 'react';
import redcircle from './redcircle.png';
import yellowcircle from './yellowcircle.png';
import blackcircle from './blackcircle.png';


export default class Connect4Piece extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    sendPosition = () => {
        this.props.sendPosition(this.props.position);
    }
    render(){
        var colors = {
            0: blackcircle,
            1: redcircle,
            2: yellowcircle
        }
        let color = colors[this.props.value]
        return (
            <button onClick={this.sendPosition.bind(this)}>
                <img src={color} style={{
                            width: 75,
                            height: 75}} alt="red" />
            </button>
        )
    }
}