import fs from 'fs'

import { getNextPossiblePositions, getValueCoordinates, walkMap } from './day12'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

const testData = [
    [0, 1, 2, 17, 16, 15, 14, 13],
    [1, 2, 3, 18, 25, 24, 24, 12],
    [1, 3, 3, 19, 26, 27, 24, 11],
    [1, 3, 3, 20, 21, 22, 23, 10],
    [1, 2, 4, 5, 6, 7, 8, 9],
]

const heightMap = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day12/data.txt',
        'utf8'
    )
    .split('\n')
    .map((row) => row.split(''))
    .map((row) =>
        row.map((letter) => {
            if (letter === 'E') return 27
            if (letter === 'S') return 0
            return alphabet.indexOf(letter) + 1
        })
    )

describe('2022 day 12', () => {
    describe('getNextPossiblePositions', () => {
        it('returns the correct next possible positions for up type walk', () => {
            expect(getNextPossiblePositions(testData, [2, 2], 'up')).toEqual([
                [1, 2],
                [2, 1],
                [2, 3],
            ])
            expect(getNextPossiblePositions(testData, [0, 0], 'up')).toEqual([
                [1, 0],
                [0, 1],
            ])
            expect(getNextPossiblePositions(testData, [7, 0], 'up')).toEqual([
                [6, +0],
                [7, 1],
            ])
            expect(getNextPossiblePositions(testData, [0, 4], 'up')).toEqual([
                [0, 3],
                [1, 4],
            ])
        })
        it('returns the correct next possible positions for down type walk', () => {
            expect(getNextPossiblePositions(testData, [2, 2], 'down')).toEqual([
                [1, 2],
                [2, 1],
                [3, 2],
                [2, 3],
            ])
            expect(getNextPossiblePositions(testData, [0, 0], 'down')).toEqual([
                [1, 0],
                [0, 1],
            ])
            expect(getNextPossiblePositions(testData, [7, 0], 'down')).toEqual([
                [6, 0],
                [7, 1],
            ])
            expect(getNextPossiblePositions(testData, [0, 4], 'down')).toEqual([
                [0, 3],
                [1, 4],
            ])
        })
    })

    describe('getValueCoordinates', () => {
        it('returns correct start and end coordinates', () => {
            expect(getValueCoordinates(testData, 0)).toBe(
                JSON.stringify([0, 0])
            )
            expect(getValueCoordinates(testData, 27)).toBe(
                JSON.stringify([5, 2])
            )
        })
        it('returns default tuple for non-existing value', () => {
            expect(getValueCoordinates(testData, 28)).toBe(
                JSON.stringify([-1, -1])
            )
        })
    })

    describe('walkMap', () => {
        it('finds the shortest path from start to end', () => {
            expect(
                walkMap(testData, getValueCoordinates(testData, 0), 27)
            ).toBe(31)
            expect(
                walkMap(testData, getValueCoordinates(testData, 27), 1)
            ).toBe(29)
        })
        it('returns answer for part one and two', () => {
            expect(
                walkMap(heightMap, getValueCoordinates(heightMap, 0), 27)
            ).toBe(352)
            expect(
                walkMap(heightMap, getValueCoordinates(heightMap, 27), 1)
            ).toBe(351)
        })
    })
})
