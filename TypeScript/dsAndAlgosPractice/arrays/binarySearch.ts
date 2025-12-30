/**
Given an array of integers nums which is sorted in ascending order, and an integer target, 
write a function to search target in nums.
If target exists, then return its index. Otherwise, return -1.

examples:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4

constraints:
You must write an algorithm with O(log n) runtime complexity.
nums.length range?
nums[i] range?
target range?
 */
function search(nums: number[], target: number): number {
    return;
}

// ------------------------ MEDIUM ---------------------------------

/**
You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.

Examples:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
 */
function searchMatrix(matrix: number[][], target: number): boolean {
    return false;
}

/**
Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. 
The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. 
Each hour, she chooses some pile of bananas and eats k bananas from that pile. 
If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

examples:
Input: piles = [3,6,7,11], h = 8
Output: 4

constraints
piles sorted?
piles.length range?
 */
function minEatingSpeed(piles: number[], h: number): number {
    return 0;
}

/**
Suppose an array of length n sorted in ascending order is rotated between 1 and n times. 

For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time 
results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

constraint:
must run in o log n where n is length of nums

hint: 
binary search using the last value in nums as the reference for finding the min
if nums[mid] > nums[end] -> the min element is somewhere on the right of mid
else min element is min itself or somewhere left of mid
 */
function findMin(nums: number[]): number {
    return nums[0];
}

/**
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) 
such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). 

For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, 
return the index of target if it is in nums, or -1 if it is not in nums.

constraint:
must run in o log n where n is length of nums
 */
function searchRotatedSorted(nums: number[], target: number): number {
    return nums[0];
}

// --------- HARD --------
/**
Imagine you are a logistics manager for a shipping company. 
You have a conveyor belt with a sequence of packages that must be shipped within D days.

The i^{th} package on the conveyor belt has a weight of weights[i]. 
Every day, we load the ship with packages from the conveyor belt in the exact order they appear. 

We cannot exceed the maximum weight capacity of the ship for that day.
Your goal is to determine the minimum weight capacity of the ship that will allow all the packages 
on the conveyor belt to be shipped within D days.

Example: 
Weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Days: 5
 */
function shipWithinDays(weights: number[], days: number): number {
    return 0;
}
