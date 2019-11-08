import React from "react";

class FabricBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onFabricBlockClick(this.props.id);
  }

  render() {
    const style = {
      clipPath: "url(#" + this.props.id + ")",
      position: "absolute",
      top: this.props.top,
      left: this.props.left,
      opacity: this.props.selected ? ".25" : "1"
    };

    return (
      <div>
        <img
          style={style}
          src={this.props.backgroundImage}
          width={this.props.width}
          height={this.props.height}
          onClick={this.handleClick}
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
