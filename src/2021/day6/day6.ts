import { sum } from '../../utils/utils'

export const countFishByInternalTimer = (fishTimers: number[]) => {
    let filteredFishTimers = [...fishTimers]
    const fishByTimer = new Map(
        Array.from(Array(9).keys()).map((key) => {
            filteredFishTimers = fishTimers.filter((timer) => timer !== key)
            return [key, fishTimers.length - filteredFishTimers.length]
        })
    )
    return fishByTimer
}

const updateFishByTimer =
    (copiedMap: Map<number, number>) =>
    (count: number, key: number, map: Map<number, number>) => {
        if (key === 0) {
            map.set(6, count)
        }
        if (key === 6) {
            map.set(key, count + map.get(key + 1)!)
            return
        }
        if (key === 8) {
            map.set(key, copiedMap.get(0)!)
            return
        }
        map.set(key, copiedMap.get(key + 1)!)
    }

export const getFishCountForNumberOfDays = (
    fishTimers: number[],
    numberOfDays: number
) => {
    const fishByTimer = countFishByInternalTimer(fishTimers)
    for (let i = 0; i < numberOfDays; i++) {
        const copiedFishByTimer = new Map(fishByTimer)
        fishByTimer.forEach(updateFishByTimer(copiedFishByTimer))
    }
    return sum(Array.from(fishByTimer.values()))
}
