/**
 * 62. Unique paths
 * Difficulty: Medium
 *
 * A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
 * The robot can only move either down or right at any point in time. The robot is trying to reach
 * the bottom-right corner of the grid (marked 'Finish' in the diagram below).
 *
 * How many possible unique paths are there?
 */

/**
 * Solution:
 * Calculate how many possible paths at each spot. Each spot can only be reached by the spot above,
 * and the spot to the left. So the total number of possible paths for each spot is the total paths
 * for the spot above plus the total paths for the spot to the left.
 *
 * Since any given can only be reached from above or left, then every spot in the top row and the
 * left column has only one possible path: straight right or down
 *
 *  [
 *      [1, 1, 1, 1]
 *      [1, _, _, _]
 *      [1, _, _, x]
 *  ]
 */

const uniquePaths = (m, n) => {
  const matrix = [];
  for (let i = 0; i < m; i++) {
    // create empty n-length array
    const array = new Array(n);
    // set index 0 aka left side of grid to 1
    array[0] = 1;
    // push to empty matrix m times to create m x n matrix
    matrix.push(array);
  }
  for (let i = 0; i < n; i++) {
    // set
    matrix[0][i] = 1;
  }
  /* start at index 1 and iterate over matrix, getting the total possibilities at any given spot by
    adding the total from above and the left */
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      matrix[i][j] = matrix[i - 1][j] + matrix[i][j - 1];
    }
  }

  // the bottom right spot should have the grand total
  return matrix[m - 1][n - 1];
};
