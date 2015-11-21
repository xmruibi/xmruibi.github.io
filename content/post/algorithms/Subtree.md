+++
date = "2015-11-17T22:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Tree"]
title = "Is Subtree"
topics = ["Leetcode","Amazon", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a tree root node and another root node of tree, check if another tree is the subtree of the given tree.

<!--more-->

## Solution 
```java
public class Solution{
	
	public boolean isSubtree(TreeNode root, TreeNode node) {
		if(root == null && node  == null)
			return true;
		else if(root == null || node == null)
			return false;

		return checkNodes(root, node) || isSubtree(root.left, node) ||isSubtree(root.right, node);
	}

	/** Check two trees are the same
	* @param: treenode - the root node of one partial tree
	* @param: treenode - the root node of another tree
	* @return: boolean - if two trees are the same 
	*/
	private boolean checkNodes(TreeNode r1, TreeNode r2) {
		if(r1 == null && r2  == null)
			return true;
		else if(r1 == null || r2 == null)
			return false;
		return (r1.val == r2.val) && checkNodes(r1.left, r2.left) && chechNodes(r1.right, r2.right);
	}
}
```