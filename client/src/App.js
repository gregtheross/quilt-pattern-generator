import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Triangle from "./components/Triangle.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowCount: 8,
      colCount: 11,
      fabricCount: 9,
      rows: []
    };

    this.shuffle = this.shuffle.bind(this);
    this.createRows = this.createRows.bind(this);
    this.createColumns = this.createColumns.bind(this);
  }

  shuffle() {
    // todo: eventually this should get broken out into something like createQuiltPattern() and does
    //       different calculations based on the selected shape

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

    return indexes;
  }

  createRows() {
    let fabricIndexes = this.shuffle();

    let rows = [];

    for (let i = 0; i < this.state.rowCount; i++) {
      rows.push(<div class="row">{this.createColumns(i, fabricIndexes)}</div>);
    }

    this.setState({ quiltRows: rows });
  }

  createColumns(rowIndex, fabricIndexes) {
    let cols = [];

    let isUp = rowIndex % 2 == 0;
    let shuffleIndex = rowIndex * this.state.colCount;
    for (let i = 0; i < this.state.colCount; i++) {
      if (isUp) {
        cols.push(
          <Triangle direction="up" fabricId={fabricIndexes[shuffleIndex]} />
        );
      } else {
        cols.push(
          <Triangle direction="down" fabricId={fabricIndexes[shuffleIndex]} />
        );
      }
      isUp = !isUp;
      shuffleIndex++;
    }

    return cols;
  }

  render() {
    return (
      <div>
        <button onClick={this.createRows}>test</button>
        <div id="quilt">{this.state.quiltRows}</div>
      </div>
    );
  }
}

export default App;
