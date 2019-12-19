import React from "react";
import { toast } from "react-toastify";

import Quilt from "../quilts/Quilt.js";
import QuiltForm from "../quilts/QuiltForm.js";

import * as ProjectApi from "../../api/ProjectApi";
import * as QuiltApi from "../../api/QuiltApi";

// todo: if this is editing a project, show the form.  otherwise ONLY show the quilt

class Project extends React.Component {
  constructor(props) {
    super(props);

    // set a default state when creating a new quilt
    this.state = {
      projectId: 0,
      projectName: "",
      rowCount: 8,
      colCount: 11,
      selectedShapeType: 1,
      shapeTypes: [],
      shapeWidth: 80,
      shapeHeight: 100,
      selectedFabrics: [],
      fabricList: [],
      quiltBlocks: [],
      selectedBlockIndex: null
    };
  }

  componentDidMount() {
    const projectId = this.props.match.params.id;

    if (projectId) {
      // get the project matching this id
      ProjectApi.getProject(projectId)
        .then(response => {
          this.setState({
            projectId: response.id,
            projectName: response.name,
            rowCount: response.quiltRows,
            colCount: response.quiltColumns,
            selectedShapeType: response.quiltShapeType,
            shapeWidth: response.quiltShapeWidth,
            shapeHeight: response.quiltShapeHeight,
            selectedFabrics: response.quiltFabrics,
            quiltBlocks: response.quiltBlocks
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ projectId: undefined });
        });
    } else {
      // use default state
    }

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
      indexes.push(
        this.state.selectedFabrics[i % this.state.selectedFabrics.length]
      );
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

  onSaveProjectClick = () => {
    // todo: disable inputs until saving is complete

    // save the project
    ProjectApi.saveProject({
      id: this.state.projectId,
      name: this.state.projectName,
      quiltFabrics: this.state.selectedFabrics,
      quiltRows: this.state.rowCount,
      quiltColumns: this.state.colCount,
      quiltShapeType: this.state.selectedShapeType,
      quiltShapeWidth: this.state.shapeWidth,
      quiltShapeHeight: this.state.shapeHeight,
      quiltBlocks: this.state.quiltBlocks
    })
      .then(response => {
        if (this.state.projectId === 0) this.props.history.push("/projects");
        else toast.success("project updated successfully");
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  onFormInputChange = e => {
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

  onSelectFabricClick = fabricId => {
    // First, clean out any fabricIds that happen to not exist.
    //    bad state caused by a list of selected fabrics being saved and then a fabric getting deleted
    //    this wouldn't happen in a real app with good database referential integrity so we'll just
    //    do a quick culling here
    // An alternative method would be to validate during load after both selectedFabrics and fabricList
    //    are populated
    let tmpSelectedFabrics = this.state.fabricList
      .filter(x => this.state.selectedFabrics.includes(x.id))
      .map(x => {
        return x.id;
      });

    // remove/add the clicked fabricId from the temporary selected fabrics list and update state
    if (tmpSelectedFabrics.includes(fabricId)) {
      this.setState({
        selectedFabrics: tmpSelectedFabrics.filter(x => x !== fabricId).slice()
      });
    } else {
      tmpSelectedFabrics.push(fabricId);
      this.setState({
        selectedFabrics: tmpSelectedFabrics
      });
    }
  };

  render() {
    return this.state.projectId !== undefined ? (
      <div>
        <QuiltForm
          projectName={this.state.projectName}
          rowCount={this.state.rowCount}
          colCount={this.state.colCount}
          shapeTypes={this.state.shapeTypes}
          selectedShapeType={this.state.selectedShapeType}
          shapeWidth={this.state.shapeWidth}
          shapeHeight={this.state.shapeHeight}
          availableFabrics={this.state.fabricList}
          selectedFabrics={this.state.selectedFabrics}
          quiltBlocks={this.state.quiltBlocks}
          onRandomizeClick={this.onRandomizeClick}
          onFormInputChange={this.onFormInputChange}
          onSaveProjectClick={this.onSaveProjectClick}
          onSelectFabricClick={this.onSelectFabricClick}
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
    ) : (
      <p>project id was invalid</p>
    );
  }
}

export default Project;
