import fs from 'fs'

import { analyzePackets, getOrderedPacketIndicesSum, Packet } from './day13'

const testPackets = [
    [
        [1, 1, 3, 1, 1],
        [1, 1, 5, 1, 1],
    ],
    [
        [[1], [2, 3, 4]],
        [[1], 4],
    ],
    [[9], [[8, 7, 6]]],
    [
        [[4, 4], 4, 4],
        [[4, 4], 4, 4, 4],
    ],
    [
        [7, 7, 7, 7],
        [7, 7, 7],
    ],
    [[], [3]],
    [[[[]]], [[]]],
    [
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
    ],
] as [Packet[], Packet[]][]

const inputData = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day13/data.txt',
        'utf8'
    )
    .split('\n\n')
    .map((pairs) => pairs.split('\n').map((packet) => JSON.parse(packet))) as [
    Packet[],
    Packet[]
][]

describe('day 13', () => {
    describe('analyzePackets', () => {
        it('returns true if packets are ordered', () => {
            expect(analyzePackets([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toBe(true)
            expect(analyzePackets([[1], [2, 3, 4]], [[1], 4])).toBe(true)
            expect(analyzePackets([[1], [2, 3, 4]], [[1], 4])).toBe(true)
            expect(analyzePackets([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toBe(true)
            expect(analyzePackets([], [3])).toBe(true)
        })
        it('returns false if packets are not ordered', () => {
            expect(analyzePackets([9], [[8, 7, 6]])).toBe(false)
            expect(analyzePackets([7, 7, 7, 7], [7, 7, 7])).toBe(false)
            expect(analyzePackets([[[]]], [[]])).toBe(false)
            expect(
                analyzePackets(
                    [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
                    [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
                )
            ).toBe(false)
        })
    })

    describe('getOrderedPacketIndicesSum', () => {
        it('returns unordered packet pair indices', () => {
            expect(getOrderedPacketIndicesSum(testPackets)).toEqual(13)
        })
        it('returns solution for part one', () => {
            expect(getOrderedPacketIndicesSum(inputData)).toEqual(5555)
        })
    })
})
