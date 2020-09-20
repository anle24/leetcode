/**
 * 114. Flatten Binary Tree to Linked List
 * Difficulty: Medium
 * 
 * Given a binary tree, flatten it to a linked list in-place
 * For example, given the following tree:
 * 
 *     1
 *    / \
 *   2   5
 *  / \   \
 * 3   4   6
 * The flattened tree should look like:
 * 
 * 1
 *  \
 *   2
 *    \
 *     3
 *      \
 *       4
 *        \
 *         5
 *          \
 *           6
 */

/**
 * Solution:
 * 
 * Recursion
 * At each node (root), we connect its root.left to root.right, and then the former root.right
 * will be connected to the former root.left's right-most node.
 * Then we recurse onto root.right (formerly root.left if it exists)
 * 
 *             (1) root
 *             / \
 * root.left (2) (5) root.right
 *           / \   \
 *          3  (4)  6
 *             last
 * 
 * tmp = root.right
 * root.right = root.left
 * root.left = null
 * 
 *     1 root.right = root.left    1
 *      \       tmp                 \
 *      (2)     (5)        =>        2
 *      / \       \                 / \
 *     3  (4)      6               3  (4)
 *        last                          \  last.right = tmp
 *                                      (5)
 *                                        \
 *                                         6
 * 
 * then call again with (new) root.right
 * 
 *       1                          tmp = root.right        1
 *        \                           (4)                    \
 *        (2) root                      \                     2
 *        / \                            5                     \
 *      (3)  4           =>     1         \             =>      3     
 * root.left  \                  \         6                     \
 *   & last    5                 (2)                              4
 *              \                  \ root.right = root.left        \
 *               6                 (3)                              5
 *                                                                   \
 *                                                                    6
 * since root.left == null, continue all the way down root.right
 * until root == null, ending the recursion stack.
 * 
 * @param {Node} root 
 */
const flatten = (root) => {
  if (root === null) return;
  if (root.left) {
    // step 1
    let last = root.left;
    while (last.right !== null) last = last.right;
    // step 2
    const tmp = root.right;
    // step 3
    root.right = root.left;
    // step 4
    last.right = tmp;
    // step 5
    root.left = null
  }

  flatten(root.right);
}