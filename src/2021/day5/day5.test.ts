import fs from 'fs'

import {
    drawLine,
    getPointsWhereNonDiagonalLinesOverlap,
    isDiagonal,
    Line,
} from './day5'

const lines = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2021/day5/data.txt',
        'utf8'
    )
    .split('\n')
    .map((str) =>
        str.split('->').map((s) =>
            s
                .trim()
                .split(',')
                .map((n) => +n)
        )
    ) as Line[]

describe('2021 day 5', () => {
    describe('isDiagonal', () => {
        it('returns true for diagonal lines', () => {
            expect(
                isDiagonal([
                    [8, 0],
                    [0, 8],
                ])
            ).toEqual(true)
            expect(
                isDiagonal([
                    [8, 8],
                    [0, 0],
                ])
            ).toEqual(true)
            expect(
                isDiagonal([
                    [0, 0],
                    [8, 8],
                ])
            ).toEqual(true)
            expect(
                isDiagonal([
                    [0, 8],
                    [8, 0],
                ])
            ).toEqual(true)
        })
        it('returns false for horizontal or vertical lines', () => {
            expect(
                isDiagonal([
                    [0, 0],
                    [8, 0],
                ])
            ).toEqual(false)
            expect(
                isDiagonal([
                    [8, 0],
                    [8, 8],
                ])
            ).toEqual(false)
        })
    })

    describe('drawLine', () => {
        it('returns all points on a line', () => {
            expect(
                drawLine([
                    [1, 3],
                    [1, 1],
                ])
            ).toEqual([
                [1, 3],
                [1, 2],
                [1, 1],
            ])
            expect(
                drawLine([
                    [1, 1],
                    [1, 3],
                ])
            ).toEqual([
                [1, 1],
                [1, 2],
                [1, 3],
            ])
            expect(
                drawLine([
                    [3, 1],
                    [1, 1],
                ])
            ).toEqual([
                [3, 1],
                [2, 1],
                [1, 1],
            ])
            expect(
                drawLine([
                    [1, 1],
                    [3, 1],
                ])
            ).toEqual([
                [1, 1],
                [2, 1],
                [3, 1],
            ])
            expect(
                drawLine([
                    [1, 5],
                    [1, 1],
                ])
            ).toEqual([
                [1, 5],
                [1, 4],
                [1, 3],
                [1, 2],
                [1, 1],
            ])
        })
    })

    describe('getPointsWhereNonDiagonalLinesOverlap', () => {
        it('returns number of points where at least two horizontal or vertical lines overlap', () => {
            const testData = [
                [
                    [0, 9],
                    [5, 9],
                ],
                [
                    [8, 0],
                    [0, 8],
                ],
                [
                    [9, 4],
                    [3, 4],
                ],
                [
                    [2, 2],
                    [2, 1],
                ],
                [
                    [7, 0],
                    [7, 4],
                ],
                [
                    [6, 4],
                    [2, 0],
                ],
                [
                    [0, 9],
                    [2, 9],
                ],
                [
                    [3, 4],
                    [1, 4],
                ],
                [
                    [0, 0],
                    [8, 8],
                ],
                [
                    [5, 5],
                    [8, 2],
                ],
            ] as Line[]
            expect(getPointsWhereNonDiagonalLinesOverlap(testData)).toEqual(5)
        })
        it('returns solution for part one', () => {
            expect(getPointsWhereNonDiagonalLinesOverlap(lines)).toEqual(6_461)
        })
    })
})
