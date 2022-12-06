export const removeDuplicateFromCollector = (
    collector: string[],
    char: string
) => {
    const duplicateIndex = collector.findIndex((c) => c === char)
    if (duplicateIndex === -1) {
        return collector
    }
    return [...collector].slice(duplicateIndex + 1)
}

export const findStartOfMarker = (
    stream: string[],
    uniqCharactersLength: number
) => {
    let startOfPacketIndex = -1
    let uniqCharacters: string[] = []
    stream.every((char, index) => {
        if (!uniqCharacters.includes(char)) {
            if (uniqCharacters.length === uniqCharactersLength - 1) {
                startOfPacketIndex = index
                return false
            } else {
                uniqCharacters = [...uniqCharacters, char]
                return true
            }
        }
        uniqCharacters = [
            ...removeDuplicateFromCollector(uniqCharacters, char),
            char,
        ]
        return true
    })
    return startOfPacketIndex + 1
}
