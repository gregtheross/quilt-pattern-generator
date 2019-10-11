import React from "react";
import Triangle from "./Triangle.js";

class Quilt extends React.Component {
  getFabricList() {
    // Generate initial array of fabricIds and then shuffle them.
    // This is purposeful because we want an even number of fabric swatches to be used and only their locations randomized.
    // If we randomize the selection there is a high risk of having more fabric blocks than others
    let indexes = [];
    for (let i = 0; i < this.props.colCount * this.props.rowCount; i++) {
      indexes.push((i % this.props.fabricCount) + 1);
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

  createQuilt() {
    // todo: eventually this should get handle different calculations based on the selected shape

    let fabricList = this.getFabricList();

    if (fabricList.length > 0) {
      let rows = [];

      for (let i = 0; i < this.props.rowCount; i++) {
        rows.push(
          <div className="row" key={"row-" + i}>
            {this.createColumns(i, fabricList)}
          </div>
        );
      }
      return rows;
    } else {
      return (
        <div>hey dummy...you can't make a quilt with no rows or columns!</div>
      );
    }
  }

  createColumns(rowIndex, fabricList) {
    let cols = [];

    let isUp = rowIndex % 2 === 0;
    let shuffleIndex = rowIndex * this.props.colCount;
    for (let i = 0; i < this.props.colCount; i++) {
      if (isUp) {
        cols.push(
          <Triangle
            key={"triangle-" + rowIndex + "-" + i}
            direction="up"
            fabricId={fabricList[shuffleIndex]}
          />
        );
      } else {
        cols.push(
          <Triangle
            key={"triangle-" + rowIndex + "-" + i}
            direction="down"
            fabricId={fabricList[shuffleIndex]}
          />
        );
      }
      isUp = !isUp;
      shuffleIndex++;
    }

    return cols;
  }

  render() {
    return <div className="quilt">{this.createQuilt()}</div>;
  }
}

export default Quilt;
