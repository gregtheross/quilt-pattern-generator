import React from "react";

class QuiltForm extends React.Component {
  constructor(props) {
    super(props);

    // todo: consider passing this up to the App and not using a state in this component
    this.state = {
      rows: props.rows,
      cols: props.cols,
      fabricCount: props.fabricCount
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
      this.state.fabricCount
    );
  }

  render() {
    // todo: additional form inputs
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
            # of Fabrics (1-9):
            <input
              type="text"
              name="fabricCount"
              defaultValue={this.props.fabricCount}
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
