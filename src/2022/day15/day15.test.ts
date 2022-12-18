import { data } from './data'

import {
    DataPoint,
    filterSensorsByRowReached,
    getBeaconXYRange,
    getDistanceBetweenPoints,
    getDistanceFromYRangePeakToRow,
    getNotFullyCoveredRowIndex,
    getNumberOfPointsCoveredInRow,
    getNumberOPointsCoveredInRow,
    getRangeEnrichedData,
    getSensorReachInRow,
    Point,
    RangeEnrichedDataPoint,
} from './day15'

const testData = [
    { sensor: [2, 18], beacon: [-2, 15] },
    { sensor: [9, 16], beacon: [10, 16] },
    { sensor: [13, 2], beacon: [15, 3] },
    { sensor: [12, 14], beacon: [10, 16] },
    { sensor: [10, 20], beacon: [10, 16] },
    { sensor: [14, 17], beacon: [10, 16] },
    { sensor: [8, 7], beacon: [2, 10] },
    { sensor: [2, 0], beacon: [2, 10] },
    { sensor: [0, 11], beacon: [2, 10] },
    { sensor: [20, 14], beacon: [25, 17] },
    { sensor: [17, 20], beacon: [21, 22] },
    { sensor: [16, 7], beacon: [15, 3] },
    { sensor: [14, 3], beacon: [15, 3] },
    { sensor: [20, 1], beacon: [15, 3] },
] as DataPoint[]

describe('2022 day 15', () => {
    describe('getDistanceBetweenPoints', () => {
        it('returns the correct distance between points', () => {
            expect(getDistanceBetweenPoints([0, 0], [0, 0])).toEqual(0)
            expect(getDistanceBetweenPoints([2, 18], [-2, 15])).toEqual(7)
            expect(getDistanceBetweenPoints([8, 7], [2, 10])).toEqual(9)
        })
    })

    describe('getBeaconXYRange', () => {
        it('returns the correct x and y ranges for a beacon', () => {
            expect(getBeaconXYRange(testData[0])).toEqual({
                xRange: [-5, 9],
                yRange: [11, 25],
            })
            expect(getBeaconXYRange(testData[6])).toEqual({
                xRange: [-1, 17],
                yRange: [-2, 16],
            })
        })
    })

    describe('getNumberOfPointsCoveredInRow', () => {
        it('returns correct number of points covered in row', () => {
            expect(
                getNumberOfPointsCoveredInRow([
                    [0, 3],
                    [2, 2],
                    [3, 13],
                    [11, 13],
                    [15, 20],
                    [15, 17],
                ] as Point[])
            ).toEqual(20)
            expect(
                getNumberOfPointsCoveredInRow([
                    [12, 12],
                    [2, 14],
                    [2, 2],
                    [-2, 2],
                    [16, 24],
                    [14, 18],
                ] as Point[])
            ).toEqual(27)
            expect(
                getNumberOfPointsCoveredInRow([
                    [-4, -2],
                    [2, 8],
                    [20, 32],
                    [-6, -3],
                ] as Point[])
            ).toEqual(25)
            expect(
                getNumberOfPointsCoveredInRow([
                    [0, 2],
                    [1, 3],
                    [4, 12],
                    [10, 14],
                    [14, 14],
                    [14, 20],
                    [16, 16],
                ] as Point[])
            ).toBe(21)
        })
    })

    describe('filterSensorsByRowReached', () => {
        it('keeps data points that reach row index and filters out those that do not', () => {
            expect(
                filterSensorsByRowReached(
                    [
                        {
                            yRange: [11, 25],
                        },
                        {
                            yRange: [-2, 16],
                        },
                    ] as RangeEnrichedDataPoint[],
                    7
                )
            ).toEqual([
                {
                    yRange: [-2, 16],
                },
            ])
            expect(
                filterSensorsByRowReached(
                    [
                        {
                            yRange: [11, 25],
                        },
                        {
                            yRange: [-2, 16],
                        },
                    ] as RangeEnrichedDataPoint[],
                    21
                )
            ).toEqual([
                {
                    yRange: [11, 25],
                },
            ])
            expect(
                filterSensorsByRowReached(
                    [
                        {
                            yRange: [11, 25],
                        },
                        {
                            yRange: [-2, 16],
                        },
                    ] as RangeEnrichedDataPoint[],
                    100
                )
            ).toEqual([])
        })
    })

    describe('getDistanceFromYRangePeakToRow', () => {
        it('returns the correct distance from the y range peak to the row index', () => {
            expect(getDistanceFromYRangePeakToRow([11, 25], 18, 21)).toEqual(4)
            expect(getDistanceFromYRangePeakToRow([11, 25], 18, 13)).toEqual(2)
            expect(getDistanceFromYRangePeakToRow([11, 25], 18, 18)).toEqual(7)
            expect(getDistanceFromYRangePeakToRow([-2, 16], 7, 3)).toEqual(5)
            expect(getDistanceFromYRangePeakToRow([-2, 16], 7, 13)).toEqual(3)
        })
    })

    describe('getSensorReachInRow', () => {
        it('returns the correct sensor reach in a row', () => {
            expect(getSensorReachInRow(2, 4)).toEqual([-2, 6])
            expect(getSensorReachInRow(-2, 6)).toEqual([-8, 4])
        })
    })

    describe('getNumberOPointsCoveredInRow', () => {
        it('returns number of points covered by a sensor in specific row', () => {
            expect(
                getNumberOPointsCoveredInRow(getRangeEnrichedData(testData), 10)
            ).toEqual(27)
        })
        it('returns solution for part one', () => {
            expect(
                getNumberOPointsCoveredInRow(
                    getRangeEnrichedData(data),
                    2000000
                )
            ).toEqual(5_073_497)
        })
    })

    describe('getNotFullyCoveredRowIndices', () => {
        it('returns the correct row indices that are not fully covered', () => {
            expect(
                getNotFullyCoveredRowIndex(
                    getRangeEnrichedData(testData),
                    [0, 20],
                    [0, 20]
                )
            ).toEqual(11)
            expect(
                getNotFullyCoveredRowIndex(
                    getRangeEnrichedData(testData),
                    [0, 10],
                    [0, 10]
                )
            ).toBeNull()
            // expect(
            //     getNotFullyCoveredRowIndex(data, [0, 4_000_000], [0, 4_000_000])
            // ).toEqual(2_638_237)
        })
    })
})
