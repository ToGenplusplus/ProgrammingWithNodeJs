

export const treesMain = () => {

    const t = new BinaryTree()
    t.insert(5)
    t.insert(6)
    t.insert(7)
    t.insert(8)
    t.insert(9)
    t.insert(10)
    t.insert(11)

    const nodesLevelOrder = t.levelOrderTraversal()
    console.log(nodesLevelOrder)

}