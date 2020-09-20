/**
 * 785. Is Graph Bipartite?
 * Difficulty: Medium
 *
 * Given an undirected graph, return true if and only if it is bipartite.
 *
 * Recall that a graph is bipartite if we can split its set of nodes into two independent subsets A and B
 * such that every edge in the graph has one node in A and another node in B.
 *
 * The graph is given in the following form: graph[i] is a list of indeces j for which the edge between
 * nodes i and j exists. Each node is an integer between 0 and graph.length - 1. There are no self edges
 * or parallel edges: graph[i] does not contain i, and it doesn't contain any element twice.
 *
 * Example 1:
 *  Input: [[1, 3], [0, 2], [1, 3], [0, 2]]
 */

/**
 * We will use BFS approach
 * First for loop will iterate over every Node listed in the graph
 * It will skip any nodes that have already been set from previous traversals.
 * A node that is not skipped would be a node that is disconnected from any previous traversals
 * Use a stack to process each node's neighbors
 * Set each neighbor to the opposite of current node's bool value
 * If the neighbor has already been visited (exists in map) and its value is not the opposite of the current node's
 * then it is not bipartite, return false
 * @param {*} graph
 */
var isBipartite = function (graph) {
  const colors = new Map();
  const stack = [];

  // traverse the whole graph
  for (let i = 0; i < graph.length; i++) {
    // if the node has already been visited (through neighbor traversal), continue to next node (which would be disconnected from previous traversal)
    if (colors.has(i)) continue;

    // current node will be set to true, and its neighbors will be set to false
    colors.set(i, true);

    // add to stack to process
    stack.push(i);

    // process stack
    while (stack.length > 0) {
      let current = stack.pop();

      // iterate through each of current node's neighbors
      for (let neighbour of graph[current]) {
        if (!colors.has(neighbour)) {
          // if this neighbor node doesn't exist in map, set it as opposite of current node
          colors.set(neighbour, !colors.get(current));
          // add neighbor node to stack to process its neighbors
          stack.push(neighbour);
          continue;
        }

        // if this neighbor already exists in map and it is the same as current, then graph is not bipartite
        if (colors.get(neighbour) === colors.get(current)) return false;
      }
    }
  }

  return true;
};
