import fs from 'fs'

import {
    getVisibleTreesNumber,
    isTallestTree,
    splitTreesToBeforeAndAfter,
    manageColumnsCache,
    getHighestScenicScore,
    getSingleSideScenicScore,
} from './day8'

const forest = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day8/data.txt',
        'utf8'
    )
    .split('\n')
    .map((row) => row.split('').map((tree) => parseInt(tree)))

describe('day8', () => {
    describe('splitTreesToBeforeAndAfter', () => {
        it('splits the array at the given index', () => {
            expect(splitTreesToBeforeAndAfter([1, 2, 3, 4, 5], 2)).toEqual([
                [1, 2],
                [4, 5],
            ])
        })
        it('returns empty array if trees array is empty', () => {
            expect(splitTreesToBeforeAndAfter([], 2)).toEqual([[], []])
        })
        it('returns tuple of empty array and trees array if treeIndex is less than 0', () => {
            expect(splitTreesToBeforeAndAfter([1, 2, 3, 4, 5], -1)).toEqual([
                [],
                [1, 2, 3, 4, 5],
            ])
        })
        it('returns tuple of trees array and empty array if treeIndex is greater than trees array length', () => {
            expect(splitTreesToBeforeAndAfter([1, 2, 3, 4, 5], 5)).toEqual([
                [1, 2, 3, 4, 5],
                [],
            ])
        })
    })

    describe('isTallestTree', () => {
        it('returns true if the current tree is the tallest compared either to trees before or after', () => {
            expect(
                isTallestTree(
                    [
                        [1, 2],
                        [4, 5],
                    ],
                    3
                )
            ).toBe(true)
        })
        it('returns false if the current tree is not the tallest compared neither to trees before or after', () => {
            expect(
                isTallestTree(
                    [
                        [1, 2],
                        [4, 5],
                    ],
                    2
                )
            ).toBe(false)
        })
        it('returns true if the tree is either first or last', () => {
            expect(isTallestTree([[], [4, 5]], 4)).toBe(true)
            expect(isTallestTree([[1, 2], []], 2)).toBe(true)
        })
    })

    describe('manageColumnsCache', () => {
        it('updates the column cache if column has not been cached yet', () => {
            const columnCache = new Map<number, number[]>([[0, [1, 2, 3]]])
            const forest = [
                [1, 2, 3],
                [4, 5, 6],
            ]
            expect(manageColumnsCache(columnCache, 1, forest)).toEqual(
                new Map([
                    [0, [1, 2, 3]],
                    [1, [2, 5]],
                ])
            )
        })
        it('returns same column cache if the column is already cached', () => {
            const columnCache = new Map<number, number[]>([[0, [1, 2, 3]]])
            const forest = [
                [1, 2, 3],
                [4, 5, 6],
            ]
            expect(manageColumnsCache(columnCache, 0, forest)).toBe(columnCache)
        })
    })

    describe('getVisibleTrees', () => {
        it('returns the number of visible trees', () => {
            expect(
                getVisibleTreesNumber([
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ])
            ).toBe(21)
        })
        it('returns part one result', () => {
            expect(getVisibleTreesNumber(forest)).toBe(1_546)
        })
    })

    describe('getHighestScenicScore', () => {
        it('returns scenic scores for each tree', () => {
            expect(
                getHighestScenicScore([
                    [3, 0, 3, 7, 3],
                    [2, 5, 5, 1, 2],
                    [6, 5, 3, 3, 2],
                    [3, 3, 5, 4, 9],
                    [3, 5, 3, 9, 0],
                ])
            ).toEqual(8)
        })

        it('returns part two result', () => {
            expect(getHighestScenicScore(forest)).toBe(519_064)
        })
    })

    describe('getSingleSideScenicScore', () => {
        it('returns the correct scenic score for single side', () => {
            // For lowest
            expect(getSingleSideScenicScore([2, 5, 5, 1], 0)).toEqual(1)
            // For same as first
            expect(getSingleSideScenicScore([2, 5, 5, 1], 2)).toEqual(1)
            // For same as highest in array
            expect(getSingleSideScenicScore([2, 5, 5, 1], 5)).toEqual(2)
            // For higher than array trees
            expect(getSingleSideScenicScore([2, 5, 5, 1], 7)).toEqual(4)
        })
        it('returns 0 for empty trees array', () => {
            expect(getSingleSideScenicScore([], 7)).toEqual(0)
        })
    })
})
