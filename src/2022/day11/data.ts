import { MonkeyData } from './day11'

export const testMonkeys: Map<number, MonkeyData> = new Map([
    [
        0,
        {
            items: [79, 98],
            operation: (old: number) => old * 19,
            divider: 23,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 2 : 3,
            numberOfItemsInspected: 0,
        },
    ],
    [
        1,
        {
            items: [54, 65, 75, 74],
            operation: (old: number) => old + 6,
            divider: 19,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 2 : 0,
            numberOfItemsInspected: 0,
        },
    ],
    [
        2,
        {
            items: [79, 60, 97],
            operation: (old: number) => old * old,
            divider: 13,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 1 : 3,
            numberOfItemsInspected: 0,
        },
    ],
    [
        3,
        {
            items: [74],
            operation: (old: number) => old + 3,
            divider: 17,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 0 : 1,
            numberOfItemsInspected: 0,
        },
    ],
])

export const monkeys: Map<number, MonkeyData> = new Map([
    [
        0,
        {
            items: [56, 52, 58, 96, 70, 75, 72],
            operation: (old: number) => old * 17,
            divider: 11,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 2 : 3,
            numberOfItemsInspected: 0,
        },
    ],
    [
        1,
        {
            items: [75, 58, 86, 80, 55, 81],
            operation: (old: number) => old + 7,
            divider: 3,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 6 : 5,
            numberOfItemsInspected: 0,
        },
    ],
    [
        2,
        {
            items: [73, 68, 73, 90],
            operation: (old: number) => old * old,
            divider: 5,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 1 : 7,
            numberOfItemsInspected: 0,
        },
    ],
    [
        3,
        {
            items: [72, 89, 55, 51, 59],
            operation: (old: number) => old + 1,
            divider: 7,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 2 : 7,
            numberOfItemsInspected: 0,
        },
    ],
    [
        4,
        {
            items: [76, 76, 91],
            operation: (old: number) => old * 3,
            divider: 19,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 0 : 3,
            numberOfItemsInspected: 0,
        },
    ],
    [
        5,
        {
            items: [88],
            operation: (old: number) => old + 4,
            divider: 2,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 6 : 4,
            numberOfItemsInspected: 0,
        },
    ],
    [
        6,
        {
            items: [64, 63, 56, 50, 77, 55, 55, 86],
            operation: (old: number) => old + 8,
            divider: 13,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 4 : 0,
            numberOfItemsInspected: 0,
        },
    ],
    [
        7,
        {
            items: [79, 58],
            operation: (old: number) => old + 6,
            divider: 17,
            goesTo: (worryLevel: number, divider: number) =>
                worryLevel % divider === 0 ? 1 : 5,
            numberOfItemsInspected: 0,
        },
    ],
])
