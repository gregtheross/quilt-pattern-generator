import React from "react";
import PropTypes from "prop-types";

class FabricBlock extends React.Component {
  handleClick = e => {
    this.props.onFabricBlockClick(this.props.id);
  };

  render() {
    const clipPathId = `${this.props.clipPathPrefix}-${this.props.id}`;

    const style = {
      clipPath: "url(#" + clipPathId + ")",
      position: "absolute",
      top: this.props.top,
      left: this.props.left,
      opacity: this.props.selected ? ".25" : "1",
      backgroundColor: this.props.backgroundColor
    };

    return (
      <div>
        <img
          alt={`tile ${this.props.id}`}
          style={style}
          src={this.props.backgroundImage} // todo: null-check this and use transparent 1x1 pixel image
          width={this.props.width}
          height={this.props.height}
          onClick={this.handleClick}
        />
        <svg>
          <defs>
            <clipPath id={clipPathId}>
              <polygon points={this.props.points} />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
}

FabricBlock.propTypes = {
  backgroundImage: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  points: PropTypes.string.isRequired,
  onFabricBlockClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  clipPathPrefix: PropTypes.string.isRequired
};

export default FabricBlock;
