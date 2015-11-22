+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-18T23:10:29-07:00"
levels = ["Medium"]
tags = ["Tree", "Divide and Conquer"]
title = "Depth of Tree Problems"
banner = "/media/leetcode.png"
+++
Depth of Tree problem
<!--more-->
## 1. Maximum Depth of Binary Tree

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
<!--more-->
#### Example
Given a binary tree as follow:
```
  1
 / \ 
2   3
   / \
  4   5
```
The maximum depth is 3.

### Think
- Recursively check the depth
- Only if the node is a leaf node we stop recursion and return 0
- We compare the recursion results from left branch and right branch to get the maximum value.

### Solution
```java
public class Solution {
    /**
     * @param root: The root of binary tree.
     * @return: An integer.
     */
    public int maxDepth(TreeNode root) {
        if(root == null)
            return 0;
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
}
```

## 2. Minimum Depth of Tree

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

#### Example
Given a binary tree as follow:
```
        1

     /     \ 

   2       3

          /    \

        4      5  
```
The minimum depth is 2

### Think
- Recursively check the depth
- Only if the node is a leaf node we stop recursion and return 0
- If a node just have one child, we should not compare the recursion result!
- If a node contains both left and right child, we compare the recursion results to get the minimum value.

### Solution
```java
public class Solution {
    /**
     * @param root: The root of binary tree.
     * @return: An integer.
     */
    public int minDepth(TreeNode root) {
        // write your code here
        if(root == null)
            return 0;
        
        if(root.left == null)
            return minDepth(root.right) + 1;
        else if(root.right == null)    
            return minDepth(root.left) + 1;
        else
            return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
    }
}
```
