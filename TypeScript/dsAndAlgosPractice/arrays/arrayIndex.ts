import { isAlphaNumeric } from "../helpers";

export const arraysMain = () => {
};


/**
 * Algorithms and techniques for solving problems involving arrays
 */


// ----------------- Hashing -----------------

/**
    - efficent for grouping, counting, or finding relationships between elements.
    - analyze the core propetry of the input values to determine the unique keys that would satisfy the hashmap grouping:
    - For example:
      - Anagrams → Same characters with the same frequency.
      - Palindromes → Symmetry in characters.
      - Subarrays with the same sum → Prefix sums.
  - use case: checking for existence of elements efficiently
 */

/**
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
 * You can return the answer in any order.
* @param nums - array of integers
* @param target - number 
* @returns indices of the two numbers such that they add up to target
*/

//example nums: [2,11,7,15] target 9
function twoSum(nums: number[], target: number): number[] {
    // Use an object as a hash map to store numbers and their indices.
    // Key: The number itself. Value: The index where it was found.
    let seenValues = {}

    // Iterate through the array once (O(N) time complexity).
    for (let i = 0; i < nums.length; i++) {
        // Determine the 'complement' (the number needed to meet the target).
        let complement = target - nums[i]
        
        // Check if the complement has been seen before (O(1) lookup).
        if (seenValues[complement]) {
            // If found, return the index of the complement and the current index 'i'.
            return [seenValues[complement], i]
        }
        
        // If not found, store the current number and its index for future checks.
        seenValues[nums[i]] = i
    }
    
    // If no solution is found after the loop, the function returns undefined.
};


// ----------- Binary Search ----------------
/**
 Used to find an element within a sorted data structure (usually array) in O(log(n)) time.

Elements in the list dont need to be sorted but need to be Monotonic - in a specified order

Ex: [1, 2 3, 4, 5] - values from index 0 to 5 are always increasing -> Monotonic

Ex: [false , false, true, true, true] - once the value becomes true, it stays true -> Monotonic

Ex: [1, 2, 3, 4, 0] - values increase all the way until the last index -> Non Monotonic
 */

//find the index of the first true value in a  monotonic boolean array
function findBoundary (bools: boolean[]):number {
    let boundaryIndex = -1

    let [start, end] = [0, bools.length - 1]

    while (start <= end) {
        let mid = (start + end ) / 2
        if (bools[mid]) {
            // true value found but we want to ensure we are finding the first true value
            boundaryIndex = mid
            //continue searching left of the array
            end = mid - 1
        } else {
            // search right for first true value
            start = mid + 1
        }
    }

    return boundaryIndex
}


/**
 * Sorted array of unique integers rotated at a certain unknown pivot point 
*
* find the index of the minimum element in this array
 * Ex: [30, 40, 50, 10, 20]
 * A -> 3
 * 
 * Ex: [3, 5, 7, 11, 14, 16, 19, 2]
 * A -> 7
 * 
 * This problem can be reshaped as finding the first true value in a list of serted booleans
 * the first true value is the minimum element
 * ex: [30, 40, 50, 10, 20] -> [false, false, false, true, true]
 * 
 * so we can apply the binary search principle for an efficient algorithm
 */
function findMinRotatedSortedArray (arr: number[]): number {
    let boundaryIndex = -1

    let [start, end] = [0, arr.length - 1]

    while (start <= end) {
        let mid = (start + end ) / 2
        if (arr[mid] <= arr[arr.length - 1]) {
            // true value found but we want to ensure we are finding the first true value
            boundaryIndex = mid
            //continue searching left of the array
            end = mid - 1
        } else {
            // search right for first true value
            start = mid + 1
        }
    }

    return boundaryIndex
}


//--------------- Two Pointer ---------------

/**
Types:
    - pointer moving in the same direction (slow and fast pointer)
    - pointers moving towards each other from opposite directions
Benefits
    - Reduce the number of iterations needed
    - Track a relationship between two places
    - Avoid extra space
use cases:
    - Sorted input
    - problem involving finding two elements or subsets that satisfy a condition.
    - problem involving symmetry, such as checking for palindromes or comparing elements from both ends of a structure.
    - Fixed window size or range
    - partitioning or rearranging elements based on a condition
 */



//1. Example: Opposite direction pointers 
function isPalindrome(s: string): boolean {
    // Check for undefined or null input. If the string is invalid, return false immediately.
    if (s === undefined || s === null ) return false
    
    // Initialize the 'front' pointer to the start of the string.
    let front = 0;
    // Initialize the 'rear' pointer to the last index of the string.
    let rear = s.length - 1

    // Continue looping as long as the pointers have not crossed or met.
    while ( front < rear) {
        // Move the front pointer forward, skipping any non-alphanumeric characters.
        while (front < rear && !isAlphaNumeric(s[front])) front++
        
        // Move the rear pointer backward, skipping any non-alphanumeric characters.
        while (front < rear && !isAlphaNumeric(s[rear])) rear --
        
        // If the current alphanumeric characters pointed to do not match,
        // the string is not a palindrome. Return false.
        if (s[front].toLowerCase() !== s[rear].toLowerCase()) return false
        
        // If they match, move both pointers inward to check the next pair.
        front++;
        rear--;
    }
    
    // If the loop completes without returning false, the string is a valid palindrome.
    return true
};


//2. See linked list code



// ---------------- Sliding Window -------------------
/**
    - leverages the above Two pointer technique to create a window of elements to process at a time
    - enables efficient processing of subarrays/substrings without re-evaluating the entire entry
    - Types
        - Fixed Window
            - e.g find the maximum average of any sub array k
            - e.g return the sum of every k-length block
            - e.g find the subarray of length k with the largest/smallest X
        - Dynamic window
            - e.g find the length of the longest substring with at most k unique characters
            - e.g whats the smallest subarray with a sum greater than a target
            - e.g return the longest window where a certain rule is valid
 */




//1. Fixed Window

/**
 * Given an array nums consistiing
 * 
 * Ex: nums = [1,2,3,7,4,1], k = 3

 * @param nums 
 * @param k 
 * @returns number -> max sliding window
 */
function maxSlidingWindow(nums: number[], k: number): number {
    // Initialize a variable to store the sum of the current sliding window.
    let windowSum = 0
    
    // --- 1. Calculate the sum of the first window (Initialization) ---
    
    // Iterate from index 0 up to (but not including) k.
    for (let i = 0; i < k; i++) {
        // Add the value of the current element to the initial window sum.
        windowSum += nums[i]
    }

    // Initialize the maximum sum found so far with the sum of the first window.
    let largest = windowSum

    // --- 2. Slide the window across the rest of the array ---
    
    // Start the main loop. 'rightWindow' is the index of the element entering the window.
    // It starts at k because the first window goes up to k-1.
    for (let rightWindow = k; rightWindow < nums.length; rightWindow++) {
        // Calculate the index of the element that is leaving the window from the left.
        let leftOutside = rightWindow - k
        
        // Subtract the value of the element that just exited the window.
        windowSum -= nums[leftOutside]
        
        // Add the value of the new element that just entered the window (constant-time update).
        windowSum += nums[rightWindow]
        
        // Update 'largest' with the maximum of the current window sum and the previously largest sum.
        largest = Math.max(largest, windowSum)
    }
    
    // Return the final maximum sum found.
    return largest
};



//2. Dynamic window


/**
 * Given a string s, find the length of the longest substring without duplicate characters.
 * s consists of English letters, digits, symbols and spaces.
 * 
 * Ex abcdbea
 * 
 * fw |  s[fw] | bw | s[bw]
 * 0 | a | 0 | a
 * @param s 
 */

function lengthOfLongestSubstring(s: string): number {
    
    // Handle edge cases: if the string is null or undefined, the length is 0.
    if (s === null || s === undefined) return 0
    // Handle the trivial case: a single character string has a length of 1.
    if (s.length === 1) return 1

    // Stores the maximum length of a non-repeating substring found so far.
    let longestSubtring = 0
    // Hash map to store the frequency (count) of characters within the current window.
    let charSeenCount = {}
    // The left pointer (or start) of the sliding window.
    let backWindow = 0;

    // The main loop: 'frontWindow' is the right pointer, which expands the window.
    for (let frontWindow = 0; frontWindow < s.length; frontWindow++) {
        // Initialize the character count to 0 if it doesn't exist.
        if (!charSeenCount[s[frontWindow]]) {
            charSeenCount[s[frontWindow]] = 0
        }
        // Increment the count of the character entering the window.
        charSeenCount[s[frontWindow]] += 1
        
        // This 'while' loop contracts the window from the left.
        // It runs if the character count at 'frontWindow' is > 1 (a duplicate exists).
        while (charSeenCount[s[frontWindow]] > 1) {
            // Decrement the count of the character exiting the window (at 'backWindow').
            charSeenCount[s[backWindow]] -= 1
            // Slide the left pointer forward, shrinking the window until the duplicate is gone.
            backWindow++
        }
        // Calculate the current window size (right - left + 1) and update the maximum length found.
        longestSubtring = Math.max(longestSubtring, frontWindow - backWindow + 1)
    }
    // Return the final maximum length.
    return longestSubtring
};




//Backtracking


// ---- Prefix Sum -----

/**
- transform an original array into a new array, where each element stores the sum of all elements up to and including that position in the original array.
- useful for efficiently solving problems involving range queries on arrays
- The primary motivation for using the Prefix Sum array is to calculate the sum of any subarray (range) in constant time, $O(1)$.
Ex: arr =[2, 5, 1, 6, 3] 
Result: [2, 7, 8, 14, 17]
 */

function prefixSum(arr: number[]): number[] {
    let pfSum = new Array<number>(arr.length)

    pfSum[0] = arr[0]

    for (let i = 1; i < arr.length; i++) {
        pfSum[i] = pfSum[i - 1] + arr[i]
    }

    return pfSum
}

function prefixSumInPlace(arr: number[]) {

    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i - 1] + arr[i]
    }
}
