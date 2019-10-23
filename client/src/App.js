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
      selectedShapeType: "hexagon",
      shapeTypes: [
        "equilateral triangle",
        "isosceles triangle",
        "square",
        "hexagon"
      ],
      shapeWidth: 80,
      shapeHeight: 100,
      fabricList: [
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1935/floral-background-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1409/abstract-pebble-seamless-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1416/abstract-waves-seamless-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3815/tomatos-and-cucumbers-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1845/snowflakes-in-red-and-white-squares-seamless-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/2007/coffee-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3813/acorn-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3814/limes-pattern-vector-medium.png",
        "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1377/koi-fish-carp-seamless-pattern-vector-medium.png"
      ],
      quiltBlocks: []
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormInputChange = this.onFormInputChange.bind(this);
  }


  randomizeFabricList() {
    // Generate initial array of fabricIds and then shuffle them.
    // This is purposeful because we want an even number of fabric swatches to be used and only their locations randomized.
    // If we randomize the selection there is a high risk of having more fabric blocks than others
    let indexes = [];
    for (let i = 0; i < this.state.colCount * this.state.rowCount; i++) {
      indexes.push(i % this.state.fabricList.length);
    }

    var currentIndex = indexes.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = indexes[currentIndex];
      indexes[currentIndex] = indexes[randomIndex];
      indexes[randomIndex] = temporaryValue;
    }

    return indexes;
  }

  // todo: change to a regular button instead of submit
  // todo: figure out why the textarea only refreshes if randomizing is the first thing you do.
  //       to reproduce, click on randomize button, then edit the quilt definition, click randomize again
  onFormSubmit() {
    this.setState({
      quiltBlocks: this.randomizeFabricList()
    });
  }

  onFormInputChange(e) {
    const value = e.target.name === "quiltBlocks" ? e.target.value.split(',')
      : e.target.type === "checkbox" ? e.target.checked
        : e.target.value;

    console.log(e.target.name + ': ' + value);

    this.setState({ [e.target.name]: value });
  }

  render() {
    return (
      <div>
        <QuiltForm
          rowCount={this.state.rowCount}
          colCount={this.state.colCount}
          shapeTypes={this.state.shapeTypes}
          selectedShapeType={this.state.selectedShapeType}
          shapeWidth={this.state.shapeWidth}
          shapeHeight={this.state.shapeHeight}
          quiltBlocks={this.state.quiltBlocks}
          onFormSubmit={this.onFormSubmit}
          onFormInputChange={this.onFormInputChange}
        />

        <Quilt
          rowCount={this.state.rowCount}
          colCount={this.state.colCount}
          shapeType={this.state.selectedShapeType}
          shapeWidth={this.state.shapeWidth}
          shapeHeight={this.state.shapeHeight}
          fabricList={this.state.fabricList}
          quiltBlocks={this.state.quiltBlocks}
        />
      </div>
    );
  }
}

export default App;
