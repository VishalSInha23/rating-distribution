# Rating distribution
Calculates rating distribution and actual rating in percentage.

Typescript code generated using `tsc --target esnext rating-distribution.ts`.

Use the `analyzeDistributions` function to obtain the various rating distributions, the actual percentage score, and the most probable distribution. 
```
const solution = analyzeDistributions(numberOfReviews, averageRating)
console.log('Percentage rating:', solution.percentageRating, '%')
console.table(solution.all)
console.log('Most probable distribution:', solution.mostProbable)
```