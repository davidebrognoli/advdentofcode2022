const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  return searchMarkerIdx(data, 4)
};

const puzzle2 = (data) => {
  return searchMarkerIdx(data, 14)
};

const searchMarkerIdx = (data, markerLength) => {
  return data.map(row => {
    let found = false
    let idx = markerLength - 1
    while (!found & idx < row.length) {
      idx++
      const arr = row.slice(idx - markerLength, idx).split('').sort()
      found = !arr.some((char, i) => arr.indexOf(char) !== i)
    }
    return idx
  }).join(',')
}

run('06', puzzle1, puzzle2);
