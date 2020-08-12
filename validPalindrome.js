/*
680. Valid Palindrome II
Difficulty: Easy

Given a non-empty string s, you may delete at most one character. Judge whether you can make it a palindrome.

Example 1:
Input: "aba"
Output: True
Example 2:
Input: "abca"
Output: True
Explanation: You could delete the character 'c'.
Note:
The string will only contain lowercase characters a-z. The maximum length of the string is 50000.
*/

const validPalindrome = s => {
    if (s.length <= 1) return true;
    let count = 0;
    let i = 0;
    let j = s.length - 1;
    while (i < j) {
        if (s[i] !== s[j]) {
            if (s[i + 1] == s[j]) {
                count++;
                i++;
            } else if (s[i] == s[j - 1]) {
                count++;
                j--;
            } else {
                return false
            }

            if (count > 1) return false;
        }

        i++;
        j--;
    }

    return true;
}

const string1 = 'raceacar';
const string2 = 'raceabcar';
const string3 = 'racecar';
const string4 = 'qwerttyuiopoiuuytrewq';
console.log(string1, validPalindrome(string1));
console.log(string2, validPalindrome(string2));
console.log(string3, validPalindrome(string3));
console.log(string4, validPalindrome(string4));