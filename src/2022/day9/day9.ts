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

export const getUpdatedKnotPosition = (
    positionToFollow: [number, number],
    positionToUpdate: [number, number]
): [number, number] => {
    const xDifference = Math.abs(positionToFollow[0] - positionToUpdate[0])
    const yDifference = Math.abs(positionToFollow[1] - positionToUpdate[1])
    const updatedPosition = [...positionToUpdate]
    const moveByY = positionToFollow[1] > updatedPosition[1] ? 1 : -1
    const moveByX = positionToFollow[0] > updatedPosition[0] ? 1 : -1
    if (xDifference === 2 && yDifference === 2) {
        return [updatedPosition[0] + moveByX, updatedPosition[1] + moveByY]
    }
    if (yDifference === 2 && xDifference === 1) {
        return [positionToFollow[0], updatedPosition[1] + moveByY]
    }
    if (xDifference === 2 && yDifference === 1) {
        return [updatedPosition[0] + moveByX, positionToFollow[1]]
    }
    if (yDifference === 2) {
        return [updatedPosition[0], updatedPosition[1] + moveByY]
    }
    if (xDifference === 2) {
        return [updatedPosition[0] + moveByX, updatedPosition[1]]
    }
    return positionToUpdate
}

const getUpdatedKnotPositions = (
    knotPositions: [number, number][] = [],
    numberOfKnots: number,
    headPosition: [number, number]
) => {
    const newKnottedPositions = [...knotPositions]
    Array.from(Array(numberOfKnots - 1)).forEach((_num, index) => {
        const positionToFollow = newKnottedPositions[index - 1] || headPosition
        const currentPosition = newKnottedPositions[index]
        newKnottedPositions[index] = getUpdatedKnotPosition(
            positionToFollow,
            currentPosition || [0, 0]
        )
    })
    return newKnottedPositions
}

export const getNumberUniqueTailPositions = (
    headMoves: [Direction, number[]][],
    numberOfKnots = 2
) => {
    let tailPositionCollection: string[] = []
    let headPosition: [number, number] = [0, 0]
    let knotPositions: [number, number][] = []
    headMoves.forEach(([direction, moves]) => {
        moves.forEach(() => {
            headPosition = getUpdatedHeadPosition(headPosition, direction)
            knotPositions = getUpdatedKnotPositions(
                knotPositions,
                numberOfKnots,
                headPosition
            )
            tailPositionCollection = [
                ...tailPositionCollection,
                knotPositions[knotPositions.length - 1].toString(),
            ]
        })
    })
    return new Set(tailPositionCollection).size
}
