type Point = [number, number]
export type Line = [Point, Point]

export const isDiagonal = (line: Line) => {
    return line[0][0] !== line[1][0] && line[0][1] !== line[1][1]
}
const getDifference = (line: Line) => {
    return [line[0][0] - line[1][0], line[0][1] - line[1][1]]
}

const getIncrement = ([differenceX, differenceY]: [number, number]) => {
    return [differenceX < 0 ? 1 : -1, differenceY < 0 ? 1 : -1]
}

const getNumberOfMiddlePointsArray = (difference: number) => {
    return Array.from(Array(Math.abs(difference) - 1))
}

const updateDrawnPoints = (
    points: Point[],
    isDiagonal: boolean,
    isHorizontal: boolean,
    [incrementXWith, incrementYWith]: [number, number],
    previousPoint: Point
) => {
    if (isDiagonal) {
        points.push([
            previousPoint[0] + incrementXWith,
            previousPoint[1] + incrementYWith,
        ])
    } else {
        points.push(
            isHorizontal
                ? [previousPoint[0] + incrementXWith, previousPoint[1]]
                : [previousPoint[0], previousPoint[1] + incrementYWith]
        )
    }
}

export const drawLine = (line: Line, isDiagonal: boolean) => {
    const isHorizontal = !isDiagonal && Math.abs(line[0][0] - line[1][0]) > 0
    const [differenceX, differenceY] = getDifference(line)
    const [incrementXWith, incrementYWith] = getIncrement([
        differenceX,
        differenceY,
    ])
    const points: Point[] = [line[0]]
    getNumberOfMiddlePointsArray(differenceX || differenceY).map((_, index) => {
        updateDrawnPoints(
            points,
            isDiagonal,
            isHorizontal,
            [incrementXWith, incrementYWith],
            points[index]
        )
    })
    return [...points, line[1]]
}

const countOverlaps = (pointsCollection: Map<string, number>): number => {
    return Array.from(pointsCollection.values()).filter((value) => value > 1)
        .length
}

export const getPointsWhereNonDiagonalLinesOverlap = (
    lines: Line[]
): number => {
    const pointsCollection: Map<string, number> = new Map()
    lines.forEach((line) => {
        drawLine(line, isDiagonal(line)).forEach((point) => {
            const pointKey = point.join(',')
            pointsCollection.set(
                pointKey,
                (pointsCollection.get(pointKey) || 0) + 1
            )
        })
    })
    return countOverlaps(pointsCollection)
}
