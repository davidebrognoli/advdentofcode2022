const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  return execute(data, 20, true)
};

const puzzle2 = (data) => {
  return execute(data, 10000, false)
};

const getPlayers = (data) => {
  return Array(data.length / 7).fill(0).map((i, idx) => {
    const start = idx * 7
    const end = start + 7
    return data.slice(start, end)
  })
}

const parsePlayer = (player) => {
  const items = player[1].replace('  Starting items: ', '').split(', ').map(item => parseInt(item))
  const operation = parseOperation(player[2].replace('  Operation: new = old ', '').split(' '))
  const test = parseInt(player[3].replace('  Test: divisible by ', ''))
  const trueMonkey = parseInt(player[4].replace('    If true: throw to monkey ', ''))
  const falseMonkey = parseInt(player[5].replace('    If false: throw to monkey ', ''))
  return {
    items,
    operation,
    test,
    trueMonkey,
    falseMonkey,
    counter: 0
  }
}

const parseOperation = (operationTxt) => {
  const [operation, value] = operationTxt
  if (operation === '*') {
    if (value === 'old') {
      return (item) => item * item
    }
    return (item) => item * parseInt(value)
  }
  if (value === 'old') {
    return (item) => item + item
  }
  return (item) => item + parseInt(value)
}

const round = (players, needDivision, manageable) => {
  players.forEach(p => {
    const { operation, test, trueMonkey, falseMonkey } = p
    while(p.items.length) {
      p.counter++
      const item = p.items.shift()
      const calculatedItem = operation(item)
      const nextItem = needDivision ? Math.floor(calculatedItem / 3) : calculatedItem % manageable
      const nextPlayerKey = nextItem % test === 0 ? trueMonkey : falseMonkey
      players[nextPlayerKey].items.push(nextItem)
    }
  })
  return players
}

const execute = (data, nOfRound, needDivision) => {
  let players = getPlayers(data).map(player => parsePlayer(player))
  const manageable = players.reduce((acc, p) => acc * p.test, 1)
  const counters = Array(nOfRound).fill(0).reduce((acc, _) => {
    return round(acc, needDivision, manageable)
  }, players).map(p => p.counter).sort((a, b) => b - a)
  return counters[0] * counters[1]
}

run("11", puzzle1, puzzle2);
