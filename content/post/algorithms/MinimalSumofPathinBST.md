+++
date = "2015-11-19T10:23:13-07:00"
levels = ["Hard"]
tags = ["Binary Tree"]
title = "Find Minimum Value Sum of Path"
topics = ["Leetcode","Amazon", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a binary tree, find a path has the minimum sum of node value.
<!--more-->

## Solution
```java
public class Solution{
	public int minPath(TreeNode root) {
		if(root == null)
			return 0;
		return dfshelper(root);
	}

	private int dfshelper(TreeNode node) {
		if(node.left == null && node.right == null)
			return node.val;
		int left = Integer.MAX_VALUE, right = Integer.MAX_VALUE;
		if(node.left != null)
			left = dfshelper(node.left);
		if(node.right != null) 
			right = dfshelper(node.right);
		return Math.min(left, right) + node.val;
	}
}
```

