import React, {Component} from "react";
import './Tile.css'

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letter: props.letter,
            color: props.color
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.letter !== state.letter || props.color !== state.color) {
            return {
                letter: props.letter,
                color: props.color
            }
        }
        return null;
    }

    render() {
        return <div id={this.state.color} className="tileDiv">
            <label id="text">{this.state.letter}</label>
        </div>
    }
}

export default Tile;