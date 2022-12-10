export const isIncreased = (previous?: number) => (current: number) => {
    return previous ? previous < current : Boolean(previous)
}

export const getIncreasedValues = (values: number[]) => {
    return values.filter((value, index) =>
        isIncreased(values[index - 1])(value)
    )
}

export const getNumberOfIncreasedValues = (values: number[]) => {
    return getIncreasedValues(values).length
}

export const getWindowsArray = (values: number[], windowSize: number) => {
    const windowsArray = values.reduce((windows, _value, index) => {
        if (index + windowSize <= values.length) {
            windows.push(values.slice(index, index + windowSize))
        }
        return windows
    }, [] as number[][])
    return windowsArray
}

