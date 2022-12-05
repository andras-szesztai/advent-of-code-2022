export type Shapes = 'A' | 'B' | 'C'
export type Outcomes = 'Y' | 'X' | 'Z'

const shapePoints: Record<Shapes, number> = {
    A: 1, // Rock
    B: 2, // Paper
    C: 3, // Scissors
}

const outcomePoints: Record<Outcomes, number> = {
    X: 0, // Lost
    Y: 3, // Drawn
    Z: 6, // Won
}

const responsesToOpponentShapes: Record<Shapes, Record<Outcomes, Shapes>> = {
    A: {
        X: 'C',
        Y: 'A',
        Z: 'B',
    },
    B: {
        X: 'A',
        Y: 'B',
        Z: 'C',
    },
    C: {
        X: 'B',
        Y: 'C',
        Z: 'A',
    },
}

export const getRoundPoints = (opponentShape: Shapes, outcome: Outcomes) => {
    const responseToOpponentShape =
        responsesToOpponentShapes[opponentShape][outcome]
    return outcomePoints[outcome] + shapePoints[responseToOpponentShape]
}

export const getStrategyPoints = (strategy: [Shapes, Outcomes][]) => {
    if (strategy.length === 0) {
        return 0
    }
    return strategy.reduce((acc, [opponentShape, outcome]) => {
        return acc + getRoundPoints(opponentShape, outcome)
    }, 0)
}
