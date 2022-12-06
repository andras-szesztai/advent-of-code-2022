type Bit = '1' | '0'

export const pivotBinaries = (binaries: string[]) => {
    const pivotedBinaries = binaries.reduce((acc, binary) => {
        binary.split('').forEach((bit, idx) => {
            acc[idx] = acc[idx] ? acc[idx] + bit : bit
        })
        return acc
    }, {} as Record<number, string>)
    return Object.values(pivotedBinaries)
}

export const getBitCount = (bits: Bit[]) => {
    const bitCounts = bits.reduce((acc, bit) => {
        acc[bit] = acc[bit] ? acc[bit] + 1 : 1
        return acc
    }, {} as Record<Bit, number>)
    return bitCounts
}

export const createBinariesFromBitCount = (bitCount: Record<Bit, number>[]) => {
    const newBits = bitCount.reduce(
        (acc, bitCount) => {
            const oneIsGreater = bitCount['0'] < bitCount['1']
            acc[0] = acc[0] + (oneIsGreater ? '0' : '1')
            acc[1] = acc[1] + (oneIsGreater ? '1' : '0')
            return acc
        },
        ['', ''] as [string, string]
    )
    return newBits
}

export const getConsumption = (binaries: string[]) => {
    if (binaries.length === 0) {
        return 0
    }
    const pivotedBinaries = pivotBinaries(binaries)
    const bitCounts = pivotedBinaries.map((binaries) =>
        getBitCount(binaries.split('') as Bit[])
    )
    const newBinaries = createBinariesFromBitCount(bitCounts)
    return parseInt(newBinaries[0], 2) * parseInt(newBinaries[1], 2)
}
