import { sum } from '../../utils/utils'

export type Packet = number[] | Packet[] | number

export const getOrderedPacketIndicesSum = (
    packets: [Packet[], Packet[]][]
): number => {
    const orderedPacketIndices: number[] = []
    packets.forEach((packetPair, index) => {
        if (analyzePackets(...packetPair)) {
            orderedPacketIndices.push(index + 1)
        }
    })
    return sum(orderedPacketIndices)
}

const getLongerArrayLength = (packetLeft: Packet[], packetRight: Packet[]) => {
    return packetLeft.length > packetRight.length
        ? packetLeft.length
        : packetRight.length
}

const isUndefined = <T>(value: T | undefined): value is undefined => {
    return value === undefined
}

export const analyzePackets = (
    packetLeft: Packet[],
    packetRight: Packet[]
): boolean => {
    let isOrdered = undefined
    let i = 0
    while (
        isUndefined(isOrdered) &&
        i < getLongerArrayLength(packetLeft, packetRight)
    ) {
        const left = packetLeft[i]
        const right = packetRight[i]
        if (
            (Array.isArray(left) || Array.isArray(right)) &&
            !isUndefined(right) &&
            !isUndefined(left)
        ) {
            if (Array.isArray(left) && Array.isArray(right)) {
                isOrdered = analyzePackets(left, right)
            }
            if (Array.isArray(left) && !Array.isArray(right)) {
                isOrdered = analyzePackets(left, [right])
            }
            if (!Array.isArray(left) && Array.isArray(right)) {
                isOrdered = analyzePackets([left], right)
            }
        } else {
            if (isUndefined(right) || left > right) {
                isOrdered = false
            }
            if (isUndefined(left) || left < right) {
                isOrdered = true
            }
        }
        i++
    }
    return isUndefined(isOrdered) ? true : isOrdered
}
