import { runTests } from '../helpers/testHelpers';
import { FunctionParams, TestCase } from '../types';
import { isAnagram, isValidSudoku } from './hashing';

export function runHashingTestCases() {
  //   runTests('isAnagram', isAnagram, validAnagramTestCases);
  runTests('isValidSudoku', isValidSudoku, isValidSudokuTestCases);
}

const validAnagramTestCases: TestCase<FunctionParams, boolean>[] = [
  {
    input: {
      param1: 'anagram',
      param2: 'gramana',
    },
    expected: true,
    description: 's (anagram) and t (gramana) are valid anagrams',
  },
  {
    input: {
      param1: 'rat',
      param2: 'car',
    },
    expected: false,
    description: 's (rat) and t(car) are not valid anagrams',
  },
  {
    input: {
      param1: 'rat',
      param2: 'rats',
    },
    expected: false,
    description: 's (rat) and t (rats) are not valid anagrams',
  },
];

const isValidSudokuTestCases: TestCase<string[][], boolean>[] = [
  {
    input: [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ],
    expected: true,
  },
  {
    input: [
      ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ],
    expected: false,
    description: `the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.`,
  },
];
