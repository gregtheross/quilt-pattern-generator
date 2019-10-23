import React from "react";

class QuiltForm extends React.Component {
  constructor(props) {
    super(props);

    // todo: consider passing this up to the App and not using a state in this component
    this.state = {
      rows: props.rows,
      cols: props.cols,
      shapeType: props.selectedShapeType,
      shapeWidth: props.shapeWidth,
      shapeHeight: props.shapeHeight,
      quiltBlocks: props.quiltBlocks,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // todo: consider passing this up to the App and not using a state in this component
    // const value = e.target.name === "quiltBlocks" ? e.target.value.split(',')
    //   : e.target.type === "checkbox" ? e.target.checked
    //     : e.target.value;

    // this.setState({ [e.target.name]: value });



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
              defaultValue={this.props.rowCount}
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
              defaultValue={this.props.colCount}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Shape Type:
            <select
              name="selectedShapeType"
              defaultValue={this.props.selectedShapeType}
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
              defaultValue={this.props.shapeWidth}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div
          // todo: handle with a CSS class
          style={{
            visibility:
              this.state.shapeType === "isosceles triangle"
                ? "visible"
                : "hidden"
          }}
        >
          <label>
            Shape Height:
            <input
              type="text"
              name="shapeHeight"
              defaultValue={this.props.shapeHeight}
              onChange={this.handleChange}
            />
          </label>
        </div>
        {/* todo: format it better so it's easier to read?  might not be necessary if I'm going to allow clicking on the blocks to swap them */}
        <div>
          <label>
            Quilt Definition:
            <textarea name="quiltBlocks"
              defaultValue={this.props.quiltBlocks}
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
