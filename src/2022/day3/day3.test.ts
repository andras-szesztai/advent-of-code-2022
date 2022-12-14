import fs from 'fs'

import {
    getAllDuplicatesInDataSet,
    getCharacterScore,
    getCharacterScoresSum,
    getUniqueDuplicates,
    isDuplicateCharacter,
    splitStringHalf,
    getPartOneResult,
    getUniqSharedCharacter,
    getPartTwoResult,
} from './day3'

const dataSet = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day3/data.txt',
        'utf8'
    )
    .split('\n')

describe('Day 3', () => {
    describe('splitStringHalf', () => {
        it('splits a string in half', () => {
            expect(splitStringHalf('hello')).toEqual(['hel', 'lo'])
            expect(splitStringHalf('helloworld')).toEqual(['hello', 'world'])
            expect(splitStringHalf('')).toEqual(['', ''])
        })
    })

    describe('isDuplicateCharacter', () => {
        it('returns true if a character is duplicated in a string', () => {
            expect(isDuplicateCharacter('e', 'hello')).toBe(true)
            expect(isDuplicateCharacter('', 'hello')).toBe(false)
            expect(isDuplicateCharacter('a', 'hello')).toBe(false)
            expect(isDuplicateCharacter('a', '')).toBe(false)
        })
    })

    describe('getUniqueDuplicates', () => {
        it('returns an array of duplicates', () => {
            const strings = splitStringHalf('helloworld')
            expect(getUniqueDuplicates(strings[0], strings[1])).toEqual([
                'l',
                'o',
            ])
        })
    })

    describe('getAllDuplicatesInDataSet', () => {
        it('returns an array of arrays of duplicates', () => {
            const testData = [
                'WVHGHwddqSsNjsjwqVvdwZRCbcJcZTCcsZbLcJJsCZ',
                'hngprFFhFDFhrDpzzQDhtnBJJRJZbZvTcvbfRCJfBRcBJl',
                'DmptngtFwvvMmwmm',
            ]
            const result = getAllDuplicatesInDataSet(testData)
            expect(result).toEqual(['s', 'B', 'm'])
        })
    })

    describe('getCharacterScore', () => {
        it('returns the score of a character present in English alphabet', () => {
            expect(getCharacterScore('p')).toBe(16)
            expect(getCharacterScore('L')).toBe(38)
            expect(getCharacterScore('P')).toBe(42)
            expect(getCharacterScore('v')).toBe(22)
            expect(getCharacterScore('t')).toBe(20)
            expect(getCharacterScore('s')).toBe(19)
        })
        it('returns 0 if the character is not present in English alphabet', () => {
            expect(getCharacterScore('1')).toBe(0)
            expect(getCharacterScore('!')).toBe(0)
            expect(getCharacterScore('')).toBe(0)
        })
        it('returns 0 if the character is more than one character long', () => {
            expect(getCharacterScore('ab')).toBe(0)
        })
    })

    describe('getCharacterScoresSum', () => {
        it('returns the sum of the characters in a string', () => {
            expect(getCharacterScoresSum(['h', 'e', 'l', 'l', 'o'])).toBe(52)
        })
        it('returns 0 if the string is empty', () => {
            expect(getCharacterScoresSum([''])).toBe(0)
        })
    })

    describe('getPartOneResult', () => {
        it('returns the correct result', () => {
            const result = getPartOneResult(dataSet)
            expect(result).toBe(7763)
        })
    })

    describe('getUniqSharedCharacter', () => {
        it('returns the unique shared character between strings', () => {
            const strings = [
                'vJrwpWtwJgWrhcsFMMfFFhFp',
                'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
                'PmmdzqPrVvPwwTWBwg',
            ]
            const sharedUniq = getUniqSharedCharacter(strings)
            expect(sharedUniq).toBe('r')
        })
        it('returns zero if length of strings is zero', () => {
            expect(getUniqSharedCharacter([])).toBe('')
        })
    })

    describe('getPartTwoResult', () => {
        it('returns the correct result', () => {
            const result = getPartTwoResult(dataSet)
            expect(result).toBe(2569)
        })
    })
})
