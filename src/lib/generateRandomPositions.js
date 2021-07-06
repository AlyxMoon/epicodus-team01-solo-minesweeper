
const generateRandomPositions = (
  count = 0,
  [rowMin, rowMax] = [0, 1],
  [colMin, colMax] = [0, 1],
) => {
  if (count <= 0) return []

  const possibleRows = rowMax - rowMin + 1
  const possibleCols = colMax - colMin + 1

  if (count > possibleRows * possibleCols) {
    throw new Error('cannot fit that many items given the range')
  }

  const allPossibleValues = []
  const returnValues = []

  for (let i = rowMin; i <= rowMax; i++) {
    for (let j = colMin; j <= colMax; j++) {
      allPossibleValues.push([i, j])
    }
  }

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * allPossibleValues.length)
    returnValues.push(...allPossibleValues.splice(index, 1))
  }

  return returnValues
}

export default generateRandomPositions
