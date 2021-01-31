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
            Width:
            <input
              type="text"
              name="quiltWidth"
              value={this.props.quiltWidth}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Height:
            <input
              type="text"
              name="quiltHeight"
              value={this.props.quiltHeight}
              onChange={this.handleChange}
            />
          </label>
        </div>

        {/* todo: break out custom shapes into its own db store and api, add list of custom shapes here to pick from */}
        <div>
          <label>
            Quilt Definition
            <textarea
              style={{ height: 300, width: 300 }}
              name="quiltDefinition"
              value={this.props.quiltDefinition}
              onChange={this.handleChange}
            ></textarea>
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
        {/* {!this.props.evenlyDistributeBlocks && (
          <FabricBlockCount
            availableFabrics={this.props.availableFabrics}
            fabricBlocks={this.props.manualFabricBlocks}
            onChangeFabricCount={this.props.onChangeFabricCount}
            totalBlocks={this.props.rowCount * this.props.colCount}
          />
        )} */}
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
