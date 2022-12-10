import { chunkArray, sum } from './utils'

describe('utils', () => {
    describe('sum', () => {
        it('returns 0 if the input is empty', () => {
            expect(sum([])).toBe(0)
        })

        it('returns the sum of the input', () => {
            expect(sum([1, 2, 3])).toBe(6)
        })
    })

    describe('chunkArray', () => {
        it('returns an array of arrays of passed in chunk size', () => {
            expect(
                chunkArray(['1', '2', '3', '4', '5', '6', '7', '8', '9'], 3)
            ).toEqual([
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
            ])
        })
        it('returns same array if chunk size is smaller or equal to 0', () => {
            expect(
                chunkArray(['1', '2', '3', '4', '5', '6', '7', '8', '9'], -2)
            ).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
        })
        it('returns same array one level nested if chunk size is bigger than array length', () => {
            expect(
                chunkArray(['1', '2', '3', '4', '5', '6', '7', '8', '9'], 10)
            ).toEqual([['1', '2', '3', '4', '5', '6', '7', '8', '9']])
        })
    })
})
