/**
 * 23. Merge k Sorted Lists
 * Difficulty: Hard
 * 
 * Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
 * 
 * Example:
 *  Input:
 *  [
 *      1 -> 4 -> 5,
 *      1 -> 3 -> 4,
 *      2 -> 6
 *  ]
 *  Output: 1 -> 1 -> 2 -> 3-> 4 -> 4 -> 5 -> 6
 */

/**
 * Solution 1
 * Iterate through list of lists and merge two at a time
 */ 
const mergeKLists = lists => {
    
}

/**
 * Solution 2
 * Implement minHeap
 * Insert each node of each list into minHeap
 * Construct merged list by pulling each node out of minHeap
 */