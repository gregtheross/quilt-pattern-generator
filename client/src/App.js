import React from "react";
import "./App.css";

import Quilt from "./components/Quilt.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowCount: 8,
      colCount: 11,
      fabricCount: 9,
      fabricList: []
    };

    this.shuffleFabricList = this.shuffleFabricList.bind(this);
  }

  shuffleFabricList() {
    // Generate initial array of fabricIds and then shuffle them.
    // This is purposeful because we want an even number of fabric swatches to be used and only their locations randomized.
    // If we randomize the selection there is a high risk of having more fabric blocks than others
    let indexes = [];
    for (let i = 0; i < this.state.colCount * this.state.rowCount; i++) {
      indexes.push((i % this.state.fabricCount) + 1);
    }

    var currentIndex = indexes.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = indexes[currentIndex];
      indexes[currentIndex] = indexes[randomIndex];
      indexes[randomIndex] = temporaryValue;
    }

    this.setState({ fabricList: indexes });
  }

  render() {
    return (
      <div>
        <button onClick={this.shuffleFabricList}>Create Quilt</button>

        <Quilt
          rowCount={this.state.rowCount}
          colCount={this.state.colCount}
          fabricCount={this.state.fabricCount}
          fabricList={this.state.fabricList}
        />
      </div>
    );
  }
}

export default App;
