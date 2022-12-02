import { getDataSet } from './dataSetUtil'

import {
    getRoundPoints,
    getStrategyPoints,
    Shapes,
    Outcomes,
} from './day2PartTwo'

export const dataSet = getDataSet<Shapes, Outcomes>()

describe('getRoundPoints', () => {
    it('returns correct points for lost rounds', () => {
        expect(getRoundPoints('A', 'X')).toBe(3)
        expect(getRoundPoints('B', 'X')).toBe(1)
        expect(getRoundPoints('C', 'X')).toBe(2)
    })
    it('returns correct points for drawn rounds', () => {
        expect(getRoundPoints('A', 'Y')).toBe(4)
        expect(getRoundPoints('B', 'Y')).toBe(5)
        expect(getRoundPoints('C', 'Y')).toBe(6)
    })
    it('returns correct points for won rounds', () => {
        expect(getRoundPoints('A', 'Z')).toBe(8)
        expect(getRoundPoints('B', 'Z')).toBe(9)
        expect(getRoundPoints('C', 'Z')).toBe(7)
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
                ['B', 'X'],
                ['C', 'X'],
                ['A', 'Y'],
                ['B', 'Y'],
                ['C', 'Y'],
                ['A', 'Z'],
                ['B', 'Z'],
                ['C', 'Z'],
            ])
        ).toBe(45)
    })
    it('returns result for part two', () => {
        const partTwoResult = getStrategyPoints(dataSet)
        expect(partTwoResult).toBe(13509)
    })
})
