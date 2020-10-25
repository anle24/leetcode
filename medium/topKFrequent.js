/**
 * 692. Top K Frequent Words
 * Difficulty: Medium
 * 
 * Given a non-empty list of words, return the k most frequent elements.
 * Your answer should be sorted by frequency from highest to lowest. If two words have the same frequency,
 * then the word with the lower alphabetical order comes first.
 * 
 * Example 1:
 * Input: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
 * Output: ["i", "love"]
 * Explanation: "i" and "love" are the two most frequent words.
 * Note that "i" comes before "love" due to a lower alphabetical order.
 * 
 * Example 2:
 * Input: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], k = 4
 * Output: ["the", "is", "sunny", "day"]
 * Explanation: "the", "is", "sunny" and "day" are the four most frequent words,
 * with the number of occurrence being 4, 3, 2 and 1 respectively.
 */

/**
 * Solution:
 * Store frequency of each word in a map
 * Sort words in map by frequency
 * If words have same count, sort by alphabetical order
 * @param {String[]} words 
 * @param {Number} k 
 */
const topKFrequent = (words, k) => {
    // store frequency of words in map
    const map = {};
    for (word of words) {
        map[word] = map[word] + 1 || 1;
    }

    const sorted = Object.keys(map).sort((a, b) => {
        // compare frequency
        const compare = map[b] - map[a];

        // if same frequency, compare alphabetically
        if (compare === 0) return a.localeCompare(b);
        return compare;
    })

    // return the first k words in the sorted keys
    return sorted.slice(0, k);
}