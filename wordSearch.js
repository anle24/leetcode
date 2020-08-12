/**
 * 79. Word Search
 * Difficulty: Medium
 * 
 * Given a 2D board and a word, find if the word exists in the grid.
 * 
 * The word can be constructed from letters of sequentially adjacent cell,
 * where "adjacent" cells are those horizontally or vertically neighboring.
 * The same letter cell may not be used more than once
 * 
 * Example:
 *  board =
 *  [
 *      ['A','B','C','E'],
 *      ['S','F','C','S'],
 *      ['A','D','E','E']
 *  ]
 * 
 *  Given word = "ABCCED", return true.
 *  Given word = "SEE", return true.
 *  Given word = "ABCB", return false.
 */

/**
 * Solution:
 * Time Complexity: O(mn * 4^l), l = word.length
 * Space Complexity: O(mn + l)
 */
const exist = (board, word) => {
    if (board.length === 0) return false;
  
    const h = board.length;
    const w = board[0].length;
    const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  
    const go = (x, y, k) => {
        console.log(`looking for ${word[k]} of ${word}...`);
        if (board[x][y] !== word[k]) {
            console.log(`[${x}][${y}]:${board[x][y]} is NOT ${word[k]}`);
            return false;
        }
        console.log(`[${x}][${y}]:${board[x][y]} IS ${word[k]}!`);
        if (k === word.length - 1) {
            console.log("this is the last letter we're looking for, returning true");
            return true;
        }
    
        board[x][y] = '*'; // mark as visited
        console.log(board);
        for (const [dx, dy] of dirs) {
            const i = x + dx;
            const j = y + dy;
            if (i >= 0 && i < h && j >= 0 && j < w) {
                if (go(i, j, k + 1)) {
                    board[x][y] = word[k]; // reset
                    return true;
                }
            }
        }
        board[x][y] = word[k]; // reset
        console.log('resetting board...', board);        return false;
    };
  
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        if (go(i, j, 0)) return true;
      }
    }
  
    return false;
};

const board = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
  ];
const words = ["ABCCED", "SEE", "ABCB"];

words.forEach(word => exist(board, word));

