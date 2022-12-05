import fs from 'fs'

import { sumCalories, getHighestNCalorieSums } from './day1'

export const dataSet = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day1/data.txt',
        'utf8'
    )
    .split('\n\n')
    .map((d) => d.split('\n').map((d) => +d))

describe('sumCalories', () => {
    it('should return 0 when given an empty array', () => {
        expect(sumCalories([])).toEqual(0)
    })
    it('returns the sum of the array', () => {
        expect(sumCalories([1, 2, 3])).toEqual(6)
    })
})

describe('getHighestNCalorieSums', () => {
    it('should return 0 when given an empty array or if n is below 1', () => {
        expect(getHighestNCalorieSums([], 3)).toEqual(0)
        const testData = [
            [1, 2, 3],
            [2, 3, 4],
            [1, 1, 1],
        ]
        expect(getHighestNCalorieSums(testData, 0)).toEqual(0)
        expect(getHighestNCalorieSums(testData, -1)).toEqual(0)
    })
    it('returns the sum the sum of the n highest of the calories array', () => {
        const testData = [
            [1, 2, 3],
            [2, 3, 4],
            [1, 1, 1],
        ]
        expect(getHighestNCalorieSums(testData)).toEqual(9)
        expect(getHighestNCalorieSums(testData, 2)).toEqual(15)
        expect(getHighestNCalorieSums(testData, 3)).toEqual(18)
        expect(getHighestNCalorieSums(testData, 4)).toEqual(18)
    })
    it('returns Part One and Part Two Result', () => {
        const partOneResult = getHighestNCalorieSums(dataSet)
        expect(partOneResult).toEqual(73211)
        const partTwoResult = getHighestNCalorieSums(dataSet, 3)
        expect(partTwoResult).toEqual(213958)
    })
})
