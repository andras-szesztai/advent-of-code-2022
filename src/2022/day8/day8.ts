export const splitTreesToBeforeAndAfter = (
    trees: number[],
    treeIndex: number
) => {
    if (treeIndex < 0) {
        return [[], trees] as [number[], number[]]
    }
    const before = trees.slice(0, treeIndex)
    const after = trees.slice(treeIndex + 1)
    return [before, after] as [number[], number[]]
}

export const isTallestTree = (
    [before, after]: [number[], number[]],
    currentTreeHeight: number
) => {
    if (before.length === 0 || after.length === 0) {
        return true
    }
    return (
        before.every((treeHeight) => treeHeight < currentTreeHeight) ||
        after.every((treeHeight) => treeHeight < currentTreeHeight)
    )
}

export const manageColumnsCache = (
    columnsCache: Map<number, number[]>,
    columnIndex: number,
    forest: number[][]
) => {
    let copiedColumnsCache
    if (!columnsCache.has(columnIndex)) {
        copiedColumnsCache = new Map(columnsCache)
        copiedColumnsCache.set(
            columnIndex,
            forest.map((row) => row[columnIndex])
        )
    }
    return copiedColumnsCache || columnsCache
}

const isTallestIn = (
    trees: number[],
    treeIndex: number,
    treeHeight: number
) => {
    return isTallestTree(
        splitTreesToBeforeAndAfter(trees, treeIndex),
        treeHeight
    )
}

export const getVisibleTreesNumber = (forest: number[][]) => {
    let treesVisible = 0
    let columnsCache = new Map<number, number[]>()
    forest.forEach((treeRow, rowIndex) => {
        treeRow.forEach((tree, columnIndex) => {
            if (isTallestIn(treeRow, columnIndex, tree)) {
                treesVisible++
            } else {
                columnsCache = manageColumnsCache(
                    columnsCache,
                    columnIndex,
                    forest
                )
                if (
                    isTallestIn(columnsCache.get(columnIndex)!, rowIndex, tree)
                ) {
                    treesVisible++
                }
            }
        })
    })
    return treesVisible
}

export const getSingleSideScenicScore = (
    trees: number[],
    treeHeight: number
) => {
    const sideScenicScore = trees.findIndex((height) => height >= treeHeight)
    if (sideScenicScore === -1) {
        return trees.length
    }
    return sideScenicScore + 1
}

const getScenicScoresFor = (trees: number[], index: number, tree: number) => {
    const [beforeInRow, afterInRow] = splitTreesToBeforeAndAfter(trees, index)
    const beforeScenicScore = getSingleSideScenicScore(
        [...beforeInRow].reverse(),
        tree
    )
    const afterScenicScore = getSingleSideScenicScore(afterInRow, tree)
    return [beforeScenicScore, afterScenicScore] as const
}

export const getHighestScenicScore = (forest: number[][]) => {
    let highestScenicScore = 0
    let columnsCache = new Map<number, number[]>()
    forest.forEach((treeRow, rowIndex) => {
        treeRow.forEach((tree, columnIndex) => {
            const [beforeInRowScenicScore, afterInRowScenicScore] =
                getScenicScoresFor(treeRow, columnIndex, tree)
            if (beforeInRowScenicScore > 0 && afterInRowScenicScore > 0) {
                columnsCache = manageColumnsCache(
                    columnsCache,
                    columnIndex,
                    forest
                )
                const [beforeInColumnScenicScore, afterInColumnScenicScore] =
                    getScenicScoresFor(
                        columnsCache.get(columnIndex)!,
                        rowIndex,
                        tree
                    )
                if (
                    beforeInColumnScenicScore > 0 &&
                    afterInColumnScenicScore > 0
                ) {
                    const overallScenicScore =
                        afterInColumnScenicScore *
                        beforeInColumnScenicScore *
                        afterInRowScenicScore *
                        beforeInRowScenicScore
                    if (overallScenicScore > highestScenicScore) {
                        highestScenicScore = overallScenicScore
                    }
                }
            }
        })
    })
    return highestScenicScore
}
