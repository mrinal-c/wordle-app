import React, {Component} from "react";
import WordRow from "./WordRow";
import './Board.css'
import { getLetterMap, wordList} from "./Data";
import LetterList from "./LetterList";

let arr = [0, 1, 2, 3, 4, 5]

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['     ', '     ', '     ', '     ', '     ', '     '],
            rowIdx: 0,
            tileIdx: 0,
            wordle: props.wordle,
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
            if (this.state.words[this.state.rowIdx] === this.props.wordle) {
                solved = true;
            }
            this.setNewState(this.state.words, this.state.rowIdx + 1, 0, solved, this.state.letterMap);
            return true;
        }
        return false;
    }

    handlePopup() {
        if (this.state.solved || this.state.rowIdx === 6) {
            this.props.showPopup(this.state.solved);
        }
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
        this.setState(prevState => {
            return {
                words: prevState.words,
                rowIdx: prevState.rowIdx,
                tileIdx: prevState.tileIdx,
                solved: prevState.solved,
                letterMap: newLetterMap
            }
        }, this.handlePopup)
    }

    setNewState(words, row, tile, solved, letterMap) {
        this.setState({
            words: words,
            rowIdx: row,
            tileIdx: tile,
            solved: solved,
            letterMap: letterMap
        })
    }

    render() {
        return <div id="board">
            {arr.map(index => {
                return <WordRow key={index} rowIdx={this.state.rowIdx} index={index} word={this.state.words[index]} wordle={this.props.wordle} handleEnter={this.handleEnter.bind(this)} handleKey={this.handleKey.bind(this)} updateLetterMap={this.updateLetterMap.bind(this)}/>
            })}
            <LetterList letterMap={this.state.letterMap}/>
        </div>
    }
}

export default Board;