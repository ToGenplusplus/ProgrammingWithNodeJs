
/**
 * 
 * @param nums 
 * @returns boolean -> true if a value appears more than once and false otherwsie
 */
function containsDuplicate(nums: number[]): boolean {
    if (nums === undefined || nums.length < 2) return false
    return new Set(nums).size < nums.length
};