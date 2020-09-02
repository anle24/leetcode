/**
 * 133. Clone Graph
 * Difficulty: Medium
 * 
 * Given a reference of a node in a connected undirected graph.
 * Return a deep copy (clone) of the graph.
 * Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.
 * 
 *  class Node {
 *    public int val;
 *    public List<Node> neighbors;
 *  }
 * 
 * Test case format:
 * For simplicity sake, each node's value is the same as the node's index (1-indexed).
 * For example, the first node with val = 1, the second node with val = 2, and so on.
 * The graph is represented in the test case using an adjacency list.
 * 
 * Adjacency list is a collection of unordered lists used to represent a finite graph.
 * Each list describes the set of neighbors of a node in the graph.
 * 
 * The given node will always be the first node with val = 1. You must return the copy
 * if the given node as a reference to the cloned graph.
 * 
 * Example 1:
 *                1 - 2
 *          !==   |   | (same graph)
 *                4 - 3
 * 
 *  1 - 2         1 - 2
 *  |   |   ==    |   | (copy)
 *  4 - 3         4 - 3
 * 
 *                1 - 3
 *          !==   |   | (cloned nodes but graph is messed up)
 *                4 - 2
 * 
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
 * Explanation: There are 4 nodes in the graph.
 *              1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
 *              2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
 *              3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
 *              4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
 * 
 * Example 3:
 *  Input: adjList = []
 *  Output: []
 *  Explanation: This an empty graph, it does not have any nodes.
 * 
 * Example 4:
 *  1 - 2
 * Input: adjList = [[2],[1]]
 * Output: [[2],[1]]
 */

const cloneGraph = (node) => {

  /**
   * visited Map will have format
   *  {
   *    node.val: new Node { val: node.val, neighbors: [] }
   *  }
   */
  const visited = {};

  // DFS recursion
  let dfs = function (node) {
    // base case 1
    if (!node) return node;

    // base case 2: reference to node (by node.val) exists in map
    if (visited[node.val] != null) return visited[node.val];

    // create new Node with node.val
    let root = new Node(node.val);

    // add to map since it doesn't exist
    visited[node.val] = root;

    // recurse on each original node's neighbors
    for (let n of node.neighbors) {
      root.neighbors.push(dfs(n));
    }

    return root;
  }

  return dfs(node);
};