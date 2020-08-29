/**
 * 13. Binary Search Tree Iterator
 * Difficulty: Medium
 *
 * Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.
 * Calling next() will return the next smallest number in the BST.
 *
 * Example:
 *     7
 *    / \
 *   3   15
 *      /  \
 *     9    20
 *
 *  BSTIterator iterator = new BSTIterator(root);
 *  iterator.next();    // return 3
 *  iterator.next();    // return 7
 *  iterator.hasNext(); // return true
 *  iterator.next();    // return 9
 *  iterator.hasNext(); // return true
 *  iterator.next();    // return 15
 *  iterator.hasNext(); // return true
 *  iterator.next();    // return 20
 *  iterator.hasNext(); // return false
 */

/**
 * Flatten BST Solution
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
function BSTIterator(root) {
  var stack = [];

  function hasNext() {
    return root || stack.length;
  }

  function next() {
    // we add each node to the stack as we move left 
    while (root) {
      stack.push(root);
      root = root.left;
    }
    /**
     * root is either last node we reached while traversing left in above loop
     * or if root = root.right == null from previous next(), then it is the
     * top node in the stack, which would be the parent node
     */
    root = stack.pop();
    var result = root.val;
    root = root.right;
    return result;
  }
  return {
    hasNext,
    next
  };
}

// ["BSTIterator","next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]
// [[[7,3,15,null,null,9,20]],[null],[null],[null],[null],[null],[null],[null],[null],[null]]

const bst1 = new BSTIterator([7, 3, 15, null, null, 9, 20]);
console.log(bst1.hasNext());
// console.log(BSTIterator([7, 3, 15, null, null, 9, 20]).next());