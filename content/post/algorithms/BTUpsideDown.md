+++
date = "2015-11-14T15:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Tree"]
title = "Binary Tree Upside Down"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a binary tree where all the right nodes are either leaf nodes with a sibling (a left node that shares the same parent node) or empty, flip it upside down and turn it into a tree where the original right nodes turned into left leaf nodes. Return the new root.
<!--more-->
### Example
Given a binary tree `{1,2,3,4,5}`,
```
     1
    / \
   2   3
  / \
 4   5
```
return the root of the binary tree `[4,5,2,#,#,3,1]`.
```
     4
    / \
   5   2
      / \
     3   1
```

## Think
- Mark the parent node `parent` from next right node position.
- Mark the current right child `node.right` from next left `left` node position
- Mark the next iteration node `next` by current left child `node.left`
- Replace the current node's left child as the recorded `right`.
- Replace the current node's right child as the recorded `parent`.
- Replace current iteration node by `next`

## Solution #Iterative
```java
    public TreeNode UpsideDownBinaryTree(TreeNode node) {  
        TreeNode parent = null, right = null;
		while(node != null) {
			TreeNode next = node.left;
			node.left = right;						
			right = node.right;
			node.right = parent;
			parent = node;
			node = next;
		}
		return parent;
    }
```

## Solution #Recursive
```java
    public static TreeNode upsideDown(TreeNode node) {
		if(node == null)
			return node;
		TreeNode root = node, left = node.left, right = node.right;
		if(left != null) {
			TreeNode newroot = upsideDown(node.left);
			left.left = right;
			left.right = root;
			return newroot;
		}
		return node;
	}
```