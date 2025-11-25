
/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Ex: [2, 4, 0, 1] t: 5 -> [1, 2]
    arr[0] = 4, arr[2] = 1, 
Ex: [2, 4, 0, -6] t: -2 -> [1, 2]
    arr[0] = 4, arr[2] = 1, 

Clarification

How big can nums get? 2 <= nums.length <= 10 ^ 4
Is it all in memory? yes
what is the range of values for nums[i], -10 ^ 9 <= nums[i] <= 10 ^ 9
is nums sorted? - no
range of values for the target number?  -10 ^ 9 <= target <= 10 ^ 9
 * @param nums 
 * @param target 
 */
function twoSum(nums: number[], target: number): number[] {
    /**
     * chance we are going to need to scan the entire array so we will not be able to find a solution better than O(n)
     *  t - nums[i] = # we are looking for 
     * if found we return i and the index
     * so we need to keep track of indexes
     * 
     * plan:
     * leverage a map of already processed nums[i] -> i
     * 
     * iterate through nums
     *      calculate t - nums[i] = c
     *      if c in map (so c is a value in nums that appears towards the beginning of the array)
     *          return [map[c], i]
     *      not in map so we store nums[i] = i in map
     * 
     * O(n) time complexity where n is the lenght of nums
     * O(n) space complexity
     * 
     */

    const proccessedNum = {}

    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i]
        if (proccessedNum[complement]) {
            return [proccessedNum[complement], i]
        }
        proccessedNum[nums[i]] = i
    }
    //we are gauranteed a solution above
    return []
};