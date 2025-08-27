/**
 * Given:
 *  Two strings a, and b where a and b are binary representation of integers
 *  no leading 0's in a and b, except for 0
 *  at least one char in a and b.
 * Return
 *  a string represnting a binary representation of a + b
 *
 * Ex: a: 0 , b: 1 -> 1
 * Ex: a: 10, b: 10 -> 100
 *
 * Ex: a: 1111 b: 1 -> 10000
 * Iter | a | b | co | result
 * 0 | 1 | 1| 0 |
 * 1| 1| |1 | 0
 * 2| 1 | | 1 | 00
 * 3 | 1 ||1|000
 * 4| 1||1|0000
 * 5|||1|00001 -> 10000
 *
 *
 * Ex: a: 111, b:11 -> 1010
 * Ex: a: 111, b:01 -> 1000
 *  Iter | a | b | co | result
 *  0 | 1 | 1 | 0 |
 *  1 | 1 | 0 | 1 |0
 *  2| 1 | | 1 | 00
 * 3|
 *
 *
 *
 *
 *
 * Ex: a: 101, b:01 -> 110
 * Ex: a: 101, b:11 -> 1000
 * Ex: a: 1010 b: 1011 -> 10101
 *
 * 0 + 1 = 1
 * 1 + 1 = 0 (carry over 1)
 * 0 + 0 = 0
 *
 * Need to iterate over both a and b, a and b can be different lengths**
 * we break iteration if there is no carry over
 * store the result in a string, and we would return the revers of the string
 *
 * Possible solution algorithm:
 * set carryOver to 0
 * iterate over both a and b starting at the last character
 *  let a = carryOver + a
 *      if a == 2
 *       a = 0
 *       carryOver = 1
 *      else
 *        carryOver = 0
 *  add a to b
 *      if a  + b == 2
 *          result digit is 0
 *          carryOver = 1
 *      else
 *        carryOver = 0
 *
 * if there are still integer to process in string 1
 *  add carryOver to digit in string1
 *    if result == 2
 *     carryOver = 1
 *     add 0 to returnString
 *     carryOver = 1
 *    else
 *        carryOver = 0
 *
 * do the same for string 2
 *
 * at the end if carryOver is 1, add 1 to returnString
 * returnString
 *
 *
 *
 */

/**
 * Tine complexity is O(max(la,lb) + l)
 * where l is the length of the longest substring being processed in the process string function
 * Space complexity is O(max(la,lb)) since the size of result is dependent on the on the lenght of the larger inputs string
 */

export function addBinary(a: string, b: string): string {
  let carryOver = 0;
  let returnString = [];
  let startA = a.length - 1;
  let startB = b.length - 1;

  while (startA > -1 && startB > -1) {
    let result = parseInt(a.charAt(startA)) + carryOver;
    if (result === 2) {
      result = 0;
      carryOver = 1;
    } else {
      carryOver = 0;
    }
    let result2 = result + parseInt(b.charAt(startB));
    if (result2 === 2) {
      returnString.unshift("0");
      carryOver = 1;
    } else {
      returnString.unshift(result2.toString());
    }
    startA--;
    startB--;
  }

  if (startA !== -1) {
    processString(carryOver, a.substring(0, startA + 1), returnString);
  }

  if (startB !== -1) {
    processString(carryOver, b.substring(0, startB + 1), returnString);
  }

  if (startA === -1 && startB === -1) {
    if (carryOver === 1) {
      returnString.unshift("1");
    }
  }

  return returnString.join("");
}

function processString(carry: number, a: string, returnString: string[]) {
  let carryOver = carry;
  let start = a.length - 1;

  while (start > -1) {
    let result = parseInt(a.charAt(start)) + carryOver;
    if (result === 2) {
      returnString.unshift("0");
      carryOver = 1;
    } else {
      returnString.unshift(result.toString());
      carryOver = 0;
    }
    start--;
  }

  if (carryOver === 1) {
    returnString.unshift("1");
  }
}

/**
 * Better solution
 * Tine complexity is O(max(la,lb))
 * Space complexity is O(max(la,lb)) since the size of result is dependent on the on the lenght of the larger inputs string
 */

function addBinaryBetter(a: string, b: string): string {
  let result: string[] = [];
  let carry = 0;

  let i = a.length - 1;
  let j = b.length - 1;

  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? Number(a[i]) : 0;
    const digitB = j >= 0 ? Number(b[j]) : 0;

    const sum = digitA + digitB + carry;
    result.push((sum % 2).toString()); // Add the binary digit to the result
    carry = Math.floor(sum / 2); // Update the carry

    i--;
    j--;
  }

  return result.reverse().join(""); // Reverse and join the result array
}
