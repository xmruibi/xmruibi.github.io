+++
date = "2015-10-20T16:13:13-07:00"
levels = []
tags = ["Binary Tree", "Stack", "Tree Preorder", "Iterator"]
title = "Binary Search Tree Iterator"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Design an iterator over a binary search tree with the following rules:

Elements are visited in ascending order (i.e. an in-order traversal)
next() and hasNext() queries run in O(1) time in average.
<!--more-->

### Example
For the following binary search tree, in-order traversal by using iterator is [1, 6, 10, 11, 12]
```
   10
 /    \
1      11
 \       \
  6       12
```
###Challenge
Extra memory usage O(h), h is the height of the tree.

Super Star: Extra memory usage O(1)

## Think #1

- Stack: Preorder

## Solution #1
```java
public class Solution {
    // O(height of tree) space to store current left branch nodes
    Stack<TreeNode> stack;

    //@param root: The root of binary tree.
    public Solution(TreeNode root) {

        stack = new Stack<>();
        if(root == null)
            return;
        stack.push(root);
        TreeNode left = root.left;
        while(left != null) {
            stack.push(left);
            left = left.left;
        }
    }

    //@return: True if there has next node, or false
    public boolean hasNext() {
        return !stack.isEmpty();
    }
    
    //@return: return next node
    public TreeNode next() {
        TreeNode pop = stack.pop();

        // each time pop a node, push left branch nodes for current pop node's right child
        TreeNode left = pop.right;
        while(left != null) {
            stack.push(left);
            left = left.left;
        }
        return pop;
    }
}

```