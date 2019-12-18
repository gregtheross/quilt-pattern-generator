import React from "react";

class QuiltForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleRandomizeClick = this.handleRandomizeClick.bind(this);
  }

  handleChange(e) {
    this.props.onFormInputChange(e);
  }

  handleRandomizeClick(e) {
    this.props.onRandomizeClick();
  }

  createOptions() {
    let options = [];

    this.props.shapeTypes.map(shapeType => {
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
          // todo: handle with a CSS class
          style={{
            visibility:
              this.props.selectedShapeType === 2 ? "visible" : "hidden"
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
        {/* todo: add checkboxes to let the user select fabrics from list of all available fabrics */}
        {/* todo: show/hide only when you want to start with a saved quilt? */}
        <div>
          <label>
            Quilt Definition:
            <textarea
              name="quiltBlocks"
              value={this.props.quiltBlocks}
              onChange={this.handleChange}
            ></textarea>
          </label>
        </div>
        <div>
          <button onClick={this.handleRandomizeClick}>Randomize</button>
        </div>
      </div>
    );
  }
}

export default QuiltForm;
