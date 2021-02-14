import React from "react";
import FabricBlock from "./FabricBlock.js";
import PropTypes from "prop-types";

class CustomQuilt extends React.Component {
  createCustomQuilt() {
    const {
      fabricList,
      quiltDefinition
    } = this.props;

    if (!quiltDefinition || !fabricList.length) return;
    
    let shapeIndex = 0;

    let svgShapes = [];

    let {
      blocks,
      customShapes
    } = JSON.parse(quiltDefinition);

    // todo: generate based on number of fabric blocks, for now hard-coding 12 colors should safely handle most quilts
    let backupColors = [
      "#000",
      "#f00",
      "#0f0",
      "#00f",
      "#ff0",
      "#0ff",
      "#700",
      "#070",
      "#007",
      "#770",
      "#077",
      "#777",
    ]

    blocks.forEach(block => {
      let currentCustomShape = customShapes.find(
        (fabric) => fabric.id === block.shapeId
      );

      // todo: use a mapping to find the fabric, otherwise use a default color based on the block index
      let currentFabric = this.props.fabricList.find(
        // eslint-disable-next-line
        (fabric) => fabric.id === currentCustomShape.fabricId
      );

      svgShapes.push(
        <FabricBlock
          id={shapeIndex}
          key={shapeIndex}
          points={currentCustomShape.points}
          width={currentCustomShape.width}
          height={currentCustomShape.height}
          top={block.top}
          left={block.left}
          backgroundImage={currentFabric && currentFabric.url}
          backgroundColor={backupColors[currentCustomShape.fabricIndex]}
          selected={false}
          onFabricBlockClick={() => {}}
          clipPathPrefix="quilt"
        />
      );

      shapeIndex++;
    });

    return svgShapes;
  }

  render() {
    return (
      <div>
        <div
          className="svg-quilt"
          style={{
            width: this.props.quiltWidth,
            height:  this.props.quiltHeight,
            border: '1px solid black'
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
  quiltDefinition: PropTypes.string.isRequired,

  // selectedBlockIndex: PropTypes.number,
  // onFabricBlockClick: PropTypes.func.isRequired,
  // quiltBlocks: PropTypes.array.isRequired,
  // shapeType: PropTypes.number.isRequired,
};

export default CustomQuilt;
