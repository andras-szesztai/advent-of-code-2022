export type OpponentShapes = 'A' | 'B' | 'C'
export type PlayerShapes = 'X' | 'Y' | 'Z'

const shapePoints: Record<PlayerShapes, number> = {
    X: 1,
    Y: 2,
    Z: 3,
}

const shapeBeats: Record<PlayerShapes, OpponentShapes> = {
    X: 'C',
    Y: 'A',
    Z: 'B',
}

const shapeLosesTo: Record<PlayerShapes, OpponentShapes> = {
    X: 'B',
    Y: 'C',
    Z: 'A',
}

export const getRoundPoints = (
    playerShape: PlayerShapes,
    opponentShape: OpponentShapes
) => {
    const shapePoint = shapePoints[playerShape]
    if (shapeLosesTo[playerShape] === opponentShape) {
        return shapePoint
    }
    if (shapeBeats[playerShape] === opponentShape) {
        return shapePoint + 6
    }
    return shapePoint + 3
}

export const getStrategyPoints = (
    strategy: [OpponentShapes, PlayerShapes][]
) => {
    if (strategy.length === 0) {
        return 0
    }
    return strategy.reduce((acc, [opponentShape, playerShape]) => {
        return acc + getRoundPoints(playerShape, opponentShape)
    }, 0)
}
