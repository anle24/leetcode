/**
 * 636. Exclusive Time of Functions
 * Difficulty: Medium
 * 
 * On a single threaded CPU, we execute some functions. Each function has a unique id between 0 and N - 1.
 * 
 * We store logs in timestamp order that describe when a function is entered or exited.
 * 
 * Each log is a string with this format: "{function_id}:{'start' | 'end'}:{timestamp}".
 * For example, "0:start:3" means the function with id 0 started at the beginning of the timestamp 3.
 * "1:end:2" means the function with id 1 ended at the end of timestamp 2.
 * 
 * A function's exclusive time is the number of units of time spent in this function.
 * Note that this does not include any recursive calls to child functions.
 * 
 * The CPU is single threaded which means that only one function is being executed at a given time unit.
 * 
 * Return the exclusive time of each function, sorted by their function id.
 * 
 * Example 1:
 * 
 *           |1start---------end|
 * |0start---                    -end|
 * [ 0 ][ 1 ][ 2 ][ 3 ][ 4 ][ 5 ][ 6 ]
 * 
 *  Input:
 *    n = 2
 *    logs = ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]
 * 
 *  Output:
 *    [3, 4]
 * 
 *  Explanation:
 *    Function 0 starts at the beginning of time 0, then it executes 2 units of time and reaches the end of time 1.
 *    Now function 1 starts at the beginning of time 2, executes 4 units of time and ends at time 5.
 *    Function 0 is running again at the beginning of time 6, and also ends at the end of time 6, thus executing for 1 unit of time. 
 *    So function 0 spends 2 + 1 = 3 units of total time executing, and function 1 spends 4 units of total time executing.
 */

/**
 * Unless a function has an end time before the next functions start, it will finish after the following function(s)
 * So we will use a stack to keep track of functions in progress
 * @param {number} n - number of functions
 * @param {string[]} logs - ["{ function_id } : { 'start' | 'end' } : { timestamp }"] 
 */
const exclusiveTime = (n, logs) => {
  // initiate answer array with n elements
  const sums = new Array(n).fill(0);

  // stack to keep track of functions in progress
  const stack = [];

  // keep track of the previous function's start/end time
  let prevTime;

  for (log of logs) {
    const details = log.split(':');
    const id = parseInt(details[0]);
    const point = details[1];
    const time = parseInt(details[2]);

    if (point === 'start') {
      // if this is a start log and there are functions in the stack,
      // increment the previous (ongoing) function's time sum by this new function's
      // start time - the previous function's start time (or end time)
      if (stack.length > 0) {
        let prevFn = stack[stack.length - 1];
        sums[prevFn] += (time - prevTime);
      }

      // add this new function's id to the stack
      stack.push(id);
      // set prevTime as this function's start time
      prevTime = time;
    } else {
      // if this is an end log, grab the function at the top of the stack,
      // which should be latest function still in progress
      const last = stack.pop();
      // increment its time sum by current log's end time - prevTime + 1 (inclusive)
      sums[last] += (time - prevTime + 1);
      // set new prevTime as time slot after current end log time
      prevTime = time + 1;
    }
  }

  return sums;
}