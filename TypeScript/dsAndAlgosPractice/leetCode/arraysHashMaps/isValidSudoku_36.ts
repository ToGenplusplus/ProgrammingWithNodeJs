function isValidSudoku(board: string[][]): boolean {
  /**
        I: 2d string array containing string digits 1 -9 or '.'(9 x 9)


        O: true if valid sudoku
            false if univalid

        validity rules:

            Each row must contain the digits 1-9 without repetition.
            Each column must contain the digits 1-9 without repetition.
            Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

            only the filled cells need to be validated
        constraints:
        - on

        example (3 x 3)
        [1,0,0,0,0,0,0,0,0]
        [0,0,1,0,0,0,0,0,0]
        [1,1,0,0,0,0,0,0,0]
        [1,1,1,0,0,0,0,0,0]
        [1,0,1,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0,0]
        [0,0,0,0,0,0,0,0,0]
        [1,0,1,0,0,0,0,0,0]
        [0,1,0,0,0,0,0,0,0]


        1, ., 2
        3, 4, 5,
        8, 7, 6 
        4, 9, 8
        5, 3, 4
        8, 1, 7
        
        1 solution:
        nested for loop to iterate through each element
            new set when processing a row
            if value is not . 
                check if value is in set, if it is return false
                add to set

        return true;
     */

  if (!board) return false;

  for (let row = 0; row < board.length; row++) {
    const rowSet = new Set<string>();
    for (let col = 0; col < board[row].length; col++) {
      const num = board[row][col];
      if (num !== ".") {
        if (rowSet.has(num)) return false;
        rowSet.add(num);
      }
    }
  }

  //check column validation
  for (let col = 0; col < board[0].length; col++) {
    const colSet = new Set<string>();
    for (let cell = 0; cell < board.length; cell++) {
      const num = board[cell][col];
      if (num !== ".") {
        if (colSet.has(num)) return false;
        colSet.add(num);
      }
    }
  }

  //check 9 3 x 3 boxes of the grid
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxSet = new Set<string>();
      for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
        for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
          const num = board[row][col];
          if (num !== ".") {
            if (boxSet.has(num)) return false;
            boxSet.add(num);
          }
        }
      }
    }
  }

  return true;
}

/**
 * The code iterates through the 9x9 board a constant number of times (once for rows, once for columns, and once for the 3x3 boxes).
 * Each cell is visited a fixed number of times. Therefore, the time complexity is O(N^2), where N is the size of the board (9).
 * For a fixed-size board like Sudoku, this is essentially O(1) in terms of scaling with input size, as the size is constant.
 *
 * The space complexity is O(1) as well, since the maximum number of unique digits (1-9) is constant and does not scale with input size.
 */
