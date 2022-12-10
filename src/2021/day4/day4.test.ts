import fs from 'fs'

import {
    getBingoBoard,
    getLastWinningBoardBingoScore,
    getUncheckedNumbers,
    getFirstWinningBoardBingoScore,
    isWinningBoard,
} from './day4'

const numbersToDraw = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2021/day4/bingoNumbers.txt',
        'utf8'
    )
    .split(',')
    .map((number) => parseInt(number, 10))

const boards = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2021/day4/bingoBoards.txt',
        'utf8'
    )
    .split('\n\n')
    .map((board) =>
        board.split('\n').map((row) =>
            row
                .split(' ')
                .filter((el) => el)
                .map((el) => +el)
        )
    )

describe('2021 day 4', () => {
    describe('getBingoBoard', () => {
        it('returns filterable bingo board data', () => {
            const data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]
            const expected = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [1, 4, 7],
                [2, 5, 8],
                [3, 6, 9],
            ]
            expect(getBingoBoard(data)).toEqual(expected)
        })
    })

    describe('isWinningBoard', () => {
        it('returns true if any row or column is a winning one', () => {
            expect(
                isWinningBoard(
                    [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                        [1, 4, 7],
                        [2, 5, 8],
                        [3, 6, 9],
                    ],
                    [1, 2, 3, 4, 5]
                )
            ).toBe(true)
            expect(
                isWinningBoard(
                    [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                        [1, 4, 7],
                        [2, 5, 8],
                        [3, 6, 9],
                    ],
                    [1, 2, 4, 5, 7]
                )
            ).toBe(true)
        })
        it('returns false if no row or column is a winning one', () => {
            expect(
                isWinningBoard(
                    [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                        [1, 4, 7],
                        [2, 5, 8],
                        [3, 6, 9],
                    ],
                    [1, 2, 4, 5, 9]
                )
            ).toBe(false)
        })
    })

    describe('getUncheckedNumbers', () => {
        it('returns unchecked numbers', () => {
            expect(
                getUncheckedNumbers(
                    [
                        [1, 2, 3],
                        [4, 5, 6],
                        [7, 8, 9],
                    ],
                    [1, 2, 4, 5, 3]
                )
            ).toEqual([6, 7, 8, 9])
        })
    })

    describe('getFirstWinningBoardBingoScore', () => {
        it('returns correct winning board score', () => {
            const testBoards = [
                [
                    [22, 13, 17, 11, 0],
                    [8, 2, 23, 4, 24],
                    [21, 9, 14, 16, 7],
                    [6, 10, 3, 18, 5],
                    [1, 12, 20, 15, 19],
                ],
                [
                    [3, 15, 0, 2, 22],
                    [9, 18, 13, 17, 5],
                    [19, 8, 7, 25, 23],
                    [20, 11, 10, 24, 4],
                    [14, 21, 16, 12, 6],
                ],
                [
                    [14, 21, 17, 24, 4],
                    [10, 16, 15, 9, 19],
                    [18, 8, 23, 26, 20],
                    [22, 11, 13, 6, 5],
                    [2, 0, 12, 3, 7],
                ],
            ]
            const testNumbersToDraw = [
                7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25,
                12, 22, 18, 20, 8, 19, 3, 26, 1,
            ]
            expect(
                getFirstWinningBoardBingoScore(testBoards, testNumbersToDraw)
            ).toBe(4512)
        })
        it('returns 0 if no board is a winning one', () => {
            const testBoards = [
                [
                    [22, 13, 17, 11, 0],
                    [8, 2, 23, 4, 24],
                    [21, 9, 14, 16, 7],
                    [6, 10, 3, 18, 5],
                    [1, 12, 20, 15, 19],
                ],
                [
                    [3, 15, 0, 2, 22],
                    [9, 18, 13, 17, 5],
                    [19, 8, 7, 25, 23],
                    [20, 11, 10, 24, 4],
                    [14, 21, 16, 12, 6],
                ],
                [
                    [14, 21, 17, 24, 4],
                    [10, 16, 15, 9, 19],
                    [18, 8, 23, 26, 20],
                    [22, 11, 13, 6, 5],
                    [2, 0, 12, 3, 7],
                ],
            ]
            const testNumbersToDraw = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21]
            expect(
                getFirstWinningBoardBingoScore(testBoards, testNumbersToDraw)
            ).toBe(0)
        })
        it('returns part one solution', () => {
            expect(getFirstWinningBoardBingoScore(boards, numbersToDraw)).toBe(
                51_034
            )
        })
    })

    describe('getLastWinningBoardBingoScore', () => {
        it('returns correct last winning board bingo score', () => {
            const testBoards = [
                [
                    [22, 13, 17, 11, 0],
                    [8, 2, 23, 4, 24],
                    [21, 9, 14, 16, 7],
                    [6, 10, 3, 18, 5],
                    [1, 12, 20, 15, 19],
                ],
                [
                    [3, 15, 0, 2, 22],
                    [9, 18, 13, 17, 5],
                    [19, 8, 7, 25, 23],
                    [20, 11, 10, 24, 4],
                    [14, 21, 16, 12, 6],
                ],
                [
                    [14, 21, 17, 24, 4],
                    [10, 16, 15, 9, 19],
                    [18, 8, 23, 26, 20],
                    [22, 11, 13, 6, 5],
                    [2, 0, 12, 3, 7],
                ],
            ]
            const testNumbersToDraw = [
                7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25,
                12, 22, 18, 20, 8, 19, 3, 26, 1,
            ]
            expect(
                getLastWinningBoardBingoScore(testBoards, testNumbersToDraw)
            ).toBe(1_924)
        })
        it('returns 0 if no board is a winning one', () => {
            const testBoards = [
                [
                    [22, 13, 17, 11, 0],
                    [8, 2, 23, 4, 24],
                    [21, 9, 14, 16, 7],
                    [6, 10, 3, 18, 5],
                    [1, 12, 20, 15, 19],
                ],
                [
                    [3, 15, 0, 2, 22],
                    [9, 18, 13, 17, 5],
                    [19, 8, 7, 25, 23],
                    [20, 11, 10, 24, 4],
                    [14, 21, 16, 12, 6],
                ],
                [
                    [14, 21, 17, 24, 4],
                    [10, 16, 15, 9, 19],
                    [18, 8, 23, 26, 20],
                    [22, 11, 13, 6, 5],
                    [2, 0, 12, 3, 7],
                ],
            ]
            const testNumbersToDraw = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21]
            expect(
                getLastWinningBoardBingoScore(testBoards, testNumbersToDraw)
            ).toBe(0)
        })
        it('returns part two solution', () => {
            expect(getLastWinningBoardBingoScore(boards, numbersToDraw)).toBe(
                5_434
            )
        })
    })
})
