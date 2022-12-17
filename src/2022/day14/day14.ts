export type Coordinate = [number, number]

const getCoordinatesBetweenAnchorPoints = (
    difference: number,
    pushCb: (i: number) => Coordinate
): Coordinate[] => {
    const allLineCoordinatesBetweenAnchorPoints: Coordinate[] = []
    if (difference > 0) {
        for (let i = 0; i < difference + 1; i++) {
            allLineCoordinatesBetweenAnchorPoints.push(pushCb(i))
        }
    } else {
        for (let i = 0; i < Math.abs(difference) + 1; i++) {
            allLineCoordinatesBetweenAnchorPoints.push(pushCb(-i))
        }
    }
    return allLineCoordinatesBetweenAnchorPoints
}

const getUniqCoordinates = (coordinates: Coordinate[]): Coordinate[] =>
    [...new Set(coordinates.map((c) => JSON.stringify(c)))].map((c) =>
        JSON.parse(c)
    )

export const getAllLineCoordinates = (
    coordinatesAnchorPoints: Coordinate[]
): Coordinate[] => {
    const allLineCoordinates: Coordinate[] = []
    coordinatesAnchorPoints.forEach((coordinateAnchorPoint, index) => {
        const [x, y] = coordinateAnchorPoint
        const nextCoordinateAnchorPoint = coordinatesAnchorPoints[index + 1]
        if (nextCoordinateAnchorPoint) {
            const [nextX, nextY] = nextCoordinateAnchorPoint
            if (x === nextX) {
                allLineCoordinates.push(
                    ...getCoordinatesBetweenAnchorPoints(nextY - y, (i) => [
                        x,
                        y + i,
                    ])
                )
            } else {
                allLineCoordinates.push(
                    ...getCoordinatesBetweenAnchorPoints(nextX - x, (i) => [
                        x + i,
                        y,
                    ])
                )
            }
        }
    })
    return getUniqCoordinates(allLineCoordinates)
}

const isSameCoordinate = (c1: Coordinate, c2: Coordinate) =>
    c1[0] === c2[0] && c1[1] === c2[1]

const isCoordinateInCoordinates =
    (coordinates: Coordinate[]) => (coordinate: Coordinate) =>
        coordinates.some((c) => isSameCoordinate(c, coordinate))

export const simulateSandFalling = (
    occupiedCoordinates: Coordinate[],
    maxY: number
): Coordinate => {
    const isCoordinateOccupied = isCoordinateInCoordinates(occupiedCoordinates)
    let position: Coordinate = [500, 0]
    while (position[1] !== maxY) {
        const nextPositionDown: Coordinate = [position[0], position[1] + 1]
        if (!isCoordinateOccupied(nextPositionDown)) {
            position = nextPositionDown
            continue
        }
        const nextPositionDownLeft: Coordinate = [
            position[0] - 1,
            nextPositionDown[1],
        ]
        if (!isCoordinateOccupied(nextPositionDownLeft)) {
            position = nextPositionDownLeft
            continue
        }
        const nextPositionDownRight: Coordinate = [
            position[0] + 1,
            nextPositionDown[1],
        ]
        if (!isCoordinateOccupied(nextPositionDownRight)) {
            position = nextPositionDownRight
            continue
        }
        break
    }
    return position
}

export const getNumberOfSandsBeforeAbyss = (
    rockCoordinates: Coordinate[][]
) => {
    const allRockCoordinates = rockCoordinates.map(getAllLineCoordinates).flat()
    const maxY = Math.max(...allRockCoordinates.map((c) => c[1]))
    const sandPositions: Coordinate[] = []
    while (true) {
        const newSandCoordinate = simulateSandFalling(
            [...allRockCoordinates, ...sandPositions],
            maxY
        )
        if (newSandCoordinate[1] === maxY) break
        sandPositions.push(newSandCoordinate)
    }
    return sandPositions.length
}
