import fs from 'fs'

export const getDataSet = <T, U>() =>
    fs
        .readFileSync(
            '/Users/anszeszt2101/GitHub/advent-of-code/src/2022/day2/data.txt',
            'utf8'
        )
        .split('\n')
        .map((d) => d.split(' ')) as [T, U][]
