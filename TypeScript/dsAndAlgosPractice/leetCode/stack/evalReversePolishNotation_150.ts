export function evalRPN(tokens: string[]): number {
  /**
        I:
            tokens 
            string array representing arithmetic oprerations in Reverse polish notation


        O:
            number representing the evaluated expressio


        constraints:
            1 <= tokens.length <= 104
            tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200]

            My assumptions:
            safe to assume an operator cannot be the first element in the array - true
            2 or more operands would always prepend and operator - true
    
        example:
        ["2","1","+","3","*"] -> 9 reasoning ((2 + 1) * 3) = 9
        2, 1, + = 3
        3, 3,  = 9

        ["4","13","5","/","+"] -> 6 
        4, 13, 5 / -> operators operate on the previous two operands so it would be 13 / 5= 2
        store 2 back in my stack
        [4, 2]
        continue processing tokens , i see +
        so operation is 4 + 2 = 6
        no more tokens to process return 6

        ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
        9 + 3 = 12. => [10, 6 12, -11,"*","/","*","17","+","5","+"]
        12 * -11 = -132 => [10, 6, -132,"/","*","17","+","5","+"]
        6 / -132  = -0 => [10, -0,"*","17","+","5","+"]
        10 * -0 = -0 => [-0, "17","+","5","+"]
        -0 + 17 = 17 => [17,"5","+"]
        17 + 5 = 22 => []

        initiate stack s
        iterate through tokens
            if token == operand push in stack
            else 
                pop last two elements from stack
                perform operation on 2nd to last operand operation last operand
                store result back in stack
     */

  //only one token ?
  // only 2 tokens ?

  const operandStack = [];
  const operators = new Set(["+", "-", "*", "/"]);

  if (tokens == undefined) return 0;

  for (const token of tokens) {
    if (!operators.has(token)) {
      operandStack.push(Number(token));
    } else {
      //we are dealing with an operator token

      // Pop the last two operands from the stack
      const b = operandStack.pop()!;
      const a = operandStack.pop()!;
      let expressionResult = 0;
      switch (token) {
        case "+":
          expressionResult = a + b;
          break;
        case "-":
          expressionResult = a - b;
          break;
        case "*":
          expressionResult = a * b;
          break;
        case "/":
          expressionResult = Math.trunc(a / b);
          break;
        default:
          throw new Error("Invalid operator");
      }
      operandStack.push(expressionResult);
    }
  }

  return operandStack[0];
}

/**
 * Time complexity is o(t) where t is the number of tokens
 * space complexity is o(t) where t is the number of tokens
 */
