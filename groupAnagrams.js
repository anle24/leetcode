/**
 * 49. Group Anagrams
 * Difficulty: Medium
 * 
 * Given an array of strings, group anagrams together.
 * 
 * Example:
 *  Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
 *  Output:
 *  [
 *    ["ate","eat","tea"],
 *    ["nat","tan"],
 *    ["bat"]
 *  ]
 */


/**
 * Solution:
 * Create a map and sort each string
 * If the sorted string does not exist in the map as a key,
 * add it to the map as { sortedString: [originalString] }
 * If sorted string exists in the map as a key,
 * push the originalString to the array stored in key's value
 * { sortedString: [..., originalString] }
 */
const groupAnagrams = strs => {
    let map = {}
    
    for (let str of strs) {
        let key = [...str].sort()
        console.log('[...str].sort()', key);
        console.log('map[key] ?', map[key] !== null);
        if (map[key]) {
            console.log('map[key] exists', { key: map[key] });
            console.log('map[key] = [..map[key], str]', [...map[key], str]);
        } else {
            console.log('map[key] doesnt exist');
            console.log('map[key] = ', {key: [str]});
        }
        map[key] = map[key] ? [...map[key], str] : [str]
    }
    
    console.log(Object.values(map));
    return Object.values(map)
};

const strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
groupAnagrams(strs1);