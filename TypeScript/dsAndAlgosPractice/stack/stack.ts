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
We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size.

The sign represents its direction (positive meaning right, negative meaning left).

Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. 

If both are the same size, both will explode. 

Two asteroids moving in the same direction will never meet.
 */
function asteriodCollision(asteroids: number[]): number[] {
    return asteroids;
}

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

/**
Given
    t - number - mile to reach
    positition - integer array of size n - starting mile of ith car
    speed - integer array of size n - speed of ith car

    A car cannot pass another car, 
    but it can catch up and then travel next to it at the speed of the slower car.
    A car fleet is a single car or a group of cars driving next to each other. 
    The speed of the car fleet is the minimum speed of any car in the fleet.
    If a car catches up to a car fleet at the mile target, 
    it will still be considered as part of the car fleet.
Return
    # of cars in the fleet that will arrive at the destination
examples
t = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
fleet 1
10 + 2 = 12
8 + 4 = 12
fleet 2
0 + 1 = 1
fleet 3
5 + 1 = 6
3 + 3 = 6
result = 3

Input: target = 100, position = [0,2,4], speed = [4,2,1]
fleet 1 
0 + 4 = 4
2 + 2 = 4

4 + min fleet speed(2) = 6
fleet 2
4 + 1 = 5
5 + speed(1) = 6

both fleets meet at 6, so we go at the slower speed of 1 until target
result - only 1 fleet


constraints



 */
function carFleet(t: number, position: number[], speed: number[]): number {
    return 0;
}

// -------------------------- HARD ---------------------------
