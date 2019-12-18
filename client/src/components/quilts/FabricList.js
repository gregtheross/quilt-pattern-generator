import React, { Component } from "react";
import PropTypes from "prop-types";

class FabricList extends Component {
  render() {
    return this.props.availableFabrics && this.props.selectedFabricIds ? (
      <div>
        {this.props.availableFabrics.map(fabric => {
          return (
            <div
              key={fabric.id}
              style={{
                fontWeight: this.props.selectedFabricIds.find(
                  sfid => sfid === fabric.id
                )
                  ? "bold"
                  : ""
              }}
              onClick={() => this.props.onSelectFabricClick(fabric.id)}
            >
              {fabric.id}
            </div>
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
