import { pivotData, sum } from '../../utils/utils'

export const getBingoBoard = (board: number[][]) => {
    return [...board, ...pivotData(board)]
}

export const isWinningBoard = (board: number[][], drawnNumbers: number[]) => {
    return board.some((row) => {
        return row.every((el) => drawnNumbers.includes(el))
    })
}

export const getUncheckedNumbers = (
    board: number[][],
    drawnNumbers: number[]
) => {
    const allNumbers = [...new Set(board.flat())]
    return allNumbers.filter((number) => !drawnNumbers.includes(number))
}

const getBingoScore = (board: number[][], drawnNumbers: number[]) => {
    return (
        sum(getUncheckedNumbers(board, drawnNumbers)) *
        drawnNumbers[drawnNumbers.length - 1]
    )
}

const getUpdatedBoardArrays = (
    checkableBoards: number[][][],
    winningBoards: number[][][],
    drawnNumbers: number[]
) => {
    const roundWinningBoards: number[][][] = []
    const newCheckableBoards = checkableBoards.filter((board) => {
        const isWinning = isWinningBoard(board, drawnNumbers)
        if (isWinning) {
            roundWinningBoards.push(board)
        }
        return !isWinning
    })
    return [newCheckableBoards, [...winningBoards, ...roundWinningBoards]]
}

export const getWinningBoardBingoScore = (
    boards: number[][][],
    numbersToDraw: number[],
    exitEvery: (
        winningBoards: number[][][],
        checkableBoards: number[][][]
    ) => boolean,
    winningBoardIndex: (winningBoardsLength: number) => number
) => {
    let checkableBoards = boards.map(getBingoBoard)
    let winningBoards: number[][][] = []
    const drawnNumbers: number[] = []
    numbersToDraw.every((number) => {
        drawnNumbers.push(number)
        const [newCheckableBoards, newWinningBoards] = getUpdatedBoardArrays(
            checkableBoards,
            winningBoards,
            drawnNumbers
        )
        checkableBoards = newCheckableBoards
        winningBoards = newWinningBoards
        return exitEvery(winningBoards, checkableBoards)
    })
    if (winningBoards.length === 0) {
        return 0
    }
    return getBingoScore(
        winningBoards[winningBoardIndex(winningBoards.length)],
        drawnNumbers
    )
}

export const getFirstWinningBoardBingoScore = (
    boards: number[][][],
    numbersToDraw: number[]
) => {
    return getWinningBoardBingoScore(
        boards,
        numbersToDraw,
        (winningBoards: number[][][]) => {
            return winningBoards.length === 0
        },
        () => 0
    )
}

export const getLastWinningBoardBingoScore = (
    boards: number[][][],
    numbersToDraw: number[]
) => {
    return getWinningBoardBingoScore(
        boards,
        numbersToDraw,
        (_winningBoards, checkableBoards) => {
            return checkableBoards.length > 0
        },
        (winningBoardsLength) => winningBoardsLength - 1
    )
}
