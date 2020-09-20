/**
 * 211. Design Add and Search Words Data Structure
 * Difficulty: Medium
 * 
 * Design a data structure that supports adding new words and finding if a string matches any previously added string.
 * 
 * Implement the WordDictionary class:
 * - WordDictionary() Initializes the object.
 * - void addWord(word) Adds word to the data structure, it can be matched later.
 * - bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. 
 *   word may contain dots '.' where dots can be matched with any letter.
 * 
 * Example:
 * Input
 *  ["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
 *  [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
 * 
 * Output
 *  [null,null,null,null,false,true,true,true]
 * 
 * Explanation
 *  WordDictionary wordDictionary = new WordDictionary();
 *  wordDictionary.addWord("bad");
 *  wordDictionary.addWord("dad");
 *  wordDictionary.addWord("mad");
 *  wordDictionary.search("pad"); // return False
 *  wordDictionary.search("bad"); // return True
 *  wordDictionary.search(".ad"); // return True
 *  wordDictionary.search("b.."); // return True
 * 
 * Constraints:
 * - 1 <= word.length <= 500
 * - word in addWord consists lower-case English letters.
 * - word in search consist of  '.' or lower-case English letters.
 * - At most 50000 calls will be made to addWord and search.
 */

/**
 * Initialize your data structure here.
 */
class Node {
  constructor() {
    this.keys = new Map();
    this.end = false
  }

  setEnd() {
    this.end = true;
  }

  isEnd() {
    return this.end;
  }
}

const WordDictionary = function () {
  this.root = new Node();
}

WordDictionary.prototype.addWord = function (word) {
  let node = this.root;

  // recursive function
  function rec(node, word) {
    // if word or substr isn't empty
    if (word) {
      // if next char doesn't exist in current node's map, add it
      if (!node.keys.has(word[0])) {
        node.keys.set(word[0], new Node());
      }

      // make next recursive call passing next char's Node from Map, and with next char removed from substr
      return rec(node.keys.get(word[0]), word.substr(1));
    } else {
      // once substr reduced to '', set last char's Node.end = true
      node.setEnd();
    }
  }

  // start with root and full word
  rec(node, word);
  return true;
}

WordDictionary.prototype.search = function (word) {
  let node = this.root;

  function rec(node, word) {
    // if we called rec() on a node that doesn't exist, then that char was not found
    if (!node) return false;

    // if the word isn't blank or the passed substr still has characters
    if (word) {
      // if next char is a wild card, we will iterate over all of the keys in the node's map
      if (word[0] === '.') {
        // found will be set to true if one of the iterations found a match
        let found = false;
        for (let key of node.keys.keys()) {
          found = found || rec(node.keys.get(key), word.substr(1));
          // break out early on first found = true
          if (found) return true;
        }
        return found;
      } else if (node.keys.has(word[0])) {
        // continue recursion as normal if char exists in map
        return rec(node.keys.get(word[0]), word.substr(1));
      } else {
        // if char doesn't exist in map, then word does not exist in dictionary
        return false
      }
    } else {
      // once we've successfully reached the end of the word ('' was passed to rec)
      // we return whether the last Node is an end Node
      // (false: search word only exists with additional characters, not ending with its last char)
      return node.isEnd();
    }
  }

  return rec(node, word);
}

/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */