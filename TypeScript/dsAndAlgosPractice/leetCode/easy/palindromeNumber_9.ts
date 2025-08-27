function isPalindrome(x: number): boolean {
  /**
      I: integer -2^31 <= x <= 2^31 - 1

      O: true - x is a palindrome
          false - x is not a palindrome
      constraint:
          do not convert x into a string

      example: 
      121 -> true
      -121 -> false
      10 -> false

      121 / 10 = 12.1 
          % 10 = 1 -> insert 1 into an array
      12 / 10 = 1.2
          % 10 = 2 -> insert 2 into an array
      only 1 digit left and its going to be < 10 so insert the one into the array

      use two pointers to iterate through the array front and back and compare
      if front >= back return true
      break if a[front] != a[back]
   */
  if (x !== undefined && x < 0) return false; // negative # cannot be a palindrome
  if (x !== undefined && x >= 0 && x < 10) return true; // 0 - 9 single digits are palindromes

  let numToCheck = x;
  const xSplit = [];
  while (numToCheck > 9) {
    let divided = Math.trunc(numToCheck / 10);
    xSplit.push(numToCheck % 10);
    numToCheck = divided;
    if (numToCheck < 10) {
      xSplit.push(numToCheck);
      break;
    }
  }

  let front = 0;
  let rear = xSplit.length - 1;
  while (front < rear) {
    while (front < rear && xSplit[front] === xSplit[rear]) {
      front++;
      rear--;
    }
    if (front >= rear) return true;
    return false;
  }
}

function isPalindromeOptimized(x: number): boolean {
  // Negative numbers are not palindromes
  if (x < 0) return false;

  // Single-digit numbers are always palindromes
  if (x < 10) return true;

  // Reverse the second half of the number and compare with the first half
  let reversed = 0;
  let original = x;

  while (original > reversed) {
    reversed = reversed * 10 + (original % 10); // Add the last digit of `original` to `reversed`
    original = Math.trunc(original / 10); // Remove the last digit from `original`
  }

  // Check if the first half matches the reversed second half
  return original === reversed || original === Math.trunc(reversed / 10);
}

/**
 * Time complexity: O(log10(n))
 * space complexity: O(1)
 */
