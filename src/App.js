import React, {Component} from "react";
import Label from "./Label";
import Board from "./Board";
import Modal from "react-modal";
import './App.css';
import './Modal.css'
import {getWordle} from './Data';


class App extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		showPopup: false,
			  didSolve: false,
              wordle: getWordle()
    	}
  	}

      showPopup(didSolve) {
		this.setState(prevState => {
			return {
				showPopup: true,
				didSolve: didSolve,
				wordle: prevState.wordle
			}
			
		})
      }

	  playAgain() {
		  this.setState({
			  showPopup: false,
			  didSolve: false,
			  wordle: getWordle()
		  })
	  }

	
    render() {
        return (
      	<div id="mainDiv">
        	<Label className="mainElement"/>
        	<Board showPopup={this.showPopup.bind(this)} wordle={this.state.wordle}/>
			<Modal isOpen={this.state.showPopup} id="modal">
                <h1>
                    {this.state.wordle}
                </h1>
                <br></br>
				<h2>
					{this.state.didSolve ? 'Congrats!' : 'Better luck next time!'}
				</h2>
				<br></br>
				<button id="replayButton" onClick={this.playAgain.bind(this)}>Click to play again!</button>
			</Modal>
      	</div>
       
    	);
  	}
}

export default App;
