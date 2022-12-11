import fs from 'fs'

import { getLowestAlignCosts, getRangeArray } from './day7'

export const positions = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2021/day7/data.txt',
        'utf8'
    )
    .split(',')
    .map((d) => +d)

describe('2021 day 7', () => {
    describe('getRangeArray', () => {
        it('returns an array of numbers from start to end', () => {
            expect(getRangeArray(3, 7)).toEqual([3, 4, 5, 6, 7])
            expect(getRangeArray(7, 3)).toEqual([7, 6, 5, 4, 3])
            expect(getRangeArray(-3, -7)).toEqual([-3, -4, -5, -6, -7])
        })
        it('returns single number array of start and end are the same', () => {
            expect(getRangeArray(3, 3)).toEqual([3])
        })
    })

    describe('getLowestAlignCosts', () => {
        it('returns fuel cost for each number in range', () => {
            expect(
                getLowestAlignCosts([16, 1, 2, 0, 4, 2, 7, 1, 2, 14])
            ).toEqual(168)
        })
    })
})
