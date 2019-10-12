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
      indexes.push((i % this.props.fabricList.length));
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

  createSvgQuilt() {
    // todo: eventually this should get handle different calculations based on the selected shape

    let shuffledFabrics = this.getFabricList();

    let trianglePointsDown = "0 0, 50 50, 100 0";
    let trianglePointsUp = "50 0, 100 50, 0 50";

    let triangleWidth = 100;
    let triangleHeight = 50; // todo: calculate this based on equilaterial triangle equation

    let shapeIndex = 0;

    let svgShapes = [];
    let isUp = true;

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
            backgroundImage={this.props.fabricList[shuffledFabrics[shapeIndex]]}
          />
        );

        isUp = !isUp;
        shapeIndex++;
      }
    }
    return svgShapes;
  }

  render() {
    return (
      <div>
        <div className="svg-quilt">{this.createSvgQuilt()}</div>
      </div>
    );
  }
}

export default Quilt;
