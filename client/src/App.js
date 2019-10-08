import React from "react";
import logo from "./logo.svg";
import "./App.css";

// todo: convert to a method that generates these (essentially are the number of fabrics)
const indexes = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  5,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  7,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  8,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9,
  9
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowCount: 8,
      colCount: 11,
      rows: []
    };

    this.shuffle = this.shuffle.bind(this);
    this.createRows = this.createRows.bind(this);
    this.createColumns = this.createColumns.bind(this);
  }

  shuffle() {
    console.log("shuffle");

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

    this.setState({ quiltRows: this.createRows() });
  }

  createRows() {
    let rows = [];

    for (let i = 0; i < this.state.rowCount; i++) {
      rows.push(<div class="row">{this.createColumns(i)}</div>);
    }

    return rows;
  }

  createColumns(rowIndex) {
    let cols = [];

    let isUp = rowIndex % 2 == 0;
    let shuffleIndex = rowIndex * this.state.colCount;
    for (let i = 0; i < this.state.colCount; i++) {
      if (isUp) {
        cols.push(
          <div
            class={"triangle up color-" + indexes[shuffleIndex]}
            key={rowIndex + "-" + i}
          ></div>
        );
      } else {
        cols.push(
          <div
            class={"triangle down color-" + indexes[shuffleIndex]}
            key={rowIndex + "-" + i}
          ></div>
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
        <button onClick={this.shuffle}>test</button>
        <div id="quilt">{this.state.quiltRows}</div>
      </div>
    );
  }
}

export default App;
