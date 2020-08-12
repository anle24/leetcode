/**
 * 1. Two sum
 * Difficulty: Easy
 * 
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * 
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * 
 * Example:
 *  Given nums = [2, 7, 11, 15], target = 9,
 * 
 *  Because nums[0] + nums[1] = 2 + 7 = 9,
 *  return [0, 1].
 */

/*
Goes through array and adds value/index to map, while searching if complementing value exists in current state of map
1. iterate through given array
2. look for (target - currentValue) in map
3. if doesn't exist in map, add [currentValue]:index to map
4. if exist in map, return [map[otherValue], currentIndex]
*/
const twoSum = (nums, target) => {
    console.log('');
    console.log('Executing twoSum()...');
    console.log('Array:', nums);
    console.log('Target:', target);
    const map = {};
    console.log('map:', map);

    for (let i = 0; i < nums.length; i++) {
        const another = target - nums[i];
        console.log('Currently at:', nums[i]);
        console.log('Looking for:', another);

        if (another in map) {
            console.log(`Found ${another} in map!`);
            return [map[another], i];
        }

        map[nums[i]] = i;
        console.log('Adding to map...');
        console.log('map:', map);
    }

    return null;
}

const bruteForceCheck = (nums, target) => {
    console.log('');
    console.log('Executing bruteForceCheck()');
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = 0; j < nums.length - 1; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return null;
}

const generateArray = () => {
    console.log('');
    console.log('Generating array...');
    const array = [];
    const numValues = Math.floor(Math.random() * 20);
    for (let i = 0; i < numValues - 1; i++) {
        const value = Math.floor(Math.random() * 20);
        if (!array.includes(value)) {
            array.push(value);
        }
    }
    return array;
}

const generateTarget = () => {
    console.log('Generating target...');
    return Math.floor(Math.random() * 50);
}

const arrayOne = generateArray();
const targetOne = generateTarget();
console.log('Array:', arrayOne);
console.log('Target:', targetOne);

const twoSumResult = twoSum(arrayOne, targetOne);
const bruteForceResult = bruteForceCheck(arrayOne, targetOne);

console.log('twoSum result:', twoSumResult);
console.log('bruteForceCheck result:', bruteForceResult);
console.log('Matching answers?', twoSumResult == bruteForceResult);