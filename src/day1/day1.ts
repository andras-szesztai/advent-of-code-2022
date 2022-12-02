export const sumCalories = (calories: number[]) => {
    if (calories.length === 0) {
        return 0
    }
    return calories.reduce((a, b) => a + b)
}

export const getHighestNCalorieSums = (caloriesArrays: number[][], n = 1) => {
    if (caloriesArrays.length === 0 || n < 1) {
        return 0
    }
    const summedCaloriesArray = caloriesArrays.map(sumCalories)
    if (n > 1) {
        return summedCaloriesArray
            .sort((a, b) => b - a)
            .slice(0, n)
            .reduce((a, b) => a + b)
    }
    return summedCaloriesArray.reduce((a, b) => Math.max(a, b))
}
