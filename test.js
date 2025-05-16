import { analyzeDistributions, ONE_STAR, TWO_STAR, THREE_STAR, FOUR_STAR, FIVE_STAR } from './rating-distribution.js'

const AVERAGE_RATING = 'Average Rating'

function analyzeDistributionOutput(numberOfReviews, averageRating) {
    console.log()
    console.log('=========================')
    console.log('Number of reviews:', numberOfReviews)
    console.log('Average rating:', averageRating)
    console.log('=========================')
    console.log()
    console.log('Total points:', Math.round(averageRating * numberOfReviews))
    const solution = analyzeDistributions(numberOfReviews, averageRating)
    console.log('Percentage rating:', solution.percentageRating + '%')
    const distributions = solution.all.map(dist => testDistribution(dist))
    console.log('Distributions:', solution.all.length, 'combinations')
    console.table(distributions)
    console.log('Most probable distribution:', solution.mostProbable)
    console.log('=========================')
    console.log()
}

function testDistribution(dist) {
    const total = dist[ONE_STAR] + dist[TWO_STAR] + dist[THREE_STAR] + dist[FOUR_STAR] + dist[FIVE_STAR]
    const avg = Math.round((dist[ONE_STAR] * 1 + dist[TWO_STAR] * 2 + dist[THREE_STAR] * 3 + dist[FOUR_STAR] * 4 + dist[FIVE_STAR] * 5) / total * 10000) / 10000
    return {
        [ONE_STAR]      : dist[ONE_STAR],
        [TWO_STAR]      : dist[TWO_STAR],
        [THREE_STAR]    : dist[THREE_STAR],
        [FOUR_STAR]     : dist[FOUR_STAR],
        [FIVE_STAR]     : dist[FIVE_STAR],
        [AVERAGE_RATING]: avg
    }
}

// test cases
analyzeDistributionOutput(5, 4.2)
analyzeDistributionOutput(27, 4.0)
analyzeDistributionOutput(19, 3.3)
analyzeDistributionOutput(50, 5.0)
analyzeDistributionOutput(10, 4.5)