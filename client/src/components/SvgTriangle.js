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

/*

// SVG help: https://css-tricks.com/clipping-masking-css/

sample image urls:
https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1935/floral-background-vector-medium.png
https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1409/abstract-pebble-seamless-pattern-vector-medium.png
https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1416/abstract-waves-seamless-pattern-vector-medium.png
https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3815/tomatos-and-cucumbers-pattern-vector-medium.png
https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1845/snowflakes-in-red-and-white-squares-seamless-pattern-vector-medium.png



*/
