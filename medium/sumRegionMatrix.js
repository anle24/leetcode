/**
 * 304. Range Sum Query 2D - Immutable
 * Difficulty: Medium
 * 
 * Given a 2D matrix "matrix", find the sum of the elements inside the rectangle defined by
 * its upper left corner (row1, col1) and lower right corner (row2, col2)
 * 
 *  3   0   1   4   2
 *  5  _6___3___2_  1
 *  1 | 2   0   1 | 5
 *  4 | 1   0   1 | 7
 *  1 |_0___3___0_| 5
 * 
 *  the above rectangle is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3),
 *  which contains sum = 8
 * 
 * Example:
 *  Given matrix = [
 *    [3, 0, 1, 4, 2],
 *    [5, 6, 3, 2, 1],
 *    [1, 2, 0, 1, 5],
 *    [4, 1, 0, 1, 7],
 *    [1, 0, 3, 0, 5]
 *  ]
 * 
 *  sumRegion(2, 1, 4, 3) -> 8
 *  sumRegion(1, 1, 2, 2) -> 11
 *  sumRegion(1, 2, 2, 4) -> 12
 */

/**
 * We will apply the same sum - previous sum logic we have used for 1D arrays for this 2D matrix
 * We create a separate sum matrix which stores the total sum from top-left corner (0, 0) to each
 * bottom-right corner (i, j). For a desired region (r1, c1, r2, c2), we will get the sum at (r2, c2),
 * which would be the total sum for (0, 0, r2, c2), and then subtract the regions (0, 0, r1, c2) and
 * (0, 0, r2, c1), then adding back the overlapped section that was subtracted twice, to get the sum
 * of (r1, c1, r2, c2)
 * 
 * Using the above example, looking for the sum of this region (added indeces):
 *    __0___1___2___3___4
 *  0|  3   0   1   4   2
 *  1|  5  _6___3___2_  1
 *  2|  1 | 2   0   1 | 5
 *  3|  4 | 1   0   1 | 7
 *  4|  1 |_0___3___0_| 5
 * 
 * We create a sum matrix "sum"
 * We instantiate the sum matrix by inserting an extra row & col at the 0th row & col,
 * which would then be a sum matrix sized (matrix rows + 1) x (matrix cols + 1).
 * This is so that when we are looking for the sum of a region that includes the
 * 0 index, we have defined 0 vals to subtract from instead of getting an error
 * when trying to subtract the undefined areas at negative index
 *       __0___1___2___3___4___5
 *      0| 0   0   0   0   0   0
 *      1| 0
 * sum: 2| 0
 *      3| 0
 *      4| 0
 *      5| 0
 * 
 * we use the formula sum[i][j] = sum[i - 1][j] + sum[i][j - 1] + matrix[i - 1][j - 1] - sum[i - 1][j - 1]
 * to get the sum at each (i, j). The concept behind this formula is that to get the sum at (i, j),
 * we add two sums we have already previously calculated (i, j - 1) and (i - 1, j) plus the value at (i, j)
 * and then subtract the overlap.
 * 
 * Assume we have calculated and recorded the sums up to just before (1, 1) already.
 *    __0___1___2___3___4
 *  0|  3   0 | 1   4   2
 *  1|__5__(6)| 3   2   1
 *  2|  1   2   0   1   5
 *  3|  4   1   0   1   7
 *  4|  1   0   3   0   5
 * 
 * To get the sum at (1, 1), we get the sum of the region above (0, 1)
 *    __0___1___2___3___4
 *  0|__3___0_| 1   4   2
 *  1|  5  (6)  3   2   1   which is 3 (3 + 0)
 *  2|  1   2   0   1   5   but was already calculated and stored earlier
 *  3|  4   1   0   1   7   at sum[1][2]
 *  4|  1   0   3   0   5
 * 
 * Plus the region to the left (1, 0)
 *    __0___1___2___3___4
 *  0|  3 | 0   1   4   2
 *  1|__5_|(6)  3   2   1   which is 8 (3 + 5)
 *  2|  1   2   0   1   5   again, calculated and stored earlier
 *  3|  4   1   0   1   7   at sum[2][1]
 *  4|  1   0   3   0   5
 * 
 * Plus the actual value at (i, j) which is 6
 * and then subtract the overlap, which was 3 at (0, 0)
 * thus, sum[i][j] = sum[i - 1][j] + sum[i][j - 1] + matrix[i - 1][j - 1] - sum[i - 1][j - 1]
 * 
 * so then our sum matrix gets filled out as:
 *       __0___1___2___3___4___5
 *      0| 0   0   0   0   0   0
 *      1| 0   3   3   4   8  10
 * sum: 2| 0   8  14  18  24  27 
 *      3| 0   9  17  21  28  36
 *      4| 0  13  22  26  34  49
 *      5| 0  14  23  30  38  58
 * 
 * to get the sum of the following region:
 *    __0___1___2___3___4
 *  0|  3   0   1   4   2
 *  1|  5  _6___3___2_  1
 *  2|  1 | 2   0   1 | 5
 *  3|  4 | 1   0   1 | 7
 *  4|  1 |_0___3___0_| 5
 * 
 * We need the following sums:
 *  totalSum at (r2, c2)         topSum at (r1, c2)       leftSum at (r2, c1)             overlap
 *    __0___1___2___3___4       __0___1___2___3___4       __0___1___2___3___4        __0___1___2___3___4
 *  0|  3   0   1   4 | 2     0|  3   0   1   4 | 2     0|  3 | 0   1   4   2     0|  3 | 0   1   4   2
 *  1|  5   6   3   2 | 1     1|__5___6___3___2_| 1     1|  5 | 6   3   2   1     1|__5_| 6   3   2   1
 *  2|  1   2   0   1 | 5     2|  1   2   0   1   5     2|  1 | 2   0   1   5     2|  1   2   0   1   5
 *  3|  4   1   0   1 | 7     3|  4   1   0   1   7     3|  4 | 1   0   1   7     3|  4   1   0   1   7
 *  4|__1___0___3___0_| 5     4|  1   0   3   0   5     4|__1_| 0   3   0   5     4|  1   0   3   0   5
 * 
 *        __0___1___2___3___4___5
 *      0|  0   0   0   0   0   0
 *      1|  0   3   3   4   8  10   topSum:   24
 * sum: 2|  0  (8) 14__18_(24) 27   leftSum:  14
 *      3|  0   9 |17  21  28 |36   totalSum: 38
 *      4|  0  13 |22  26  34 |49   overlap:   8
 *      5|  0 (14)|23__30_(38)|58
 * 
 *  so then sum = totalSum - topSum - leftSum + overlap
 *  sum = 38 - 24 - 14 + 8 = 8
 *  we add overlap back in because its sum was subtracted twice, once in topSum, again in leftSum
 *  checking against the actual sum from the values inside the region
 *  (2 + 0 + 1) + (1 + 0 + 1) + (0 + 3 + 0) = 8, it matches!
 * 
 *  formula:
 *  sum[row2][col2] - sum[row1 - 1][col2] - sum[row2][col1 - 1] + sum[row1 - 1][col1 - 1]
 * 
 * @param {[[]]} matrix 
 */
var NumMatrix = function (matrix) {
  let row = 0
  let col = 0;
  if (matrix.length != 0) {
    row = matrix.length;
    col = matrix[0].length;
  }

  // initiate the sum matrix with +1 row and col for the new 0th index row/col, filled with 0s
  this.sum = new Array(row + 1).fill(0).map(_ => new Array(col + 1).fill(0));

  // fill in sums at each (i, j) using formula topSum + leftSum + valueAt(i, j) - overlap
  for (let i = 1; i < this.sum.length; i++) {
    for (let j = 1; j < this.sum[i].length; j++) {
      this.sum[i][j] = this.sum[i - 1][j] + this.sum[i][j - 1] + matrix[i - 1][j - 1] - this.sum[i - 1][j - 1]
    }
  }
}

NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  /**
   * increment each index because their corresponding sum values in the sum matrix are at +1 index
   * since we added the extra 0th row and col
   */
  row1++;
  col1++;
  row2++;
  col2++;
  // get sum by totalSumAt(r2, c2) - topSum - leftSum + overlap
  return this.sum[row2][col2] - this.sum[row1 - 1][col2] - this.sum[row2][col1 - 1] + this.sum[row1 - 1][col1 - 1];
}

const matrix1 = new NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]);

console.log(matrix1.sumMatrix);

console.log(matrix1.sumRegion(2, 1, 4, 3));