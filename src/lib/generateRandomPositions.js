
const generateRandomPositions = (count = 0, min = 0, max = 1) => {
  if (count <= 0) return []

  if (count > (max - min + 1) ** 2) {
    throw new Error('cannot fit that many items given the range')
  }

  const allPossibleValues = []
  const returnValues = []

  for (let i = min; i <= max; i++) {
    for (let j = min; j <= max; j++) {
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
