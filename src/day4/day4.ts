export type DataSetType = [[number, number], [number, number]][]

export const sortSectionsByRange = (sections: [number, number][]) => {
    return [...sections].sort((a, b) => {
        const aRange = a[1] - a[0]
        const bRange = b[1] - b[0]
        return bRange - aRange
    })
}

export const isWiderSectionsIncludesNarrower = (
    wider: [number, number],
    narrower: [number, number]
) => {
    return wider[0] <= narrower[0] && wider[1] >= narrower[1]
}

export const getPartOneSolution = (sections: DataSetType) => {
    const completelyOverlappingSections = sections.filter((s) => {
        const sortedSection = sortSectionsByRange(s)
        return isWiderSectionsIncludesNarrower(
            sortedSection[0],
            sortedSection[1]
        )
    })
    return completelyOverlappingSections.length
}

export const isSectionsOverlap = (
    wider: [number, number],
    narrower: [number, number]
) => {
    return wider[1] > narrower[0]
        ? narrower[1] >= wider[0]
        : wider[1] >= narrower[0]
}

export const getPartTwoSolution = (sections: DataSetType) => {
    const partlyOverlappingSections = sections.filter((section) => {
        const sortedSection = sortSectionsByRange(section)
        return isSectionsOverlap(sortedSection[0], sortedSection[1])
    })
    return partlyOverlappingSections.length
}
