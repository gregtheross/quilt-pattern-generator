import React, { Component } from "react";

class AddFabricPage extends Component {
  constructor(props) {
    super(props);

    this.state = { url: "", file: null };
  }

  handleChange = e => {
    // todo: update state after form input changes
  };

  render() {
    return (
      <>
        <h1>Add new fabric</h1>
        <div>
          <div>
            <label>
              <input type="radio" name="imageType" value="url" />
              Use a public Url
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="imageType" value="upload" />
              Upload a file
            </label>
          </div>
          <div>
            <label>
              Image Url:
              <input type="text" name="imageUrl" onChange={this.handleChange} />
            </label>
          </div>
          <div>
            <label>
              <input
                type="file"
                name="imageUpload"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <button
              onClick={this.handleSaveFabricClick}
              // todo: validate before enabling disabled={this.props.busy}
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
