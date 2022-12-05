import data from './data'

import {
    getIncreasedValues,
    getNumberOfIncreasedValues,
    getWindowsArray,
    isIncreased,
    sum,
} from './day1'

describe('day1', () => {
    describe('isIncreased', () => {
        it('returns true if b is greater than a', () => {
            expect(isIncreased(1)(2)).toBe(true)
        })

        it('returns false if b is less than a', () => {
            expect(isIncreased(2)(1)).toBe(false)
        })

        it('returns false if b is equal to a', () => {
            expect(isIncreased(1)(1)).toBe(false)
        })

        it('returns true if a is undefined', () => {
            expect(isIncreased(undefined)(1)).toBe(false)
        })
    })

    describe('getIncreasedValues', () => {
        it('returns an empty array if the input is empty', () => {
            expect(getIncreasedValues([])).toEqual([])
        })

        it('returns only the values that increased compared to the previous value', () => {
            expect(getIncreasedValues([1, 2, 1, 0])).toEqual([2])
        })
    })

    describe('getNumberOfIncreasedValues', () => {
        it('returns 0 if the input is empty', () => {
            expect(getNumberOfIncreasedValues([])).toBe(0)
        })

        it('returns the number of values that increased compared to the previous value', () => {
            expect(getNumberOfIncreasedValues([1, 2, 1, 0])).toBe(1)
        })

        it('returns part one result', () => {
            const result = getNumberOfIncreasedValues(data)
            expect(result).toBe(1451)
        })

        it('returns part two result', () => {
            const dataWithWindows = getWindowsArray(data, 3)
            const sums = dataWithWindows.map(sum)
            const result = getNumberOfIncreasedValues(sums)
            expect(result).toBe(1395)
        })
    })

    describe('getWindowsArray', () => {
        it('returns an empty array if the input is empty', () => {
            expect(getWindowsArray([], 2)).toEqual([])
        })

        it('returns an empty array if the window size is greater than the input length', () => {
            const result = getWindowsArray([1, 2, 3], 4)
            expect(result).toEqual([])
        })

        it('returns an array of windows with passed in window size', () => {
            const result = getWindowsArray([1, 2, 3, 4], 3)
            expect(result).toEqual([
                [1, 2, 3],
                [2, 3, 4],
            ])
        })
    })

    describe('sum', () => {
        it('returns 0 if the input is empty', () => {
            expect(sum([])).toBe(0)
        })

        it('returns the sum of the input', () => {
            expect(sum([1, 2, 3])).toBe(6)
        })
    })
})
