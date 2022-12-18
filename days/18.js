const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  const { emptySides } = getEmptySides(data);
  return emptySides.length;
};

const puzzle2 = (data) => {
  const { emptySides, points } = getEmptySides(data);
  const [min, max] = points.reduce(
    (acc, point) => {
      const [x, y, z] = point;
      const [minX, minY, minZ] = acc[0];
      const [maxX, maxY, maxZ] = acc[1];
      const min = [Math.min(x, minX), Math.min(y, minY), Math.min(z, minZ)];
      const max = [Math.max(x, maxX), Math.max(y, maxY), Math.max(z, maxZ)];
      return [min, max];
    },
    [
      [Infinity, Infinity, Infinity],
      [0, 0, 0],
    ]
  );
  const allPoints = getAllPoints(min, max, points);
  const filteredEmptySides = emptySides.filter((neighbour) =>
    allPoints.has(neighbour.toString())
  );
  return filteredEmptySides.length;
};

const differentPoint = (a, b) => {
  const [x, y, z] = a;
  const [x1, y1, z1] = b;
  return x !== x1 || y !== y1 || z !== z1;
};

const getNeighbours = (point) => {
  const [x, y, z] = point;
  return [
    [x - 1, y, z],
    [x + 1, y, z],
    [x, y - 1, z],
    [x, y + 1, z],
    [x, y, z - 1],
    [x, y, z + 1],
  ];
};

const getEmptySides = (data) => {
  const points = data.map((row) =>
    row.split(",").map((coords) => parseInt(coords, 10))
  );
  const sides = points.reduce((acc, p) => {
    const neighbours = getNeighbours(p);
    neighbours.forEach((neighbour) => acc.add(neighbour));
    return acc;
  }, new Set());
  const emptySides = Array.from(sides).filter((s) =>
    points.every((p) => differentPoint(p, s))
  );
  return { points, emptySides };
};

const getAllPoints = (min, max, points) => {
  console.log(min, max)
  const keyPoints = new Set(points.map((point) => point.toString()));

  const visited = new Set();
  const nextItems = [min, max];

  while (nextItems.length > 0) {
    const curr = nextItems.shift()
    if (!visited.has(curr.toString())) {

      const nextToCheck = getNeighbours(curr).filter(
        (neighbour) => {
          const [x, y, z] = neighbour;
          const [minX, minY, minZ] = min;
          const [maxX, maxY, maxZ] = max;
          return (
            !visited.has(neighbour.toString()) &&
            !keyPoints.has(neighbour.toString()) &&
            x >= minX - 1 &&
            y >= minY - 1 &&
            z >= minZ - 1 &&
            x <= maxX + 1 &&
            y <= maxY + 1 &&
            z <= maxZ + 1
          )
        }
      );

      nextItems.push(...nextToCheck);
      visited.add(curr.toString());
    }
  }

  return visited;
};

run("18", puzzle1, puzzle2);
