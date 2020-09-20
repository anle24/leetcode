// DEPTH-FIRST-SEARCH TRAVERSAL

const visit = (node) => {
  // process node
  return node;
}

/**
 * In-order traversal
 * 1. visit left branch
 * 2. current node
 * 3. then right branch
 *     4
 *    / \
 *   2   5
 *  / \   \
 * 1   3   6
 * [1, 2, 3, 4, 5, 6]
 */
const inOrderTraversal = (node) => {
  if (node != null) {
    inOrderTraversal(node.left);
    visit(node);
    inOrderTraversal(node.right);
  }
}

/**
 * Pre-order traversal
 * visit current node before its child nodes
 *     4
 *    / \
 *   2   5
 *  / \   \
 * 1   3   6
 * [4, 2, 1, 3, 5, 6]
 */
const preOrderTraversal = (node) => {
  if (node != null) {
    visit(node);
    preOrderTraversal(node.left);
    preOrderTraversal(node.right);
  }
}

/**
 * Post-order traversal
 * visit current node after its child nodes
 *     4
 *    / \
 *   2   5
 *  / \   \
 * 1   3   6
 * [1, 3, 2, 6, 5, 4]
 */
const postOrderTraversal = (node) => {
  if (node != null) {
    postOrderTraversal(node.left);
    postOrderTraversal(node.right);
    visit(node);
  }
}