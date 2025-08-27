function isValid(s: string): boolean {
  /**
      I: s - string
      s consists of parentheses only '()[]{}'
      1 <= s.length <= 104
  
      Output:
          true - input string is valid parentheses
          false - not valid
      constraints:
          Valid:
              Open brackets must be closed by the same type of brackets.
              Open brackets must be closed in the correct order.
              Every close bracket has a corresponding open bracket of the same type.
  
      Examples:
          s = "()" -> true
          s = "()[{}]" - true 
          s = "(])" -> false
  
          iter | s[i] | stack |  isValid
          0 | ( | empty | 
          1 | )  | ( | matching closing for open so isValid -true
          2 | [ | empty |
          3 | {  | [ |
          4 | }  | [ } | mathing closing bracket for opening - true
          5 | ] | [ | mathing closing bracket for opening - true
     */
  if (!s) return false;

  const openParens = [];
  const matchingParens = new Map<string, string>();
  matchingParens.set("]", "[");
  matchingParens.set("}", "{");
  matchingParens.set(")", "(");

  // s = "()[{}"
  /**
          Stack: [
      
       */
  for (const paren of s.split("")) {
    if (paren === "(" || paren === "{" || paren === "[") {
      openParens.push(paren);
    } else {
      if (openParens.length > 0) {
        const openParen = openParens.pop();
        if (
          matchingParens.has(paren) &&
          matchingParens.get(paren) !== openParen
        )
          return false;
      } else {
        return false;
      }
    }
  }

  return openParens.length === 0;
}

function isValidReadable(s: string): boolean {
  if (!s) return false;

  const stack: string[] = [];
  //slightly faster than using a map
  const matchingParens: Record<string, string> = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (const char of s) {
    if (char in matchingParens) {
      // If it's a closing bracket, check the top of the stack
      if (stack.pop() !== matchingParens[char]) {
        return false;
      }
    } else {
      // If it's an opening bracket, push it onto the stack
      stack.push(char);
    }
  }

  // The stack should be empty if the string is valid
  return stack.length === 0;
}
