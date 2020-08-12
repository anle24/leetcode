/**
 * 73. Set Matrix Zeroes
 * Difficulty: Medium
 * 
 * Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
 * 
 * Example 1:
 *  Input:
 *  [
 *      [1, 1, 1],
 *      [1, 0, 1],
 *      [1, 1, 1]
 *  ]
 *  Output:
 *  [
 *      [1, 0, 1],
 *      [0, 0, 0],
 *      [1, 0, 1]
 *  ]
 * 
 *  Example 2:
 *  Input:
 *  [
 *      [0, 1, 2, 0],
 *      [3, 4, 5, 2],
 *      [1, 3, 1, 5]
 *  ]
 *  Output:
 *  [
 *      [0, 0, 0, 0],
 *      [0, 4, 5, 0],
 *      [0, 3, 1, 0]
 *  ]
 */

const setZeroes = matrix => {
    if (matrix.length === 0) return matrix;
    const m = matrix.length;
    const n = matrix[0].length;
    const xSet = new Set();
    const ySet = new Set();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                xSet.add(j);
                ySet.add(i);
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (xSet.has(j) || ySet.has(i)) {
                matrix[i][j] = 0;
            }
        }
    }

    return matrix;
}