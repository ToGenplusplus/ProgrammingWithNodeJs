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

export function runBinarySearchTests() {
    let passed = 0;
    console.log(`--- Running Binary Search Tests ---`);

    const testCases = [
        {
            nums: [-1, 0, 3, 5, 9, 12],
            target: 9,
            expected: 4,
        },
        {
            nums: [-1, 0, 3, 5, 9, 12],
            target: 2,
            expected: -1,
        },
        {
            nums: [-1, 0, 3, 5, 9, 12],
            target: 12,
            expected: 5,
        },
        {
            nums: [-1, 0, 3, 5, 9, 12],
            target: -1,
            expected: 0,
        },
    ];

    for (const testCase of testCases) {
        const result = search(testCase.nums, testCase.target);
        console.log(
            `   Inputs: [${JSON.stringify({ nums: testCase.nums, target: testCase.target })}]`
        );
        console.log(`   Expected: ${testCase.expected}, Got: ${JSON.stringify(result)}`);
        if (result === testCase.expected) {
            console.log(`✅ PASS`);
            passed++;
        } else {
            console.error(`❌ FAIL`);
        }
    }

    console.log(`\nResults: ${passed}/${testCases.length} tests passed.`);
}
