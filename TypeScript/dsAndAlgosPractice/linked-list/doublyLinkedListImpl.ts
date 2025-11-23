/**
 * Represents a single Node in the Doubly Linked List.
 * @template T The type of value stored in the node.
 */
class DoublyLinkedListNode<T> {
    public value: T;
    // Pointer to the previous node in the list. Null if this is the head.
    public prev: DoublyLinkedListNode<T> | null;
    // Pointer to the next node in the list. Null if this is the tail.
    public next: DoublyLinkedListNode<T> | null;

    /**
     * Creates an instance of Node.
     * @param value The data to store in the node.
     */
    constructor(value: T) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}


/**
 * Implements a Doubly Linked List (DLL) that can function as an O(1) Queue (FIFO).
 * This structure ensures both head (dequeue/shift) and tail (enqueue/push) operations are O(1).
 * @template T The type of value stored in the list.
 */
export class DoublyLinkedList<T> {
    private head: DoublyLinkedListNode<T> | null;
    private tail: DoublyLinkedListNode<T> | null;
    private count: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    /**
     * @returns The number of nodes currently in the list (O(1)).
     */
    public size(): number {
        return this.count;
    }

    /**
     * @returns True if the list is empty, false otherwise (O(1)).
     */
    public isEmpty(): boolean {
        return this.count === 0;
    }

    // --- Queue/Stack-like Operations (O(1)) ---

    /**
     * Adds an element to the end of the list (enqueue/push).
     * Time Complexity: O(1)
     * @param value The value to add.
     */
    public addLast(value: T): void {
        const newNode = new DoublyLinkedListNode(value);
        
        if (this.isEmpty()) {
            // If empty, the new node is both head and tail.
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail) {
            // Link the current tail to the new node.
            this.tail.next = newNode;
            // Link the new node back to the old tail.
            newNode.prev = this.tail;
            // Update the tail pointer.
            this.tail = newNode;
        }
        
        this.count++;
    }

    /**
     * Removes and returns the element from the front of the list (dequeue/shift).
     * Time Complexity: O(1)
     * @returns The value of the removed head node, or null if the list is empty.
     */
    public removeFirst(): T | null {
        if (this.isEmpty() || !this.head) {
            return null;
        }

        const removedValue = this.head.value;
        
        if (this.count === 1) {
            // If only one node remains, reset both pointers.
            this.head = null;
            this.tail = null;
        } else {
            // Move the head pointer to the next node.
            this.head = this.head.next;
            // Sever the 'prev' link of the new head to fully detach the old head.
            if (this.head) {
                this.head.prev = null;
            }
        }
        
        this.count--;
        return removedValue;
    }

    // --- Utility Operations ---

    /**
     * Performs a Level Order Traversal (BFS) using the DLL as the queue.
     * This is an example of why the DLL is excellent for Queue implementations.
     * Time Complexity: O(N)
     * @returns An array of the node values in order.
     */
    public toArray(): T[] {
        const result: T[] = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
}
