import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
  render() {
    return this.props.show ? (
      <div className="modal">
        <div>{this.props.message}</div>
        <div>
          <img
            src="https://78.media.tumblr.com/31289777836d47004168bb62cb42f876/tumblr_ow7hsuomoc1wvvyspo3_540.gif"
            alt="Janet has been murdered!"
          />
        </div>
        <div>
          <button onClick={this.props.onConfirm}>Yes</button>
          <button onClick={this.props.onCancel}>Cancel</button>
        </div>
      </div>
    ) : null;
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default Modal;
