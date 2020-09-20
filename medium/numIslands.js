/**
 * 200. Number of Islands
 * Difficulty: Medium
 * 
 * Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded
 * by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four
 * edges of the grid are all surrounded by water.
 * 
 * Example 1:
 *  Input: grid = [
 *    ["1","1","1","1","0"],
 *    ["1","1","0","1","0"],
 *    ["1","1","0","0","0"],
 *    ["0","0","0","0","0"]
 *  ]
 *  Output: 1
 * 
 * Example 2:
 *  Input: grid = [
 *    ["1","1","0","0","0"],
 *    ["1","1","0","0","0"],
 *    ["0","0","1","0","0"],
 *    ["0","0","0","1","1"]
 *  ]
 *  Output: 3
 */

/**
 * DFS
 * When hitting land ('1'), use DFS to visit all of its neighbors until we break out by hitting surrounding water ('0')
 * Mark elements as visited by "sinking" them (setting to '0').
 * Each time dfs is triggered on unvisited land ('1'), it will return just 1 for the whole recursive stack.
 * This means one full dfs recursion is traversing one full island.
 * @param {grid[][]} grid 
 */
const numIslands = (grid) => {
  if (grid == null || grid.length == 0) return 0;

  // keep track of the number of islands
  let islandCount = 0;

  // we need to visit each element in the grid, but only need to perform dfs if we encounter a '1'
  // this is further reduced when reaching visited elements from a previous dfs because they are set to '0' when visited
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '1') {
        islandCount += dfs(grid, i, j);
      }
    }
  }

  return islandCount;
}

const dfs = (grid, i, j) => {
  // if we've reached outside the grid or [i][j] is not part of an island
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] == '0') {
    return 0;
  }

  // we will mark a location as visited by "sinking" it, setting to '0'
  grid[i][j] = '0';

  // recurse on all of its neighbors (up, down, left, right)
  dfs(grid, i + 1, j);
  dfs(grid, i - 1, j);
  dfs(grid, i, j + 1);
  dfs(grid, i, j - 1);

  // regardless of the depth of dfs, we only return 1 because it will all count as just 1 island
  // we break out of dfs when all neighbors have been visited, thus completing 1 whole island
  return 1;
}

const grid1 = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"]
]

console.log(numIslands(grid1));