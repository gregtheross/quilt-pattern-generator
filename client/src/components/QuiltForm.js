import React from "react";

class QuiltForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onFormInputChange(e);
  }

  // todo: change to a regular button instead of submit
  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  createOptions() {
    let options = [];

    this.props.shapeTypes.map((value, i) => {
      options.push(
        <option value={value} key={i}>
          {value}
        </option>
      );
    });

    return options;
  }

  render() {
    // todo: change form inputs based on shape type selection (e.g., remove height for square)
    return (
      <form onSubmit={this.handleSubmit}>
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
              this.props.selectedShapeType === "isosceles triangle"
                ? "visible"
                : "hidden"
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
        {/* todo: format it better so it's easier to read?  might not be necessary if I'm going to allow clicking on the blocks to swap them */}
        <div>
          <label>
            Quilt Definition:
            <textarea name="quiltBlocks"
              value={this.props.quiltBlocks}
              onChange={this.handleChange}></textarea>
          </label>
        </div>
        {/* todo: change to a regular button instead of submit */}
        <div>
          <input type="submit" value="Randomize Quilt" />
        </div>
      </form>
    );
  }
}

export default QuiltForm;
