import React from "react";

// todo: create base svg polygon that triangle and other future shapes will inherit

class SvgTriangle extends React.Component {
  render() {
    const style = {
      clipPath: "url(#" + this.props.id + ")",
      position: "absolute",
      top: this.props.top,
      left: this.props.left
    };

    return (
      <div>
        <img
          style={style}
          src={this.props.backgroundImage}
          width="100"
          height="100"
        />
        <svg>
          <defs>
            <clipPath id={this.props.id}>
              <polygon points={this.props.points} />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
}

export default SvgTriangle;
