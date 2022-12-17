import fs from 'fs'

import {
    Coordinate,
    getAllLineCoordinates,
    getNumberOfSandsBeforeAbyss,
    simulateSandFalling,
} from './day14'

const rockData = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day14/data.txt',
        'utf8'
    )
    .split('\n')
    .map((row) =>
        row.split('->').map((coors) => coors.split(',').map((c) => +c))
    ) as Coordinate[][]

describe('day 14 2022', () => {
    describe('getAllLineCoordinates', () => {
        it('should return the correct coordinates for a vertical line', () => {
            expect(
                getAllLineCoordinates([
                    [498, 4],
                    [498, 6],
                ])
            ).toEqual([
                [498, 4],
                [498, 5],
                [498, 6],
            ])
            expect(
                getAllLineCoordinates([
                    [498, 6],
                    [498, 4],
                ])
            ).toEqual([
                [498, 6],
                [498, 5],
                [498, 4],
            ])
            expect(
                getAllLineCoordinates([
                    [498, -1],
                    [498, 1],
                ])
            ).toEqual([
                [498, -1],
                [498, 0],
                [498, 1],
            ])
            expect(
                getAllLineCoordinates([
                    [498, 1],
                    [498, -1],
                ])
            ).toEqual([
                [498, 1],
                [498, 0],
                [498, -1],
            ])
        })
        it('should return the correct coordinates for a horizontal line', () => {
            expect(
                getAllLineCoordinates([
                    [498, 4],
                    [500, 4],
                ])
            ).toEqual([
                [498, 4],
                [499, 4],
                [500, 4],
            ])
            expect(
                getAllLineCoordinates([
                    [500, 4],
                    [498, 4],
                ])
            ).toEqual([
                [500, 4],
                [499, 4],
                [498, 4],
            ])
            expect(
                getAllLineCoordinates([
                    [-1, 4],
                    [1, 4],
                ])
            ).toEqual([
                [-1, 4],
                [0, 4],
                [1, 4],
            ])
            expect(
                getAllLineCoordinates([
                    [1, 4],
                    [-1, 4],
                ])
            ).toEqual([
                [1, 4],
                [0, 4],
                [-1, 4],
            ])
        })
        it('return correct coordinates for a line with multiple anchor points', () => {
            expect(
                getAllLineCoordinates([
                    [498, 4],
                    [500, 4],
                    [500, 6],
                ])
            ).toEqual([
                [498, 4],
                [499, 4],
                [500, 4],
                [500, 5],
                [500, 6],
            ])
            expect(
                getAllLineCoordinates([
                    [500, 6],
                    [500, 4],
                    [498, 4],
                ])
            ).toEqual([
                [500, 6],
                [500, 5],
                [500, 4],
                [499, 4],
                [498, 4],
            ])
        })
    })

    describe('simulateSandFalling', () => {
        it('simulates sand falling downwards', () => {
            expect(
                simulateSandFalling(
                    [
                        [501, 4],
                        [500, 4],
                        [499, 4],
                    ],
                    4
                )
            ).toEqual([500, 3])
            expect(
                simulateSandFalling(
                    [
                        [501, 4],
                        [500, 4],
                        [499, 4],
                        [498, 4],
                        [500, 3],
                    ],
                    4
                )
            ).toEqual([499, 3])
            expect(
                simulateSandFalling(
                    [
                        [502, 4],
                        [501, 4],
                        [500, 4],
                        [499, 4],
                        [498, 4],
                        [500, 3],
                        [499, 3],
                    ],
                    4
                )
            ).toEqual([501, 3])
            expect(
                simulateSandFalling(
                    [
                        [502, 4],
                        [501, 4],
                        [500, 4],
                        [499, 4],
                        [498, 4],
                        [500, 3],
                        [499, 3],
                        [501, 3],
                    ],
                    4
                )
            ).toEqual([500, 2])
            expect(
                simulateSandFalling(
                    [
                        [502, 4],
                        [501, 4],
                        [500, 4],
                        [499, 4],
                        [498, 4],
                        [500, 3],
                        [499, 3],
                        [501, 3],
                        [500, 2],
                    ],
                    4
                )
            ).toEqual([497, 4])
        })
    })

    describe('getNumberOfSandsBeforeAbyss', () => {
        it('gets number of sands before abyss', () => {
            const testData: Coordinate[][] = [
                [
                    [498, 4],
                    [498, 6],
                    [496, 6],
                ],
                [
                    [503, 4],
                    [502, 4],
                    [502, 9],
                    [494, 9],
                ],
            ]
            expect(getNumberOfSandsBeforeAbyss(testData)).toBe(24)
        })
        it.skip('returns solution for part one', () => {
            expect(getNumberOfSandsBeforeAbyss(rockData)).toBe(1016)
        })
    })
})
