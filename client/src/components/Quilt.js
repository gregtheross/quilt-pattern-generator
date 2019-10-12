import React from "react";
import Triangle from "./Triangle.js";
import SvgTriangle from "./SvgTriangle.js";

class Quilt extends React.Component {
  // todo: pass a list of fabric entities (could simply be an id and url) into the props
  // todo: shuffle the fabrics

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

  createSvgQuilt() {
    // todo: eventually this should get handle different calculations based on the selected shape

    let trianglePointsDown = "0 0, 50 50, 100 0";
    let trianglePointsUp = "50 0, 100 50, 0 50";

    let triangleWidth = 100;
    let triangleHeight = 50; // todo: calculate this based on equilaterial triangle equation

    let shapeIndex = 0;

    let svgShapes = [];
    let isUp = true;

    let fabricId = 0;

    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      isUp = rowIndex % 2 === 0;
      for (let colIndex = 0; colIndex < this.props.colCount; colIndex++) {
        svgShapes.push(
          <SvgTriangle
            id={shapeIndex}
            points={isUp ? trianglePointsUp : trianglePointsDown}
            width={100}
            height={100}
            top={rowIndex * triangleHeight}
            left={(colIndex * triangleWidth) / 2}
            backgroundImage={this.props.fabricList[fabricId]}
          />
        );

        isUp = !isUp;
        shapeIndex++;
        if (fabricId === this.props.fabricList.length - 1) fabricId = 0;
        else fabricId++;
      }
    }
    return svgShapes;
  }

  render() {
    return (
      <div>
        <h2>CSS border hack quilt:</h2>
        <div className="quilt">{this.createQuilt()}</div>
        <h2>svg quilt:</h2>
        <div className="svg-quilt">{this.createSvgQuilt()}</div>
      </div>
    );
  }
}

export default Quilt;
