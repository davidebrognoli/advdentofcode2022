const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  const map = data.map((row) => row.split(""));
  let found = new Set();
  const rowLength = map[0].length;
  const colLength = map.length;
  found = walkMap(found, map, rowLength, colLength, "l");
  found = walkMap(found, map, rowLength, colLength, "r");
  found = walkMap(found, map, colLength, rowLength, "t");
  found = walkMap(found, map, colLength, rowLength, "b");
  return found.size;
};

const walkMap = (found, map, iLength, jLength, direction) => {
  for (let i = 0; i < iLength; i++) {
    let previous = -1;
    for (let j = 0; j < jLength; j++) {
      const [x, y] = getXY(i, j, jLength, direction);
      const current = map[x][y];
      if (current > previous) {
        found.add(`${x}-${y}`);
        previous = current;
      }
    }
  }
  return found;
};

const getXY = (i, j, jLength, direction) => {
  switch (direction) {
    case "l":
      return [i, j];
    case "r":
      return [i, jLength - j - 1];
    case "t":
      return [j, i];
    case "b":
      return [jLength - j - 1, i];
  }
};

const puzzle2 = (data) => {
  const map = data.map((row) => row.split(""));
  const scores = [];
  for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data.length; j++) {
      const countL = directionScore(map, i, j, -1, true);
      const countR = directionScore(map, i, j, 1, true);
      const countT = directionScore(map, i, j, -1, false);
      const countB = directionScore(map, i, j, 1, false);
      const score = countL * countR * countT * countB;
      scores.push(score);
    }
  }
  return scores.sort((a, b) => b - a)[0];
};

const directionScore = (map, i, j, direction, isRow) => {
  const current = map[i][j];
  let idx = isRow ? j + direction : i + direction;
  let count = 0;
  let found = false;
  let next = getNext(map, i, j, idx, isRow);
  while (next && !found) {
    if (current <= next) {
      found = true;
    }
    idx = idx + direction;
    next = getNext(map, i, j, idx, isRow);
    count += 1;
  }
  return count;
};

const getNext = (map, i, j, idx, isRow) => {
  if (isRow) {
    return map[i] && map[i][idx] ? map[i][idx] : null;
  }
  return map[idx] && map[idx][j] ? map[idx][j] : null;
};

run("08", puzzle1, puzzle2);
