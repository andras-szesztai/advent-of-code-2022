export type Point = [number, number]
export type DataPoint = { sensor: Point; beacon: Point }
export type XYRange = { xRange: Point; yRange: Point }
export type RangeEnrichedDataPoint = DataPoint & XYRange

export const getDistanceBetweenPoints = (point1: Point, point2: Point) =>
    Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1])

export const getBeaconXYRange = ({ sensor, beacon }: DataPoint): XYRange => {
    const range = getDistanceBetweenPoints(sensor, beacon)
    const [x, y] = sensor
    const xRange = [x - range, x + range]
    const yRange = [y - range, y + range]
    return { xRange, yRange } as XYRange
}

export const getRangeEnrichedData = (
    data: DataPoint[]
): RangeEnrichedDataPoint[] =>
    data.map((d) => ({ ...d, ...getBeaconXYRange(d) }))

export const filterSensorsByRowReached = (
    data: RangeEnrichedDataPoint[],
    rowIndex: number
): RangeEnrichedDataPoint[] =>
    data.filter(({ yRange }) => yRange[0] <= rowIndex && rowIndex <= yRange[1])

export const getDistanceFromYRangePeakToRow = (
    yRange: Point,
    sensorY: number,
    rowIndex: number
): number => {
    const [yRangeMin, yRangeMax] = yRange
    const distance =
        sensorY >= rowIndex ? rowIndex - yRangeMin : yRangeMax - rowIndex
    return distance
}

export const getSensorReachInRow = (
    sensorX: number,
    distance: number
): Point => [sensorX - distance, sensorX + distance]

const calculateRangeDistance = (x1: number, x2: number): number =>
    Math.abs(x2 - x1) + 1

export const getNumberOfPointsCoveredInRow = (ranges: Point[]): number => {
    const sortedRanges = ranges.sort((a, b) => a[0] - b[0])
    let pointsCovered = 0
    let currentRange: Point = sortedRanges[0]
    for (let i = 1; i < sortedRanges.length; i++) {
        const nextRange = sortedRanges[i]
        if (nextRange[0] <= currentRange[1]) {
            currentRange = [
                currentRange[0],
                Math.max(currentRange[1], nextRange[1]),
            ]
        } else {
            pointsCovered += calculateRangeDistance(...currentRange)
            currentRange = nextRange
        }
    }
    return (pointsCovered += calculateRangeDistance(...currentRange))
}

export const getNumberOPointsCoveredInRow = (
    data: RangeEnrichedDataPoint[],
    rowIndex: number,
    rangeLimits?: Point
): number => {
    const pointRangeBySensorInRow = filterSensorsByRowReached(
        data,
        rowIndex
    ).map(({ sensor: [sensorX, sensorY], yRange }) => {
        const range = getSensorReachInRow(
            sensorX,
            getDistanceFromYRangePeakToRow(yRange, sensorY, rowIndex)
        )
        if (!rangeLimits) {
            return range
        }
        return [
            range[0] < rangeLimits[0] ? rangeLimits[0] : range[0],
            rangeLimits[1] < range[1] ? rangeLimits[1] : range[1],
        ] as Point
    })
    return getNumberOfPointsCoveredInRow(pointRangeBySensorInRow)
}

export const getNotFullyCoveredRowIndex = (
    data: RangeEnrichedDataPoint[],
    rowRange: Point,
    columnRange: Point
): number | null => {
    const numberOfRows = Math.abs(rowRange[1] - rowRange[0])
    const numberOfColumns = Math.abs(columnRange[1] - columnRange[0])
    let notFullyCoveredRowIndex: number | null = null
    let loopCount = 0
    while (loopCount <= numberOfRows) {
        const currentRow = rowRange[0] + loopCount
        const numberOfPointsCoveredInRow = getNumberOPointsCoveredInRow(
            data,
            currentRow,
            rowRange
        )
        if (numberOfPointsCoveredInRow <= numberOfColumns) {
            notFullyCoveredRowIndex = currentRow
            break
        }
        loopCount++
    }
    return notFullyCoveredRowIndex
}
