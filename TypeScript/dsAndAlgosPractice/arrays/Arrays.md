# Array:

- enables storing data in sequential blocks of memory
- O(1) 
  - retrieval of items if item location is known.
  - appending at the end of the array (majority of the time)
- O(n) 
  - for traversal, insert, deletion, operations.
- O(n logn)
  - for sorting
- Use case:
  - require data stored together in memory (cache friendlyness)
  - items are known ahead of time
  - represent multiple items of the same type in a single variable

## Problem solving:

In order to ensure you are understanding/solving the actual problem, accounting for edge cases, its important to ask
Clarification questions:

- can the array be empty
- does the array contain distinct elements
- Is the array sorted?
- what type of numbers are in the array (intergers, floating point)
- are numbers all positive?
- Are we optimizing for memory or time complexity?

Answers to these questions can lead to identifying the technique to use to solving the problem

### Techniques & Lessons Learned

- can an optimal solution be found by iterating through the array from the end?
  - e.g if we needed to find the elements in an array that are greater than all the elements to the right of itself (the leaders).
- Can an optimal solution be found by revering the elements of the array?