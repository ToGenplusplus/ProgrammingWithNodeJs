# Stack Pattern - Algorithm Interview Guide

## Overview

A stack is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end (the top). The stack pattern is one of the most versatile techniques in algorithm problem-solving, particularly useful for problems involving nested structures, backtracking, and maintaining order.


## When to Use Stack Pattern

### Key Indicators

1. **Problem involves matching or balancing symbols** (parentheses, brackets, tags)
2. **Need to process nested structures** (expressions, file systems, nested lists)
3. **Reversing order is required** (undo operations, string reversal)
4. **Need to track the most recent elements** or maintain a "context"
5. **Problem involves backtracking** (maze solving, path finding)
6. **Expression evaluation or parsing** (infix, postfix, prefix)
7. **Need to find the next/previous greater/smaller element**
8. **Problems with "nearest" or "most recent" semantics**
9. **Depth-First Search (DFS) traversal** of trees or graphs
10. **Function call simulation** or recursion elimination

### Problem Characteristics

Use a stack when:
- Elements need to be processed in reverse order of arrival
- Need to remember previous states to return to later
- Matching opening and closing elements
- Evaluating expressions with operator precedence
- Need to cancel out or "undo" operations
- Processing nested levels of data
- Finding spans or ranges based on comparison

## Types of Stack Problems

### 1. Matching and Balancing

**Pattern Description:**
- Use stack to track opening symbols
- Pop when encountering corresponding closing symbols
- Stack should be empty at the end for valid input

**When to Use:**
- Validating parentheses, brackets, braces
- Matching HTML/XML tags
- Checking balanced expressions
- Validating nested structures

**Example Problems:**
- Valid Parentheses
- Remove Invalid Parentheses
- Minimum Add to Make Parentheses Valid
- Score of Parentheses
- Valid Bracket Subsequence


### 2. Next/Previous Greater/Smaller Element

**Pattern Description:**
- Maintain a monotonic stack (increasing or decreasing)
- Pop elements that don't satisfy the monotonic property
- Popped elements have found their next/previous greater/smaller

**When to Use:**
- Finding next greater/smaller element for each element
- Stock span problems
- Histogram area problems
- Temperature problems

**Example Problems:**
- Next Greater Element I, II
- Daily Temperatures
- Largest Rectangle in Histogram
- Maximal Rectangle
- Sum of Subarray Minimums
- Online Stock Span

**Code Template (Next Greater Element):**
```python
def next_greater_elements(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # Store indices
    
    for i in range(n):
        # Pop elements smaller than current
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            result[idx] = nums[i]
        
        stack.append(i)
    
    return result
```

**Code Template (Monotonic Decreasing Stack):**
```python
def monotonic_stack(nums):
    stack = []
    result = []
    
    for num in nums:
        # Maintain decreasing order
        while stack and stack[-1] < num:
            stack.pop()
        
        # Process current element
        # Stack top is the next greater element
        if stack:
            result.append(stack[-1])
        
        stack.append(num)
    
    return result
```

### 3. Expression Evaluation and Parsing

**Pattern Description:**
- Use one or two stacks (operands and operators)
- Process operators based on precedence
- Evaluate when encountering closing parenthesis or lower precedence

**When to Use:**
- Evaluating arithmetic expressions
- Converting between infix, postfix, prefix notations
- Building expression trees
- Calculator implementations

**Example Problems:**
- Basic Calculator I, II, III
- Evaluate Reverse Polish Notation
- Build Binary Expression Tree
- Decode String
- Remove K Digits


### 4. String Manipulation and Decoding

**Pattern Description:**
- Use stack to build strings incrementally
- Handle nested patterns or encodings
- Backtrack when encountering closing markers

**When to Use:**
- Decoding encoded strings
- Removing adjacent duplicates
- Building strings with nested patterns
- Simplifying paths

**Example Problems:**
- Decode String
- Remove All Adjacent Duplicates In String I, II
- Simplify Path
- Asteroid Collision
- Basic Calculator (string parsing)


### 5. Tree and Graph Traversal (DFS)

**Pattern Description:**
- Use explicit stack instead of recursion
- Push nodes/states to explore later
- Process when popping from stack

**When to Use:**
- Iterative DFS implementation
- Avoiding recursion stack overflow
- Path tracking in trees/graphs
- Maze solving
- Backtracking problems

**Example Problems:**
- Binary Tree Inorder/Preorder/Postorder Traversal (Iterative)
- Path Sum
- Clone Graph
- Number of Islands
- Word Search


### 6. Histogram and Area Problems

**Pattern Description:**
- Use stack to track potential rectangle boundaries
- Calculate area when popping elements
- Maintain indices in stack for width calculation

**When to Use:**
- Finding maximum rectangle areas
- Histogram problems
- Skyline problems
- Container problems

**Example Problems:**
- Largest Rectangle in Histogram
- Maximal Rectangle
- Trapping Rain Water
- Container With Most Water

### 7. Backtracking and State Management

**Pattern Description:**
- Save states when exploring branches
- Restore states by popping from stack
- Track decision points for backtracking

**When to Use:**
- Maze solving
- Sudoku solving
- N-Queens problem
- Combination/permutation generation
- Parentheses generation

**Example Problems:**
- Generate Parentheses
- Letter Combinations of a Phone Number
- Combination Sum
- Permutations
- N-Queens


### 9. Monotonic Stack Applications

**Pattern Description:**
- Maintain stack in strictly increasing or decreasing order
- Elements violating order are popped
- Each element is pushed and popped at most once

**When to Use:**
- Finding nearest smaller/larger elements
- Stock span problems
- Building with ocean view
- Car fleet problems

**Example Problems:**
- Next Greater Element
- Daily Temperatures
- Online Stock Span
- Buildings With an Ocean View
- Car Fleet


## Problem-Solving Strategy

### Step-by-Step Approach

1. **Identify Stack Applicability**
   - Does the problem involve LIFO semantics?
   - Are there nested structures or matching pairs?
   - Need to track most recent elements?
   - Backtracking or state restoration required?

2. **Determine What to Store**
   - Just values?
   - Indices (for calculating distances/widths)?
   - Tuples of multiple values (state information)?
   - Custom objects?

3. **Define Push Condition**
   - When should elements be added to stack?
   - What preprocessing is needed before pushing?

4. **Define Pop Condition**
   - When should elements be removed?
   - What processing happens during pop?
   - What information is extracted from popped elements?

5. **Process Result**
   - Build result during iteration?
   - Process stack contents after iteration?
   - Check stack state for validity?

6. **Handle Edge Cases**
   - Empty input
   - Single element
   - All same elements
   - Stack empty when trying to pop
   - Stack not empty at end (when it should be)

## Common Patterns and Tricks

### 1. Using Indices Instead of Values

When you need to calculate spans, widths, or distances:
```python
stack = []  # Store indices
for i, val in enumerate(arr):
    # Calculate width: i - stack[-1] - 1
    # Calculate span: i - previous_index
    stack.append(i)
```

### 2. Sentinel Values

Add dummy values to simplify edge cases:
```python
# Add sentinel to trigger final processing
heights.append(0)

# Add base cases to avoid empty stack checks
stack = [-1]  # Base index for width calculation
```

### 3. Storing Multiple Values

Use tuples or lists for complex state:
```python
stack = []
stack.append((value, count, index))
stack.append([char, frequency])
```

### 4. Two-Stack Technique

Some problems benefit from two stacks:
```python
values = []  # Operand stack
operators = []  # Operator stack

# Or for undo/redo
undo_stack = []
redo_stack = []
```

### 5. Stack + Hash Map

Combine for O(1) access to specific elements:
```python
stack = []
index_map = {}  # value -> index in stack

# Fast access to any element
if value in index_map:
    idx = index_map[value]
```

## Common Pitfalls and Tips

### Pitfalls to Avoid

1. **Not Checking for Empty Stack**
```python
   # Wrong
   val = stack.pop()
   
   # Correct
   if stack:
       val = stack.pop()
```

2. **Forgetting to Check Stack State at End**
```python
   # For matching problems, stack should be empty
   return len(stack) == 0
```

3. **Incorrect Monotonic Stack Conditions**
```python
   # For next greater: pop smaller/equal
   while stack and arr[stack[-1]] <= arr[i]:
       stack.pop()
   
   # For next smaller: pop greater/equal
   while stack and arr[stack[-1]] >= arr[i]:
       stack.pop()
```

4. **Off-by-One in Width Calculations**
```python
   # Correct width calculation
   width = i if not stack else i - stack[-1] - 1
```

5. **Not Handling Duplicates in Monotonic Stack**
   - Decide whether to use `<` or `<=` based on problem requirements

### Optimization Tips


1. **Avoid Unnecessary Operations**
   - Check before pushing/popping
   - Combine operations when possible

2. **Process While Popping**
   - Don't pop all then process
   - Process during pop for efficiency

3. **Consider Monotonic Stack First**
   - For "next/previous greater/smaller" problems
   - Usually optimal O(n) solution


## Decision Tree for Stack Pattern
```
Does problem involve:

1. Matching/Balancing?
   └─ Yes → Use stack for opening symbols

2. Next/Previous Greater/Smaller?
   └─ Yes → Monotonic stack

3. Expression Evaluation?
   └─ Yes → Operator/operand stacks

4. Nested Structures?
   └─ Yes → Stack for state management

5. Reversing Order?
   └─ Yes → Push all, then pop

6. DFS Traversal?
   └─ Yes → Stack for nodes/states

7. Backtracking?
   └─ Yes → Stack for decision points

8. Building Result Backwards?
   └─ Yes → Stack to reverse order
```

## Practice Problems by Difficulty

### Easy
- Valid Parentheses
- Implement Stack using Queues
- Baseball Game
- Backspace String Compare
- Remove All Adjacent Duplicates In String
- Min Stack
- Next Greater Element I

### Medium
- Daily Temperatures
- Evaluate Reverse Polish Notation
- Decode String
- Asteroid Collision
- Remove K Digits
- Score of Parentheses
- Online Stock Span
- Next Greater Element II
- Simplify Path
- Basic Calculator II
- Car Fleet
- Buildings With an Ocean View

### Hard
- Largest Rectangle in Histogram
- Maximal Rectangle
- Basic Calculator (with parentheses)
- Basic Calculator III
- Trapping Rain Water
- Maximum Frequency Stack
- Parsing A Boolean Expression
- Number of Atoms

## Key Takeaways

1. **Stack = LIFO**: Most recent element is accessed first
2. **Each element processed once**: Push once, pop once = O(n)
3. **Monotonic stacks**: Powerful for next/previous greater/smaller problems
4. **Great for nested structures**: Parentheses, expressions, tags
5. **Alternative to recursion**: Explicit control, avoid stack overflow
6. **Always check empty**: Before popping or peeking
7. **Store indices when needed**: For distance/width calculations
8. **Two stacks useful**: For complex state management (calculator, undo/redo)
9. **Sentinel values simplify**: Edge case handling
10. **Visualize the stack**: Draw it out for complex problems