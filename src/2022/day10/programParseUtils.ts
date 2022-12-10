import { ProgramStep } from './day10'

export const parseProgramSteps = (unparsedProgram: string[]): ProgramStep[] => {
    return unparsedProgram.map((d) => {
        const instructionElements = d.split(' ')
        return [
            instructionElements[0],
            instructionElements[1] ? +instructionElements[1] : 0,
        ]
    }) as ProgramStep[]
}
