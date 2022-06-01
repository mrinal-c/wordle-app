import React, {Component} from "react";
import './Tile.css'

class Tile extends Component {
    handleKeyboardClick(e) {
        e.preventDefault();
        if (this.props.location === "letterList") {
            this.props.handleKeyboardClick(e.target.innerText);
        }
    }

    render() {
        return <div id={this.props.color} className="tileDiv">
            <label id="text" onClick={this.handleKeyboardClick.bind(this)}>{this.props.letter}</label>
        </div>
    }
}

export default Tile;