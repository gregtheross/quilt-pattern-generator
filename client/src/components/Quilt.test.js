import React from "react";
import { shallow, mount } from "enzyme";
import Quilt from "./Quilt";
import FabricBlock from "./FabricBlock";

it("should pass", () => {
  expect(true).toEqual(true);
});

function renderQuilt(args) {
  const defaultProps = {
    rowCount: 1,
    colCount: 1,
    shapeType: 1,
    shapeWidth: 100,
    shapeHeight: 100,
    fabricList: [{ id: 1, url: "" }],
    quiltBlocks: [1],
    onFabricBlockClick: jest.fn()
  };

  const props = { ...defaultProps, ...args };

  return mount(<Quilt {...props} />);
}

it("100x100 equilateral triangle", () => {
  const wrapper = renderQuilt();
  //   console.log(wrapper.debug());
  const expextedPolygon = (
    <polygon points="50 0, 100 86.60254037844386, 0 86.60254037844386" />
  );

  expect(wrapper.contains(expextedPolygon)).toEqual(true);
});

"square",
  it("80x100 isosceles triangle", () => {
    const wrapper = renderQuilt({
      shapeType: 2,
      shapeHeight: 80
    });
    // console.log(wrapper.debug());
    const expextedPolygon = <polygon points="50 0, 100 80, 0 80" />;

    expect(wrapper.contains(expextedPolygon)).toEqual(true);
  });

it("100x100 square", () => {
  const wrapper = renderQuilt({ shapeType: 3 });
  //   console.log(wrapper.debug());
  const expextedPolygon = <polygon points="0 0, 100 0, 100 100, 0 100" />;

  expect(wrapper.contains(expextedPolygon)).toEqual(true);
});

it("100x100 hexagon", () => {
  const wrapper = renderQuilt({ shapeType: 4 });
  //   console.log(wrapper.debug());
  const expextedPolygon = (
    <polygon points="0 43.30127018922193, 25 0, 75 0, 100 43.30127018922193 75 86.60254037844386, 25 86.60254037844386" />
  );

  expect(wrapper.contains(expextedPolygon)).toEqual(true);
});
