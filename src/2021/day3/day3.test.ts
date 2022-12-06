import fs from 'fs'

import {
    createBinariesFromBitCount,
    filterBinariesByBit,
    getBitCount,
    getConsumption,
    getGeneratorRating,
    getLifeSupportRating,
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

    describe('filterBinariesByBit', () => {
        it('returns correct filtered binaries', () => {
            const binaries = [
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
                '00011',
                '01010',
            ]
            expect(filterBinariesByBit(binaries, 0, 'moreCommon')).toEqual([
                '11110',
                '10110',
                '10111',
                '10101',
                '11100',
                '10000',
                '11001',
            ])
            expect(filterBinariesByBit(binaries, 0, 'lessCommon')).toEqual([
                '00100',
                '01111',
                '00111',
                '00011',
                '01010',
            ])
            expect(filterBinariesByBit(binaries, 1, 'lessCommon')).toEqual([
                '11110',
                '01111',
                '11100',
                '11001',
                '01010',
            ])
            expect(filterBinariesByBit(binaries, 1, 'moreCommon')).toEqual([
                '00100',
                '10110',
                '10111',
                '10101',
                '00111',
                '10000',
                '00011',
            ])
            expect(filterBinariesByBit(binaries, 4, 'moreCommon')).toEqual([
                '10111',
                '10101',
                '01111',
                '00111',
                '11001',
                '00011',
            ])
            expect(filterBinariesByBit(binaries, 4, 'lessCommon')).toEqual([
                '00100',
                '11110',
                '10110',
                '11100',
                '10000',
                '01010',
            ])
        })
        it('returns empty array for empty array', () => {
            expect(filterBinariesByBit([], 0, 'moreCommon')).toEqual([])
        })
        it('returns empty array if currentBitIndex does not exist', () => {
            expect(
                filterBinariesByBit(['00100', '11110'], 10, 'lessCommon')
            ).toEqual([])
        })
    })

    describe('getGeneratorRating', () => {
        it('returns correct generator rating', () => {
            const binaries = [
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
                '00011',
                '01010',
            ]
            expect(getGeneratorRating(binaries, 'moreCommon')).toEqual('10111')
            expect(getGeneratorRating(binaries, 'lessCommon')).toEqual('01010')
        })
        it('returns empty string for empty array', () => {
            expect(getGeneratorRating([], 'moreCommon')).toEqual('')
        })
    })

    describe('getLifeSupportRating', () => {
        it('returns correct life support rating', () => {
            const binaries = [
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
                '00011',
                '01010',
            ]
            expect(getLifeSupportRating(binaries)).toEqual(230)
        })

        it('returns solution for part two', () => {
            expect(getLifeSupportRating(binaries)).toEqual(482_500)
        })
    })
})
