import { chunkArray, sum } from '../../utils/utils'

type Instruction = 'addx' | 'noop'
export type ProgramStep = [instruction: Instruction, valueChange: number]

export const parseInstruction = (
    instruction: Instruction,
    valueChange: number
) => {
    const parsedInstructions = [0]
    if (instruction === 'addx') {
        parsedInstructions.push(valueChange)
    }
    return parsedInstructions
}

export const getPerCycleSignalStrength = (program: ProgramStep[]) => {
    const perCycleSignalStrength = new Map<number, number>([[1, 1]])
    let currentCycle = 0
    program.forEach(([instruction, valueChange]) => {
        const cycles = parseInstruction(instruction, valueChange)
        cycles.forEach((change) => {
            currentCycle++
            perCycleSignalStrength.set(
                currentCycle + 1,
                perCycleSignalStrength.get(currentCycle)! + change
            )
        })
    })
    return perCycleSignalStrength
}

export const getSignalStrengthsForSpecificCycles = (
    program: ProgramStep[],
    cycles: number[]
) => {
    const perCycleSignalStrength = getPerCycleSignalStrength(program)
    return cycles
        .map((cycle) => {
            const signalStrength = perCycleSignalStrength.get(cycle)
            return signalStrength ? cycle * signalStrength : null
        })
        .filter((signalStrength) => signalStrength !== null) as number[]
}

export const getSignalStrengthSum = (
    program: ProgramStep[],
    cycles: number[]
) => {
    const signalStrengthForSpecificCycles = getSignalStrengthsForSpecificCycles(
        program,
        cycles
    )
    return sum(signalStrengthForSpecificCycles)
}

export const drawPixel = (cycle: number, signalStrength: number) => {
    if (Math.abs((cycle % 40) - signalStrength) <= 1) {
        return '#'
    }
    return '.'
}

export const getCrtDrawing = (program: ProgramStep[]) => {
    const perCycleSignalStrength = getPerCycleSignalStrength(program)
    const drawingArray: string[] = []
    perCycleSignalStrength.forEach((signalStrength, cycle) => {
        drawingArray.push(drawPixel(cycle - 1, signalStrength))
    })
    const chunkedDrawingArray = chunkArray(drawingArray, 40).slice(0, -1) // remove last cycle pixel
    return chunkedDrawingArray.map((row) =>
        Array.isArray(row) ? row.join('') : row
    )
}
