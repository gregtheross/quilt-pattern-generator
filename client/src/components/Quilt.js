import React from "react";
import Triangle from "./Triangle.js";

class Quilt extends React.Component {
  createQuilt() {
    // todo: eventually this should get handle different calculations based on the selected shape

    if (this.props.fabricList.length > 0) {
      let rows = [];

      for (let i = 0; i < this.props.rowCount; i++) {
        rows.push(
          <div className="row" key={"row-" + i}>
            {this.createColumns(i, this.props.fabricList)}
          </div>
        );
      }
      return rows;
    } else {
      return (
        <div>Click the button...you really expect me to do all the work?!</div>
      );
    }
  }

  createColumns(rowIndex) {
    let cols = [];

    let isUp = rowIndex % 2 === 0;
    let shuffleIndex = rowIndex * this.props.colCount;
    for (let i = 0; i < this.props.colCount; i++) {
      if (isUp) {
        cols.push(
          <Triangle
            key={"triangle-" + rowIndex + "-" + i}
            direction="up"
            fabricId={this.props.fabricList[shuffleIndex]}
          />
        );
      } else {
        cols.push(
          <Triangle
            key={"triangle-" + rowIndex + "-" + i}
            direction="down"
            fabricId={this.props.fabricList[shuffleIndex]}
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
