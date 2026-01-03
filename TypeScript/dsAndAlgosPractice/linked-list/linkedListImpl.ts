// ------------------------------------
// 1. ListNode Class
// Defines the structure of a single element (node) in the list.
// ------------------------------------
export class ListNode<T> {
    public value: T;
    // 'next' is a pointer to the subsequent node, or null if this is the last node.
    public next: ListNode<T> | null;

    constructor(value: T, next?: ListNode<T> | null) {
        this.value = value;
        this.next = next;
    }
}

// ------------------------------------
// 2. SinglyLinkedList Class
// Manages the list operations, tracking the head and size.
// ------------------------------------
export class SinglyLinkedList<T> {
    // The first node in the list. Initially null (empty list).
    private head: ListNode<T> | null;
    // The last node in the list. Used to optimize append/insertAtEnd to O(1).
    private tail: ListNode<T> | null;
    // Tracks the current number of nodes in the list.
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // O(1) time complexity
    public insertAtStart(value: T): void {
        const newNode = new ListNode(value);
        if (this.head === null) {
            // If the list is empty, head and tail point to the new node.
            this.head = newNode;
            this.tail = newNode;
        } else {
            // New node's next pointer points to the old head.
            newNode.next = this.head;
            // The list's head is updated to the new node.
            this.head = newNode;
        }
        this.size++;
    }

    // O(1) time complexity (because we track the tail)
    public insertAtEnd(value: T): void {
        const newNode = new ListNode(value);
        if (this.tail === null) {
            // If the list is empty, insertAtEnd is same as insertAtStart.
            this.head = newNode;
            this.tail = newNode;
        } else {
            // Current tail points to the new node.
            this.tail.next = newNode;
            // The list's tail is updated to the new node.
            this.tail = newNode;
        }
        this.size++;
    }

    // O(N) time complexity (worst case, when deleting the tail)
    public delete(value: T): boolean {
        if (!this.head) {
            return false; // List is empty
        }

        // Case 1: Deleting the head node
        if (this.head.value === value) {
            this.head = this.head.next;
            // If the list becomes empty, update tail to null.
            if (this.head === null) {
                this.tail = null;
            }
            this.size--;
            return true;
        }

        let current = this.head;
        let previous: ListNode<T> | null = null;

        // Traverse until we find the node or reach the end.
        while (current && current.value !== value) {
            previous = current;
            current = current.next;
        }

        if (!current) {
            return false; // Value not found
        }

        // Case 2: Deleting a node in the middle or end
        if (previous) {
            previous.next = current.next;
        }

        // Case 3: Update the tail if the deleted node was the tail.
        if (current === this.tail) {
            this.tail = previous;
        }

        this.size--;
        return true;
    }

    // O(N) time complexity
    public search(value: T): boolean {
        let current = this.head;
        while (current !== null) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    // O(1) time complexity
    public isEmpty(): boolean {
        return this.head === null;
    }

    // O(1) time complexity
    public getListSize(): number {
        return this.size;
    }

    // Utility method to visualize the list contents.
    public toArray(): T[] {
        const elements: T[] = [];
        let current = this.head;
        while (current !== null) {
            elements.push(current.value);
            current = current.next;
        }
        return elements;
    }
}
