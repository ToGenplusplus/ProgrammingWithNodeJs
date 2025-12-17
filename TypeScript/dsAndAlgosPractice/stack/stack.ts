// -------------------------- EASY ---------------------------
/**

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

constraints
how long can S be?
can s be undefined - no
can s be an empty string? - no

Examples
s = "()[]{}" -> true
s = "([])" -> true
Output: true

OPTIMAL SOLUTION: Stack
 */
export function isValid(s: string): boolean {
    return true;
}

/**
Given a string s of lowercase letters, 
a duplicate removal consists of choosing two adjacent and equal letters 
and removing them.

examples
Input: s = "abbaca"
Output: "ca"
// Explanation: 
// 1. "abbaca" -> "aaca" (removed "bb")
// 2. "aaca" -> "ca" (removed "aa")

constraints?
any spaces in s?
can s be empty
min and max length of s
 */
export function removeDuplicates(s: string): string {
    return s;
}

/**
You are given an integer array prices where prices[i] is the price of the 
ith item in a shop.

There is a special discount for items in the shop. 
If you buy the ith item, then you will receive a discount equivalent to 
prices[j] where j is the minimum index such that j > i and prices[j] <= prices[i]. 
Otherwise, you will not receive any discount at all.

Return an integer array answer where answer[i] is the final price 
you will pay for the ith item of the shop, considering the special discount.

examples:
Input: prices = [8,4,6,2,3]
Output: [4,2,4,2,3]
Explanation: 
For item 0 with price[0]=8 you will receive a discount equivalent to prices[1]=4, therefore, the final price you will pay is 8 - 4 = 4.
For item 1 with price[1]=4 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 4 - 2 = 2.
For item 2 with price[2]=6 you will receive a discount equivalent to prices[3]=2, therefore, the final price you will pay is 6 - 2 = 4.
For items 3 and 4 you will not receive any discount at all.

constraints
can prices[i] be negative?
how large can prices be?
can prices be empty?
 */
function finalPrices(prices: number[]): number[] {
    if (prices.length < 2) return prices;
    return prices;
}

// -------------------------- MEDIUM ---------------------------

/**
You are given an array of strings tokens that represents an arithmetic expression 
in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the 
expression.

constraints:
Note that:

The valid operators are '+', '-', '*', and '/'.
Each operand may be an integer or another expression.
The division between two integers always truncates toward zero.
There will not be any division by zero.
The input represents a valid arithmetic expression in a reverse polish notation.
The answer and all the intermediate calculations can be represented in a 
32-bit integer.

examples:
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6

clarifications?
can an operator come before an operand
max tokens
expected time and space complexity
 */
function evalRPN(tokens: string[]): number {
    return 0;
}

/**
Given an array of integers temperatures represents the daily temperatures, 
return an array answer such that answer[i] 
is the number of days you have to wait after the ith day to get a warmer temperature. 
If there is no future day for which this is possible, 
keep answer[i] == 0 instead.

examples:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]

constraints
temps length range?
temp[i] range?
expected time and space complexity?
 */
function dailyTemperatures(temps: number[]): number[] {
    return temps;
}

// -------------------------- HARD ---------------------------
