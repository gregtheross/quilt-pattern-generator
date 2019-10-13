import React from "react";

class QuiltForm extends React.Component {
  constructor(props) {
    super(props);

    // todo: consider passing this up to the App and not using a state in this component
    this.state = {
      rows: props.rows,
      cols: props.cols,
      shapeWidth: props.shapeWidth,
      shapeHeight: props.shapeHeight,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // todo: consider passing this up to the App and not using a state in this component
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit(
      this.state.rows,
      this.state.cols,
      this.state.shapeWidth,
      this.state.shapeHeight
    );
  }

  render() {
    // todo: add shape type
    // todo: change form inputs based on shape type selection (e.g., remove height for square)
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Rows:
            <input
              type="text"
              name="rows"
              defaultValue={this.props.rows}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Columns:
            <input
              type="text"
              name="cols"
              defaultValue={this.props.cols}
              onChange={this.handleChange}
            />
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
        <div>
          {/* todo: add tooltip explaining that -1 means to use the width for equal sided shape */}
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
        <div>
          <input type="submit" value="Create Quilt" />
        </div>
      </form>
    );
  }
}

export default QuiltForm;
