import React from "react";
import FabricBlock from "./FabricBlock.js";
import PropTypes from "prop-types";

class CustomQuilt extends React.Component {
  createCustomQuilt() {
    const {
      fabricList,
      quiltDefinition
    } = this.props;

    if (!quiltDefinition) return;
    
    let shapeIndex = 0;

    let svgShapes = [];

    JSON.parse(quiltDefinition).blocks.forEach(block => {
      console.log(block);

      let currentFabric = this.props.fabricList.find(
        // eslint-disable-next-line
        (fabric) => fabric.id === block.fabricId
      );

      svgShapes.push(
        <FabricBlock
          id={shapeIndex}
          key={shapeIndex}
          points={block.points}
          width={block.width}
          height={block.height}
          top={block.top}
          left={block.left}
          backgroundImage={currentFabric && currentFabric.url}
          // selected={shapeIndex === this.props.selectedBlockIndex}
          // onFabricBlockClick={this.props.onFabricBlockClick}
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
