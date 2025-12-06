import { TestCase } from "../helpers";
import { maxArea } from "./twopointer";


export function runTwoPointerTestCases () {
    runMaxAreaTests()
}

function runMaxAreaTests() {
    const maxAreaTestCases: TestCase<number[], number>[] = [
            {
                input: [1, 8, 6, 2, 5, 4, 8, 3, 7],
                expected: 49,
                description: "Standard case where max area is not the widest container, but relies on moderate width and tall walls (8 and 7, width 7).",
            },
            {
                input: [1, 1],
                expected: 1,
                description: "Minimum size input (n=2). Width is 1, Height is 1.",
            },
            {
                input: [4, 3, 2, 1, 4],
                expected: 16,
                description: "Case where tall walls are at the extremes. Width is 4, Height is min(4, 4) = 4. Area is 16.",
            },
            {
                input: [1, 2, 1],
                expected: 2,
                description: "Case where the widest possible container is not the max area. Max area is between [2, 1] or [1, 2] (width 1, height 1) vs [1, 2, 1] (width 2, height 1). Area is 2.",
            },
            {
                input: [10, 5, 1, 1, 1, 10],
                expected: 50,
                description: "Case where tall walls are at the extremes, separated by much shorter walls. Width is 5, Height is min(10, 10) = 10. Area is 50.",
            },
        ];
    
        let passed = 0;
        console.log("--- Running Max Area Tests ---");
        
        for (const test of maxAreaTestCases) {
            const result = maxArea(test.input);
            if (result === test.expected) {
                console.log(`✅ PASS: ${test.description}`);
                passed++;
            } else {
                console.error(`❌ FAIL: ${test.description}`);
                console.error(`   Input: [${test.input}]`);
                console.error(`   Expected: ${test.expected}, Got: ${result}`);
            }
        }
        console.log(`\nResults: ${passed}/${maxAreaTestCases.length} tests passed.`);
}