import React, {Component} from "react";
import WordRow from "./WordRow";
import './Board.css'
import {getWordle, getLetterMap, wordList} from "./Data";
import LetterList from "./LetterList";

let arr = [0, 1, 2, 3, 4, 5]

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['     ', '     ', '     ', '     ', '     ', '     '],
            rowIdx: 0,
            tileIdx: 0,
            wordle: getWordle(),
            solved: false,
            letterMap: getLetterMap()
        }
    }

    handleKey(e) {
        if (this.state.solved) {
            return;
        }
        let words = this.state.words;
        let row = this.state.rowIdx;
        let tile = this.state.tileIdx;
        if (e.keyCode === 8 && tile > 0) {
            let word = words[row];
            word = word.trim().slice(0, tile - 1).padEnd(5);
            words[row] = word;
            this.setNewState(words, row, tile - 1, false, this.state.letterMap);
        } else if (e.keyCode >= 65 && e.keyCode <= 90 && tile <= 4) {
            let word = words[row];
            word = word.trim().concat(e.key).padEnd(5);
            words[row] = word;
            this.setNewState(words, row, tile + 1, false, this.state.letterMap);
        }
    }

    handleEnter() {
        if (this.state.tileIdx === 5 && wordList.includes(this.state.words[this.state.rowIdx])) {
            let solved = false;
            if (this.state.words[this.state.rowIdx] === this.state.wordle) {
                solved = true;
            }
            this.setNewState(this.state.words, this.state.rowIdx + 1, 0, solved, this.state.letterMap);
            return true;
        }
        return false;
    }

    updateLetterMap(map) {
        let newLetterMap = new Map();
        for (const letter of this.state.letterMap.keys()) {
            if (map.has(letter) && this.state.letterMap.get(letter) !== 'green') {
                newLetterMap.set(letter, map.get(letter));
            } else {
                newLetterMap.set(letter, this.state.letterMap.get(letter));
            }
        }
        this.setNewState(this.state.words, this.state.rowIdx, this.state.tileIdx, this.state.solved, newLetterMap);
    }

    setNewState(words, row, tile, solved, letterMap) {
        this.setState(prevState => {
            return {
                words: words,
                rowIdx: row,
                tileIdx: tile,
                wordle: prevState.wordle,
                solved: solved,
                letterMap: letterMap
            }
        })
    }

    render() {
        return <div id="board">
            {arr.map(index => {
                return <WordRow key={index} rowIdx={this.state.rowIdx} index={index} word={this.state.words[index]} wordle={this.state.wordle} handleEnter={this.handleEnter.bind(this)} handleKey={this.handleKey.bind(this)} updateLetterMap={this.updateLetterMap.bind(this)}/>
            })}
            <LetterList letterMap={this.state.letterMap}/>
        </div>
    }
}

export default Board;