/**
 * 297. Serialize and Deserialize Binary Tree
 * Difficulty: Hard
 * 
 * Serialization is the process of converting a data structure or object into a sequence of bits
 * so that it can be stored in a file or memory buffer, or transmitted across a network connection
 * link to be reconstructed later in the same or another computer environment.
 * 
 * Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how
 * your serialization/deserialization algorithm should work. You just need to ensure that a binary
 * tree can be serialized to a string and this string can be deserialized to the original tree structure.
 * 
 * Example 1:
 *    1
 *   / \
 *  2   3
 *     / \
 *    4   5
 *  Input: root = [1, 2, 3, null, null, 4, 5]
 *  Ouput: [1, 2, 3, null, null, 4, 5]
 * 
 * Example 2:
 *  Input: root = []
 *  Output: []
 * 
 * Example 3:
 *  Input: root = [1]
 *  Output: [1]
 * 
 * Example 4:
 *  Input: root = [1,2]
 *  Output: [1,2]
 */

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const serialize = root => {
  if (root === 'null') return '';

  let result = [];
  let queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();

    if (node === null) {
      result.push('null');
      continue;
    }

    result.push(node.val);
    queue.push(node.left);
    queue.push(node.right);
  }

  let i = result.length - 1;
  while (result[i] === 'null') {
    result.pop();
    i--;
  }

  return result.toString();
}

const deserialize = data => {
  if (data === '') {
    return null;
  }

  const values = data.split(',');
  const root = new TreeNode(parseInt(values[0]));
  let queue = [root];

  for (let i = 1; i < values.length; i++) {
    const parent = queue.shift();

    if (values[i] !== 'null') {
      const left = new TreeNode(parseInt(values[i]));
      parent.left = left;
      queue.push(left);
    }
    i++;
    if (values[i] !== 'null' && i !== values.length) {
      const right = new TreeNode(parseInt(values[i]));
      parent.right = right;
      queue.push(right);
    }
  }

  return root;
}