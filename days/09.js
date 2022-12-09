const { run } = require("../utils/utils");

const puzzle1 = (data) => {
  return execute(data, 1)
};

const puzzle2 = (data) => {
  return execute(data, 9)
};

const parseRules = (data) => {
  return data.map(d => d.split(' '))
}

const calculateHeadPos = (hPos, direction) => {
  const [y, x] = hPos
  switch(direction) {
    case 'R':
      return [y, x + 1]
    case 'U':
      return [y + 1, x]
    case 'D':
      return [y - 1, x]
    case 'L':
      return [y, x - 1]
  }
}

calculateTailPos = (hPos, tPos) => {
  const [yt,xt] = tPos
  const [yh, xh] = hPos
  const diffY = yh - yt
  const diffX = xh - xt
  const distance = Math.max(
    Math.abs(diffY),
    Math.abs(diffX)
  )
  if (distance > 1) {
    newY = yt + (Math.abs(diffY) === 2 ? diffY / 2 : diffY)
    newX = xt + (Math.abs(diffX) === 2 ? diffX / 2 : diffX)
    return [newY, newX]
  }
  return tPos
}

const calculateKeyFromTPos = (tPos) => {
  const [y, x] = tPos;
  return `${y}-${x}`
}

const execute = (data, tailCount) => {
  const rules = parseRules(data)
  const visited = new Set()
  let head = [0, 0]
  let tails = Array(tailCount).fill(0).map(_ => [0,0])
  rules.forEach(rule => {
    const [direction, value] = rule;
    Array(parseInt(value, 10)).fill(0).forEach(_ => {
      head = calculateHeadPos(head, direction)
      tails.forEach((tail, idx) => {
        const prev = idx === 0 ? head : tails[idx - 1]
        tails[idx] = calculateTailPos(prev, tail)
      })
      visited.add(calculateKeyFromTPos(tails[tails.length - 1]))
    })
  })
  return visited.size
}

run("09", puzzle1, puzzle2);
