import { sum } from '../../2021/day1/day1'

export const splitStringHalf = (str: string) => {
    const half = Math.round(str.length / 2)
    return [str.slice(0, half), str.slice(half)]
}

export const isDuplicateCharacter = (character: string, string: string) => {
    if (!character) {
        return false
    }
    return string.includes(character)
}

export const getUniqueDuplicates = (
    fistString: string,
    secondString: string
) => {
    const duplicates = fistString
        .split('')
        .filter((character) => isDuplicateCharacter(character, secondString))
    return [...new Set(duplicates)]
}

export const getAllDuplicatesInDataSet = (dataSet: string[]) => {
    const duplicates = dataSet.map((string) => {
        const [first, second] = splitStringHalf(string)
        return getUniqueDuplicates(first, second)
    })
    return duplicates.flat()
}

export const getCharacterScore = (character: string) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    if (character.length === 1) {
        if (alphabet.includes(character)) {
            return alphabet.indexOf(character) + 1
        }
        if (alphabet.toUpperCase().includes(character)) {
            return (
                alphabet.indexOf(character.toLowerCase()) + alphabet.length + 1
            )
        }
    }
    return 0
}

export const getCharacterScoresSum = (characters: string[]) => {
    return sum(characters.map(getCharacterScore))
}

export const getPartOneResult = (dataSet: string[]) => {
    return getCharacterScoresSum(getAllDuplicatesInDataSet(dataSet))
}

export const getUniqSharedCharacter = (strings: string[]) => {
    if (strings.length === 0) {
        return ''
    }
    const stringToLoop = strings[0].split('')
    const sharedCharacter = stringToLoop.find((character) => {
        return strings.every((string) => string.includes(character))
    })
    return sharedCharacter || ''
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

export const getPartTwoResult = (dataSet: string[]) => {
    const chunkedDataSet = chunkArray(dataSet, 3)
    const sharedCharacters = chunkedDataSet.map((strings) => {
        if (Array.isArray(strings)) {
            return getUniqSharedCharacter(strings)
        }
        return ''
    })
    return getCharacterScoresSum(sharedCharacters)
}
