/*
278. First Bad Version
Difficulty: Easy

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which will return whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

Example:

Given n = 5, and version = 4 is the first bad version.

call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true

Then 4 is the first bad version. 
*/

const isBadVersion = n => {
    return n >= 3;
}

const firstBadVersion = n => {
    let count = 0;
    
    const check = (first, last) => {
        console.log(first, last);
        if (first == last) return false;
        const mid = Math.floor((first + last) / 2);
        console.log('mid', mid);
        if (isBadVersion(mid)) {
            count++;
            if (!isBadVersion(mid - 1)) {
                count++;
                console.log('count', count);
                return mid;
            }
            return check(first, mid);
        } else {
            return check(mid, last);
        }
    }

    return check(1, n);
}

console.log(firstBadVersion(100));