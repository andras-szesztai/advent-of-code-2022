import fs from 'fs'

import {
    createBinariesFromBitCount,
    getBitCount,
    getConsumption,
    pivotBinaries,
} from './day3'

const binaries = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2021/day3/data.txt',
        'utf8'
    )
    .split('\n')

describe('day 3 2021', () => {
    describe('getBitCount', () => {
        it('returns correct bit count', () => {
            expect(
                getBitCount([
                    '0',
                    '1',
                    '1',
                    '1',
                    '1',
                    '0',
                    '0',
                    '1',
                    '1',
                    '1',
                    '0',
                    '0',
                ])
            ).toEqual({
                '0': 5,
                '1': 7,
            })
        })
        it('returns empty object for empty bits array', () => {
            expect(getBitCount([])).toEqual({})
        })
    })

    describe('pivotBinaries', () => {
        it('returns correct pivoted bits', () => {
            const binaries = ['00100', '11110', '10110']
            expect(pivotBinaries(binaries)).toEqual([
                '011',
                '010',
                '111',
                '011',
                '000',
            ])
        })
        it('returns empty array for empty bits array', () => {
            expect(pivotBinaries([])).toEqual([])
        })
    })

    describe('createBinariesFromBitCount', () => {
        it('returns correct gamma bit', () => {
            const bitCounts = [
                { '0': 5, '1': 1 },
                { '0': 1, '1': 5 },
                { '0': 3, '1': 2 },
            ]
            expect(createBinariesFromBitCount(bitCounts)).toEqual([
                '101',
                '010',
            ])
        })
        it('returns empty array for empty bits array', () => {
            expect(createBinariesFromBitCount([])).toEqual(['', ''])
        })
    })

    describe('getConsumption', () => {
        it('returns correct consumption', () => {
            const array = [
                '00100',
                '11110',
                '10110',
                '10111',
                '10101',
                '01111',
                '00111',
                '11100',
                '10000',
                '11001',
                '00010',
                '01010',
            ]
            expect(getConsumption(array)).toEqual(198)
        })
        it('returns 0 for empty array', () => {
            expect(getConsumption([])).toEqual(0)
        })
        it('returns part one solution', () => {
            expect(getConsumption(binaries)).toEqual(1_307_354)
        })
    })
})
