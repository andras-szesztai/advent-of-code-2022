import { Stacks } from './data'

export const getCratesToMove = (stack: string[], numberOfCrates: number) => {
    if (numberOfCrates >= stack.length) {
        return stack
    }
    return [...stack].splice(stack.length - numberOfCrates)
}

export const getCratesToKeep = (stack: string[], numberOfCrates: number) => {
    const numberToKeep = stack.length - numberOfCrates
    if (numberToKeep <= 0) {
        return []
    }
    return [...stack].slice(0, numberToKeep)
}

export const splitStack = (stack: string[], numberOfCrates: number) => {
    return [
        getCratesToMove(stack, numberOfCrates),
        getCratesToKeep(stack, numberOfCrates),
    ] as const
}

export const reverseCratesOrder = (stack: string[]) => {
    return [...stack].reverse()
}

export const updateStacks = (
    stacks: Stacks,
    from: number,
    to: number,
    numberOfCrates: number,
    movedIsReversed = false
) => {
    if (Object.keys(stacks).length === 0 || !stacks[from] || !stacks[to]) {
        return stacks
    }
    const copiedStacks = { ...stacks }
    const [cratesToMove, cratesToKeep] = splitStack(
        copiedStacks[from],
        numberOfCrates
    )
    copiedStacks[from] = cratesToKeep
    copiedStacks[to] = [
        ...copiedStacks[to],
        ...(movedIsReversed ? reverseCratesOrder(cratesToMove) : cratesToMove),
    ]
    return copiedStacks
}

export const parseProcedureText = (text: string) => {
    const textArray = text.split(' ')
    return {
        numberOfCrates: Number(textArray[1]),
        from: Number(textArray[3]),
        to: Number(textArray[5]),
    }
}

export const getLastCratesFromEachStack = (stacks: Stacks) => {
    const lastCrates = Object.values(stacks).map(
        (stack) => stack[stack.length - 1]
    )
    return lastCrates
}

export const getResult = (
    startStack: Stacks,
    steps: string[],
    movedIsReversed = false
) => {
    let currentStack = startStack
    steps.forEach((step) => {
        const { from, to, numberOfCrates } = parseProcedureText(step)
        currentStack = updateStacks(
            currentStack,
            from,
            to,
            numberOfCrates,
            movedIsReversed
        )
    })
    const lastCrates = getLastCratesFromEachStack(currentStack)
    return lastCrates.join('')
}
