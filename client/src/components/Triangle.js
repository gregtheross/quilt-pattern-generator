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

/*
todo: experiment with converting to SVG:
https://css-tricks.com/clipping-masking-css/

<img class="clip-svg" src="http://i.imgur.com/RECDV24.jpg" alt="Harry Potter">

<svg width="0" height="0">
  <defs>
    <clipPath id="myClip">
      <polygon points="0 0, 300 0, 150 200" />
    </clipPath>
  </defs>
</svg>
*/