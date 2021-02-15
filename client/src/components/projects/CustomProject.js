import React from "react";
import { toast } from "react-toastify";

import CustomQuilt from "../quilts/CustomQuilt.js";
import CustomQuiltForm from "../quilts/CustomQuiltForm.js";

import * as ProjectApi from "../../api/ProjectApi";
import * as QuiltApi from "../../api/QuiltApi";
import * as FabricApi from "../../api/FabricApi";
import * as PatternApi from "../../api/PatternApi";

// todo: create table of fabric index and selected pattern for editing the fabricMap

class CustomProject extends React.Component {
  constructor(props) {
    super(props);

    // set a default state when creating a new quilt
    this.state = {
      projectId: 0,
      projectName: "",
      quiltWidth: 100,
      quiltHeight: 100,
      rowCount: 8,
      colCount: 11,
      selectedShapeType: 5,
      patterns: [],
      selectedPattern: 0,
      fabricMap: [],
      // shapeTypes: [],
      // shapeWidth: 80,
      // shapeHeight: 100,
      selectedFabrics: [],
      // evenlyDistributeBlocks: true,
      manualFabricBlocks: [],
      fabricList: [],
      quiltBlocks: [],// todo: needed?
      selectedBlockIndex: null, // todo: needed?
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
            quiltWidth: response.quiltWidth,
            quiltHeight: response.quiltHeight,
            rowCount: response.quiltRows,
            colCount: response.quiltColumns,
            selectedShapeType: response.quiltShapeType,
            selectedPattern: response.selectedPattern,
            fabricMap: response.fabricMap,
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

    // todo: needed?
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

    // get the patterns
    PatternApi.getPatterns()
    .then((response) => {
      this.setState({ patterns: response });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // todo: needed?
  swapFabrics(indexes, index1, index2) {
    let temporaryValue = indexes[index1];
    indexes[index1] = indexes[index2];
    indexes[index2] = temporaryValue;
  }

  onSaveProjectClick = () => {
    this.setState({ busy: true });

    // save the project
    ProjectApi.saveProject({
      id: this.state.projectId,
      name: this.state.projectName,
      evenlyDistributeBlocks: this.state.evenlyDistributeBlocks,
      manualFabricBlocks: this.state.manualFabricBlocks,
      quiltFabrics: this.state.selectedFabrics,
      quiltWidth: this.state.quiltWidth,
      quiltHeight: this.state.quiltHeight,
      quiltBlocks: this.state.quiltBlocks,
      selectedPattern: this.state.selectedPattern,
      fabricMap: this.state.fabricMap,
      // todo: cleanup and add/remove new fields
      // quiltRows: this.state.rowCount,
      // quiltColumns: this.state.colCount,
      quiltShapeType: this.state.selectedShapeType,
      // quiltShapeWidth: this.state.shapeWidth,
      // quiltShapeHeight: this.state.shapeHeight,
      // quiltBlocks: this.state.quiltBlocks,
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
        : e.target.name === "selectedPattern"
        ? parseInt(e.target.value, 10)
        : e.target.type === "checkbox"
        ? e.target.checked
        : e.target.value;

    this.setState({ [e.target.name]: value });
  };

  // todo: needed?
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

  // todo: needed?
  resetManualFabricBlocks = () => {
    let tmpManualFabricBlocks = this.state.fabricList
      .filter((x) => this.state.selectedFabrics.includes(x.id))
      .map((x) => ({ fabricId: x.id, fabricUrl: x.url, count: 0 }));
    this.setState({ manualFabricBlocks: tmpManualFabricBlocks });
  };

  // todo: needed?
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

  // todo: needed?
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

  getQuiltDefinition = () => {
    const { patterns, selectedPattern    } = this.state;
    if (selectedPattern) {
      let pattern = patterns.find(x => x.id === selectedPattern);
      if (pattern) {
        return JSON.stringify(pattern.quiltDefinition);
      }
    }

    return "";
  }

  render() {
    return this.state.projectId !== undefined ? (
      <div>
        <CustomQuiltForm
          projectName={this.state.projectName}
          quiltWidth={this.state.quiltWidth}
          quiltHeight={this.state.quiltHeight}
          patterns={this.state.patterns}
          selectedPattern={this.state.selectedPattern}
          // rowCount={this.state.rowCount}
          // colCount={this.state.colCount}
          // shapeTypes={this.state.shapeTypes}
          selectedShapeType={this.state.selectedShapeType}
          // shapeWidth={this.state.shapeWidth}
          // shapeHeight={this.state.shapeHeight}
          availableFabrics={this.state.fabricList}
          selectedFabrics={this.state.selectedFabrics} // todo: needed?
          // evenlyDistributeBlocks={this.state.evenlyDistributeBlocks}
          manualFabricBlocks={this.state.manualFabricBlocks || []}
          quiltBlocks={this.state.quiltBlocks}
          onFormInputChange={this.onFormInputChange}
          onSaveProjectClick={this.onSaveProjectClick}
          onSelectFabricClick={this.onSelectFabricClick}
          onChangeFabricCount={this.handleChangeFabricCount}
          busy={this.state.busy}
        />

        <CustomQuilt
          // rowCount={this.state.rowCount}
          // colCount={this.state.colCount}
          // shapeType={this.state.selectedShapeType}
          // shapeWidth={this.state.shapeWidth}
          // shapeHeight={this.state.shapeHeight}
          quiltWidth={parseInt(this.state.quiltWidth)}
          quiltHeight={parseInt(this.state.quiltHeight)}
          fabricList={this.state.fabricList}
          quiltDefinition={this.getQuiltDefinition()}
          fabricMap={this.state.fabricMap}
          // quiltBlocks={this.state.quiltBlocks}
          // onFabricBlockClick={this.onFabricBlockClick}
          // selectedBlockIndex={this.state.selectedBlockIndex}
        />
      </div>
    ) : (
      <p>project id was invalid</p>
    );
  }
}

export default CustomProject;
