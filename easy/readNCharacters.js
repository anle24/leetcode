/**
 * 157. Read N Characters Given Read 4
 * Difficulty: Easy
 *
 * Given a file and assume that you can only read the file using a given method read4,
 * implement a method to read n characters.
 *
 * Method read4:
 * The API read4 reads 4 consecutive characters from the file, then writes those characters into the buffer array buf
 * The return value is the number of actual characters read.
 * Note that read4() has its own file pointer, much like FILE *fp in C.
 *
 * Definition of read 4:
 *  Parameter: char[] buf4
 *  Returns: int
 *
 *  Note: buf4[] is destination not source, the results from read4 will be copied to buf4[]
 *
 * Method read:
 *  By using the read4 method, implement the method read that reads n characters from the file and store it in the buffer array buf.
 *  Consider that you cannot manipulate the file directly.
 *  The return value is the number of actual characters read.
 *
 * Definition of read:
 *  Parameters:	char[] buf, int n
 *  Returns:	int
 *  Note: buf[] is destination not source, you will need to write the results to buf[]
 *
 * Example 1:
 *  Input: file = "abc", n = 4
 *  Output: 3
 *  Explanation:  After calling your read method, buf should contain "abc".
 *                We read a total of 3 characters from the file, so return 3.
 *                Note that "abc" is the file's content, not buf.
 *                buf is the destination buffer that you will have to write the results to.
 *
 * Example 2:
 *  Input: file = "abcde", n =
 *  Output: 5
 *  Explanation: After calling your read method, buf should contain "abcde". We read a total of 5 characters from the file, so return 5.
 *
 * Example 3:
 *  Input: file = "abcdABCD1234", n = 12
 *  Output: 12
 *  Explanation: After calling your read method, buf should contain "abcdABCD1234". We read a total of 12 characters from the file, so return 12.
 *
 * Example 4:
 *  Input: file = "leetcode", n = 5
 *  Output: 5
 *  Explanation: After calling your read method, buf should contain "leetc". We read a total of 5 characters from the file, so return 5.
 */

/**
 * @param {function} read4()
 * @return {function}
 */
const solution = (read4) => {
  let internalBuf = [];

  /**
   * @param {character[]} buf Destination buffer
   * @param {number} n Number of characters to read
   * @return {number} The number of actual characters read
   */
  return (buf, n) => {
    let readChars = 0;

    while (n > 0) {
      if (internalBuf.length === 0) {
        if (read4(internalBuf) === 0) {
          return readChars;
        }
      }

      buf.push(internalBuf.shift());
      readChars++;
      n--;
    }

    return readChars;
  };
};