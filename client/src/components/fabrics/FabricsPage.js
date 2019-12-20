import React, { Component } from "react";
import { toast } from "react-toastify";
import * as FabricApi from "../../api/FabricApi";
import Modal from "../utilities/Modal";

class FabricsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fabricsList: [],
      loading: true
    };
  }

  componentDidMount() {
    this.loadFabrics();
  }

  loadFabrics = () => {
    FabricApi.getFabrics()
      .then(resp => {
        this.setState({ fabricsList: resp, loading: false });
      })
      .catch(err => {
        toast.error("Error fetching fabrics");
        this.setState({ loading: false });
      });
  };

  handleNewFabricClick = () => {
    this.props.history.push("/add-fabric");
  };

  handleDeleteButtonClick = fabricId => {
    this.setState({
      showDeleteConfirmationModal: true,
      fabricIdToDelete: fabricId
    });
  };

  handleDeleteFabricModalConfirm = () => {
    FabricApi.deleteFabric(this.state.fabricIdToDelete)
      .then(res => {
        toast.success("fabric deleted successfully");
        this.loadFabrics();
      })
      .catch(error => {
        toast.error("an error occurred while deleting fabric");
      });
    this.setState({
      showDeleteConfirmationModal: false,
      fabricIdToDelete: null
    });
  };

  handleDeleteFabricModalCancel = () => {
    this.setState({
      showDeleteConfirmationModal: false,
      fabricIdToDelete: null
    });
  };

  render() {
    return (
      <>
        <Modal
          show={this.state.showDeleteConfirmationModal}
          message="Are you sure you want to delete this fabric?"
          onConfirm={this.handleDeleteFabricModalConfirm}
          onCancel={this.handleDeleteFabricModalCancel}
        />
        <h1>Fabrics</h1>

        <button onClick={this.handleNewFabricClick}>Add a new fabric</button>

        {this.state.loading ? (
          <p>Loading...</p>
        ) : this.state.fabricsList && this.state.fabricsList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.fabricsList.map(fabric => {
                return (
                  <tr key={fabric.id}>
                    <td>{fabric.id}</td>
                    <td>
                      <img
                        src={fabric.url}
                        alt={`fabric ${fabric.id}`}
                        width={50}
                        height={50}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDeleteButtonClick(fabric.id)}
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
          <p>no fabrics</p>
        )}
      </>
    );
  }
}

export default FabricsPage;
