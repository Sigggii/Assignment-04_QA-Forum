import { QuestionPreviewData } from '../types/api-types'
import { SearchFilter } from '../../core/services/search.service'

/**
 * Filter questions based on the search filter
 *
 * @param questions List of questions to filter
 * @param filter Search filter to apply
 *
 * @returns Filtered list of questions
 */
export const filterQuestions = (
    questions: QuestionPreviewData[],
    filter: SearchFilter
): QuestionPreviewData[] => {
    return questions
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .sort((a, b) => {
            switch (filter.sort) {
                case 'newest':
                    return 0 // already sorted before
                case 'highestScore':
                    return b.score - a.score
                case 'mostAnswers':
                    return b.answerCount - a.answerCount
            }
        })
        .filter(question => {
            if (filter.tags.length > 0) {
                if (
                    !question.tags.some(tag => filter.tags.includes(tag.name))
                ) {
                    return false
                }
            }

            if (filter.filter === 'answered' && question.answerCount === 0) {
                return false
            } else if (
                filter.filter === 'unanswered' &&
                question.answerCount > 0
            ) {
                return false
            }

            return true
        })
}
