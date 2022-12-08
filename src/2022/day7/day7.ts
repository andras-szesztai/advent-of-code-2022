const isCommand = (parsedOutput: string[]) => {
    return parsedOutput[0] === '$'
}

export const getUpdatedPath = (currentPath: string[], output: string) => {
    const parsedOutput = output.split(' ')
    if (!isCommand(parsedOutput) || parsedOutput[1] == 'ls') {
        return currentPath
    }
    if (parsedOutput[2] === '..') {
        return currentPath.slice(0, currentPath.length - 1)
    }
    return [...currentPath, parsedOutput[parsedOutput.length - 1]]
}

type Directory = {
    [key: string]: number | Directory
}

export const accessDirectory = (fileSystem: Directory, path: string[]) => {
    const accessedValue = path.reduce((acc, curr) => {
        const currentValue = acc[curr]
        if (currentValue === undefined) {
            throw new Error(
                `Path leads to a non-existing directory. Path: ${path.join(
                    '/'
                )}`
            )
        }
        if (typeof currentValue === 'number') {
            throw new Error(`Path leads to a file. Path: ${path.join('/')}`)
        }
        return currentValue as Directory
    }, fileSystem)
    return accessedValue
}

export const updateDirectory = (directory: Directory, output: string) => {
    const parsedOutput = output.split(' ')
    if (isCommand(parsedOutput)) {
        return directory
    }
    const copiedDirectory = { ...directory }
    if (parsedOutput[0] === 'dir') {
        copiedDirectory[parsedOutput[1]] = {}
    } else {
        copiedDirectory[parsedOutput[1]] = parseInt(parsedOutput[0])
    }
    return copiedDirectory
}

export const updateFileSystem = (
    fileSystem: Directory,
    path: string[],
    output: string
) => {
    const copiedFileSystem = JSON.parse(JSON.stringify(fileSystem))
    const directoryToUpdate = accessDirectory(copiedFileSystem, path)
    const updatedDirectory = updateDirectory(directoryToUpdate, output)
    accessDirectory(copiedFileSystem, path.slice(0, path.length - 1))[
        path[path.length - 1]
    ] = updatedDirectory
    return copiedFileSystem
}

export const buildFileSystem = (outputs: string[]) => {
    let fileSystem: Directory = { '/': {} }
    let currentPath: string[] = []
    outputs.forEach((output) => {
        currentPath = getUpdatedPath(currentPath, output)
        fileSystem = updateFileSystem(fileSystem, currentPath, output)
    })
    return fileSystem
}

export const getDirectorySizes = (fileSystem: Directory) => {
    const directorySizes: Record<string, number> = {}
    const getDirectorySize = (directory: Directory): number => {
        return Object.entries(directory).reduce((acc, [, value]) => {
            if (typeof value === 'number') {
                return acc + value
            }
            return acc + getDirectorySize(value as Directory)
        }, 0)
    }
    const crawlFileSystem = (directory: Directory, parentKey = '') => {
        Object.entries(directory).forEach(([key, value]) => {
            if (typeof value !== 'number') {
                const currentKey = `${parentKey}${key}`
                directorySizes[currentKey] = getDirectorySize(
                    value as Directory
                )
                crawlFileSystem(value as Directory, currentKey)
            }
        })
        return directorySizes
    }
    return crawlFileSystem(fileSystem)
}

export const getDirectorySizesSumBelowThreshold = (
    outputs: string[],
    threshold: number
) => {
    const fileSystem = buildFileSystem(outputs)
    const directorySizes = getDirectorySizes(fileSystem)
    const directoriesBelowThreshold = Object.entries(directorySizes).filter(
        ([, size]) => size <= threshold
    )
    return directoriesBelowThreshold
        .map(([, size]) => size)
        .reduce((acc, curr) => acc + curr, 0)
}
