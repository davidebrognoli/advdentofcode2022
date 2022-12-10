const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  const register = generateRegister(data);
  return [20, 60, 100, 140, 180, 220].reduce((acc, cycle) => {
    const cycleValue = register[cycle - 1];
    return acc + cycle * cycleValue;
  }, 0);
};

const puzzle2 = (data) => {
  const register = generateRegister(data);
  const screen = register.map((item, idx) => {
    const cursor = idx % 40;
    if (Math.abs(item - cursor) <= 1) {
      return "#";
    }
    return ".";
  });
  return Array(6)
    .fill(0)
    .map((_, idx) => {
      const start = idx * 40;
      return screen.slice(start, start + 40).join("");
    })
    .join("\n");
};

const generateRegister = (data) => {
  let currentValue = 1;
  const register = [1];
  data.forEach((row) => {
    register.push(currentValue);
    if (row !== "noop") {
      value = parseInt(row.split(" ")[1], 10);
      currentValue = currentValue + value;
      register.push(currentValue);
    }
  });
  return register;
};

run("10", puzzle1, puzzle2);
