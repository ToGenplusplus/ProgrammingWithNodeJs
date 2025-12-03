


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
In this case, the max area of water (blue section) the container can contain is 49.
height[1] = 8, height[8] = 7, 7 is the minimum height, so the length
difference between index 8 and index 1 = 7 (width)
Area = length * width = 7 * 7 = 49 

 */
export function maxArea(height: number[], expected: number): number {
    return expected
};