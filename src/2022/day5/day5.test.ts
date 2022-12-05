import fs from 'fs'

import { stacks, Stacks } from './data'
import {
    getLastCratesFromEachStack,
    getCratesToKeep,
    getCratesToMove,
    getResult,
    parseProcedureText,
    reverseCratesOrder,
    updateStacks,
    splitStack,
} from './day5'

const dataSet = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day5/data.txt',
        'utf8'
    )
    .split('\n')

describe('Day 5', () => {
    describe('getCratesToMove', () => {
        it('returns the first n crates to move', () => {
            const stack = ['R', 'G', 'J', 'B', 'T', 'V', 'Z']
            const n = 3
            const expected = ['T', 'V', 'Z']
            const actual = getCratesToMove(stack, n)
            expect(actual).toEqual(expected)
        })
        it('returns same array if n is greater than array length', () => {
            const stack = ['R', 'G', 'J']
            const n = 4
            const actual = getCratesToMove(stack, n)
            expect(actual).toEqual(stack)
        })
        it('returns empty array if n is 0', () => {
            const stack = ['R', 'G', 'J']
            const n = 0
            const actual = getCratesToMove(stack, n)
            expect(actual).toEqual([])
        })
    })

    describe('getCratesToKeep', () => {
        it('returns the last n crates to keep', () => {
            const stack = ['R', 'G', 'J', 'B', 'T', 'V', 'Z']
            const n = 3
            const expected = ['R', 'G', 'J', 'B']
            const actual = getCratesToKeep(stack, n)
            expect(actual).toEqual(expected)
        })
    })

    describe('reverseCratesOrder', () => {
        it('returns the crates in reverse order', () => {
            const crates = ['R', 'G', 'J', 'B', 'T', 'V', 'Z']
            const expected = ['Z', 'V', 'T', 'B', 'J', 'G', 'R']
            const actual = reverseCratesOrder(crates)
            expect(actual).toEqual(expected)
        })

        it('returns same array if crates is empty', () => {
            const crates: string[] = []
            expect(reverseCratesOrder(crates)).toEqual(crates)
        })
    })

    describe('splitStack', () => {
        it('returns crates to move and crates to keep', () => {
            const crates = ['R', 'G', 'J', 'B', 'T', 'V', 'Z']
            const expected = [
                ['T', 'V', 'Z'],
                ['R', 'G', 'J', 'B'],
            ]
            expect(splitStack(crates, 3)).toEqual(expected)
        })
        it('returns empty array for crates to keep of n is greater than crates length', () => {
            const crates = ['R', 'G', 'J']
            expect(splitStack(crates, 4)).toEqual([crates, []])
        })
        it('returns empty arrays for crates to move if crates length is 0', () => {
            expect(splitStack([], 3)).toEqual([[], []])
        })
    })

    describe('updateStacks', () => {
        it('returns correctly updated stack based on input with movedIsReversed true', () => {
            const startStacks: Stacks = {
                1: ['R', 'G', 'J', 'B', 'T', 'V', 'Z'],
                2: ['J', 'R', 'V', 'L'],
                3: ['S', 'Q', 'F'],
            }
            const from = 1
            const to = 2
            const numberOfCrates = 3
            const updatedStacks = {
                1: ['R', 'G', 'J', 'B'],
                2: ['J', 'R', 'V', 'L', 'Z', 'V', 'T'],
                3: ['S', 'Q', 'F'],
            }
            const actual = updateStacks(
                startStacks,
                from,
                to,
                numberOfCrates,
                true
            )
            expect(actual).toEqual(updatedStacks)
        })

        it('returns correctly updated stack based on input with movedIsReversed false', () => {
            const startStacks: Stacks = {
                1: ['R', 'G', 'J', 'B', 'T', 'V', 'Z'],
                2: ['J', 'R', 'V', 'L'],
                3: ['S', 'Q', 'F'],
            }
            const from = 1
            const to = 2
            const numberOfCrates = 3
            const updatedStacks = {
                1: ['R', 'G', 'J', 'B'],
                2: ['J', 'R', 'V', 'L', 'T', 'V', 'Z'],
                3: ['S', 'Q', 'F'],
            }
            const actual = updateStacks(startStacks, from, to, numberOfCrates)
            expect(actual).toEqual(updatedStacks)
        })

        it("returns same stacks object if empty, from or to keys don't exist or numberOfCrates is not valid", () => {
            const emptyStacks: Stacks = {}
            expect(updateStacks(emptyStacks, 1, 2, 3)).toEqual(emptyStacks)
            const stacks: Stacks = {
                1: ['R', 'G', 'J', 'B', 'T', 'V', 'Z'],
                2: ['J', 'R', 'V', 'L'],
            }
            expect(updateStacks(stacks, -1, 2, 3)).toEqual(stacks)
            expect(updateStacks(stacks, 1, 22, 3)).toEqual(stacks)
            expect(updateStacks(stacks, 1, 2, -2)).toEqual(stacks)
        })
    })

    describe('parseProcedureText', () => {
        it('returns correctly parsed text', () => {
            const text = 'move 1 from 2 to 1'
            const expected = {
                numberOfCrates: 1,
                from: 2,
                to: 1,
            }
            const actual = parseProcedureText(text)
            expect(actual).toEqual(expected)
        })
    })

    describe('getLastCratesFromEachStack', () => {
        it('returns last crates from each stack', () => {
            const stacks: Stacks = {
                1: ['R', 'G', 'J', 'B', 'T', 'V', 'Z'],
                2: ['J', 'R', 'V', 'L'],
                3: ['S', 'Q', 'F'],
            }
            const expected = ['Z', 'L', 'F']
            const actual = getLastCratesFromEachStack(stacks)
            expect(actual).toEqual(expected)
        })
        it('returns empty array if stacks is empty', () => {
            const stacks: Stacks = {}
            const actual = getLastCratesFromEachStack(stacks)
            expect(actual).toEqual([])
        })
    })

    describe('getResult', () => {
        it('returns correctly updated stack based on steps when movedIsReversed parameter is true', () => {
            const startStacks: Stacks = {
                1: ['R', 'G', 'J', 'B', 'T', 'V', 'Z'],
                2: ['J', 'R', 'V', 'L'],
                3: ['S', 'Q', 'F'],
            }
            const steps = [
                'move 3 from 1 to 2',
                'move 2 from 3 to 2',
                'move 4 from 2 to 1',
            ]
            const actual = getResult(startStacks, steps, true)
            expect(actual).toEqual('VZS')
        })

        it('returns correctly updated stack based on steps when movedIsReversed parameter is true', () => {
            const startStacks: Stacks = {
                1: ['R', 'G', 'J', 'B', 'T', 'V', 'Z'],
                2: ['J', 'R', 'V', 'L'],
                3: ['S', 'Q', 'F'],
            }
            const steps = [
                'move 3 from 1 to 2',
                'move 2 from 3 to 2',
                'move 4 from 2 to 1',
            ]
            const actual = getResult(startStacks, steps)
            expect(actual).toEqual('FTS')
        })

        it('returns solution for part one', () => {
            const result = getResult(stacks, dataSet, true)
            expect(result).toBe('ZSQVCCJLL')
        })

        it('returns solution for part two', () => {
            const result = getResult(stacks, dataSet)
            expect(result).toBe('QZFJRWHGS')
        })
    })
})
