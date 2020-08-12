/**
 * 938. Range Sum of BST
 * Difficulty: Easy
 * 
 * Given the root node of a binary search tree, return the sum of values of all nodes with value
 * between L and R (inclusive).
 * 
 * The binary search tree is guaranteed to have unique values.
 */

/**
 * Solution:
 * use recursion
 */

const rangeSumBST = (root, L, R) => {
    let sum = 0;

    if (root === null) {
        return sum
    }

    // if current val is greater than left bound, keep searching down left branch
    if (root.val > L) {
        sum += rangeSumBST(root.left, L, R);
    }

    // and if current val is within bounds, add to sum
    if (root.val >= L && root.val <= R) {
        sum += root.val;
    }

    // and if current val is less than right bound, keep searching down right branch
    if (root.val < R) {
        sum += rangeSumBST(root.right, L, R);
    }

    return sum;
};

console.log(rangeSumBST(root = [10,5,15,3,7,null,18], L = 7, R = 15));