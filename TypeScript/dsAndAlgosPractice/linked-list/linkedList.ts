import { ListNode } from './linkedListImpl';

/**
Given the head of a singly linked list, reverse the list, and return the reversed list.

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

constraints
 */
function reverseList(head: ListNode<number> | null): ListNode<number> | null {
    if (head === null || head.next === null) return head;

    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;

    return newHead;
}

function reverseListIterative(head: ListNode<number> | null): ListNode<number> | null {
    let curr = head;
    let prev = null;
    while (curr !== null) {
        let next = curr.next;
        curr.next = prev;
        curr = next;
        prev = curr;
    }
    return prev;
}

export function linkedListTests() {
    const head = generateLinkedListFromArray([1, 2, 3]);

    const reversed = reverseList(head);

    let node = reversed;
    const expected = [3, 2, 1];
    const result = [];
    while (node !== null) {
        result.push(node.value);
        node = node.next;
    }

    console.log(`Expected: ${expected}, Result: ${result}`);
}

function generateLinkedListFromArray(input: number[]): ListNode<number> {
    const head = new ListNode(input[0]);
    let currNode = head;
    let i = 1;
    while (i < input.length) {
        currNode.next = new ListNode(input[i]);
        currNode = currNode.next;
    }

    return head;
}
