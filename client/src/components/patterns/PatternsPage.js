import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import * as PatternApi from "../../api/PatternApi";
import Modal from "../utilities/Modal";

class PatternsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patternsList: [],
      loading: true,
      showDeleteConfirmationModal: false,
      patternIdToDelete: null,
    };
  }

  componentDidMount() {
    this.loadPatterns();
  }

  loadPatterns = () => {
    PatternApi.getPatterns()
      .then((response) => {
        this.setState({ patternsList: response, loading: false });
      })
      .catch((error) => {
        toast.error("error fetching patterns");
        console.log(error);
        this.setState({ loading: false });
      });
  };

  handleNewCustomPatternClick = () => {
    this.props.history.push("/custom-pattern");
  };

  handleDeleteButtonClick = (patternId) => {
    this.setState({
      showDeleteConfirmationModal: true,
      patternIdToDelete: patternId,
    });
  };

  handleDeletePatternModalConfirm = () => {
    PatternApi.deletePattern(this.state.patternIdToDelete)
      .then((res) => {
        toast.success("pattern deleted successfully");
        this.loadPatterns();
      })
      .catch((error) => {
        toast.error("an error occurred while deleting pattern");
      });
    this.setState({
      showDeleteConfirmationModal: false,
      patternIdToDelete: null,
    });
  };

  handleDeletePatternModalCancel = () => {
    this.setState({
      showDeleteConfirmationModal: false,
      patternIdToDelete: null,
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.showDeleteConfirmationModal}
          message="Are you sure you want to delete this pattern?"
          onConfirm={this.handleDeletePatternModalConfirm}
          onCancel={this.handleDeletePatternModalCancel}
        />
        <h1>Patterns</h1>
        <button onClick={this.handleNewCustomPatternClick}>
          Create a new custom pattern
        </button>
        {this.state.loading ? (
          <p>LOADING...</p>
        ) : this.state.patternsList && this.state.patternsList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Shape</th>
                <th>Dimensions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.patternsList.map((pattern) => {
                return (
                  <tr key={pattern.id}>
                    <td>{pattern.id}</td>
                    <td>
                      <NavLink to={pattern.url}>{pattern.name}</NavLink>
                    </td>
                    <td>{pattern.shapeType}</td> 
                    <td>{pattern.dimensions}</td>
                    <td>
                      <button
                        onClick={() => this.handleDeleteButtonClick(pattern.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>you don't have any patterns</p>
        )}
      </>
    );
  }
}

export default PatternsPage;
