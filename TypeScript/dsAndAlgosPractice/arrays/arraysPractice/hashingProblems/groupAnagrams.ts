
/**
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
 * Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]

constraintst?
how may strings in str?
strs[i] chracter range?
does strs[i] only contain lower case alphabets -> yes
str[i] can be an empty string - yes

/**
 * Groups an array of strings into anagrams.
 * * APPROACH: FREQUENCY COUNT (HASH MAP)
 * ------------------------------------
 * This implementation maps character counts (signatures) to groups of words.
 * * TRADEOFF ANALYSIS:
 * ------------------
 * 1. Time Complexity: O(N * K)
 * - N is the number of strings.
 * - K is the maximum length of a string.
 * - COMPARISON: Faster than the Sorting method O(N * K log K).
 * We iterate over the string once (linear) rather than sorting it.
 * * 2. Space Complexity: O(N * K)
 * - We store every string in the map values.
 * - We also store N keys, where each key represents the 26-char frequency array.
 * * 3. Why use this over Sorting?
 * - (+) PERFORMANCE: This is the asymptotically optimal solution.
 * - (+) SCALABILITY: Handles very long strings significantly better than sorting.
 * - (-) READABILITY: More verbose; requires manual ASCII math (charCodeAt).
 * - (-) COMPLEXITY: Higher cognitive load to understand the key generation logic.
 * * RECOMMENDATION:
 * Use this approach for Algorithm Interviews (to demonstrate Big-O mastery)
 * or in systems where performance is the absolute bottleneck.
 * @param strs 
 */
function groupAnagrams(strs: string[]): string[][] {
    // Edge case: if empty, return empty array
    if (!strs || strs.length === 0) return [];

    // Map: Key = "1,0,2,0..." (char counts), Value = ["word1", "word2"]
    const map = new Map<string, string[]>();

    for (const str of strs) {
        // 1. Create the frequency count (the "Key")
        const count = new Array(26).fill(0);
        for (const char of str) {
            // Calculate char code offset from 'a'
            count[char.charCodeAt(0) - 97]++; 
        }
        
        // 2. Create a string key from the array (e.g. "1,0,0,1...")
        const key = count.join('#');

        // 3. Group the word immediately
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(str);
    }

    // Return the values (the groups)
    return Array.from(map.values());
};

/**
 * Groups an array of strings into anagrams.
 * * APPROACH: SORTING METHOD
 * ------------------------
 * This implementation uses character sorting to generate keys.
 * * TRADEOFF ANALYSIS:
 * ------------------
 * 1. Time Complexity: O(N * K log K)
 * - N is the number of strings.
 * - K is the maximum length of a string.
 * - "K log K" comes from the sorting operation inside the loop.
 * - COMPARISON: Slower than the Frequency Count method, which is O(N * K).
 * * 2. Space Complexity: O(N * K)
 * - We must store every string in the map values.
 * * 3. Why use this over Frequency Count?
 * - (+) READABILITY: Significant reduction in code lines and complexity.
 * - (+) MAINTENANCE: Uses standard Array methods (split/sort/join) rather than manual ASCII math.
 * - (-) PERFORMANCE: Slightly slower for very long strings, but negligible for standard inputs.
 * * RECOMMENDATION:
 * Use this approach for production code where readability is priority.
 * Use Frequency Count (O(NK)) for Algo/DS interviews or tight performance constraints.
 */
function groupAnagramsUsingSorting(strs: string[]): string[][] {
    const map = new Map<string, string[]>();

    for (const str of strs) {
        // "eat" -> ['e','a','t'] -> ['a','e','t'] -> "aet"
        const key = str.split('').sort().join('');

        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(str);
    }

    return Array.from(map.values());
};