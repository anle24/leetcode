/**
 * 621. Task Scheduler
 * Difficulty: Medium
 * 
 * You are given a char array representing tasks CPU need to do. It contains capital letters A - Z where each letter representsa different task.
 * Tasks could be done without the original order of the array. Each task us done in one unit of time. For each unit of time, the CPU could
 * complete either one task or just be idle.
 * 
 * However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is
 * that there must be at least n units of times that the CPU will take to finish all the given tasks.
 * 
 * Example 1:
 *  Input: tasks = ["A","A","A","B","B","B"], n = 2
 *  Output: 8
 *  Explanation:
 *  A -> B -> idle -> A -> B -> idle -> A -> B
 *  There is at least 2 units of time between any two same tasks.
 * 
 * Example 2:
 *  Input: tasks = ["A","A","A","B","B","B"], n = 0
 *  Output: 6
 *  Explanation: On this case any permutation of size 6 would work since n = 0.
 *  ["A","A","A","B","B","B"]
 *  ["A","B","A","B","A","B"]
 *  ["B","B","B","A","A","A"]
 *  ...
 *  And so on.
 * 
 * Example 3:
 *  Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
 *  Output: 16
 *  Explanation: 
 *  A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
 */

/**
 * Solution
 * @param {array[]} tasks 
 * @param {number} n
 * @return {number}
 * 
 * formula:
 *  resultCount = (maxOccurrences - 1) * (n + 1) + (numMaxTasks)
 * 
 *    maxOccurrences - 1    need to multiply by maxOccurrences, but we do not need the extra idle spaces
 *                          AFTER last occurence
 * 
 *    (n + 1)               need to multiply n + 1 times since n only accounts for spaces IN BETWEEN, so
 *                          we add 1 to account for actual task
 * 
 *    + maxNumTasks         this adds on the final occurrence of the task(s) with maxOccurences after the
 *                          multiplication of maxOccurring task and required n spaces in between       
 */
const leastInterval = (tasks, n) => {
  const map = new Map();

  // max occurrences
  let maxVal = 0;

  // number of tasks that has the max occurrences
  let maxValCount = 0;

  for (let k of tasks) {
    let tVal = m.has(k) ? m.get(k) + 1 : 1;
    m.set(k, tVal);

    // set our maxVal and number of maxVal tasks only if we have a new max
    if (tVal > maxVal) {
      maxVal = tVal;
      maxValCount = 1;
      // otherwise, increment number of maxVal tasks
    } else if (tVal === maxVal) {
      maxValCount++;
    }
  }

  return Math.max(tasks.length, (maxVal - 1) * (n + 1) + maxValCount);
}