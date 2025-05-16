
export const ONE_STAR   = '1-star'
export const TWO_STAR   = '2-star'
export const THREE_STAR = '3-star'
export const FOUR_STAR  = '4-star'
export const FIVE_STAR  = '5-star'

export type Distribution = {
  [ONE_STAR]: number
  [TWO_STAR]: number
  [THREE_STAR]: number
  [FOUR_STAR]: number
  [FIVE_STAR]: number
}

export type Solutions = {
  percentageRating: number
  all             : Array<Distribution>
  mostProbable    : Distribution | null
}

export function analyzeDistributions(numberOfReviews: number, averageRating: number): Solutions{

  const percentageRating = Math.round(((averageRating - 1) / 4) * 10000) / 100

  if (averageRating < 1 || averageRating > 5) {
    return { percentageRating, all: [], mostProbable: null }
  }

  const totalPoints = Math.round(averageRating * numberOfReviews)
  const solutions : Array<Distribution> = []

  for (let c1 = 0; c1 <= numberOfReviews; c1++) {
    for (let c2 = 0; c2 <= numberOfReviews - c1; c2++) {
      for (let c3 = 0; c3 <= numberOfReviews - c1 - c2; c3++) {
        for (let c4 = 0; c4 <= numberOfReviews - c1 - c2 - c3; c4++) {
          const c5 = numberOfReviews - (c1 + c2 + c3 + c4)
          if (c1*1 + c2*2 + c3*3 + c4*4 + c5*5 === totalPoints) {
            solutions.push({
              [ONE_STAR]: c1,
              [TWO_STAR]: c2,
              [THREE_STAR]: c3,
              [FOUR_STAR]: c4,
              [FIVE_STAR]: c5
            })
          }
        }
      }
    }
  }

  if (solutions.length === 0) {
    return { percentageRating, all: solutions, mostProbable: null }
  }

  function distanceScore(dist: Distribution): number {
    return [ONE_STAR ,TWO_STAR, THREE_STAR, FOUR_STAR, FIVE_STAR]
      .reduce((sum, key) => {
        const star = parseInt(key, 10)
        return sum + Math.abs(star - averageRating) * dist[key]
      }, 0)
  }

  let mostProbable = solutions[0]
  let bestScore = distanceScore(mostProbable)
  for (const dist of solutions) {
    const score = distanceScore(dist)
    if (score < bestScore) {
      bestScore = score
      mostProbable = dist
    }
  }

  return { percentageRating, all: solutions, mostProbable }
}
