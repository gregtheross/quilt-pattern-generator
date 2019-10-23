import React from "react";
import FabricBlock from "./FabricBlock.js";

class Quilt extends React.Component {
  getFabricList() {
    // Generate initial array of fabricIds and then shuffle them.
    // This is purposeful because we want an even number of fabric swatches to be used and only their locations randomized.
    // If we randomize the selection there is a high risk of having more fabric blocks than others
    let indexes = [];
    for (let i = 0; i < this.props.colCount * this.props.rowCount; i++) {
      indexes.push(i % this.props.fabricList.length);
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
    switch (this.props.shapeType) {
      case "equilateral triangle":
        return this.createTriangleQuilt(true);
      case "isosceles triangle":
        return this.createTriangleQuilt(false);
      case "square":
        return this.createSquareQuilt();
      case "hexagon":
        return this.createHexagonQuilt();
      default:
        return <div>Invalid Shape</div>;
    }
  }

  createTriangleQuilt(isEquilateral) {
    // todo: consolidate some of the shared code with create[SHAPE]Quilt()

    let triangleWidth = this.props.shapeWidth;
    // if no height entered, use equilateral triangle calculation
    let triangleHeight = isEquilateral
      ? (triangleWidth * Math.sqrt(3)) / 2
      : this.props.shapeHeight;

    // since the triangles alternate, the coordinates will always be the same for when they point up or down
    let trianglePointsDown = `0 0, ${triangleWidth /
      2} ${triangleHeight}, ${triangleWidth} 0`;
    let trianglePointsUp = `${triangleWidth /
      2} 0, ${triangleWidth} ${triangleHeight}, 0 ${triangleHeight} `;

    let shapeIndex = 0;

    let svgShapes = [];
    let isUp = true;

    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      isUp = rowIndex % 2 === 0;
      for (let colIndex = 0; colIndex < this.props.colCount; colIndex++) {
        svgShapes.push(
          <FabricBlock
            id={shapeIndex}
            key={shapeIndex}
            points={isUp ? trianglePointsUp : trianglePointsDown}
            width={triangleWidth}
            height={triangleHeight}
            top={rowIndex * triangleHeight}
            left={(colIndex * triangleWidth) / 2}
            backgroundImage={this.props.fabricList[this.props.quiltBlocks[shapeIndex]]}
          />
        );

        isUp = !isUp;
        shapeIndex++;
      }
    }
    return svgShapes;
  }

  createSquareQuilt() {
    // todo: consolidate some of the shared code with create[SHAPE]Quilt()

    let squareWidth = this.props.shapeWidth;
    let squareHeight = this.props.shapeWidth;

    let squarePoints = `0 0, ${squareWidth} 0, ${squareWidth} ${squareHeight}, 0 ${squareHeight} `;

    let shapeIndex = 0;

    let svgShapes = [];

    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      for (let colIndex = 0; colIndex < this.props.colCount; colIndex++) {
        svgShapes.push(
          <FabricBlock
            id={shapeIndex}
            key={shapeIndex}
            points={squarePoints}
            width={squareWidth}
            height={squareHeight}
            top={rowIndex * squareHeight}
            left={colIndex * squareWidth}
            backgroundImage={this.props.fabricList[this.props.quiltBlocks[shapeIndex]]}
          />
        );

        shapeIndex++;
      }
    }
    return svgShapes;
  }

  // todo: add an option for rotating it 90 degrees
  createHexagonQuilt() {
    // todo: consolidate some of the shared code with create[SHAPE]Quilt()

    // calculate some re-usable lengths broken up from the hexagon
    let centerlineWidth = this.props.shapeWidth;
    let heightOffCenter = (centerlineWidth / 4) * Math.sqrt(3);
    let internalTriangleShortSide = centerlineWidth / 4;

    let hexagonWidth = centerlineWidth;
    let hexagonHeight = heightOffCenter * 2;

    // todo: calculate these differently based on the rotation
    let hexagonPoints =
      `0 ${heightOffCenter},` +
      ` ${internalTriangleShortSide} 0,` +
      ` ${internalTriangleShortSide * 3} 0,` +
      ` ${centerlineWidth} ${heightOffCenter}` +
      ` ${internalTriangleShortSide * 3} ${heightOffCenter * 2},` +
      ` ${internalTriangleShortSide} ${heightOffCenter * 2}`;

    let shapeIndex = 0;

    let svgShapes = [];
    let offsetCol;

    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      offsetCol = false;

      for (let colIndex = 0; colIndex < this.props.colCount; colIndex++) {
        svgShapes.push(
          <FabricBlock
            id={shapeIndex}
            key={shapeIndex}
            points={hexagonPoints}
            width={hexagonWidth}
            height={hexagonHeight}
            top={
              (rowIndex * hexagonHeight) +
              (offsetCol ? hexagonHeight / 2 : 0)}
            left={
              colIndex * internalTriangleShortSide * 3
            }
            backgroundImage={this.props.fabricList[this.props.quiltBlocks[shapeIndex]]}
          />
        );

        offsetCol = !offsetCol;
        shapeIndex++;
      }
    }
    return svgShapes;
  }

  render() {
    return (
      <div>
        <div className="svg-quilt">{this.createQuilt()}</div>
      </div>
    );
  }
}

export default Quilt;
