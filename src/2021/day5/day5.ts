type Point = [number, number]
export type Line = [Point, Point]

export const isDiagonal = (line: Line): boolean => {
    return line[0][0] !== line[1][0] && line[0][1] !== line[1][1]
}

const getDifference = (line: Line, isHorizontal: boolean): number => {
    return isHorizontal ? line[0][0] - line[1][0] : line[0][1] - line[1][1]
}

const getUpdatedPointsArray = (
    points: Point[],
    isHorizontal: boolean,
    incrementWith: 1 | -1,
    index: number
) => {
    const copiedPoints = [...points]
    const prevPoints = points[index]
    if (isHorizontal) {
        copiedPoints.push([prevPoints[0] + incrementWith, prevPoints[1]])
    } else {
        copiedPoints.push([prevPoints[0], prevPoints[1] + incrementWith])
    }
    return copiedPoints
}

export const drawLine = (line: Line): Point[] => {
    const isHorizontal = Math.abs(line[0][0] - line[1][0]) > 0
    const difference = getDifference(line, isHorizontal)
    const numberOfPointsToAdd = Math.abs(difference) - 1
    const incrementWith = difference < 0 ? 1 : -1
    let points: Point[] = [line[0]]
    Array.from(Array(numberOfPointsToAdd)).map((_, idx) => {
        points = getUpdatedPointsArray(points, isHorizontal, incrementWith, idx)
    })
    return [...points, line[1]]
}

const getUpdatedPointsCollection = (
    pointsCollection: Map<string, number>,
    points: Point[]
) => {
    const copiedPointsCollection = new Map(pointsCollection)
    points.forEach((point) => {
        const pointKey = point.join(',')
        copiedPointsCollection.set(
            pointKey,
            (copiedPointsCollection.get(pointKey) || 0) + 1
        )
    })
    return copiedPointsCollection
}

const countOverlaps = (pointsCollection: Map<string, number>): number => {
    return Array.from(pointsCollection.values()).filter((value) => value > 1)
        .length
}

export const getPointsWhereNonDiagonalLinesOverlap = (
    lines: Line[]
): number => {
    let pointsCollection: Map<string, number> = new Map()
    lines.forEach((line) => {
        if (!isDiagonal(line)) {
            pointsCollection = getUpdatedPointsCollection(
                pointsCollection,
                drawLine(line)
            )
        }
    })
    return countOverlaps(pointsCollection)
}
