/**
 * 257. Binary Tree Paths
 * Difficulty: Easy
 *
 * Given a binary tree, return all root-to-leaf paths.
 * Note: A leaf is a node with no children.
 *
 * Example:
 *  Input:
 *      1
 *     / \
 *    2   3
 *     \
 *      5
 *
 *  Output: ["1->2->5", "1->3"]
 *  Explanation: All root-to-leaf paths are: 1->2->5, 1->3
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
 * @return {string[]}
 */
const binaryTreePaths = (node, s = "", res = []) => {
  if (node === null) return [];
  !node.left && !node.right
    ? ((s += `${node.val}`), res.push(s))
    : (s += `${node.val}->`);
  binaryTreePaths(node.left, s, res);
  binaryTreePaths(node.right, s, res);
  return res;
};
