/**
 * 1428. Leftmost Column with at Least a One
 * Difficulty: Medium
 * 
 * (This problem is an interactive problem.)
 * 
 * A binary matrix means that all elements are 0 or 1. For each individual row of the matrix, 
 * this row is sorted in non-decreasing order.
 * 
 * Given a row-sorted binary matrix binaryMatrix, return leftmost column index(0-indexed) with at least a 1 in it. 
 * If such index doesn't exist, return -1.
 * 
 * You can't access the Binary Matrix directly.  You may only access the matrix using a BinaryMatrix interface:
 * - BinaryMatrix.get(row, col) returns the element of the matrix at index (row, col) (0-indexed).
 * - BinaryMatrix.dimensions() returns a list of 2 elements [rows, cols], which means the matrix is rows * cols.
 * 
 * Submissions making more than 1000 calls to BinaryMatrix.get will be judged Wrong Answer.
 * Also, any solutions that attempt to circumvent the judge will result in disqualification.
 * 
 * For custom testing purposes you're given the binary matrix mat as input in the following four examples. You will not have access the binary matrix directly.
 * 
 * Example 1:
 * [ 0 ][ 0 ]
 * [ 1 ][ 1 ]
 *  Input: mat = [[0, 0], [1, 1]]
 *  Output: 0
 * 
 * Example 2:
 * [ 0 ][ 0 ]
 * [ 0 ][ 1 ]
 *  Input: mat = [[0, 0], [0, 1]]
 *  Output: 1
 * 
 * Example 3:
 * [ 0 ][ 0 ]
 * [ 0 ][ 0 ]
 *  Input: mat = [[0, 0], [0, 0]]
 *  Output: -1
 * 
 * Example 4:
 * [ 0 ][ 0 ][ 0 ][ 1 ]
 * [ 0 ][ 0 ][ 1 ][ 1 ]
 * [ 0 ][ 1 ][ 1 ][ 1 ]
 *  Input: mat = [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 1, 1]]
 *  Output: 1
 */

/**
 * Solution #1:
 * Binary search each row, finding the leftmost 1 of each row
 */
const leftMostColumnWithOne = (binaryMatrix) => {
  let [rows, cols] = binaryMatrix.dimensions();
  let leftmostCol = cols;
  for (let row of rows) {
    let left = 0;
    let right = cols - 1;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (binaryMatrix.get(row, mid) === 0) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    if (binaryMatrix.get(row, left) === 1) {
      leftmostCol = Math.min(leftmostCol, left);
    }
  }

  return leftmostCol === cols ? -1 : leftmostCol + 1;
}

const leftMostColumnWithOneN = binaryMatrix => {
  let [rows, cols] = binaryMatrix.dimensions();
  let currentRow = 0;
  let currentCol = cols - 1;
  while (currentRow < rows && currentCol >= 0) {
    if (binaryMatrix.get(currentRow, currentCol) == 0) {
      currentRow++;
    } else {
      currentCol--;
    }
  }
  
  return (currentCol === cols - 1) ? -1 : currentCol + 1;
}