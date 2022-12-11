export type MonkeyData = {
    items: number[]
    operation: (old: number) => number
    divider: number
    goesTo: (worryLevel: number) => number
    numberOfItemsInspected: number
}
export type MonkeysMap = Map<number, MonkeyData>

export const getTopNNumberOfInspectedItems = (
    monkeyData: MonkeysMap,
    topN: number
) => {
    const itemsInspectedDescending = Array.from(monkeyData.values()).sort(
        (a, b) => b.numberOfItemsInspected - a.numberOfItemsInspected
    )
    return itemsInspectedDescending
        .slice(0, topN)
        .map((d) => d.numberOfItemsInspected)
}

const updateMonkeyDataPerItem =
    (
        monkeyData: MonkeysMap,
        data: Pick<MonkeyData, 'goesTo' | 'operation'>,
        changeToWorryLevelWhenPassed: (worryLevel: number) => number,
        dividerModulo?: number
    ) =>
    (item: number) => {
        const newItemWorryLevel = Math.floor(
            changeToWorryLevelWhenPassed(data.operation(item))
        )
        const toUpdate = data.goesTo(newItemWorryLevel)
        const monkeyObjectToUpdate = monkeyData.get(toUpdate)!
        monkeyData.set(toUpdate, {
            ...monkeyObjectToUpdate,
            items: [
                ...monkeyObjectToUpdate.items,
                dividerModulo
                    ? newItemWorryLevel % dividerModulo
                    : newItemWorryLevel,
            ],
        })
    }

const updateMonkeyDataPerMonkey =
    (
        monkeyData: MonkeysMap,
        changeToWorryLevelWhenPassed: (worryLevel: number) => number,
        dividerModulo?: number
    ) =>
    (
        { items, numberOfItemsInspected, ...restData }: MonkeyData,
        index: number
    ) => {
        items.forEach(
            updateMonkeyDataPerItem(
                monkeyData,
                restData,
                changeToWorryLevelWhenPassed,
                dividerModulo
            )
        )
        monkeyData.set(index, {
            items: [],
            numberOfItemsInspected: numberOfItemsInspected + items.length,
            ...restData,
        })
    }

const getLevelOfMonkeyBusiness = (
    monkeyData: MonkeysMap,
    numberOfRounds: number,
    changeToWorryLevelWhenPassed: (worryLevel: number) => number,
    dividerModulo?: number
) => {
    const copiedMonkeyData = new Map(monkeyData)
    for (let i = 0; i < numberOfRounds; i++) {
        copiedMonkeyData.forEach(
            updateMonkeyDataPerMonkey(
                copiedMonkeyData,
                changeToWorryLevelWhenPassed,
                dividerModulo
            )
        )
    }
    const topNumberOfInspectedItems = getTopNNumberOfInspectedItems(
        copiedMonkeyData,
        2
    )
    return topNumberOfInspectedItems[0] * topNumberOfInspectedItems[1]
}

export const getLevelOfMonkeyBusinessPartOne = (monkeyData: MonkeysMap) => {
    return getLevelOfMonkeyBusiness(
        monkeyData,
        20,
        (worryLevel) => worryLevel / 3
    )
}

// Help: needed to check modulo for solution part 2
const getDividerModulo = (monkeyData: MonkeysMap) => {
    return Array.from(monkeyData.values()).reduce((acc, curr) => {
        return acc * curr.divider
    }, 1)
}

export const getLevelOfMonkeyBusinessPartTwo = (monkeyData: MonkeysMap) => {
    return getLevelOfMonkeyBusiness(
        monkeyData,
        10000,
        (worryLevel) => worryLevel,
        getDividerModulo(monkeyData)
    )
}
