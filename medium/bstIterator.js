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

/**
 * example walkthrough
 *    (7) root      while (root)
 *    / \             stack.push(root)
 *   3   15           root = root.left
 *      /  \
 *     9    20      next() will be left-most val
 * 
 *     7                
 *    / \       stack: [7] => [3]   return root.val = 3   =>   stack: [7]
 *  (3)  15                   [7]
 *      /  \                        root = root.right (null)
 *     9    20
 * 
 *    (7)         hasNext() ? root == null, but stack.length = 1, so true
 *    / \         next()
 *   3   15       while (root) skipped because root == null,
 *      /  \      take root from top of stack
 *     9    20    stack = [7], so root = [7]
 *                root = root.right ([15]), return 7
 * 
 *     7          next()...
 *    / \         while (root)          stack: [15] => [9]    root = [9], result = 9
 *   3  (15)        stack.push(root)                   [15]   root = root.right (null)
 *      /  \        root = root.left
 *    (9)   20                                             => stack: [15]
 * 
 *     7          next()...
 *    / \         while (root) skipped
 *   3  (15)      get root from stack
 *      /  \      root = [15], stack: []
 *     9    20    root = root.right, return 15
 * 
 *     7          next()...             stack: [20]       => []
 *    / \         while (root)          root = stack.pop() = [20]
 *   3   15         stack.push(root)    root = root.right (null), return 20
 *      /  \        root = root.left (null)
 *     9   (20) root
 * 
 *                hasNext() ? root == null and stack is empty, so false
 */

// ["BSTIterator","next","next","hasNext","next","hasNext","next","hasNext","next","hasNext"]
// [[[7,3,15,null,null,9,20]],[null],[null],[null],[null],[null],[null],[null],[null],[null]]

const bst1 = new BSTIterator([7, 3, 15, null, null, 9, 20]);
console.log(bst1.hasNext());
// console.log(BSTIterator([7, 3, 15, null, null, 9, 20]).next());