import React from "react";
import { shallow, mount } from "enzyme";
import Quilt from "./Quilt";
import FabricBlock from "./FabricBlock";
import renderer from "react-test-renderer";

function renderQuilt(args) {
  const defaultProps = {
    rowCount: 2,
    colCount: 2,
    shapeType: 1,
    shapeWidth: 100,
    shapeHeight: 100,
    fabricList: [
      { id: 1, url: "1.jpg" },
      { id: 2, url: "2.jpg" }
    ],
    quiltBlocks: [1, 2, 2, 1],
    onFabricBlockClick: jest.fn()
  };

  const props = { ...defaultProps, ...args };

  return mount(<Quilt {...props} />);
}

it("100x100 equilateral triangle", () => {
  const tree = renderer.create(renderQuilt()).toJSON();
  expect(tree).toMatchSnapshot();
});

it("80x100 isosceles triangle", () => {
  const tree = renderer
    .create(
      renderQuilt({
        shapeType: 2,
        shapeHeight: 80
      })
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("100x100 square", () => {
  const tree = renderer.create(renderQuilt({ shapeType: 3 })).toJSON();
  expect(tree).toMatchSnapshot();
});

it("100x100 hexagon", () => {
  const tree = renderer.create(renderQuilt({ shapeType: 4 })).toJSON();
  expect(tree).toMatchSnapshot();
});
