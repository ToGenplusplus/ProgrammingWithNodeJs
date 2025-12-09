import { TestCase } from '../types';

export function runTests(
  testName: string,
  testFunction: Function,
  testCases: TestCase<any, any>[]
) {
  let passed = 0;
  console.log(`--- Running ${testName} Tests ---`);

  for (const test of testCases) {
    const functionToTestInput = test.input;
    const result = testFunction(functionToTestInput);
    if (result !== undefined) {
      if (result === test.expected) {
        console.log(`✅ PASS: ${test.description ?? ''}`);
        passed++;
      } else {
        console.error(`❌ FAIL: ${test.description ?? ''}`);
        console.error(`   Input: [${JSON.stringify(test.input)}]`);
        console.error(`   Expected: ${test.expected}, Got: ${JSON.stringify(result)}`);
      }
    } else {
      //void test case (assuming in place modification)
      console.error(`   Input: [${JSON.stringify(test.input)}]`);
      console.error(`   Expected: ${test.expected}, Got: ${JSON.stringify(functionToTestInput)}`);
    }
  }
  console.log(`\nResults: ${passed}/${testCases.length} tests passed.`);
}
