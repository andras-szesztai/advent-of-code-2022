import fs from 'fs'

import {
    drawPixel,
    getCrtDrawing,
    getPerCycleSignalStrength,
    getSignalStrengthsForSpecificCycles,
    getSignalStrengthSum,
    parseInstruction,
    ProgramStep,
} from './day10'
import { parseProgramSteps } from './programParseUtils'

const testProgramOne = parseProgramSteps(
    fs
        .readFileSync(
            '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day10/programOne.txt',
            'utf8'
        )
        .split('\n')
)

const testProgramTwo = parseProgramSteps(
    fs
        .readFileSync(
            '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day10/programTwo.txt',
            'utf8'
        )
        .split('\n')
)

describe('day10', () => {
    describe('parseInstruction', () => {
        it('should return the correctly parsed instruction', () => {
            expect(parseInstruction('addx', 3)).toEqual([0, 3])
            expect(parseInstruction('addx', -2)).toEqual([0, -2])
            expect(parseInstruction('noop', 0)).toEqual([0])
        })
    })

    describe('getPerCycleSignalStrength', () => {
        it('returns correct signal strength per each cycle', () => {
            const smallTestProgram = [
                ['noop', 0],
                ['addx', 3],
                ['addx', -5],
            ] as ProgramStep[]
            expect(getPerCycleSignalStrength(smallTestProgram)).toEqual(
                new Map([
                    [1, 1],
                    [2, 1],
                    [3, 1],
                    [4, 4],
                    [5, 4],
                    [6, -1],
                ])
            )
            const result = getPerCycleSignalStrength(testProgramOne)
            expect(result.get(20)).toBe(21)
            expect(result.get(60)).toBe(19)
            expect(result.get(100)).toBe(18)
            expect(result.get(140)).toBe(21)
            expect(result.get(180)).toBe(16)
            expect(result.get(220)).toBe(18)
        })
    })

    describe('getSignalStrengthsForSpecificCycles', () => {
        it('returns correct signal strength array for specific cycles', () => {
            const result = getSignalStrengthsForSpecificCycles(
                testProgramOne,
                [20, 60, 100, 140, 180, 220]
            )
            expect(result).toEqual([420, 1140, 1800, 2940, 2880, 3960])
        })
        it('returns signal strength only for existing cycles', () => {
            const result = getSignalStrengthsForSpecificCycles(
                testProgramOne,
                [20, 60, 400]
            )
            expect(result).toEqual([420, 1140])
        })
    })

    describe('getSignalStrengthSum', () => {
        it('returns correct signal strength sum for specific cycles', () => {
            const result = getSignalStrengthSum(
                testProgramOne,
                [20, 60, 100, 140, 180, 220]
            )
            expect(result).toEqual(13_140)
        })
        it('returns part one solution', () => {
            const result = getSignalStrengthSum(
                testProgramTwo,
                [20, 60, 100, 140, 180, 220]
            )
            expect(result).toEqual(12_740)
        })
    })

    describe('drawPixel', () => {
        it('draws pixel to correct positions', () => {
            expect(drawPixel(1, 1)).toBe('#')
            expect(drawPixel(4, 16)).toBe('.')
            expect(drawPixel(39, 1)).toBe('.')
            expect(drawPixel(40, 1)).toBe('#')
        })
    })

    describe('getCrtDrawing', () => {
        it('returns correct crt drawing', () => {
            const result = getCrtDrawing(testProgramOne)
            expect(result).toEqual([
                '##..##..##..##..##..##..##..##..##..##..',
                '###...###...###...###...###...###...###.',
                '####....####....####....####....####....',
                '#####.....#####.....#####.....#####.....',
                '######......######......######......####',
                '#######.......#######.......#######.....',
            ])
        })
        it('returns part two solution', () => {
            const result = getCrtDrawing(testProgramTwo)
            expect(result).toEqual([
                '###..###..###...##..###...##...##..####.',
                '#..#.#..#.#..#.#..#.#..#.#..#.#..#.#....',
                '#..#.###..#..#.#..#.#..#.#..#.#....###..',
                '###..#..#.###..####.###..####.#.##.#....',
                '#.#..#..#.#....#..#.#.#..#..#.#..#.#....',
                '#..#.###..#....#..#.#..#.#..#..###.#....',
            ])
        })
    })
})
