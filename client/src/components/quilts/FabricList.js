import React, { Component } from "react";
import PropTypes from "prop-types";
import FabricBlock from "./FabricBlock";

class FabricList extends Component {
  render() {
    const fabricSize = 50;
    const fabricListColumns = 4;

    return this.props.availableFabrics && this.props.selectedFabricIds ? (
      <div
        className="available-fabrics"
        style={{
          height:
            Math.ceil(this.props.availableFabrics.length / fabricListColumns) *
            fabricSize
        }}
      >
        {this.props.availableFabrics.map((fabric, index) => {
          return (
            <FabricBlock
              key={fabric.id}
              backgroundImage={fabric.url}
              width={fabricSize}
              height={fabricSize}
              top={Math.floor(index / fabricListColumns) * fabricSize}
              left={(index % fabricListColumns) * fabricSize}
              id={fabric.id}
              points={`0 0, ${fabricSize} 0, ${fabricSize} ${fabricSize}, 0 ${fabricSize}`}
              onFabricBlockClick={this.props.onSelectFabricClick}
              selected={this.props.selectedFabricIds.includes(fabric.id)}
              clipPathPrefix="available-fabrics"
            />
          );
        })}
      </div>
    ) : (
      <div>there was a problem loading fabrics</div>
    );
  }
}

FabricList.propTypes = {
  availableFabrics: PropTypes.array.isRequired,
  selectedFabricIds: PropTypes.array.isRequired,
  onSelectFabricClick: PropTypes.func.isRequired
};

export default FabricList;
