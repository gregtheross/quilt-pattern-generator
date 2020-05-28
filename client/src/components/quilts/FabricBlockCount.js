import React, { Component } from "react";
import PropTypes from "prop-types";
import FabricBlock from "./FabricBlock";

class FabricBlockCount extends Component {
  render() {
    const { fabricBlocks, onChangeFabricCount } = this.props;

    const fabricSize = 50;

    return (
      <>
        {fabricBlocks.map((fabric) => (
          <div className="fabric-count-wrapper">
            <img src={fabric.fabricUrl} />
            <input
              type="text"
              value={fabric.count}
              onChange={onChangeFabricCount}
              fabric_id={fabric.fabricId}
            />
          </div>
        ))}
      </>
    );
  }
}

FabricBlockCount.propTypes = {
  fabricBlocks: PropTypes.arrayOf(
    PropTypes.shape({
      fabricId: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  onChangeFabricCount: PropTypes.func.isRequired,
};

export default FabricBlockCount;
