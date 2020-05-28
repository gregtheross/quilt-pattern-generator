import React, { Component } from "react";
import PropTypes from "prop-types";
import FabricBlock from "./FabricBlock";

class FabricBlockCount extends Component {
  getRemainingBlocks = () => {
    const { fabricBlocks } = this.props;
    let { totalBlocks: remainingBlocks } = this.props;

    fabricBlocks.forEach((fabricBlock) => {
      remainingBlocks -= fabricBlock.count;
    });

    return remainingBlocks;
  };

  render() {
    const { fabricBlocks, onChangeFabricCount } = this.props;

    const remainingBlocks = this.getRemainingBlocks();

    return (
      <div>
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
        <div className="remaining-blocks">
          Remaining blocks:
          <span className={remainingBlocks !== 0 ? "error" : ""}>
            {remainingBlocks}
          </span>
        </div>
      </div>
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
  totalBlocks: PropTypes.number.isRequired,
};

export default FabricBlockCount;
