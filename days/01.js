const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  const elf = getElfCalories(data);
  return Math.max(...elf);
};

const puzzle2 = (data) => {
  const elf = getElfCalories(data).sort((a, b) => b - a);
  return elf[0] + elf[1] + elf[2];
};

const getElfCalories = (data) => {
  return [...data, ""].reduce(
    (acc, d) => {
      const number = parseInt(d, 10);
      if (isNaN(number)) {
        acc[0].push(acc[1]);
        acc[1] = 0;
      } else {
        acc[1] = acc[1] + number;
      }
      return acc;
    },
    [[], 0]
  )[0];
};


run('01', puzzle1, puzzle2);
