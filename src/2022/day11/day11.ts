export type MonkeyData = {
    items: number[]
    operation: (old: number) => number
    divider: number
    goesTo: (worryLevel: number, divider: number) => number
    numberOfItemsInspected: number
}
export type MonkeysMap = Map<number, MonkeyData>

const defaultChangeToWorryLevelWhenPassed = (worryLevel: number) => worryLevel

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
        data: Pick<MonkeyData, 'divider' | 'goesTo' | 'operation'>,
        modulo: number,
        changeToWorryLevelWhenPassed = defaultChangeToWorryLevelWhenPassed
    ) =>
    (item: number) => {
        const newItemWorryLevel = Math.floor(
            changeToWorryLevelWhenPassed(data.operation(item))
        )
        const toUpdate = data.goesTo(newItemWorryLevel, data.divider)
        const monkeyObjectToUpdate = monkeyData.get(toUpdate)!
        monkeyData.set(toUpdate, {
            ...monkeyObjectToUpdate,
            items: [...monkeyObjectToUpdate.items, newItemWorryLevel % modulo],
        })
    }

const updateMonkeyDataPerMonkey =
    (
        monkeyData: MonkeysMap,
        modulo: number,
        changeToWorryLevelWhenPassed = defaultChangeToWorryLevelWhenPassed
    ) =>
    (
        { items, numberOfItemsInspected, ...restData }: MonkeyData,
        index: number
    ) => {
        items.forEach(
            updateMonkeyDataPerItem(
                monkeyData,
                restData,
                modulo,
                changeToWorryLevelWhenPassed
            )
        )
        monkeyData.set(index, {
            ...restData,
            items: [],
            numberOfItemsInspected: numberOfItemsInspected + items.length,
        })
    }

// Help: needed to check modulo for solution part 2
const getModulo = (monkeyData: MonkeysMap) => {
    return Array.from(monkeyData.values()).reduce((acc, curr) => {
        return acc * curr.divider
    }, 1)
}

const getLevelOfMonkeyBusiness = (
    monkeyData: MonkeysMap,
    numberOfRounds: number,
    changeToWorryLevelWhenPassed = defaultChangeToWorryLevelWhenPassed
) => {
    const copiedMonkeyData = new Map(monkeyData)
    const modulo = getModulo(copiedMonkeyData)
    for (let i = 0; i < numberOfRounds; i++) {
        copiedMonkeyData.forEach(
            updateMonkeyDataPerMonkey(
                copiedMonkeyData,
                modulo,
                changeToWorryLevelWhenPassed
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

export const getLevelOfMonkeyBusinessPartTwo = (monkeyData: MonkeysMap) => {
    return getLevelOfMonkeyBusiness(monkeyData, 10000)
}
