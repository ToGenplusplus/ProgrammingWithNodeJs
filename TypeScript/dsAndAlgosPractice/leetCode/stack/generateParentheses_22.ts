function generateParenthesis(n: number): string[] {
  /**
    
        I: n integer from 1 -  8

        0:
            string array representing all possible n combinations of valid parenthese

        constraints

        example:
            n = 4 -> ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"]
            n = 3 -> ["((()))","(()())","(())()","()(())","()()()"]
            n = 2 -> ["(())","()()"]
            n = 1 -> ["()"]

            n = 1 -> ()
            n = 2 we take result of n = 1 and insert () in two places
            n = 2 -> ["(())","()()"]
            n = 3, we take result of n =2 and insert () in three places
            n = 3 -> ["((()))", "(()())","(())()", "()(())","()()()"]

            
        n = 2    
        stack = ["()"]
        iterate from 2 to n inclusive
            for each element in stack
                pop the element, insert "()" to each location in the element and push results to a set
            put all the set elements back in the stack
        return stack
     */

  const stack = ["()"];

  if (n === 1) return stack;

  const unique = new Set<string>();
  for (let i = 2; i <= n; i++) {
    while (stack.length > 0) {
      const str = stack.pop()!;
      insertParenthesesInStr(str, unique);
    }
  }

  return Array.from(unique);
}

function insertParenthesesInStr(str: string, vals: Set<string>) {
  vals.add("()" + str);
  for (let i = 1; i <= str.length; i++) {
    const newVal = str.substring(0, 1) + "()" + str.substring(i);
    vals.add(newVal);
  }
}

function generateParenthesisOptimal(n: number): string[] {
  const result: string[] = [];

  function backtrack(current: string, open: number, close: number): void {
    // Base case: If the current string has reached the maximum length
    if (current.length === n * 2) {
      result.push(current);
      return;
    }

    // Add an opening parenthesis if we still have open parentheses left
    if (open < n) {
      backtrack(current + "(", open + 1, close);
    }

    // Add a closing parenthesis if it won't exceed the number of open parentheses
    if (close < open) {
      backtrack(current + ")", open, close + 1);
    }
  }

  backtrack("", 0, 0);
  return result;
}
