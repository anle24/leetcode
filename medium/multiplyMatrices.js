/**
 * 311. Sparse Matrix Multiplication
 * Difficulty: Medium
 * 
 * Given two sparse matrices A and B, return the result of AB.
 * You may assume that A's column number is equal to B's row number.
 * 
 * Example:
 *  Input:
 *    A = [
 *          [ 1, 0, 0],
 *          [-1, 0, 3]
 *        ]
 *    B = [
 *          [7, 0, 0],
 *          [0, 0, 0],
 *          [0, 0, 1]
 *        ]
 * 
 *  Output:
 *          |  1 0 0 |   | 7 0 0 |   |  7 0 0 |
 *    AB =  | -1 0 3 | x | 0 0 0 | = | -7 0 3 |
 *                       | 0 0 1 |
 */

/**
 * To multiply matrices, you use dot product
 * 
 * using above example:
 *  Multiply A rows by B columns
 *                | 7 - - |     A[0][0] * B[0][0] = 1 * 7 = 7
 *  | 1 0 0 |  x  | 0 - - |  =  A[0][1] * B[1][0] = 0 * 0 = 0  =  7
 *  | - - - |     | 0 - - |     A[0][2] * B[2][0] = 0 * 0 = 0
 * 
 *  7 + 0 + 0 = 7, so first element of answer matrix is 7
 *  | 7 _ _ |
 *  | _ _ _ |
 * 
 *  then move on to multiply same A[0] elements with B[0][1], B[1][1], B[2][1]
 *                | - 0 - |     0
 *  | 1 0 0 |  x  | - 0 - |  =  0  =  0
 *  | - - - |     | - 0 - |     0
 * 
 *  which = 0, and will then be second element of answer matrix
 *  | 7 0 _ |
 *  | _ _ _ |
 * 
 *  after completing to last index of each B array, continue to next array in A:
 *  |  - - - |     | 7 - - |
 *  | -1 0 3 |  x  | 0 - - |
 *                 | 0 - - |
 * 
 *  etc..
 * 
 * Important note:
 *  Problem mentions SPARSE matrices, which means the matrices have a lot of zeroes
 *  This may hint that we may need to account for the matrices possibly being very large
 *  Part of the answer would need to consider efficiency in handling these zeroes
 * 
 * So we will use maps to store the indeces of only non-zero values so we can skip
 * processing any 0 values
 * 
 * @param {matrix} A 
 * @param {matrix} B 
 */
const multiply = (A, B) => {
  /**
   * A: m * n
   * B: n * p
   * AB => m * p
   * Time: O(mnp)
   * Space: O(1)
   * 
   * // [1, 0, 0], Map([0, 1])
   * // [7, 0, 7], Map([0, 7])
   */

  const m = A.length;

  if (m === 0) return [];

  const n = A[0].length;
  const p = B[0].length;

  // instantiate result matrix with 0's
  const result = new Array(m).fill(0).map(_ => new Array(p).fill(0));

  // crush the matrix into more concise format, array of maps instantiated with 0's
  const crushedA = new Array(m).fill(0).map(_ => new Map());
  const crushedB = new Array(p).fill(0).map(_ => new Map());

  /**
   * fill crushedA by mapping non-zero values to their index j in A[i], in the map at crushedA[i]
   * Example:
   *  [[ 1, 0, 0],  becomes   [ Map{ 0->1 }           // Map of A[0][j]
   *   [-1, 0, 3]]              Map{ 0->-1, 2->3 } ]  // Map of A[1][j]
   * 
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (A[i][j]) {
        crushedA[i].set(j, A[i][j]);
      }
    }
  }

  /**
   * fill crushedB similary except Maps will have the vertical (index j) relation
   * mapping non-zero values to their index i, in the map at crushedB[j]
   * Example:
   *  [[7, 0, 0],             [ Map{ 0->7 },    // Map of B[i][0]
   *   [0, 0, 0],   becomes     Map{},          // Map of B[i][1]
   *   [0, 0, 1]]               Map{ 2->1 } ]   // Map of B[i][2]
   */
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < p; j++) {
      if (B[i][j]) {
        crushedB[j].set(i, B[i][j])
      }
    }
  }

  // multiply maps from crushedA and crushedB
  const mapMultiply = (mapA, mapB) => {
    // if either map is empty, that means it was all 0's
    // so everything will multiply to 0, so sum will be 0
    if (mapA.size === 0 || mapB.size === 0) return 0;

    let sum = 0;
    let first = mapA;
    let second = mapB;
    // iterate by smallest map since it is the limiting factor
    if (mapA.size > mapB.size) {
      first = mapB;
      second = mapA;
    }

    for (let [index, num] of first) {
      // if second map has a non-zero value at the same index, multiply and add to sum
      if (second.has(index)) {
        sum += num * second.get(index);
      }
    }
    return sum;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      // get dot product at each index
      result[i][j] = mapMultiply(crushedA[i], crushedB[j]);
    }
  }

  return result;
}

const mOne = [
  [1, 0, 0],
  [-1, 0, 3]
];

const mTwo = [
  [7, 0, 0],
  [0, 0, 0],
  [0, 0, 1]
];

console.log(multiply(mOne, mTwo));