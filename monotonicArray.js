/**
 * 896. Monotic Array
 * Difficulty: Easy
 * 
 * An array is monotonic if it is either monotone increasing or monotone decreasing.
 * 
 * An array A is monotone increasing if for all i <= j, A[i] <= A[j]. An array A is
 * monotone decreasing if for all i <= j, A[i] >= A[j].
 * 
 * Return true if and only if the given array A is monotonic.
 * 
 * Example 1:
 *  Input: [1,2,2,3]
 *  Output: true
 * 
 * Example 2:
 *  Input: [6,5,4,4]
 *  Output: true
 * 
 * Example 3:
 *  Input: [1,3,2]
 *  Output: false
 * 
 * Example 4:
 *  Input: [1,2,4,5]
 *  Output: true
 * 
 * Example 5:
 *  Input: [1,1,1]
 *  Output: true
 * 
 * Note:
 *  1 <= A.length <= 50000
 *  -100000 <= A[i] <= 100000
 */

const isMonotonic = A => {
    let inc = false;
    let dec = false;

    for (let i = 1; i < A.length; i++) {
        if (A[i] > A[i - 1]) {
            inc = true;
        }

        if (A[i] < A[i - 1]) {
            dec = true;
        }

        if (inc && dec) {
            // if prev iteration inc = true, next iteration cannot have dec = true
            // otherwise return false
            return false
        }

        console.log(`[${i}]:${A[i]}`, inc, dec);
    }

    return true;
}

const array1 = [1, 2, 2, 3];

console.log(isMonotonic(array1));
