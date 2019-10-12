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
      fabricList: [
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1935/floral-background-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1409/abstract-pebble-seamless-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1416/abstract-waves-seamless-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3815/tomatos-and-cucumbers-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1845/snowflakes-in-red-and-white-squares-seamless-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/2007/coffee-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3813/acorn-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3814/limes-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1377/koi-fish-carp-seamless-pattern-vector-medium.png",
      ]
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(rows, cols) {
    this.setState({
      rowCount: rows,
      colCount: cols,
    });
  }

  render() {
    return (
      <div>
        <QuiltForm
          rows={this.state.rowCount}
          cols={this.state.colCount}
          // todo: additional form inputs
          onFormSubmit={this.onFormSubmit}
        />

        <Quilt
          rowCount={this.state.rowCount}
          colCount={this.state.colCount}
          fabricList={this.state.fabricList}
        />
      </div>
    );
  }
}

export default App;
