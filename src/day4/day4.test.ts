import fs from 'fs'

import {
    DataSetType,
    getPartOneSolution,
    getPartTwoSolution,
    isSectionsOverlap,
    isWiderSectionsIncludesNarrower,
    sortSectionsByRange,
} from './day4'

const dataSet = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/day4/data.txt',
        'utf8'
    )
    .split('\n')
    .map((d) =>
        d.split(',').map((n) => n.split('-').map((n) => parseInt(n, 10)))
    ) as DataSetType

describe('day4', () => {
    describe('sortSectionsByRange', () => {
        it('returns sections sorted by their range descending', () => {
            const sections: [number, number][] = [
                [1, 3],
                [0, 2],
                [4, 8],
                [9, 10],
            ]
            const sortedSections = sortSectionsByRange(sections)
            expect(sortedSections).toEqual([
                [4, 8],
                [1, 3],
                [0, 2],
                [9, 10],
            ])
        })
        it('returns same array if ranges are equal', () => {
            const sections: [number, number][] = [
                [1, 3],
                [0, 2],
                [6, 8],
                [8, 10],
            ]
            const sortedSections = sortSectionsByRange(sections)
            expect(sortedSections).toEqual(sections)
        })
    })

    describe('isWiderSectionsIncludesNarrower', () => {
        it('returns true if wider section includes narrower section', () => {
            const wider: [number, number] = [0, 10]
            const narrower: [number, number] = [2, 5]
            expect(isWiderSectionsIncludesNarrower(wider, narrower)).toBe(true)
        })
        it('returns false if wider section does not include narrower section', () => {
            const widerOne: [number, number] = [0, 10]
            const narrowerOne: [number, number] = [11, 15]
            expect(isWiderSectionsIncludesNarrower(widerOne, narrowerOne)).toBe(
                false
            )
            const widerTwo: [number, number] = [0, 12]
            const narrowerTwo: [number, number] = [11, 15]
            expect(isWiderSectionsIncludesNarrower(widerTwo, narrowerTwo)).toBe(
                false
            )
        })
        it('returns true if sections are equal', () => {
            const section: [number, number] = [0, 10]
            expect(isWiderSectionsIncludesNarrower(section, section)).toBe(true)
        })
    })

    describe('getPartOneSolution', () => {
        it('returns number of completely overlapping sections', () => {
            const sections: DataSetType = [
                [
                    [0, 5],
                    [1, 3],
                ],
                [
                    [3, 10],
                    [7, 12],
                ],
                [
                    [2, 5],
                    [12, 18],
                ],
            ]
            expect(getPartOneSolution(sections)).toBe(1)
        })
        it('returns part one solution', () => {
            expect(getPartOneSolution(dataSet)).toBe(530)
        })
    })

    describe('isSectionsOverlap', () => {
        it('returns true if sections overlap', () => {
            const widerOne: [number, number] = [0, 10]
            const narrowerOne: [number, number] = [2, 5]
            expect(isSectionsOverlap(widerOne, narrowerOne)).toBe(true)
            const widerTwo: [number, number] = [0, 10]
            const narrowerTwo: [number, number] = [10, 15]
            expect(isSectionsOverlap(widerTwo, narrowerTwo)).toBe(true)
        })
        it('returns false if sections do not overlap', () => {
            const widerOne: [number, number] = [2, 5]
            const narrowerOne: [number, number] = [12, 18]
            expect(isSectionsOverlap(widerOne, narrowerOne)).toBe(false)
            const widerTwo: [number, number] = [0, 10]
            const narrowerTwo: [number, number] = [12, 15]
            expect(isSectionsOverlap(widerTwo, narrowerTwo)).toBe(false)
        })
    })

    describe('getPartTwoSolution', () => {
        it('returns the number of overlapping sections', () => {
            const sections: DataSetType = [
                [
                    [0, 5],
                    [1, 3],
                ],
                [
                    [3, 10],
                    [7, 12],
                ],
                [
                    [2, 5],
                    [12, 18],
                ],
            ]
            expect(getPartTwoSolution(sections)).toBe(2)
        })
        it('returns part two solution', () => {
            expect(getPartTwoSolution(dataSet)).toBe(903)
        })
    })
})
