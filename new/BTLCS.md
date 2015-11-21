+++
date = "2015-11-10T22:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Tree", "Subsequence"]
title = "Longest Consecutive Sequence in Binary Tree"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a binary tree, find the length of the longest consecutive sequence path.

The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path need to be from parent to child (cannot be the reverse).
<!--more-->
### Example
```
   1
    \
     3
    / \
   2   4
        \
         5
```
Longest consecutive sequence path is `3-4-5`, so return `3`.

```
   2
    \
     3
    / 
   2    
  / 
 1
```
Longest consecutive sequence path is `2-3`, not `3-2-1`, so return `2`.

## Think
- Simple recursion way


## Solution
```java
public class LCSinBT {
	int maxLength = 1;

	public int longestConsecutive(TreeNode root) {
		if(root == null)
			return 0;
		helper(root, 1);
		return maxLength;
	}

	private void helper(TreeNode node, int length) {
		if (node.left == null && node.right == null) {
			maxLength = Math.max(length, maxLength);
			return;
		}

		if (node.left != null && node.left.val == node.val + 1)
			helper(node.left, length + 1);
		if (node.right != null && node.right.val == node.val + 1)
			helper(node.right, length + 1);
	}
}
```