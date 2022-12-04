const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  return data.reduce((acc, d) => {
    const [a, b] = defineAreas(d)
    const contains = isContained(b, a) ? 1 : 0
    return acc + contains
  }, 0)
};

const puzzle2 = (data) => {
  return data.reduce((acc, d) => {
    const [a, b] = defineAreas(d)
    const overlap = isOverlapped(a, b) ? 1 : 0
    return acc + overlap
  }, 0)
};

const defineAreas = (data) => {
  return data.split(',').map(player => player.split('-').map(n => parseInt(n, 10)))
}

const isContained = (a, b) => {
  if ((a[1] - a[0]) < (b[1] - b[0])){
    return ((b[0] <= a[0]) && (b[1] >= a[1]))
  }
  return  ((a[0] <= b[0]) && (a[1] >= b[1]))
}

const isOverlapped = (a, b) => {
  return a[0] <= b[1] && a[0] >= b[0] ||
         a[1] <= b[1] && a[1] >= b[0] ||
         b[0] <= a[1] && b[0] >= a[0] ||
         b[1] <= a[1] && b[1] >= a[0]
}

run('04', puzzle1, puzzle2);


