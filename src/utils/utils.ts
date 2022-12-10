export const sum = (values: number[]) => {
    return values.reduce((sum, value) => sum + value, 0)
}

export const chunkArray = (array: string[], chunkSize: number) => {
    if (chunkSize <= 0) {
        return array
    }
    const chunkedArray = []
    for (let i = 0; i < array.length; i += chunkSize) {
        chunkedArray.push(array.slice(i, i + chunkSize))
    }
    return chunkedArray
}
