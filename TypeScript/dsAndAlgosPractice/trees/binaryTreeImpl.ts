// ------------------------------------
// 1. TreeNode Class
// Defines the structure of each node in the tree.
// We use generics (<T>) to allow the tree to store any data type (numbers, strings, objects).
// ------------------------------------
class TreeNode<T> {
    public value: T;
    // Pointers to child nodes, which can be null if the node is a leaf.
    public left: TreeNode<T> | null;
    public right: TreeNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// ------------------------------------
// 2. BinaryTree Class (Implemented as a Binary Search Tree - BST)
// The main class to manage the root and operations.
// ------------------------------------
class BinaryTree<T> {
    // The root of the tree, which is initially null.
    private root: TreeNode<T> | null;

    constructor() {
        this.root = null;
    }

    // Public method to start the insertion process.
    // NOTE: This assumes type T is comparable (e.g., number or string).
    public insert(value: T): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            // If the tree is empty, the new node becomes the root.
            this.root = newNode;
            return;
        }
        // Start the recursive insertion process.
        this.insertNode(this.root, newNode);
    }

    // Private recursive method to find the correct insertion spot.
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
        // Check if the new value should go left or right based on the BST property.
        if (newNode.value < node.value) {
            // Go left
            if (node.left === null) {
                // Found an empty spot, insert here.
                node.left = newNode;
            } else {
                // Continue recursively traversing left.
                this.insertNode(node.left, newNode);
            }
        } else {
            // Go right (handles both greater than and equal to cases)
            if (node.right === null) {
                // Found an empty spot, insert here.
                node.right = newNode;
            } else {
                // Continue recursively traversing right.
                this.insertNode(node.right, newNode);
            }
        }
    }

    // Public method to check if a value exists in the tree (BST search).
    public search(value: T): boolean {
        return this.searchNode(this.root, value);
    }

    // Private recursive search method.
    private searchNode(node: TreeNode<T> | null, value: T): boolean {
        if (node === null) {
            // Base case: If we hit a null node, the value isn't here.
            return false;
        }

        if (value === node.value) {
            // Base case: Found the value.
            return true;
        } else if (value < node.value) {
            // Value is smaller, search left subtree.
            return this.searchNode(node.left, value);
        } else {
            // Value is larger, search right subtree.
            return this.searchNode(node.right, value);
        }
    }

    /**
        -  Breadth First Search Pattern
        - Algorithm for traversing nodes in a tree, visiting all nodes at the same level before going to the next level
        - How it works: 
            - establish a queue to hold values for the current level being explored in the tree
            - using a loop, traverse each node
            - a branching step where nodes are added to the queue

        - Use cases:
            - finding the first match/closest node to the root
    */
    levelOrderTraversal(): T[] {
        if (this.root === null) return []
        const nodesQueue = [this.root]
        const result: T[] = []
        while (nodesQueue.length > 0) {
            let currNode = nodesQueue.shift()
            result.push(currNode.value)
            currNode.left !== null && nodesQueue.push(currNode.left)
            currNode.right !== null && nodesQueue.push(currNode.right)
        }
        return result
    }
}