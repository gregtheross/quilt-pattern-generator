import React from "react";
import FabricBlock from "./FabricBlock.js";
import PropTypes from "prop-types";

class CustomQuilt extends React.Component {
  createCustomQuilt() {
    // todo: loop though and use quiltDefinition

    let blockPoints = `0 0, 50 0, 0 50`;

    let shapeIndex = 0;

    let svgShapes = [];

    let currentFabric = this.props.fabricList.find(
      // eslint-disable-next-line
      (fabric) => fabric.id === 5
    );

    svgShapes.push(
      <FabricBlock
        id={shapeIndex}
        key={shapeIndex}
        points={blockPoints}
        width={50}
        height={50}
        top={0}
        left={0}
        backgroundImage={currentFabric && currentFabric.url}
        // selected={shapeIndex === this.props.selectedBlockIndex}
        // onFabricBlockClick={this.props.onFabricBlockClick}
        clipPathPrefix="quilt"
      />
    );

    shapeIndex = 1;

    svgShapes.push(
      <FabricBlock
        id={shapeIndex}
        key={shapeIndex}
        points={blockPoints}
        width={50}
        height={50}
        top={0}
        left={50}
        backgroundImage={currentFabric && currentFabric.url}
        // selected={shapeIndex === this.props.selectedBlockIndex}
        // onFabricBlockClick={this.props.onFabricBlockClick}
        clipPathPrefix="quilt"
      />
    );

    shapeIndex = 2;
    blockPoints = "0 50, 50 50, 50 0";

    currentFabric = this.props.fabricList.find(
      // eslint-disable-next-line
      (fabric) => fabric.id === 3
    );

    svgShapes.push(
      <FabricBlock
        id={shapeIndex}
        key={shapeIndex}
        points={blockPoints}
        width={50}
        height={50}
        top={0}
        left={0}
        backgroundImage={currentFabric && currentFabric.url}
        // selected={shapeIndex === this.props.selectedBlockIndex}
        // onFabricBlockClick={this.props.onFabricBlockClick}
        clipPathPrefix="quilt"
      />
    );

    shapeIndex = 3;
    svgShapes.push(
      <FabricBlock
        id={shapeIndex}
        key={shapeIndex}
        points={blockPoints}
        width={50}
        height={50}
        top={0}
        left={50}
        backgroundImage={currentFabric && currentFabric.url}
        // selected={shapeIndex === this.props.selectedBlockIndex}
        // onFabricBlockClick={this.props.onFabricBlockClick}
        clipPathPrefix="quilt"
      />
    );

    // for (let rowIndex = 0; rowIndex < this.props.rowCount; rowIndex++) {
    //   for (let colIndex = 0; colIndex < this.props.colCount; colIndex++) {
    //     let currentFabric = this.props.fabricList.find(
    //       // eslint-disable-next-line
    //       (fabric) => fabric.id === this.props.quiltBlocks[shapeIndex]
    //     );

    //     svgShapes.push(
    //       <FabricBlock
    //         id={shapeIndex}
    //         key={shapeIndex}
    //         points={squarePoints}
    //         width={squareWidth}
    //         height={squareHeight}
    //         top={rowIndex * squareHeight}
    //         left={colIndex * squareWidth}
    //         backgroundImage={currentFabric && currentFabric.url}
    //         selected={shapeIndex === this.props.selectedBlockIndex}
    //         onFabricBlockClick={this.props.onFabricBlockClick}
    //         clipPathPrefix="quilt"
    //       />
    //     );

    //     shapeIndex++;
    //   }
    // }
    return svgShapes;
  }

  render() {
    return (
      <div>
        <div
          className="svg-quilt"
          // todo: fix these only using default instead of what's sent from CustomProject state
          style={{
            width: this.props.quiltWidth,
            height: this.props.quiltHeight,
          }}
        >
          {this.createCustomQuilt()}
        </div>
      </div>
    );
  }
}

CustomQuilt.propTypes = {
  // shapeHeight: PropTypes.number.isRequired,
  // shapeWidth: PropTypes.number.isRequired,

  quiltHeight: PropTypes.number.isRequired,
  quiltWidth: PropTypes.number.isRequired,
  fabricList: PropTypes.array.isRequired,
  quiltDefinition: PropTypes.array.isRequired,

  // selectedBlockIndex: PropTypes.number,
  // onFabricBlockClick: PropTypes.func.isRequired,
  // quiltBlocks: PropTypes.array.isRequired,
  // shapeType: PropTypes.number.isRequired,
};

export default CustomQuilt;
