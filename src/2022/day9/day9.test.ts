import fs from 'fs'

import {
    Direction,
    getNumberUniqueTailPositions,
    getUpdatedHeadPosition,
    getUpdatedTailPosition,
} from './day9'

const headMoves = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day9/data.txt',
        'utf8'
    )
    .split('\n')
    .map((move) => {
        const [direction, movesNumber] = move.split(' ')
        return [direction, Array.from(Array(+movesNumber).keys())]
    }) as [Direction, number[]][]

describe('day 9', () => {
    describe('getUpdatedHeadPosition', () => {
        it('moves head by one', () => {
            expect(getUpdatedHeadPosition([0, 0], 'U')).toEqual([0, 1])
            expect(getUpdatedHeadPosition([0, 0], 'D')).toEqual([0, -1])
            expect(getUpdatedHeadPosition([0, 0], 'L')).toEqual([-1, 0])
            expect(getUpdatedHeadPosition([0, 0], 'R')).toEqual([1, 0])
        })
    })
    describe('getUpdatedTailPosition', () => {
        it('moves tail diagonally', () => {
            expect(getUpdatedTailPosition([4, 2], [3, 0])).toEqual([4, 1])
            expect(getUpdatedTailPosition([4, 0], [3, 2])).toEqual([4, 1])
            expect(getUpdatedTailPosition([-5, 2], [-3, 1])).toEqual([-4, 2])
            expect(getUpdatedTailPosition([-3, 2], [-5, 1])).toEqual([-4, 2])
        })
        it('moves tail vertically', () => {
            expect(getUpdatedTailPosition([4, 2], [4, 0])).toEqual([4, 1])
            expect(getUpdatedTailPosition([-4, -2], [4, 0])).toEqual([4, -1])
            expect(getUpdatedTailPosition([4, 2], [4, 4])).toEqual([4, 3])
            expect(getUpdatedTailPosition([-4, -2], [4, -4])).toEqual([4, -3])
        })
        it('moves tail horizontally', () => {
            expect(getUpdatedTailPosition([4, 2], [2, 2])).toEqual([3, 2])
            expect(getUpdatedTailPosition([-4, 2], [-2, 2])).toEqual([-3, 2])
            expect(getUpdatedTailPosition([4, 2], [6, 2])).toEqual([5, 2])
            expect(getUpdatedTailPosition([-4, 2], [-6, 2])).toEqual([-5, 2])
        })
        it('does not move if positions are the same', () => {
            expect(getUpdatedTailPosition([4, 2], [4, 2])).toEqual([4, 2])
            expect(getUpdatedTailPosition([4, 2], [3, 1])).toEqual([3, 1])
        })
    })

    describe('getNumberUniqueTailPositions', () => {
        it('returns correct number of unique tail positions', () => {
            const testData: [Direction, number[]][] = [
                ['R', [1, 1, 1, 1]],
                ['U', [1, 1, 1, 1]],
                ['L', [1, 1, 1]],
                ['D', [1]],
                ['R', [1, 1, 1, 1]],
                ['D', [1]],
                ['L', [1, 1, 1, 1, 1]],
                ['R', [1, 1]],
            ]
            expect(getNumberUniqueTailPositions(testData)).toEqual(13)
        })
        it('returns result for part one', () => {
            expect(getNumberUniqueTailPositions(headMoves)).toEqual(6197)
        })
    })
})
