import { ListNode } from "./util/classes";
/**
 * Given:
 *  head of two sorted (non decreasing) linked list of numbers (-100 to 100)
 * number of nodes in the list range from 0 to 50
 * Return:
 *  the head of the merged linked list
 *
 * Brain Dump:
 * if both list are null return null
 * if one of the list is null return the other list
 *
 * we will need to compare the nodes in each list one by one
 * this means we will need at least two pointers (one for each list)
 * one more pointer for the returned list
 * list1 : [1,2,4], list2 : [1,3,5]
 * Iter | pointer1 | pointer2 | returnPointer
 * 0 | 1 | 1 |
 * 1 | 2 | 1 | 1 (pointer1)
 * 2 | 2 | 3 | 1 -> 1
 * 3 | 4 | 3 | 1 -> 1 -> 2
 * 4 | 4 | 5 | 1 -> 1 -> 2 -> 3
 * 5 | | 5 | 1 -> 1 -> 2 -> 3 -> 4
 * break loop
 * we still have value in list two and we know that value is greater than what is
 * in return list so we set the next value to value of list two
 *
 * so we want to iterate while both list have values
 * we have covered our base cases so we already know both list have at least one value
 *
 * we will need a mover pointer that will use to set the values of the list
 * a returnTop pointer that will be the head of the mover pointer
 *
 *
 * Function:
 * mergeTwoList - list,1ist2: list
 *  if list1 is null and list is null return null
 * if list1 is null return list2 else if list 2 is null return list1
 * else
 *  p1 -> list1
 *  p2 -> list2
 *  mover -> null
 *  returnList -> mover
 *
 *  while p1 and p2 are not null
 *      if p1.val <= p2.val
 *          if mover is null, mover = p1 and returnList = mover
 *           else mover.next = p1, mover = mover.next
 *            p1 = p1.next
 *      else
 *          if mover is null, mover = p2 and returnList = mover
 *          else mover.next = p2, mover = mover.next
 *          p2 = p2.next
 *
 * if p1 is null, mover.next = p2,
 * if p2 is null, mover.next = p1
 * return returnList
 *
 * l1 : 0,2,4,5
 * l2 : 1,3,3,4
 *
 * Iter | pointer1 | pointer2 | mover | returnList
 * 0 | 0,2,4,5 | 1,3,3,4 | null | null
 * 1 | 2,4,5 |1, 3,3,4 | 0,2,4,5| 0,2,4,5
 * 2 | 2,4,5 |3,3,4 | 0,1,3,3,4 | 0,1,3,3,4
 * 3 | 4,5 | 3,3,4 | 0,1,2,4,5 | 0,1,2,4,5
 * 4 | 4,5 | 3,4 | 0,1,2,3,3,4 | 0,1,2,3,3,4
 * 5 | 4,5 | 4 | 0,1,2,3,3,4, | 0,1,2,3,3,4
 * 6 | 5, | 4 | 0,1,2,3,3,4,5 | 0,1,2,3,3,4,5
 * 7 | 5 | null | 0,1,2,3,3,4,4 | 0,1,2,3,3,4,4
 *
 * p2 is null but p1 is not so we exit loop
 * mover.next = p1
 * mover =  0,1,2,3,3,4,4,5, returList = 0,1,2,3,3,4,4,5
 *
 * return returList -> 0,1,2,3,3,4,4,5
 */

function mergeTwoList(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (list1 === null && list2 === null) return null;
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  let mover = null;
  let returnList = null;
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      if (mover === null) {
        mover = list1;
        returnList = mover;
      } else {
        mover.next = list1;
        mover = mover.next;
      }
      list1 = list1.next;
    } else {
      if (mover === null) {
        mover = list2;
        returnList = mover;
      } else {
        mover.next = list2;
        mover = mover.next;
      }
      list2 = list2.next;
    }
  }

  if (list1 !== null) {
    mover.next = list1;
  }

  if (list2 !== null) {
    mover.next = list2;
  }

  return returnList;
}

/**
 * Time complexit - O(n)
 * space complexity - O(1)
 */
