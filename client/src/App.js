import React from "react";
import "./App.css";

import Quilt from "./components/Quilt.js";
import QuiltForm from "./components/QuiltForm.js";

import * as QuiltApi from "./api/QuiltApi";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rowCount: 8,
      colCount: 11,
      selectedShapeType: 1,
      shapeTypes: [],
      shapeWidth: 80,
      shapeHeight: 100,
      fabricList: [],
      quiltBlocks: [],
      selectedBlockIndex: null
    };
  }

  componentDidMount() {
    // get the shape types from the server
    QuiltApi.getShapeTypes()
      .then(response => {
        this.setState({ shapeTypes: response });
      })
      .catch(error => {
        console.log(error);
      });

    // get the fabrics
    QuiltApi.getFabrics()
      .then(response => {
        this.setState({ fabricList: response });
        console.log(this.state.fabricList);
      })
      .catch(error => {
        console.log(error);
      });
  }

  randomizeFabricList() {
    // Generate initial array of fabricIds and then shuffle them.
    // This is purposeful because we want an even number of fabric swatches to be used and only their locations randomized.
    // If we randomize the selection there is a high risk of having more fabric blocks than others
    let indexes = [];
    for (let i = 0; i < this.state.colCount * this.state.rowCount; i++) {
      indexes.push(this.state.fabricList[i % this.state.fabricList.length].id);
    }

    var currentIndex = indexes.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      this.swapFabrics(indexes, currentIndex, randomIndex);
    }

    return indexes;
  }

  swapFabrics(indexes, index1, index2) {
    let temporaryValue = indexes[index1];
    indexes[index1] = indexes[index2];
    indexes[index2] = temporaryValue;
  }

  onRandomizeClick = () => {
    this.setState({
      quiltBlocks: this.randomizeFabricList()
    });
  };

  onFormInputChange = e => {
    debugger;
    const value =
      e.target.name === "quiltBlocks"
        ? e.target.value.split(",").map(x => {
            return parseInt(x, 10);
          })
        : e.target.name === "selectedShapeType"
        ? parseInt(e.target.value, 10)
        : e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    this.setState({ [e.target.name]: value });
  };

  onFabricBlockClick = fabricId => {
    // debugger;
    if (this.state.selectedBlockIndex === null)
      this.setState({ selectedBlockIndex: fabricId });
    else if (this.state.selectedBlockIndex === fabricId)
      this.setState({ selectedBlockIndex: null });
    else {
      let tmpQuiltBlocks = this.state.quiltBlocks;
      this.swapFabrics(tmpQuiltBlocks, fabricId, this.state.selectedBlockIndex);

      this.setState({
        selectedBlockIndex: null,
        quiltBlocks: tmpQuiltBlocks
      });
    }
  };

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
          onRandomizeClick={this.onRandomizeClick}
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
          onFabricBlockClick={this.onFabricBlockClick}
          selectedBlockIndex={this.state.selectedBlockIndex}
        />
      </div>
    );
  }
}

export default App;
