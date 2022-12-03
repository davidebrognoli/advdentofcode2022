const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  const rucksacks = data.map(d => {
    const halfLength = d.length / 2
    return [d.slice(0, halfLength), d.slice(halfLength)]
  })
  const chars = rucksacks.map(([left, right]) => {
    let char = [...left].find(c => right.includes(c))
    return getCharCode(char)
  })
  return getCharSum(chars)
};

const puzzle2 = (data) => {
  const groups = Array.from({length: data.length / 3}, () => data.splice(0,3).sort(sortByLength))
  const chars = groups.map(([a, b, c]) => {
    let char = [...a].find(char => b.includes(char) && c.includes(char))
    return getCharCode(char)
  })
  return getCharSum(chars)
};

const getCharCode = (char) => {
  const value = char.charCodeAt(0)
  if (value < 91) {
    return value - 64 + 26
  }
  return value - 96
}

const getCharSum = (chars) => {
  return chars.reduce((acc, c) => {
    return acc + c
  }, 0)
}

const sortByLength = (a, b) => {
  if (a.length > b.length) {
    return 1;
  }
  if (b.length > a.length) {
      return -1;
  }
  return 0;
}

run('03', puzzle1, puzzle2);


