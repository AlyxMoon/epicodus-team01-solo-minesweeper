import generateRandomPositions from '@/lib/generateRandomPositions'

describe('function generateRandomPositions()', () => {
  it('should return an empty array by default', () => {
    expect(generateRandomPositions().length).toEqual(0)
  })

  it('should return the correct amount of entries in the correct format', () => {
    const result = generateRandomPositions(10, 1, 10)

    expect(result.length).toEqual(10)
    for (const item of result) {
      expect(item.length).toEqual(2)
      expect(typeof item[0]).toEqual('number')
      expect(typeof item[1]).toEqual('number')
    }
  })

  it('should have each entry be within the min/max range (inclusive)', () => {
    const result = generateRandomPositions(10, 1, 8)
    for (const item of result) {
      expect(item[0]).toBeGreaterThanOrEqual(1)
      expect(item[0]).toBeLessThanOrEqual(8)
      expect(item[1]).toBeGreaterThanOrEqual(1)
      expect(item[1]).toBeLessThanOrEqual(8)
    }
  })

  it('should not return any duplicate entries', () => {
    const result = generateRandomPositions(9, 1, 3)

    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length; j++) {
        if (i === j) continue

        expect(result[i]).not.toEqual(result[j])
      }
    }
  })

  it('should throw an error if it cannot generate enough items to meet count', () => {
    expect(() => {
      generateRandomPositions(10, 1, 3)
    }).toThrow()
  })
})
