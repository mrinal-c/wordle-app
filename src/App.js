import React, {Component} from "react";
import Label from "./Label";
import Board from "./Board";
import './App.css'


class App extends Component {
  render() {
    return (
      <div id="mainDiv">
        <Label className="mainElement"/>
        <Board/>
      </div>
       
    );
  }
}

export default App;
