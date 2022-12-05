import fs from 'fs'

import {
    countUnits,
    Direction,
    filterForDirection,
    getSimpleDepth,
    getPartOneResult,
    getRealDepth,
    Path,
    getPartTwoResult,
} from './day2'

const dataSet = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2021/day2/data.txt',
        'utf8'
    )
    .split('\n')
    .map((d) => {
        const data = d.split(' ')
        return { direction: data[0] as Direction, unit: parseInt(data[1]) }
    })

describe('day2', () => {
    describe('filterForDirection', () => {
        it('filters for a given direction', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'down', unit: 3 },
                { direction: 'up', unit: 2 },
                { direction: 'forward', unit: 5 },
            ]
            const result = filterForDirection('forward', path)
            expect(result).toEqual([
                { direction: 'forward', unit: 10 },
                { direction: 'forward', unit: 5 },
            ])
        })
        it('returns an empty array if no match', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'up', unit: 2 },
                { direction: 'forward', unit: 5 },
            ]
            const result = filterForDirection('down', path)
            expect(result).toEqual([])
        })
        it('returns an empty array if no path', () => {
            const result = filterForDirection('down', [])
            expect(result).toEqual([])
        })
    })

    describe('countUnits', () => {
        it('counts the units for a given direction', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'down', unit: 3 },
                { direction: 'up', unit: 2 },
                { direction: 'forward', unit: 5 },
            ]
            const result = countUnits('forward', path)
            expect(result).toEqual(15)
        })
        it('returns 0 if no match', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'up', unit: 2 },
                { direction: 'forward', unit: 5 },
            ]
            const result = countUnits('down', path)
            expect(result).toEqual(0)
        })
        it('returns 0 if no path', () => {
            const result = countUnits('down', [])
            expect(result).toEqual(0)
        })
    })

    describe('getSimpleDepth', () => {
        it('returns the depth', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'down', unit: 3 },
                { direction: 'up', unit: 1 },
                { direction: 'forward', unit: 5 },
            ]
            const result = getSimpleDepth(path)
            expect(result).toEqual(2)
        })
        it('returns 0 if no path', () => {
            const result = getSimpleDepth([])
            expect(result).toEqual(0)
        })
        it('returns 0 if no down and up', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'forward', unit: 5 },
            ]
            const result = getSimpleDepth(path)
            expect(result).toEqual(0)
        })
    })

    describe('getPartOneResult', () => {
        it('returns the result', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'down', unit: 3 },
                { direction: 'up', unit: 1 },
                { direction: 'forward', unit: 5 },
            ]
            const result = getPartOneResult(path)
            expect(result).toEqual(30)
        })
        it('returns part one solution', () => {
            const result = getPartOneResult(dataSet)
            expect(result).toEqual(1427868)
        })
    })

    describe('getRealDepth', () => {
        it('returns the real depth', () => {
            const firsPath: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'down', unit: 3 },
                { direction: 'up', unit: 1 },
            ]
            expect(getRealDepth(firsPath)).toEqual(0)
            const secondPath: Path = [
                ...firsPath,
                { direction: 'forward', unit: 5 },
            ]
            expect(getRealDepth(secondPath)).toEqual(10)
            const thirdPath: Path = [
                ...secondPath,
                { direction: 'forward', unit: 5 },
            ]
            expect(getRealDepth(thirdPath)).toEqual(20)
            const fourthPath: Path = [
                ...thirdPath,
                { direction: 'down', unit: 3 },
                { direction: 'forward', unit: 2 },
            ]
            expect(getRealDepth(fourthPath)).toEqual(30)
            const fifthPath: Path = [
                ...fourthPath,
                { direction: 'up', unit: 10 },
                { direction: 'forward', unit: 1 },
            ]
            expect(getRealDepth(fifthPath)).toEqual(25)
        })
        it('returns 0 if no path', () => {
            const result = getRealDepth([])
            expect(result).toEqual(0)
        })
        it('returns zero if realDepth would go minus', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'down', unit: 3 },
                { direction: 'up', unit: 5 },
                { direction: 'forward', unit: 5 },
            ]
            const result = getRealDepth(path)
            expect(result).toEqual(0)
        })
    })

    describe('getPartTwoResult', () => {
        it('returns the result', () => {
            const path: Path = [
                { direction: 'forward', unit: 10 },
                { direction: 'down', unit: 3 },
                { direction: 'up', unit: 1 },
                { direction: 'forward', unit: 5 },
            ]
            const result = getPartTwoResult(path)
            expect(result).toEqual(150)
        })
        it('returns 0 if no path', () => {
            const result = getPartTwoResult([])
            expect(result).toEqual(0)
        })
        it('returns part two solution', () => {
            const result = getPartTwoResult(dataSet)
            expect(result).toEqual(1_568_138_742)
        })
    })
})
