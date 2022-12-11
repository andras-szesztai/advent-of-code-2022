import { sum } from '../../utils/utils'

export const getRangeArray = (start: number, end: number): number[] => {
    const length = Math.abs(end - start) + 1
    return Array.from({ length }, (_, i) => start + (end - start > 0 ? i : -i))
}

const getCostToAlign = (fromPosition: number, toPosition: number) => {
    let number = 0
    for (let i = 0; i < Math.abs(fromPosition - toPosition); i++) {
        number = number + i + 1
    }
    return number
}

export const getLowestAlignCosts = (positions: number[]) => {
    const range = getRangeArray(Math.min(...positions), Math.max(...positions))
    const costsToAlign = range.map((position) => {
        return sum(
            positions.map((p) => {
                return getCostToAlign(p, position)
            })
        )
    })
    return Math.min(...costsToAlign)
}
