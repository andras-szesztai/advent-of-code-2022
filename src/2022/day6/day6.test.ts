import { findStartOfMarker, removeDuplicateFromCollector } from './day6'
import { dataStream } from './data'

describe('day6', () => {
    describe('removeDuplicateFromCollector', () => {
        it('removes only duplicate if it is at the beginning of the collector', () => {
            expect(removeDuplicateFromCollector(['a', 'b', 'c'], 'a')).toEqual([
                'b',
                'c',
            ])
        })
        it('removes duplicate from the middle and all the rest before it', () => {
            expect(removeDuplicateFromCollector(['a', 'b', 'c'], 'b')).toEqual([
                'c',
            ])
        })
        it('removes duplicate from the end and all the rest before it', () => {
            expect(removeDuplicateFromCollector(['a', 'b', 'c'], 'c')).toEqual(
                []
            )
        })
        it('returns the collector if there is no duplicate', () => {
            expect(removeDuplicateFromCollector(['a', 'b', 'c'], 'd')).toEqual([
                'a',
                'b',
                'c',
            ])
        })
        it('returns collector if char is not in collector', () => {
            expect(removeDuplicateFromCollector(['a', 'b', 'c'], 'd')).toEqual([
                'a',
                'b',
                'c',
            ])
        })
        it('returns empty array if collectors is empty', () => {
            expect(removeDuplicateFromCollector([], 'd')).toEqual([])
        })
    })
    describe('findStartOfMarker', () => {
        it('returns correct start of packet marker', () => {
            const streamOne = 'bvwbjplbgvbhsrlpgdmjqwftvncz'.split('')
            expect(findStartOfMarker(streamOne, 4)).toBe(5)
            expect(findStartOfMarker(streamOne, 14)).toBe(23)
            const streamTwo = 'nppdvjthqldpwncqszvftbrmjlhg'.split('')
            expect(findStartOfMarker(streamTwo, 4)).toBe(6)
            expect(findStartOfMarker(streamTwo, 14)).toBe(23)
            const streamThree = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'.split('')
            expect(findStartOfMarker(streamThree, 4)).toBe(10)
            expect(findStartOfMarker(streamThree, 14)).toBe(29)
            const streamFour = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'.split('')
            expect(findStartOfMarker(streamFour, 4)).toBe(11)
            expect(findStartOfMarker(streamFour, 14)).toBe(26)
        })
        it('returns 0 for empty stream and for stream without market', () => {
            expect(findStartOfMarker([], 50)).toBe(0)
            expect(findStartOfMarker('zcfzcfzcf'.split(''), 5)).toBe(0)
        })
        it('returns solution for part one and two', () => {
            const dataStreamArray = dataStream.split('')
            expect(findStartOfMarker(dataStreamArray, 4)).toBe(1538)
            expect(findStartOfMarker(dataStreamArray, 14)).toBe(2315)
        })
    })
})
