import React from "react";
import FabricBlock from "./FabricBlock.js";
import PropTypes from "prop-types";

class Quilt extends React.Component {
  createQuilt() {
    if (
      this.props.fabricList &&
      this.props.quiltBlocks &&
      this.props.fabricList.length > 0 &&
      this.props.quiltBlocks.length > 0
    ) {
      switch (this.props.shapeType) {
        case 1:
          return this.createTriangleQuilt(true);
        case 2:
          return this.createTriangleQuilt(false);
        case 3:
          return this.createSquareQuilt();
        case 4:
          return this.createHexagonQuilt();
        default:
          return <div>Invalid Shape</div>;
      }
    }
  }

  createTriangleQuilt(isEquilateral) {
    let triangleWidth = this.props.shapeWidth;
    // if no height entered, use equilateral triangle calculation
    let triangleHeight = isEquilateral
      ? (triangleWidth * Math.sqrt(3)) / 2
      : this.props.shapeHeight;

    // since the triangles alternate, the coordinates will always be the same for when they point up or down
    let trianglePointsDown = `0 0, ${triangleWidth /
      2} ${triangleHeight}, ${triangleWidth} 0`;
    let trianglePointsUp = `${triangleWidth /
      2} 0, ${triangleWidth} ${triangleHeight}, 0 ${triangleHeight}`;

    let shapeIndex = 0;

    let svgShapes = [];
    let isUp = true;

    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      isUp = rowIndex % 2 === 0;
      for (let colIndex = 0; colIndex < this.props.colCount; colIndex++) {
        let currentFabric = this.props.fabricList.find(
          // eslint-disable-next-line
          fabric => fabric.id === this.props.quiltBlocks[shapeIndex]
        );

        svgShapes.push(
          <FabricBlock
            id={shapeIndex}
            key={shapeIndex}
            points={isUp ? trianglePointsUp : trianglePointsDown}
            width={triangleWidth}
            height={triangleHeight}
            top={rowIndex * triangleHeight}
            left={(colIndex * triangleWidth) / 2}
            backgroundImage={currentFabric && currentFabric.url}
            selected={shapeIndex === this.props.selectedBlockIndex}
            onFabricBlockClick={this.props.onFabricBlockClick}
            clipPathPrefix="quilt"
          />
        );

        isUp = !isUp;
        shapeIndex++;
      }
    }
    return svgShapes;
  }

  createSquareQuilt() {
    let squareWidth = this.props.shapeWidth;
    let squareHeight = this.props.shapeWidth;

    let squarePoints = `0 0, ${squareWidth} 0, ${squareWidth} ${squareHeight}, 0 ${squareHeight}`;

    let shapeIndex = 0;

    let svgShapes = [];

    for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
      for (let colIndex = 0; colIndex < this.props.colCount; colIndex++) {
        let currentFabric = this.props.fabricList.find(
          // eslint-disable-next-line
          fabric => fabric.id === this.props.quiltBlocks[shapeIndex]
        );

        svgShapes.push(
          <FabricBlock
            id={shapeIndex}
            key={shapeIndex}
            points={squarePoints}
            width={squareWidth}
            height={squareHeight}
            top={rowIndex * squareHeight}
            left={colIndex * squareWidth}
            backgroundImage={currentFabric && currentFabric.url}
            selected={shapeIndex === this.props.selectedBlockIndex}
            onFabricBlockClick={this.props.onFabricBlockClick}
            clipPathPrefix="quilt"
          />
        );

        shapeIndex++;
      }
    }
    return svgShapes;
  }

  createHexagonQuilt() {
    // calculate some re-usable lengths broken up from the hexagon
    let centerlineWidth = this.props.shapeWidth;
    let heightOffCenter = (centerlineWidth / 4) * Math.sqrt(3);
    let internalTriangleShortSide = centerlineWidth / 4;

    let hexagonWidth = centerlineWidth;
    let hexagonHeight = heightOffCenter * 2;

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
        let currentFabric = this.props.fabricList.find(
          // eslint-disable-next-line
          fabric => fabric.id === this.props.quiltBlocks[shapeIndex]
        );

        svgShapes.push(
          <FabricBlock
            id={shapeIndex}
            key={shapeIndex}
            points={hexagonPoints}
            width={hexagonWidth}
            height={hexagonHeight}
            top={rowIndex * hexagonHeight + (offsetCol ? hexagonHeight / 2 : 0)}
            left={colIndex * internalTriangleShortSide * 3}
            backgroundImage={currentFabric && currentFabric.url}
            selected={shapeIndex === this.props.selectedBlockIndex}
            onFabricBlockClick={this.props.onFabricBlockClick}
            clipPathPrefix="quilt"
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

Quilt.propTypes = {
  shapeHeight: PropTypes.number.isRequired,
  shapeWidth: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  colCount: PropTypes.number.isRequired,
  fabricList: PropTypes.array.isRequired,
  selectedBlockIndex: PropTypes.number,
  onFabricBlockClick: PropTypes.func.isRequired,
  quiltBlocks: PropTypes.array.isRequired,
  shapeType: PropTypes.number.isRequired
};

export default Quilt;
