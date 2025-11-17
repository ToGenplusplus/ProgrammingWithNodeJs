export const arraysMain = () => {
};


/**
 * Algorithms and techniques for solving problems involving arrays
 */


// ----- Hashing -----

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


//Two Pointer





//Sliding Window


//Backtracking
