import React, {Component} from "react";
import Tile from "./Tile";
import './WordRow.css'

let arr = [0, 1, 2, 3, 4]

class WordRow extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            word: props.word,
            tileColors: ['black', 'black', 'black', 'black', 'black'],
            wordle: props.wordle
        }
        document.addEventListener("keydown", this.handleKey.bind(this));
    }

    static getDerivedStateFromProps(props, state) {
        if (props.word !== state.word) {
            return {
                word: props.word,
                tileColors: state.tileColors,
                wordle: state.wordle
            }
        }
        return null;
    }

    handleKey(e) {
        e.preventDefault();
        if (this.props.rowIdx !== this.props.index) {
            return;
        }
        if (e.keyCode === 13) {
            let validEnter = this.props.handleEnter();
            if (validEnter) {
                this.checkWord();
            }
        } else {
            this.props.handleKey(e);
        }
    }

    updateLetterMap() {
        let map = new Map();
        let word = this.state.word;
        let tileColors = this.state.tileColors;
        for (let i = 0; i < 5; i++) {
            let letter = word[i];
            if (!map.has(letter) || map.get(letter) !== 'green') {
                map.set(letter, tileColors[i]);
            }

        }
        this.props.updateLetterMap(map);
    }

    checkWord() {
        let word = [...this.state.word];
        let wordle = this.state.wordle;
        let map = new Map();
        for (let i = 0; i < word.length; i++) {
            if (map.has(wordle[i])) {
                map.set(wordle[i], map.get(wordle[i]) + 1);
            } else {
                map.set(wordle[i], 1);
            }
        }
        let newColors = new Array(5);
        for (let i = 0; i < 5; i++) {
            let letter = word[i];
            if (wordle[i] === letter) {
                newColors[i] = 'green';
                map.set(letter, map.get(letter) - 1);
            }
        }
        for (let i = 0; i < 5; i++) {
            if (newColors[i] !== 'green') {
                let letter = word[i];
                if (wordle.includes(letter) && map.get(letter) > 0) {
                    newColors[i] = 'yellow';
                } else {
                    newColors[i] = 'gray';
                }
            }
        }
        this.setState(prevState => {
            return {
                word: prevState.word,
                tileColors: newColors,
                wordle: prevState.wordle
            }
        }, this.updateLetterMap);
    }

    render() {
        return <div id='row'>
        {arr.map(index => {
            return <Tile key={index} letter={this.state.word[index]} color={this.state.tileColors[index]}/>
        })}
    </div>
        
    }
}

export default WordRow;