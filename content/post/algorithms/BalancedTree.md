+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-18T23:10:29-07:00"
levels = ["Medium"]
tags = ["Tree", "Divide and Conquer"]
title = "Balanced Binary Tree"
banner = "/media/leetcode.png"
+++

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
<!--more-->

### Example
Given binary tree A={3,9,20,#,#,15,7}, B={3,#,20,15,7}
```
A)  3            B)    3 
   / \                  \
  9  20                 20
    /  \                / \
   15   7              15  7
```

The binary tree A is a height-balanced binary tree, but B is not.

## Think
- Get two max depths from left branch and right branch
- Recursive from bottom to top and Compare two max depth on each node
- If the difference between two depth is larger than one, regard it as non-balanced tree.


## Solution
```java
public class Solution {
    /**
     * @param root: The root of binary tree.
     * @return: True if this Binary tree is Balanced, or false.
     */
    public boolean isBalanced(TreeNode root) {
        if(root == null)
            return true;
        // write your code here
        int left =  height(root.left);
        int right = height(root.right);
        if(Math.abs(left - right) <= 1)
            return isBalanced(root.left) && isBalanced(root.right);
        return false;
    }
    
    private int height(TreeNode node) {
        if(node == null)
            return 0;
        return Math.max(height(node.left), height(node.right)) + 1;
    }
}
```
