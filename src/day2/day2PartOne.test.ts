import fs from 'fs'

import {
    getRoundPoints,
    getStrategyPoints,
    OpponentShapes,
    PlayerShapes,
} from './day2PartOne'

export const dataSet = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/day2/data.txt',
        'utf8'
    )
    .split('\n')
    .map((d) => d.split(' ')) as [OpponentShapes, PlayerShapes][]

describe('getRoundPoints', () => {
    it('returns correct points for round won', () => {
        expect(getRoundPoints('X', 'C')).toBe(7)
        expect(getRoundPoints('Y', 'A')).toBe(8)
        expect(getRoundPoints('Z', 'B')).toBe(9)
    })
    it('returns correct points for round lost', () => {
        expect(getRoundPoints('X', 'B')).toBe(1)
        expect(getRoundPoints('Y', 'C')).toBe(2)
        expect(getRoundPoints('Z', 'A')).toBe(3)
    })
    it('returns correct points for round drawn', () => {
        expect(getRoundPoints('X', 'A')).toBe(4)
        expect(getRoundPoints('Y', 'B')).toBe(5)
        expect(getRoundPoints('Z', 'C')).toBe(6)
    })
})

describe('getStrategyPoints', () => {
    it('returns 0 when given an empty array', () => {
        expect(getStrategyPoints([])).toBe(0)
    })
    it('returns the sum of the points for the strategy', () => {
        expect(
            getStrategyPoints([
                ['A', 'X'],
                ['B', 'Y'],
                ['C', 'Z'],
                ['A', 'Z'],
                ['B', 'X'],
                ['C', 'Y'],
                ['A', 'Y'],
                ['B', 'Z'],
                ['C', 'X'],
            ])
        ).toBe(45)
    })
    it('returns result for part one', () => {
        const partOneResult = getStrategyPoints(dataSet)
        expect(partOneResult).toBe(13446)
    })
})
