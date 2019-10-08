import React from "react";

class Triangle extends React.Component {
  render() {
    return (
      <div
        class={
          "triangle " + this.props.direction + " color-" + this.props.fabricId
        }
      ></div>
    );
  }
}

export default Triangle;
