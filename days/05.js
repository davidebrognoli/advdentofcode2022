const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  const [stacks, rules] = parseData(data)
  rules.forEach(([quantity, from, to]) => {
    for(let i = 1; i <= quantity; i++) {
      const item = stacks[from - 1].shift()
      stacks[to - 1] = [item, ...stacks[to - 1]]
    }
  })
  return stacks.map(stack => stack[0]).join('')
};

const puzzle2 = (data) => {
  const [stacks, rules] = parseData(data)
  rules.forEach(([quantity, from, to]) => {
    const items = stacks[from - 1].splice(0, quantity)
    stacks[to - 1] = [...items, ...stacks[to - 1]]
  })
  return stacks.map(stack => stack[0]).join('')
};

const parseData = (data) => {
  return data.reduce((acc, row) => {
    if (!!row && !row.startsWith(' 1')) {
      if (row.startsWith('move')){
        const rulesRow = row.split(' ').filter(item => Number.isInteger(parseInt(item, 10)))
        acc[1].push(rulesRow)
      } else {
        const stackRow = row.match(/.{1,4}/g).map(col => col.trim().replace('[', '').replace(']', ''));
        stackRow.forEach((item, idx) => {
          if (item) {
            if (!acc[0][idx]){
              acc[0][idx] = []
            }
            acc[0][idx].push(item)
          }
        })
      }
    }
    return acc;
  }, [[], []])
}

run('05', puzzle1, puzzle2);
