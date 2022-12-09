export type Direction = 'U' | 'D' | 'L' | 'R'

export const getUpdatedHeadPosition = (
    position: [number, number],
    direction: Direction
): [number, number] => {
    switch (direction) {
        case 'U':
            return [position[0], position[1] + 1]
        case 'D':
            return [position[0], position[1] - 1]
        case 'L':
            return [position[0] - 1, position[1]]
        case 'R':
            return [position[0] + 1, position[1]]
        default:
            return position
    }
}

export const getUpdatedTailPosition = (
    headPosition: [number, number],
    tailPosition: [number, number]
): [number, number] => {
    const xDifference = Math.abs(headPosition[0] - tailPosition[0])
    const yDifference = Math.abs(headPosition[1] - tailPosition[1])
    if (yDifference === 2 && xDifference === 1) {
        const moveBy = headPosition[1] > tailPosition[1] ? 1 : -1
        return [headPosition[0], tailPosition[1] + moveBy]
    }
    if (xDifference === 2 && yDifference === 1) {
        const moveBy = headPosition[0] > tailPosition[0] ? 1 : -1
        return [tailPosition[0] + moveBy, headPosition[1]]
    }
    if (yDifference === 2) {
        const moveBy = headPosition[1] > tailPosition[1] ? 1 : -1
        return [tailPosition[0], tailPosition[1] + moveBy]
    }
    if (xDifference === 2) {
        const moveBy = headPosition[0] > tailPosition[0] ? 1 : -1
        return [tailPosition[0] + moveBy, tailPosition[1]]
    }
    return tailPosition
}

export const getNumberUniqueTailPositions = (
    headMoves: [Direction, number[]][]
) => {
    let tailPositionCollection: string[] = []
    let headPosition: [number, number] = [0, 0]
    let tailPosition: [number, number] = [0, 0]
    headMoves.forEach(([direction, moves]) => {
        moves.forEach(() => {
            headPosition = getUpdatedHeadPosition(headPosition, direction)
            tailPosition = getUpdatedTailPosition(headPosition, tailPosition)
            tailPositionCollection = [
                ...tailPositionCollection,
                tailPosition.toString(),
            ]
        })
    })
    return new Set(tailPositionCollection).size
}
