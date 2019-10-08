import React from "react";

class Triangle extends React.Component {
  render() {
    return (
      <div
        className={
          "triangle " + this.props.direction + " color-" + this.props.fabricId
        }
      ></div>
    );
  }
}

export default Triangle;
