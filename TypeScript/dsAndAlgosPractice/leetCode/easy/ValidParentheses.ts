/**
 * S has list one character
 * Example inputs for s
 * {]} - false
 * {{{([])}}} - true
 * [()({})[]] - true
 * (){([])}() - true
 * [)({}) - false
 * ([)] - false
 *
 * since we know each open parenthesis needs a corresponding closed parenthesis
 * for it to be valid, number of chars in s must be even
 *
 * continuing from above statemnt, for each type of open parenthesis, there needs to be the same number of closed
 * parenthesis
 *
 * open brackets must be closed in the correct order
 *
 * Ex 1 (valid): [()]()
 * 1. Number of characters in s is 6 which is an even number
 * 2.
 * [ - count: 1,
 * ] - count: 1,
 * ( - count: 2,
 * ) - count: 2
 *
 * 3.
 * We can use a stack to keep track of the correct order, if char is an open parenthesis, push in stack,
 * if its closed, pop from stack and verify the char poped from stack is the correct open parenthesis
 *
 * After:
 * Iter | stack
 * 0 | [
 * 1 | [(
 * 2 | [
 * 3 |
 * 4 | (
 * 5 |
 *
 * the stack is empty and each closed parenthesis had an open parenthis in the correct order
 * All three conditions are satisfied, therefore:
 * [()]() - valid
 *
 * Ex 2(not valid): ([)]
 * 1. number of chars in s is 4 which is even - satisfied
 * 2. Every closed parenthesis has a corresponding open paren of the same type - satisfied
 * 3.
 *
 * After:
 * Iter | stack
 * 0 | (
 * 1 | ([
 * 2 - current char is ) but char popped from stack is [, since they don't match, condition is not satisfied
 * therefore:
 * ([)] - not valid.
 *
 *
 */

/**
 * My solution:
 * Time complexity: O(n)
 * Space complexity: O(n) - this can be reduced to O(1) using 3 variables for each parenthesis type instead of a stack(array),
 * since if the input s is all open parens, the size of the stack would be the length of s
 * @param s
 * @returns
 */
export const isValidParenthesesis = (s: string): boolean => {
  // condition 1
  if (s.length % 2 !== 0) return false;

  //condition 2 and 3
  const bracket = ["[", "]"];
  const curly = ["{", "}"];
  const paren = ["(", ")"];

  const stack = [];
  let isValidParenthesesis = false;
  for (let i = 0; i < s.length; i++) {
    if (
      s.charAt(i) === bracket[0] ||
      s.charAt(i) === curly[0] ||
      s.charAt(i) === paren[0]
    ) {
      stack.push(s.charAt(i));
    } else {
      if (stack.length > 0) {
        const charFromStack = stack.pop();
        if (charFromStack === bracket[0] && s.charAt(i) === bracket[1]) {
          isValidParenthesesis = true;
        } else if (charFromStack === curly[0] && s.charAt(i) === curly[1]) {
          isValidParenthesesis = true;
        } else if (charFromStack === paren[0] && s.charAt(i) === paren[1]) {
          isValidParenthesesis = true;
        } else {
          isValidParenthesesis = false;
        }
      } else {
        isValidParenthesesis = false;
      }

      if (!isValidParenthesesis) break;
    }
  }
  stack.length > 0 && (isValidParenthesesis = false);
  return isValidParenthesesis;
};

// Checks i forgot to make before i arrived at above solution:
// length of stack should be 0 after iterating through the string
// setting the isValidParenthesesis to false when if conditions are not successfull

/**
 * Time complexity is O(n) - leveraging a hash map to improve search performance
 * space complexity is O(n) -
 * @param s
 * @returns
 */
function isValidBetter(s: string): boolean {
  const bracketsMap = {
    ")": "(",
    "}": "{",
    "]": "[",
  };
  const parens = [];

  for (let i = 0; i < s.length; i++) {
    if (bracketsMap[s[i]]) {
      if (parens.pop() !== bracketsMap[s[i]]) {
        return false;
      }
    } else {
      parens.push(s[i]);
    }
  }

  return parens.length === 0;
}
