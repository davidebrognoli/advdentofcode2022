const fs = require("fs");
const path = require("path");

const readFile = async (day) => {
  try {
    const fileName = `${day}-${getEnv()}.txt`
    const filePath = path.join(__dirname, '..', 'inputs', fileName);
    const data = await fs.promises.readFile(filePath, 'utf8')
    return data.toString().split("\n");
  }
  catch(err) {
    throw new Error(err)
  }
}

const getEnv = () => {
  const [node, file, env] = process.argv;
  return env || 'input';
}

const run = async (day, puzzle1, puzzle2) => {
  try {
    const data = await readFile(day)
    console.log(puzzle1(data));
    console.log(puzzle2(data));
  } catch(err) {
    console.log("An Error as occured: ", err);
  }
}

module.exports = { run }
