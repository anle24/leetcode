/**
 * 543. Diameter of Binary Tree
 * Difficulty: Easy
 *
 * Given a binary tree, you need to compute the length of the diameter of the tree.
 * The diameter of a binary tree is the length of the longest path between any two
 * nodes in a tree. The path may or may not pass through the root.
 */

const diameterOfBinaryTree = (root) => {
  let diameter = 0;

  const dfs = (node) => {
    if (!node) return 0;

    const left = dfs(node.left);
    const right = dfs(node.right);

    // update diamter at every node
    diameter = Math.max(diameter, left + right);

    // update the largeest number of edge so far
    return 1 + Math.max(left, right);
  };

  dfs(root);

  return diameter;
};
