import React from "react";
import { toast } from "react-toastify";

import Quilt from "../quilts/Quilt.js";
import QuiltForm from "../quilts/QuiltForm.js";

import * as ProjectApi from "../../api/ProjectApi";
import * as QuiltApi from "../../api/QuiltApi";
import * as FabricApi from "../../api/FabricApi";

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
      evenlyDistributeBlocks: true,
      manualFabricBlocks: [],
      fabricList: [],
      quiltBlocks: [],
      selectedBlockIndex: null,
      busy: true,
    };
  }

  componentDidMount() {
    const projectId = this.props.match.params.id;

    if (projectId) {
      // get the project matching this id
      ProjectApi.getProject(projectId)
        .then((response) => {
          this.setState({
            projectId: response.id,
            projectName: response.name,
            rowCount: response.quiltRows,
            colCount: response.quiltColumns,
            selectedShapeType: response.quiltShapeType,
            shapeWidth: response.quiltShapeWidth,
            shapeHeight: response.quiltShapeHeight,
            selectedFabrics: response.quiltFabrics,
            evenlyDistributeBlocks: response.evenlyDistributeBlocks,
            manualFabricBlocks: response.manualFabricBlocks,
            quiltBlocks: response.quiltBlocks,
            busy: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ projectId: undefined, busy: false });
        });
    } else {
      // use default state
      this.setState({ busy: false });
    }

    // get the shape types from the server
    QuiltApi.getShapeTypes()
      .then((response) => {
        this.setState({ shapeTypes: response });
      })
      .catch((error) => {
        console.log(error);
      });

    // get the fabrics
    FabricApi.getFabrics()
      .then((response) => {
        this.setState({ fabricList: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  randomizeFabricList() {
    let indexes = [];
    if (this.state.evenlyDistributeBlocks) {
      // Generate initial array of fabricIds and then shuffle them.
      // Generate the number of fabric swatches to be used and only their locations randomized.
      // If we randomize the selection there is a high risk of having more fabric blocks than others
      for (let i = 0; i < this.state.colCount * this.state.rowCount; i++) {
        indexes.push(
          this.state.selectedFabrics[i % this.state.selectedFabrics.length]
        );
      }
    } else {
      this.state.manualFabricBlocks.forEach((manualFabricBlock) => {
        for (let i = 0; i < manualFabricBlock.count; i++) {
          indexes.push(manualFabricBlock.fabricId);
        }
      });
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
      quiltBlocks: this.randomizeFabricList(),
    });
  };

  onSaveProjectClick = () => {
    this.setState({ busy: true });

    // save the project
    ProjectApi.saveProject({
      id: this.state.projectId,
      name: this.state.projectName,
      evenlyDistributeBlocks: this.state.evenlyDistributeBlocks,
      manualFabricBlocks: this.state.manualFabricBlocks,
      quiltFabrics: this.state.selectedFabrics,
      quiltRows: this.state.rowCount,
      quiltColumns: this.state.colCount,
      quiltShapeType: this.state.selectedShapeType,
      quiltShapeWidth: this.state.shapeWidth,
      quiltShapeHeight: this.state.shapeHeight,
      quiltBlocks: this.state.quiltBlocks,
    })
      .then((response) => {
        if (this.state.projectId === 0) this.props.history.push("/projects");
        else toast.success("project updated successfully");
        this.setState({ busy: false });
      })
      .catch((error) => {
        toast.error(error.message);
        this.setState({ busy: false });
      });
  };

  onFormInputChange = (e) => {
    const value =
      e.target.name === "quiltBlocks"
        ? e.target.value.split(",").map((x) => {
            return parseInt(x, 10);
          })
        : e.target.name === "selectedShapeType"
        ? parseInt(e.target.value, 10)
        : e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    this.setState({ [e.target.name]: value });
  };

  onFabricBlockClick = (fabricId) => {
    if (this.state.selectedBlockIndex === null)
      this.setState({ selectedBlockIndex: fabricId });
    else if (this.state.selectedBlockIndex === fabricId)
      this.setState({ selectedBlockIndex: null });
    else {
      let tmpQuiltBlocks = this.state.quiltBlocks;
      this.swapFabrics(tmpQuiltBlocks, fabricId, this.state.selectedBlockIndex);

      this.setState({
        selectedBlockIndex: null,
        quiltBlocks: tmpQuiltBlocks,
      });
    }
  };

  resetManualFabricBlocks = () => {
    let tmpManualFabricBlocks = this.state.fabricList
      .filter((x) => this.state.selectedFabrics.includes(x.id))
      .map((x) => ({ fabricId: x.id, fabricUrl: x.url, count: 0 }));
    this.setState({ manualFabricBlocks: tmpManualFabricBlocks });
  };

  onSelectFabricClick = (fabricId) => {
    // First, clean out any fabricIds that happen to not exist.
    //    bad state caused by a list of selected fabrics being saved and then a fabric getting deleted
    //    this wouldn't happen in a real app with good database referential integrity so we'll just
    //    do a quick culling here
    // An alternative method would be to validate during load after both selectedFabrics and fabricList
    //    are populated
    let tmpSelectedFabrics = this.state.fabricList
      .filter((x) => this.state.selectedFabrics.includes(x.id))
      .map((x) => {
        return x.id;
      });

    // remove/add the clicked fabricId from the temporary selected fabrics list and update state
    if (tmpSelectedFabrics.includes(fabricId)) {
      this.setState(
        {
          selectedFabrics: tmpSelectedFabrics
            .filter((x) => x !== fabricId)
            .slice(),
        },
        () => {
          this.resetManualFabricBlocks();
        }
      );
    } else {
      tmpSelectedFabrics.push(fabricId);
      this.setState(
        {
          selectedFabrics: tmpSelectedFabrics,
        },
        () => {
          this.resetManualFabricBlocks();
        }
      );
    }
  };

  handleChangeFabricCount = (event) => {
    // find the manual block
    const fabricId = event.target.getAttribute("fabric_id");
    let tmpManualFabricBlocks = this.state.manualFabricBlocks;
    const manualFabricIndex = tmpManualFabricBlocks.findIndex(
      (x) => x.fabricId == fabricId
    );

    // update to the new count
    tmpManualFabricBlocks[manualFabricIndex].count = event.target.value;
    this.setState({
      manualFabricBlocks: tmpManualFabricBlocks,
    });
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
          evenlyDistributeBlocks={this.state.evenlyDistributeBlocks}
          manualFabricBlocks={this.state.manualFabricBlocks || []}
          quiltBlocks={this.state.quiltBlocks}
          onRandomizeClick={this.onRandomizeClick}
          onFormInputChange={this.onFormInputChange}
          onSaveProjectClick={this.onSaveProjectClick}
          onSelectFabricClick={this.onSelectFabricClick}
          onChangeFabricCount={this.handleChangeFabricCount}
          busy={this.state.busy}
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
