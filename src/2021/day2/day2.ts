export type Direction = 'forward' | 'down' | 'up'
export type Path = { direction: Direction; unit: number }[]

export const filterForDirection = (direction: Direction, path: Path) => {
    return path.filter((p) => p.direction === direction)
}

export const countUnits = (direction: Direction, path: Path) => {
    return filterForDirection(direction, path).reduce(
        (acc, p) => acc + p.unit,
        0
    )
}

export const getHorizontalPosition = (path: Path) => {
    return countUnits('forward', path)
}

export const getSimpleDepth = (path: Path) => {
    return countUnits('down', path) - countUnits('up', path)
}

export const getPartOneResult = (path: Path) => {
    return getHorizontalPosition(path) * getSimpleDepth(path)
}

export const getRealDepth = (path: Path) => {
    let realDepth = 0
    let aim = 0
    path.forEach(({ direction, unit }) => {
        if (direction === 'down') {
            aim += unit
        }
        if (direction === 'up') {
            aim -= unit
        }
        if (direction === 'forward') {
            realDepth += aim * unit
        }
    })
    return realDepth > 0 ? realDepth : 0
}

export const getPartTwoResult = (path: Path) => {
    return getHorizontalPosition(path) * getRealDepth(path)
}
