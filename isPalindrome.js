/*
125. Valid Palindrome
Difficulty: Easy

Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false
 

Constraints:

s consists only of printable ASCII characters.
*/

const isPalindrome = s => {
    if (s.length === 0) return true;
    const string = s.replace(/\W/g, '').toLowerCase();
    let i = 0;
    let j = string.length - 1;
    while (i < j) {
        if (string[i] !== string[j]) {
            return false;
        }
        i++;
        j--;
    }
    return true;
}

const string1 = 'Race acar';
console.log(isPalindrome(string1));