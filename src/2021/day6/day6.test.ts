import fs from 'fs'

import { countFishByInternalTimer, getFishCountForNumberOfDays } from './day6'

const fishTimers = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2021/day6/data.txt',
        'utf8'
    )
    .split(',')
    .map((d) => +d)

describe('2021 day 6', () => {
    describe('countFishByInternalTimer', () => {
        it('returns correct initial state', () => {
            expect(countFishByInternalTimer([3, 4, 3, 1, 2])).toEqual(
                new Map([
                    [0, 0],
                    [1, 1],
                    [2, 1],
                    [3, 2],
                    [4, 1],
                    [5, 0],
                    [6, 0],
                    [7, 0],
                    [8, 0],
                ])
            )
        })
        it('returns empty map when no fish', () => {
            expect(countFishByInternalTimer([])).toEqual(
                new Map([
                    [0, 0],
                    [1, 0],
                    [2, 0],
                    [3, 0],
                    [4, 0],
                    [5, 0],
                    [6, 0],
                    [7, 0],
                    [8, 0],
                ])
            )
        })
    })

    describe('getFishCountForNumberOfDays', () => {
        it('returns correct number of fish for number of days passed in', () => {
            const initialFishTimers = [3, 4, 3, 1, 2]
            expect(getFishCountForNumberOfDays(initialFishTimers, 18)).toEqual(
                26
            )
            expect(getFishCountForNumberOfDays(initialFishTimers, 80)).toEqual(
                5934
            )
        })
        it('return solution to part one & two', () => {
            expect(getFishCountForNumberOfDays(fishTimers, 80)).toEqual(350_149)
            expect(getFishCountForNumberOfDays(fishTimers, 256)).toEqual(
                1_590_327_954_513
            )
        })
    })
})
