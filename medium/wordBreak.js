/**
 * 139. Word Break
 * Difficulty: Medium
 * 
 * Given a non-empty string s and a dictionary wordDict containing a list of non-empty words,
 * determine if s can be segmented into a space-separated sequence of one or more dictionary words.
 * 
 * Note:
 * 
 * The same word in the dictionary may be reused multiple times in the segmentation.
 * You may assume the dictionary does not contain duplicate words.
 * 
 * Example 1:
 *  Input: s = "leetcode", wordDict = ["leet", "code"]
 *  Output: true
 *  Explanation: Return true because "leetcode" can be segmented as "leet code".
 * 
 * Example 2:
 *  Input: s = "applepenapple", wordDict = ["apple", "pen"]
 *  Output: true
 *  Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
 *               Note that you are allowed to reuse a dictionary word.
 * 
 * Example 3:
 *  Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 *  Output: false
 */

/**
 * Solution:
 * 
 * Create a set of the lengths of the words in the dictionary
 * Create a set of start positions in the string, initialized with 0 (start of the string)
 * While iterating over the start set (which will be added to),
 * iterate over the word lengths to check if the spliced string from start + wordlength
 * exists in the dictionary.
 * For example, we have a word length of 3, then one of the first iterations at the start of the string
 * will check if the substring between index 0 and index 3 matches any words in the dictionary.
 * If it does, then we add the ending index as the next starting point in starts set.
 * After checking all substrings of all wordlengths at index 0, we move on to the next
 * start positions that was added, etc...
 * 
 * s = "applepenapple"
 * wordDict = ["apple", "pen"]
 * "apple" -> length 5
 * "pen" -> length 3
 * wordLength Set = { 5, 3 }
 * starts Set = { 0 } (starts at index 0)
 * 
 * starting with start 0...
 * check first length of length set : 5
 * substring[0:5] "(apple)penapple" -> "apple"
 * does "apple" exist in dictionary? yes
 * so we add 5 to the starts set so we can check the rest of the string
 * now check length 3 at start 0...
 * substring[0:3] "(app)lepenapple" -> "app"
 * does "app" exist in dictionary? no
 * since we reached the end of lengths, move on to next start, 5
 * check first length : 5
 * substring[5:5] "apple(penap)ple" -> "penap"
 * doesn't exist, so move on to length 3
 * substring[5:3] "apple(pen)apple" -> "pen"
 * it exists! so add last index as the next start, 8
 * we've reached last length, so move on to next start, 8
 * check first length, 5
 * substring[8:5] "applepen(apple)" -> "apple"
 * it exists! so add last index to starts
 * 
 * @param {string} s 
 * @param {string[]} wordDict 
 */
const wordBreak = (s, wordDict) => {
  const words = new Set(wordDict);
  const wordLens = new Set(wordDict.map((word) => word.length))
  const starts = new Set([0])

  for (let start of starts) {
    for (let len of wordLens) {

      if (words.has(s.slice(start, start + len))) {
        if (start + len == s.length) return true;
        starts.add(start + len)
      }
    }
  }

  return starts.has(s.length)
};

const s1 = "applepenapple";
const wordDict1 = ["apple", "pen"];

console.log(wordBreak(s1, wordDict1));