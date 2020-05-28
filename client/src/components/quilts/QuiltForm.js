import React from "react";
import FabricList from "./FabricList";
import FabricBlockCount from "./FabricBlockCount";

class QuiltForm extends React.Component {
  handleChange = (e) => {
    this.props.onFormInputChange(e);
  };

  handleRandomizeClick = (e) => {
    this.props.onRandomizeClick();
  };

  handleSaveProjectClick = (e) => {
    this.props.onSaveProjectClick();
  };

  createOptions() {
    let options = [];

    this.props.shapeTypes.map((shapeType) => {
      // todo: refactor to return () instead of pushing to options
      options.push(
        <option value={shapeType.id} key={shapeType.id}>
          {shapeType.name}
        </option>
      );
    });

    return options;
  }

  render() {
    return (
      <div>
        <div>
          <label>
            Project Name:
            <input
              type="text"
              name="projectName"
              value={this.props.projectName}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Rows:
            <input
              type="text"
              name="rowCount"
              value={this.props.rowCount}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Columns:
            <input
              type="text"
              name="colCount"
              value={this.props.colCount}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Shape Type:
            <select
              name="selectedShapeType"
              value={this.props.selectedShapeType}
              onChange={this.handleChange}
            >
              {this.createOptions()}
            </select>
          </label>
        </div>
        <div>
          <label>
            Shape Width:
            <input
              type="text"
              name="shapeWidth"
              value={this.props.shapeWidth}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div
          style={{
            visibility:
              this.props.selectedShapeType === 2 ? "visible" : "hidden",
          }}
        >
          <label>
            Shape Height:
            <input
              type="text"
              name="shapeHeight"
              value={this.props.shapeHeight}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Selected Fabrics:
            <FabricList
              selectedFabricIds={this.props.selectedFabrics}
              availableFabrics={this.props.availableFabrics}
              onSelectFabricClick={this.props.onSelectFabricClick}
            />
          </label>
        </div>
        <div>
          <label for="distribute-evenly">
            <input
              type="checkbox"
              id="distribute-evenly"
              name="evenlyDistributeBlocks"
              onChange={this.handleChange}
              checked={this.props.evenlyDistributeBlocks}
            />
            Evenly Distribute Blocks
          </label>
        </div>
        {!this.props.evenlyDistributeBlocks && (
          <FabricBlockCount
            availableFabrics={this.props.availableFabrics}
            fabricBlocks={this.props.manualFabricBlocks}
            onChangeFabricCount={this.props.onChangeFabricCount}
            totalBlocks={this.props.rowCount * this.props.colCount}
          />
        )}
        <div>
          <button onClick={this.handleRandomizeClick}>Randomize</button>
        </div>
        <div>
          <button
            onClick={this.handleSaveProjectClick}
            disabled={this.props.busy}
          >
            Save Project
          </button>
        </div>
      </div>
    );
  }
}

export default QuiltForm;
