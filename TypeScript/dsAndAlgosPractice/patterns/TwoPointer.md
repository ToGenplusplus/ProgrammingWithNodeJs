# Two Pointer Pattern - Algorithm Interview Guide

## Overview

The two pointer pattern is a technique that uses two references (pointers) to traverse a data structure, typically an array or linked list. The pointers can move in different directions or at different speeds depending on the problem requirements.

## When to Use Two Pointer Pattern

### Key Indicators

1. **Working with sorted arrays or linked lists**
2. **Need to find pairs or triplets that satisfy certain conditions**
3. **Need to compare elements at different positions**
4. **Searching for a subarray or substring that meets specific criteria**
5. **Need to partition or rearrange elements in-place**
6. **Problem involves finding elements that sum to a target**
7. **Need to remove duplicates in-place**
8. **Problem involves palindrome checking**

### Problem Characteristics

Use two pointers when:
- The problem asks for optimization in terms of space complexity (in-place operations)
- A brute force approach would require nested loops (O(n²)) but can be optimized to O(n)
- You need to process elements from both ends of the array
- You need to maintain a window or range within the data structure
- The problem involves finding complementary pairs

## Types of Two Pointer Approaches

### 1. Opposite Direction (Converging Pointers)

**Pattern Description:**
- One pointer starts at the beginning (left = 0)
- Another pointer starts at the end (right = n - 1)
- Pointers move toward each other until they meet

**When to Use:**
- Array/string is sorted
- Looking for pairs that sum to a target
- Palindrome verification
- Reversing arrays or strings
- Container with most water type problems

**Example Problems:**
- Two Sum II (sorted array)
- Valid Palindrome
- Container With Most Water
- Trapping Rain Water
- 3Sum


### 2. Same Direction (Fast and Slow Pointers)

**Pattern Description:**
- Both pointers start at the beginning
- One pointer (slow) moves one step at a time
- Other pointer (fast) moves ahead based on conditions

**When to Use:**
- Removing duplicates in-place
- Moving elements that meet certain criteria
- Partitioning arrays
- Finding elements to remove or keep

**Example Problems:**
- Remove Duplicates from Sorted Array
- Remove Element
- Move Zeroes
- Partition Array


### 3. Sliding Window (Special Case of Two Pointers)

**Pattern Description:**
- Both pointers define a window [left, right]
- Expand window by moving right pointer
- Shrink window by moving left pointer
- Maintains a valid window based on conditions

**When to Use:**
- Finding subarrays with specific properties
- Longest/shortest substring problems
- Problems with contiguous sequences
- Window size constraints

**Example Problems:**
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Maximum Sum Subarray of Size K
- Longest Repeating Character Replacement


### 4. Linked List (Fast and Slow Runner)

**Pattern Description:**
- Slow pointer moves one node at a time
- Fast pointer moves two nodes at a time
- Used for cycle detection and finding middle

**When to Use:**
- Detecting cycles in linked lists
- Finding the middle of a linked list
- Finding the nth node from the end
- Checking if linked list is a palindrome

**Example Problems:**
- Linked List Cycle
- Find Middle of Linked List
- Remove Nth Node From End
- Happy Number

**Code Template:**
```python
def fast_slow_linked_list(head):
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            # Cycle detected
            return True
    
    # No cycle or reached end
    return False
```

## Problem-Solving Strategy

### Step-by-Step Approach

1. **Identify the Pattern**
   - Is the array/list sorted? → Consider opposite direction pointers
   - Need to modify array in-place? → Consider same direction pointers
   - Looking for subarray/substring? → Consider sliding window
   - Working with linked list? → Consider fast/slow runners

2. **Define Pointer Initialization**
   - Where should each pointer start?
   - What do the pointers represent?

3. **Determine Movement Logic**
   - When should left pointer move?
   - When should right pointer move?
   - What conditions trigger movement?

4. **Define Termination Condition**
   - When should the loop stop?
   - What indicates we've processed all necessary elements?

5. **Handle Edge Cases**
   - Empty array/list
   - Single element
   - All elements the same
   - No valid answer exists

## Common Pitfalls and Tips

### Pitfalls to Avoid

1. **Off-by-One Errors**
   - Carefully consider `<` vs `<=` in loop conditions
   - Watch for `right - left + 1` when calculating length

2. **Infinite Loops**
   - Ensure pointers always make progress
   - Verify loop termination conditions

3. **Not Handling Duplicates**
   - In problems like 3Sum, skip duplicate values
   - Use `while` loops to skip duplicates after finding solutions

4. **Incorrect Pointer Updates**
   - Update both pointers when needed
   - Don't forget to move pointers after processing

### Optimization Tips

1. **Sort First (if allowed)**
   - Many two-pointer problems benefit from sorted input
   - O(n log n) sorting + O(n) two-pointer is often better than O(n²) brute force

2. **Use Additional Data Structures**
   - HashMaps can complement two pointers
   - Store intermediate results for faster lookup

3. **Validate Assumptions**
   - Check if array is actually sorted
   - Verify input constraints

## Time and Space Complexity

### Time Complexity
- Most two-pointer solutions: **O(n)**
  - Each element visited at most once (or constant times)
  - Linear traversal with pointers

- With sorting: **O(n log n)**
  - Sorting dominates the complexity
  - Two-pointer traversal is still O(n)

### Space Complexity
- Typically: **O(1)**
  - Only using pointer variables
  - In-place modifications

- With additional storage: **O(n)**
  - Storing results or using auxiliary data structures

## Practice Problems by Difficulty

### Easy
- Two Sum II - Input Array Is Sorted
- Valid Palindrome
- Remove Duplicates from Sorted Array
- Move Zeroes
- Merge Sorted Array

### Medium
- 3Sum
- Container With Most Water
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Sort Colors (Dutch National Flag)
- Linked List Cycle II
- Remove Nth Node From End of List

### Hard
- Trapping Rain Water
- Minimum Window Substring
- Substring with Concatenation of All Words
- Sliding Window Maximum

## Decision Tree for Two Pointer Pattern
```
Is the input sorted?
├─ Yes
│  ├─ Looking for pairs/triplets summing to target? → Opposite Direction
│  ├─ Removing duplicates? → Same Direction
│  └─ Finding subarray? → Sliding Window
│
└─ No
   ├─ Can you sort it? → Sort then use appropriate pattern
   ├─ Linked list problem? → Fast/Slow Runner
   ├─ Finding substring/subarray? → Sliding Window
   └─ Partitioning/rearranging? → Same Direction
```

## Key Takeaways

1. Two pointer pattern optimizes problems from O(n²) to O(n)
2. Choose pointer direction based on problem requirements
3. Works best with sorted data or when sorting doesn't violate constraints
4. Essential for in-place array manipulation
5. Master different variants: opposite direction, same direction, sliding window, fast/slow
6. Always consider edge cases and pointer movement logic carefully
7. Practice identifying when to apply each variant