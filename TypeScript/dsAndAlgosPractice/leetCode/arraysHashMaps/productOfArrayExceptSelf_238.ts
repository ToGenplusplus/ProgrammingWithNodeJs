/**
 * My approach
 * Time Complexity:

Computing prefix and suffix products takes O(n).
Combining prefix and suffix products also takes O(n).
Overall: O(n).
Space Complexity:

The function uses three additional arrays (prefixArray, suffixArray, and answer), each of size n.
Overall: O(n).
 * @param nums 
 * @returns 
 */
function productExceptSelf(nums: number[]): number[] {
  /**
        input:
            integer array
            not sorted
            2 <= nums.length <= 105
            -30 <= nums[i] <= 30
        output:
            integer array answer such that answer[i] = product of all the elements of nums except nums[i]
        constraints:
            must run in o(n) time
            cannot use the division (/) operator 
        The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
        example:
        nums = 1,2,3,4 
        output = 24, 12, 8, 6

        naive solution
        iterate through each element in nums,
            for each element i, calculate the product of the other elements
            store the result in another array [i] 
        return the other array

        o(n^2) solution, does not satisy the constraint 

        nums = 2,1,4,6,1 
        [2,2,8,48,48] - prefix product of input array
        [48,24,24,6,1] - suffix product of input array

        a[0] = suffix[1] = 24
        a[1] = prefix[1 - 1] * suffix[1 + 1] = 2 * 24 = 48
        a[2] = prefix[2 - 1] * suffix[2 + 1] = 2 * 12 = 24
        a[3] = prefix[3-1] * suffix[3+1] = 8 * 1 = 8
        a[4] = prefix[4 -1] = 48
     */
  const n = nums.length;
  if (n === 2) return [nums[1], nums[0]];

  const prefixArray = new Array(n).fill(-40);
  prefixArray[0] = nums[0];
  const suffixArray = new Array(n).fill(-40);
  suffixArray[n - 1] = nums[n - 1];

  const answer = new Array(n).fill(-40);

  for (let i = 1; i < nums.length; i++) {
    prefixArray[i] *= prefixArray[i - 1];
  }
  for (let i = n - 2; i >= 0; i--) {
    suffixArray[i] *= suffixArray[i + 1];
  }

  answer[0] = suffixArray[1];
  answer[n - 1] = prefixArray[n - 2];
  for (let i = 1; i < n - 1; i++) {
    answer[i] = prefixArray[i - 1] * suffixArray[i + 1];
  }
  return answer;
}

function productExceptSelfOptmial(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  // Step 1: Calculate prefix products and store them in the answer array
  // we do not include the current element in the prefix product because we need to
  //  determine the product of all elements except the current one
  // so we start from index 1
  // and multiply the current prefix product with the previous one
  // answer[0] is already initialized to 1
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
  }
  /**
   * Example input nums: [1, 2, 3, 4]
   * Prefix products in answer array after this step:
   * answer[0] = 1 (no elements before index 0)
   * answer[1] = 1 (product of elements before index 1: 1)
   * answer[2] = 2 (product of elements before index 2: 1 * 2)
   * answer[3] = 6 (product of elements before index 3: 1 * 2 * 3)
   * answer = [1, 1, 2, 6]
   */

  // Step 2: Calculate suffix products on the fly and multiply with prefix products
  let suffixProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffixProduct;
    suffixProduct *= nums[i];
  }
  /**
   * Example input nums: [1, 2, 3, 4]
   * atart answer = [1, 1, 2, 6]
   * i = 3 , answer[3] = answer[3] * suffixProduct, = 6 * 1 = 6, suffxProduct = suffixProduct * nums[3] = 1 * 4 = 4
   * i = 2, answer[2] = answer[2] * suffixProduct, = 2 * 4 = 8, suffxProduct = suffixProduct * nums[2] = 4 * 3 = 12
   * i = 1, answer[1] = answer[1] * suffixProduct, = 1 * 12 = 12, suffxProduct = suffixProduct * nums[1] = 12 * 2 = 24
   * i = 0, answer[0] = answer[0] * suffixProduct, = 1 * 24 = 24, suffxProduct = suffixProduct * nums[0] = 24 * 1 = 24
   * answer = [24, 12, 8, 6]
   */

  return answer;
}
