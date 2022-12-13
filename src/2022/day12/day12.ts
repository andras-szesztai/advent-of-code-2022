type WalkType = 'up' | 'down'

const isPossibleNextPosition =
    (currentValue: number, walkType: WalkType) =>
    (possibleNextValue: number) => {
        if (walkType === 'up') {
            return (
                possibleNextValue <= currentValue ||
                possibleNextValue - currentValue === 1
            )
        }
        return (
            currentValue <= possibleNextValue ||
            currentValue - possibleNextValue === 1
        )
    }

export const getNextPossiblePositions = (
    heightMap: number[][],
    position: [number, number],
    walkType: WalkType
) => {
    const [x, y] = position
    const getIsPossibleNextPosition = isPossibleNextPosition(
        heightMap[y][x],
        walkType
    )
    const nextPositions: [number, number][] = []
    if (x !== 0 && getIsPossibleNextPosition(heightMap[y][x - 1])) {
        nextPositions.push([x - 1, y])
    }
    if (y !== 0 && getIsPossibleNextPosition(heightMap[y - 1][x])) {
        nextPositions.push([x, y - 1])
    }
    if (
        x !== heightMap[y].length - 1 &&
        getIsPossibleNextPosition(heightMap[y][x + 1])
    ) {
        nextPositions.push([x + 1, y])
    }
    if (
        y !== heightMap.length - 1 &&
        getIsPossibleNextPosition(heightMap[y + 1][x])
    ) {
        nextPositions.push([x, y + 1])
    }
    return nextPositions
}

export const getValueCoordinates = (heightMap: number[][], value: number) => {
    let position: string = JSON.stringify([-1, -1])
    heightMap.some((row, rowIndex) => {
        const valueIndex = row.indexOf(value)
        if (valueIndex === -1) return false
        position = JSON.stringify([valueIndex, rowIndex])
        return true
    })
    return position
}

export const getWalkType = (
    heightMap: number[][],
    startPosition: string,
    endValue: number
): WalkType => {
    const [startX, startY] = JSON.parse(startPosition)
    return heightMap[startY][startX] > endValue ? 'down' : 'up'
}

export const walkMap = (
    heightMap: number[][],
    startPosition: string,
    endValue: number
) => {
    const walkType = getWalkType(heightMap, startPosition, endValue)
    let currentStep = 0
    let currentPositions = [startPosition]
    const visitedPositions: string[] = []
    let endIsReached = false
    while (!endIsReached) {
        visitedPositions.push(...currentPositions)
        const nextPossiblePositions = currentPositions
            .map((position) => {
                return getNextPossiblePositions(
                    heightMap,
                    JSON.parse(position),
                    walkType
                )
            })
            .flat()
            .map((position) => JSON.stringify(position))
            .filter((position) => !visitedPositions.includes(position))
        currentPositions = [...new Set(nextPossiblePositions)]
        endIsReached =
            nextPossiblePositions.length === 0 ||
            nextPossiblePositions.some((position) => {
                const parsedPosition = JSON.parse(position)
                return (
                    heightMap[parsedPosition[1]][parsedPosition[0]] === endValue
                )
            })
        currentStep++
    }
    return currentStep
}
