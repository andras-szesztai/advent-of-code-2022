import fs from 'fs'

import {
    accessDirectory,
    buildFileSystem,
    getDirectorySizes,
    getDirectorySizesSumBelowThreshold,
    getUpdatedPath,
    updateDirectory,
    updateFileSystem,
} from './day7'

const output = fs
    .readFileSync(
        '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day7/data.txt',
        'utf8'
    )
    .split('\n')

describe('2022 - day 7', () => {
    describe('getUpdatedPath', () => {
        it('returns the correctly updated path', () => {
            const updatedPathOne = getUpdatedPath([], '$ cd /')
            expect(updatedPathOne).toEqual(['/'])
            const updatedPathTwo = getUpdatedPath(updatedPathOne, '$ cd a')
            expect(updatedPathTwo).toEqual(['/', 'a'])
            const updatedPathThree = getUpdatedPath(updatedPathTwo, '$ cd ..')
            expect(updatedPathThree).toEqual(['/'])
        })
        it('returns same path if output is not of type command or a command that should not update the path', () => {
            const currentPath = ['/']
            expect(getUpdatedPath(currentPath, 'dir a')).toEqual(currentPath)
            expect(getUpdatedPath(currentPath, '$ ls')).toEqual(currentPath)
        })
    })

    describe('accessDirectory', () => {
        it('returns the correct directory', () => {
            const fileSystem = {
                '/': {
                    a: {
                        e: {},
                        f: 29116,
                        g: 2557,
                        'h.lst': 62596,
                    },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {},
                },
            }
            const path = ['/', 'a']
            const directory = accessDirectory(fileSystem, path)
            expect(directory).toEqual({
                e: {},
                f: 29116,
                g: 2557,
                'h.lst': 62596,
            })
        })

        it('throws an error if the path leads to a file', () => {
            const fileSystem = {
                '/': {
                    a: {
                        e: {},
                        f: 29116,
                        g: 2557,
                        'h.lst': 62596,
                    },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {},
                },
            }
            const path = ['/', 'a', 'f']
            expect(() => accessDirectory(fileSystem, path)).toThrow(
                'Path leads to a file'
            )
        })
        it('throws an error if the path leads to a non-existing directory', () => {
            const fileSystem = {
                '/': {
                    a: {
                        e: {},
                        f: 29116,
                        g: 2557,
                        'h.lst': 62596,
                    },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {},
                },
            }
            const path = ['/', 'a', 'non-existing']
            expect(() => accessDirectory(fileSystem, path)).toThrow(
                'Path leads to a non-existing directory'
            )
        })
    })

    describe('updateDirectory', () => {
        it('updates the directory correctly based on output', () => {
            const directory = {
                f: 29116,
                g: 2557,
                'h.lst': 62596,
            }
            const updatedDirectoryOne = updateDirectory(directory, 'dir e')
            expect(updatedDirectoryOne).toEqual({
                e: {},
                f: 29116,
                g: 2557,
                'h.lst': 62596,
            })
            expect('e' in directory).toBe(false)
            const updatedDirectoryTwo = updateDirectory(
                directory,
                '303649 shvgmwn.vhv'
            )
            expect(updatedDirectoryTwo).toEqual({
                'shvgmwn.vhv': 303649,
                f: 29116,
                g: 2557,
                'h.lst': 62596,
            })
            expect('shvgmwn.vhv' in directory).toBe(false)
        })
        it('returns directory if output is of type command', () => {
            const directory = {
                f: 29116,
                g: 2557,
                'h.lst': 62596,
            }
            const updatedFileSystem = updateDirectory(directory, '$ ls')
            expect(updatedFileSystem).toEqual(directory)
        })
    })

    describe('updateFileSystem', () => {
        it('returns updated file system object without modifying the original fileSystem object', () => {
            const fileSystem = {
                '/': {
                    a: {
                        f: 29116,
                        g: 2557,
                        'h.lst': 62596,
                    },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {},
                },
            }
            const updatedFileSystemOne = updateFileSystem(
                fileSystem,
                ['/', 'a'],
                'dir e'
            )
            expect(updatedFileSystemOne).toEqual({
                '/': {
                    a: {
                        e: {},
                        f: 29116,
                        g: 2557,
                        'h.lst': 62596,
                    },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {},
                },
            })
            expect('e' in fileSystem['/'].a).toBe(false)
            const updatedFileSystemTwo = updateFileSystem(
                fileSystem,
                ['/', 'd'],
                '303649 shvgmwn.vhv'
            )
            expect(updatedFileSystemTwo).toEqual({
                '/': {
                    a: {
                        f: 29116,
                        g: 2557,
                        'h.lst': 62596,
                    },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {
                        'shvgmwn.vhv': 303649,
                    },
                },
            })
            expect('shvgmwn.vhv' in fileSystem['/'].d).toBe(false)
        })
        it('throws an error if the path leads to a file or if path is non-existent', () => {
            const fileSystem = {
                '/': {
                    a: {
                        f: 29116,
                        g: 2557,
                        'h.lst': 62596,
                    },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {},
                },
            }
            const path = ['/', 'a', 'f']
            expect(() => updateFileSystem(fileSystem, path, 'dir e')).toThrow(
                'Path leads to a file'
            )
            const pathTwo = ['/', 'a', 'non-existing']
            expect(() =>
                updateFileSystem(fileSystem, pathTwo, 'dir e')
            ).toThrow('Path leads to a non-existing directory')
        })
    })

    describe('buildFileSystem', () => {
        it('returns the correct file system object', () => {
            const output = [
                '$ cd /',
                '$ ls',
                'dir a',
                '14848514 b.txt',
                '8504156 c.dat',
                'dir d',
                '$ cd a',
                '$ ls',
                'dir e',
                '29116 f',
                '2557 g',
                '62596 h.lst',
                '$ cd e',
                '$ ls',
                '584 i',
                '$ cd ..',
                '$ cd ..',
                '$ cd d',
                '$ ls',
                '4060174 j',
                '8033020 d.log',
                '5626152 d.ext',
                '7214296 k',
            ]
            const fileSystem = buildFileSystem(output)
            expect(fileSystem).toEqual({
                '/': {
                    a: { e: { i: 584 }, f: 29116, g: 2557, 'h.lst': 62596 },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {
                        j: 4060174,
                        'd.log': 8033020,
                        'd.ext': 5626152,
                        k: 7214296,
                    },
                },
            })
        })
        it('returns default fileSystem when outputs array is empty', () => {
            expect(buildFileSystem([] as string[])).toEqual({ '/': {} })
        })
    })

    describe('getDirectorySizes', () => {
        it('returns the correct directory sizes', () => {
            const fileSystem = {
                '/': {
                    a: { e: { i: 584 }, f: 29116, g: 2557, 'h.lst': 62596 },
                    'b.txt': 14848514,
                    'c.dat': 8504156,
                    d: {
                        j: 4060174,
                        'd.log': 8033020,
                        'd.ext': 5626152,
                        k: 7214296,
                        e: { b: 584 },
                    },
                },
            }
            const directorySizes = getDirectorySizes(fileSystem)
            directorySizes //?
            expect(directorySizes).toEqual({
                '/': 48381749,
                '/a': 94853,
                '/ae': 584,
                '/d': 24934226,
                '/de': 584,
            })
        })
    })

    describe('getDirectorySizesSumBelowThreshold', () => {
        it('returns the sum of directory sizes below the threshold', () => {
            const output = [
                '$ cd /',
                '$ ls',
                'dir a',
                '14848514 b.txt',
                '8504156 c.dat',
                'dir d',
                '$ cd a',
                '$ ls',
                'dir e',
                '29116 f',
                '2557 g',
                '62596 h.lst',
                '$ cd e',
                '$ ls',
                '584 i',
                '$ cd ..',
                '$ cd ..',
                '$ cd d',
                '$ ls',
                '4060174 j',
                '8033020 d.log',
                '5626152 d.ext',
                '7214296 k',
            ]
            const directorySizes = getDirectorySizesSumBelowThreshold(
                output,
                100_000
            )
            expect(directorySizes).toEqual(95437)
        })
        it('returns part one solution', () => {
            const directorySizes = getDirectorySizesSumBelowThreshold(
                output,
                100_000
            )
            expect(directorySizes).toEqual(1350966)
        })
    })
})
