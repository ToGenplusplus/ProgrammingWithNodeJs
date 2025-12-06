
import { isAlphaNumeric } from "../helpers";

// -------------------------- EASY ---------------------------
/**
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters 
and removing all non-alphanumeric characters, it reads the same forward and backward. 
Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

constraints?

how large can str be?
can str be undefined or empty string?
s contains spaces, alphanumeric and non alphanumeric characters

 */
function validPalindrome(str: string):boolean {
    return false
}


/**
Given a sorted integer array nums, modify nums in place to remove all duplicates.
at the end nums[0] ... nums[k - 1] should hold all k distinct values
values >= k can be whatever

constraints:
solution must use o(1) space complexity
1 <= nums.length <= 10 ^5
- 10 ^ 7 <= nums[i].length <= 10 ^ 7

 */
function removeDuplicates(nums: number[]) {

}


/**
merge sorted array nums1 with m numbers 
and nums2 with n number 

nums1.length = m + n
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {

};

// ------------------------ MEDIUM ---------------------------------

/**
Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, 
find two numbers such that they add up to a specific target number. 
Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.

constraints:

Your solution must use only constant extra space.
cannot use the same element twice 
only one solution

 */
function twoSumSorted (nums: number[], t: number): number[] {
    return []
}

/**
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] 
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Constraints:
3 <= mums.length <= 3000
-10 ^ 5 <= nums[i] <= 10 ^ 5
solution set must not contain duplicate triplets.

Examples

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
 */
function threeSum(nums: number[]): number[][] {
    return []
}



/**
You are given an integer array height of length n. 

There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

constraints:

2 <= height.length <= 10 ^5

 0 <= height[i] <= 10 ^ 5 (100,000)

Examples

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation:  
In this case, the max area of water the container can contain is 49.
height[1] = 8, height[8] = 7, 7 is the minimum height (length)
difference between index 8 and index 1 = 7 (width)
Area = length * width = 7 * 7 = 49 

constraints

minimum width is 1
2 <= height.length <= 10 ^ 5 (10,000)
0 <= heing[i] <= 10 ^4
guaranteed one solution
no time or space complexity constraint (most optimal solution)

 */
export function maxArea(height: number[]): number {
    return 0
};



// ------------------------ HARD ---------------------------------


/**
 trapping rain water
 */
function trap(height: number[]): number {
return 0
};