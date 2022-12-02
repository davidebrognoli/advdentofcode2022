const { run } = require("../utils/utils");

const elfChars = ['A', 'B', 'C'];
const playerChars = ['X', 'Y', 'Z'];

const puzzle1 = (data) => {
  return data.reduce((acc, r) => acc += calculateRowScore(r, puzzle1PlayerFn, puzzle1DiffFn), 0)
};

const puzzle2 = (data) => {
  return data.reduce((acc, r) => acc += calculateRowScore(r, puzzle2PlayerFn, puzzle2DiffFn), 0)
};

const puzzle1PlayerFn = (player) => {
  return playerChars.indexOf(player) + 1
}

const puzzle1DiffFn = (a, b) => {
  return (((b - a + 1 + 3) % 3)) * 3
}

const puzzle2PlayerFn = (player) => {
  return playerChars.indexOf(player) * 3
}

const puzzle2DiffFn = (a, b) => {
  return ((a + b - 1 + 3) % 3) + 1
}

const calculateRowScore = (row, playerFn, diffFn) => {
  const [elf, player] = row.split(' ')
  const playerScore = playerFn(player)
  const diffScore = diffFn(elfChars.indexOf(elf), playerChars.indexOf(player))
  return playerScore + diffScore
}

run('02', puzzle1, puzzle2);
