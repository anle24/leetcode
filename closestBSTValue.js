/**
 * 270. Closest Binary Search Tree Value
 * Difficulty: Easy
 * 
 * Given a non-empty binary search tree and a target value, find the value in the BST that
 * is closest to the target.
 * 
 * Note:
 *  Given target value is a floating point.
 *  You are guaranteed to have only one unique value in the BST that is closest to the
 *  target.
 * 
 * Example:
 *  Input: root = [4,2,5,1,3], target = 3.714286
 * 
 *      4
 *     / \
 *    2   5
 *   / \
 *  1   3
 * 
 * Output: 4
 */

const closestValue = (root, target) => {
    let closestVal = root.val;
    let closestDiff = Math.abs(target - root.val); 
    
    const compare = node => {
        if (!node) return;
        
        if (Math.abs(target - node.val) < closestDiff) {
            closestVal = node.val;
            closestDiff = Math.abs(target - node.val);
        }

        if (target < node.val) {
            compare(node.left);
        } else {
            compare(node.right);
        }
    }
    
    compare(root);
    
    return value;
};