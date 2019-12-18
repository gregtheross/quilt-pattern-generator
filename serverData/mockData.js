const shapeTypes = [
  { id: 1, name: "equilateral triangle" },
  { id: 2, name: "isosceles triangle" },
  { id: 3, name: "square" },
  { id: 4, name: "hexagon" }
];

const fabrics = [
  {
    id: 1,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1935/floral-background-vector-medium.png"
  },
  {
    id: 2,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1409/abstract-pebble-seamless-pattern-vector-medium.png"
  },
  {
    id: 3,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1416/abstract-waves-seamless-pattern-vector-medium.png"
  },
  {
    id: 4,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3815/tomatos-and-cucumbers-pattern-vector-medium.png"
  },
  {
    id: 5,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1845/snowflakes-in-red-and-white-squares-seamless-pattern-vector-medium.png"
  },
  {
    id: 6,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/2007/coffee-pattern-vector-medium.png"
  },
  {
    id: 7,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3813/acorn-pattern-vector-medium.png"
  },
  {
    id: 8,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/3814/limes-pattern-vector-medium.png"
  },
  {
    id: 9,
    url:
      "https://creazilla-store.fra1.digitaloceanspaces.com/vectors/1377/koi-fish-carp-seamless-pattern-vector-medium.png"
  }
];

const projects = [
  {
    id: 1,
    name: "mock data project",
    quiltFabrics: [1, 2, 3, 4, 5],
    quiltRows: 2,
    quiltColumns: 3,
    quiltShapeType: 3,
    quiltShapeWidth: 80,
    quiltShapeHeight: 100,
    quiltBlocks: [1, 2, 3, 4, 5, 1]
  },
  {
    id: 2,
    name: "mock data project2",
    quiltFabrics: [1, 2, 3, 4],
    quiltRows: 3,
    quiltColumns: 3,
    quiltShapeType: 1,
    quiltShapeWidth: 80,
    quiltShapeHeight: 100,
    quiltBlocks: [1, 2, 3, 4, 1, 2, 3, 4, 1]
  }
];

module.exports = {
  shapeTypes,
  fabrics,
  projects
};
