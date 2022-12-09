import fs from 'fs'

import {
    Direction,
    getNumberUniqueTailPositions,
    getUpdatedHeadPosition,
    getUpdatedKnotPosition,
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
    describe('getUpdatedKnotPosition', () => {
        it('moves knot element diagonally', () => {
            expect(getUpdatedKnotPosition([4, 2], [3, 0])).toEqual([4, 1])
            expect(getUpdatedKnotPosition([4, 0], [3, 2])).toEqual([4, 1])
            expect(getUpdatedKnotPosition([-5, 2], [-3, 1])).toEqual([-4, 2])
            expect(getUpdatedKnotPosition([-3, 2], [-5, 1])).toEqual([-4, 2])
        })
        it('moves knot vertically', () => {
            expect(getUpdatedKnotPosition([4, 2], [4, 0])).toEqual([4, 1])
            expect(getUpdatedKnotPosition([-4, -2], [4, 0])).toEqual([4, -1])
            expect(getUpdatedKnotPosition([4, 2], [4, 4])).toEqual([4, 3])
            expect(getUpdatedKnotPosition([-4, -2], [4, -4])).toEqual([4, -3])
        })
        it('moves knot horizontally', () => {
            expect(getUpdatedKnotPosition([4, 2], [2, 2])).toEqual([3, 2])
            expect(getUpdatedKnotPosition([-4, 2], [-2, 2])).toEqual([-3, 2])
            expect(getUpdatedKnotPosition([4, 2], [6, 2])).toEqual([5, 2])
            expect(getUpdatedKnotPosition([-4, 2], [-6, 2])).toEqual([-5, 2])
        })
        it('does not move if positions are the same', () => {
            expect(getUpdatedKnotPosition([4, 2], [4, 2])).toEqual([4, 2])
            expect(getUpdatedKnotPosition([4, 2], [3, 1])).toEqual([3, 1])
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
        it('returns correct number of unique tail positions with longer knot', () => {
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
            expect(getNumberUniqueTailPositions(testData, 10)).toEqual(1)
        })
        it('returns result for part two', () => {
            expect(getNumberUniqueTailPositions(headMoves, 10)).toEqual(2562)
        })
    })
})
