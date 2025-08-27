import { ListNode } from "./util/classes";
/**
 * Given:
 * head of a sorted lined list
 * 0 <= # of nodes <= 300
 * Return:
 * head of the sorted linked list with all duplicates removed
 *
 * Ex head = [1,1,2] -> [1,2]
 *
 * We could iterate over the list, keep track of the previous value seen
 * if the check value is the same as the previous value seen
 *  set the next value of the previous value seen to the next value of the current value seen, the previous value will remain unchanged
 * else
 *  we set the previous value to the current value, value to check will current .next
 *
 * Ex: head = [1,1,2]
 *
 * Iter | previous value | checkValue | list
 * 0 | 1 | 1 | [1,1,2]
 * 1 | 1 | 2 | [1,2]
 * 2 | 2 | null | [1,2]
 *
 *check value is null so we exit the loop
 * need a pointer to keep track of the head of the list
 * return headOfListPointer
 */

function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (head === null) return head;

  let previousNode = head;
  let returnList = previousNode;
  let checkNode = previousNode.next;

  while (checkNode !== null) {
    if (checkNode.val === previousNode.val) {
      previousNode.next = checkNode.next;
    } else {
      previousNode = checkNode;
    }
    checkNode = checkNode.next;
  }

  return returnList;
}
