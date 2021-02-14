import React from "react";
import { toast } from "react-toastify";

import CustomQuilt from "../quilts/CustomQuilt.js";
import CustomPatternForm from "../quilts/CustomPatternForm.js";

import * as PatternApi from "../../api/PatternApi";
import * as QuiltApi from "../../api/QuiltApi";
import * as FabricApi from "../../api/FabricApi";

class CustomPattern extends React.Component {
  constructor(props) {
    super(props);

    // set a default state when creating a new quilt
    this.state = {
      patternId: 0,
      patternName: "",
      quiltWidth: "",
      quiltHeight: "",
      fabricCount: "",
      quiltDefinition: "{\"customShapes\":[{\"id\":0,\"width\":50,\"height\":50,\"points\":\"0 0, 25 25, 0 50\",\"fabricId\":5}],\"blocks\":[{\"top\":0,\"left\":0,\"shapeId\":0}]}",
      selectedShapeType: 5, // todo: needed?
      fabricList: [], // todo: generate on the fly based on number of fabric count
      selectedBlockIndex: null,
      busy: true,
    };
  }

  componentDidMount() {
    const patternId = this.props.match.params.id;

    if (patternId) {
      // get the pattern matching this id
      PatternApi.getPattern(patternId)
        .then((response) => {
          this.setState({
            patternId: response.id,
            patternName: response.name,
            quiltWidth: response.quiltWidth,
            quiltHeight: response.quiltHeight,
            fabricCount: response.fabricCount,
            quiltDefinition: JSON.stringify(response.quiltDefinition),
            // rowCount: response.quiltRows,
            // colCount: response.quiltColumns,
            selectedShapeType: response.quiltShapeType, // todo: needed?
            // shapeWidth: response.quiltShapeWidth,
            // shapeHeight: response.quiltShapeHeight,
            selectedFabrics: response.quiltFabrics, // todo: needed?
            // evenlyDistributeBlocks: response.evenlyDistributeBlocks,
            // manualFabricBlocks: response.manualFabricBlocks,
            // quiltBlocks: response.quiltBlocks,
            busy: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ patternId: undefined, busy: false });
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

  swapFabrics(indexes, index1, index2) {
    let temporaryValue = indexes[index1];
    indexes[index1] = indexes[index2];
    indexes[index2] = temporaryValue;
  }

  onSavePatternClick = () => {
    this.setState({ busy: true });

    // save the pattern
    PatternApi.savePattern({
      id: this.state.patternId,
      name: this.state.patternName,
      quiltWidth: this.state.quiltWidth,
      quiltHeight: this.state.quiltHeight,
      fabricCount: this.state.fabricCount,
      quiltDefinition: JSON.parse(this.state.quiltDefinition),
      quiltBlocks: this.state.quiltBlocks,
    })
      .then((response) => {
        if (this.state.patternId === 0) this.props.history.push("/patterns");
        else toast.success("pattern updated successfully");
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

  // todo: not sure if this is needed
  resetManualFabricBlocks = () => {
    let tmpManualFabricBlocks = this.state.fabricList
      .filter((x) => this.state.selectedFabrics.includes(x.id))
      .map((x) => ({ fabricId: x.id, fabricUrl: x.url, count: 0 }));
    this.setState({ manualFabricBlocks: tmpManualFabricBlocks });
  };

  // todo: change behavior to bring up modal to set coordinates, size, shape id, etc.
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
  // handleChangeFabricCount = (event) => {
  //   // find the manual block
  //   const fabricId = event.target.getAttribute("fabric_id");
  //   let tmpManualFabricBlocks = this.state.manualFabricBlocks;
  //   const manualFabricIndex = tmpManualFabricBlocks.findIndex(
  //     (x) => x.fabricId == fabricId
  //   );

  //   // update to the new count
  //   tmpManualFabricBlocks[manualFabricIndex].count = event.target.value;
  //   this.setState({
  //     manualFabricBlocks: tmpManualFabricBlocks,
  //   });
  // };

  render() {
    return this.state.patternId !== undefined ? (
      <div>
        <CustomPatternForm
          patternName={this.state.patternName}
          quiltWidth={this.state.quiltWidth}
          quiltHeight={this.state.quiltHeight}
          fabricCount={this.state.fabricCount}
          quiltDefinition={this.state.quiltDefinition}
          // rowCount={this.state.rowCount}
          // colCount={this.state.colCount}
          // shapeTypes={this.state.shapeTypes}
          selectedShapeType={this.state.selectedShapeType}
          // shapeWidth={this.state.shapeWidth}
          // shapeHeight={this.state.shapeHeight}
          availableFabrics={this.state.fabricList}
          selectedFabrics={this.state.selectedFabrics}
          // evenlyDistributeBlocks={this.state.evenlyDistributeBlocks}
          manualFabricBlocks={this.state.manualFabricBlocks || []}
          quiltBlocks={this.state.quiltBlocks}
          onFormInputChange={this.onFormInputChange}
          onSavePatternClick={this.onSavePatternClick}
          onSelectFabricClick={this.onSelectFabricClick}
          // onChangeFabricCount={this.handleChangeFabricCount} // todo: needed?
          busy={this.state.busy}
        />

        <CustomQuilt
          quiltWidth={parseInt(this.state.quiltWidth)}
          quiltHeight={parseInt(this.state.quiltHeight)}
          fabricList={this.state.fabricList}
          quiltDefinition={this.state.quiltDefinition}
        />
      </div>
    ) : (
      <p>pattern id was invalid</p>
    );
  }
}

export default CustomPattern;
