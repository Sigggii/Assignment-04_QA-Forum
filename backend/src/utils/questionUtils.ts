// TODO: fix type
export const calculateTopAnswerRating = (answers: { ratingAnswer: { rating: number }[] }[]) => {
    const ratings = answers
        .map((answer) => answer.ratingAnswer)
        .map((rating) => calculateAverage(rating.map((rating) => rating.rating)))

    if (ratings.length === 0) return -1

    return Math.max(...ratings)
}

/**
 * Calculate the average of numbers
 * @param numbers average, or -1 if array was empty
 */
const calculateAverage = (numbers: number[]) => {
    if (numbers.length === 0) return -1
    return numbers.reduce((sum, currentValue) => sum + currentValue, 0) / numbers.length
}
