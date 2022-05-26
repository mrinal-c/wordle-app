import React, {Component} from "react";
import Tile from "./Tile";
import './Tile.css';
import './LetterList.css';

let num1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
let num2 = ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];
let num3 = ['u', 'v', 'w', 'x', 'y', 'z'];

class LetterList extends Component {
    render() {
        return <div id="letterListDiv">
            <div>
                {num1.map((letter, index) => {
                return <Tile key={index} color={this.props.letterMap.get(letter)} letter={letter}/>
            })}</div>

            <div>{num2.map((letter, index) => {
                return <Tile key={index} color={this.props.letterMap.get(letter)} letter={letter}/>
            })}</div>
            <div>{num3.map((letter, index) => {
                return <Tile key={index} color={this.props.letterMap.get(letter)} letter={letter}/>
            })}</div>
        </div>
    }
}

export default LetterList;