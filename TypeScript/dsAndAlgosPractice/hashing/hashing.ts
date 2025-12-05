

// -------------------------- EASY ---------------------------
/**
 * given two strings s and t , write a function to determine if t is an anagram of s.
  Example 1:
    Input: s = "anagram", t = "nagaram"
    Output: true
  Example 2:
    Input: s = "rat", t = "car"
    Output: false
 * @param s 
 * @param t 
 */
function isAnagram(s: string, t: string): boolean {
    return false
};




// -------------------------- MEDIUM ---------------------------
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
*/

function groupAnagrams(strs: string[]): string[][] {
    return []
}


/**
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
Example 3:

Input: nums = [1,0,1,2]
Output: 3
 */




function longestConsecutive(nums: number[]): number {
    return 0
};


/**
 * Determines if a 9x9 Sudoku board is valid using an optimal single-pass approach.

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

 * CORE ALGORITHMIC PATTERN USED:
 * 1. Frequency Hashing / Set Tracking: Uses three separate data structures (Sets)
 * to track the constraints for Rows, Columns, and 3x3 Sub-Boxes simultaneously
 * in a single pass, ensuring O(1) average time complexity for each lookup/insertion.
 *
 * Time Complexity: O(N^2) where N is the board dimension (9). Since N is constant, this is O(1) time.
 * Space Complexity: O(N^2) to store the three constraint sets (9 rows + 9 columns + 9 boxes).
 */
function isValidSudoku(board: string[][]): boolean {

    return true
}



// -------------------------- HARD ---------------------------