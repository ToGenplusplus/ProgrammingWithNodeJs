import { runTests } from './helpers/testHelpers';
import { linkedListTests } from './linked-list/linkedList';
import { runTwoPointerTestCases } from './twopointer/twoPointerTests';
import { FunctionParams, TestCase } from './types';

export const dsAndAlogsMain = () => {
    // runTwoPointerTestCases();
    //   runHashingTestCases();
    linkedListTests();
};
