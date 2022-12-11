import { monkeys, testMonkeys } from './data'

import {
    getLevelOfMonkeyBusinessPartOne,
    getLevelOfMonkeyBusinessPartTwo,
} from './day11'

describe('2022 day 11', () => {
    describe('getLevelOfMonkeyBusinessPartOne', () => {
        it('returns correct value for test data', () => {
            const result = getLevelOfMonkeyBusinessPartOne(testMonkeys)
            expect(result).toBe(1_0605)
        })
        it('returns solution for part one', () => {
            const result = getLevelOfMonkeyBusinessPartOne(monkeys)
            expect(result).toBe(98_280)
        })
    })

    describe('getLevelOfMonkeyBusinessPartTwo', () => {
        it('returns correct value for test data', () => {
            const result = getLevelOfMonkeyBusinessPartTwo(testMonkeys)
            expect(result).toBe(2_713_310_158)
        })
        it('returns solution for part one', () => {
            const result = getLevelOfMonkeyBusinessPartTwo(monkeys)
            expect(result).toBe(17_673_687_232)
        })
    })
})
