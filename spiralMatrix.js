/**
 * 54. Spiral Matrix
 * Difficulty: Medium
 * 
 * Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order
 */

/**
 * Solution:
 * Decrement the bounds each time you traverse that side
 * Top traversal:
 *  i = left
 *  [top][i] i++ (left to right)
 *  top++ (lowering top bound)
 * Right traversal:
 *  i = top
 *  [i][right] i++ (top to bottom)
 *  right-- (pull in right bound)
 * Bottom traversal:
 *  i = right
 *  [bottom][i] i-- (right to left)
 *  bottom-- (raise bottom bound)
 * Left traversal:
 *  i = bottom
 *  [i][left] i-- (bottom to top)
 *  left++ (push out left bound)
 */
const spiralOrder = matrix => {
    
    const nums = [];

    if (matrix === null || matrix.length === 0) {
        return nums;
    }

    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;
    const totalSize = matrix.length * matrix[0].length;

    while (nums.length < totalSize) {
        for (let i = left; i <= right && nums.length < totalSize; i++) {
            nums.push(matrix[top][i]);
        }
        top++;

        for (let i = top; i <= bottom && nums.length < totalSize; i++) {
            nums.push(matrix[i][right]);
        }
        right--;

        for (let i = right; i >= left && nums.length < totalSize; i--) {
            nums.push(matrix[bottom][i]);
        }
        bottom--;

        for (let i = bottom; i >= top && nums.length < totalSize; i--) {
            nums.push(matrix[i][left]);
        }
        left++;
    }

    return nums;
}