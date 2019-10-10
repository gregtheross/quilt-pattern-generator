import React from "react";
import "./App.css";

import Quilt from "./components/Quilt.js";
import QuiltForm from "./components/QuiltForm.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowCount: 8,
      colCount: 11,
      fabricCount: 9
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(rows, cols, fabricCount) {
    this.setState({
      rowCount: rows,
      colCount: cols,
      fabricCount: fabricCount
    });
  }

  render() {
    return (
      <div>
        <QuiltForm
          rows={this.state.rowCount}
          cols={this.state.colCount}
          fabricCount={this.state.fabricCount}
          // todo: additional form inputs
          onFormSubmit={this.onFormSubmit}
        />

        <Quilt
          rowCount={this.state.rowCount}
          colCount={this.state.colCount}
          fabricCount={this.state.fabricCount}
        />
      </div>
    );
  }
}

export default App;
