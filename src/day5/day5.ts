import { Stacks } from './data'

export const getNCratesToMove = (stack: string[], n: number) => {
    if (n >= stack.length) {
        return stack
    }
    return [...stack].splice(stack.length - n)
}

export const getNCratesToKeep = (stack: string[], n: number) => {
    return [...stack].slice(0, n)
}

export const reverseCratesOrder = (crates: string[]) => {
    return [...crates].reverse()
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
    const copyStacks = { ...stacks }
    let cratesToMove = getNCratesToMove(copyStacks[from], numberOfCrates)
    if (movedIsReversed) {
        cratesToMove = reverseCratesOrder(cratesToMove)
    }
    const cratesToKeep = getNCratesToKeep(
        copyStacks[from],
        copyStacks[from].length - numberOfCrates
    )
    copyStacks[from] = cratesToKeep
    copyStacks[to] = [...copyStacks[to], ...cratesToMove]
    return copyStacks
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
    return getLastCratesFromEachStack(currentStack).join('')
}
