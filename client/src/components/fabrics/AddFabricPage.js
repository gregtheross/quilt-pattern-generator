import React, { Component } from "react";
import { toast } from "react-toastify";
import * as FabricApi from "../../api/FabricApi";

class AddFabricPage extends Component {
  constructor(props) {
    super(props);

    this.state = { imageType: "", imageUrl: "", imageFile: null };
  }

  handleChange = e => {
    const value =
      e.target.name === "imageFile" ? e.target.files[0] : e.target.value;

    this.setState({ [e.target.name]: value });
  };

  handleSaveFabricClick = e => {
    FabricApi.saveFabric(this.state)
      .then(resp => {
        toast.success("Fabric saved successfully");

        this.props.history.push("/fabrics");
      })
      .catch(err => {
        toast.error("Error saving fabric");
      });
  };

  render() {
    return (
      <>
        <h1>Add new fabric</h1>
        <div>
          <div>
            <label>
              <input
                type="radio"
                name="imageType"
                value="url"
                onChange={this.handleChange}
              />
              Use a public Url
            </label>
          </div>
          <div>
            <label>
              Image Url:
              <input
                type="text"
                name="imageUrl"
                onChange={this.handleChange}
                disabled={
                  !this.state.imageType || this.state.imageType !== "url"
                }
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="imageType"
                value="upload"
                onChange={this.handleChange}
              />
              Upload a file
            </label>
          </div>
          <div>
            <label>
              <input
                type="file"
                name="imageFile"
                onChange={this.handleChange}
                disabled={
                  !this.state.imageType || this.state.imageType !== "upload"
                }
              />
            </label>
          </div>
          <div>
            <button
              onClick={this.handleSaveFabricClick}
              // todo: disable until fields are properly filled
            >
              Save Fabric
            </button>
          </div>
        </div>

        <p>todo: form with the following: url, upload file</p>
      </>
    );
  }
}

export default AddFabricPage;
