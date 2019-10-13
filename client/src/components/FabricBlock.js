import React from "react";

class FabricBlock extends React.Component {
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
          width={this.props.width}
          height={this.props.height}
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

export default FabricBlock;
