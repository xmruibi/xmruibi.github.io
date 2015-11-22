+++
date = "2015-11-18T22:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Tree"]
title = "Amplitude of Tree"
topics = ["Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

 Given a tree of N nodes, return the amplitude of the tree. In a binary tree T, a path P is a non-empty sequence of nodes of tree such that, each consecutive node in the sequence is a subtree of its preceding node. In the example tree, the sequences `[9, 8, 2]` and `[5, 8, 12]` are two paths, while `[12, 8, 2]` is not. The amplitude of path P is the maximum difference among values of nodes on path P. The amplitude of tree T is the maximum amplitude of all paths in T. When the tree is empty, it contains no path, and its amplitude is treated as 0.
<!--more-->
### Exmaple
Input:
```
         5
       /   \
    8        9
   /  \     /  \ 
  12   2   8    4
          /    /
        2    5
```
Output: `7` since there are paths `[5, 8, 12]` and `[9, 8, 2]` have the maximum amplitude `7`.

## Think
- Recursion, record the max value and min value a certain path. 
- And recursively check each node on the path to that leaf and there differences.
- Set a global variable. 

## Solution
```java
public class Solution{
	static int maxDiff = 0;
	public int maxAmplitude(TreeNode root) {
		if(root == null)
			return 0;
		recurHelper(root, new int[2]);
		return maxDiff;
	}

	private void recurHelper(TreeNode node, int[] mnMx) {
		mnMx[0] = Math.min(mnMx[0], node.val);
		mnMx[1] = Math.max(mnMx[1], node.val);

		if(node.left == null && node.right == null){

			int curDiff = Math.abs(mnMx[0] - mnMx[1]);
			maxDiff = Math.max(maxDiff, curDiff);
			return;
		}
		if(node.left != null) 
			recurHelper(node.left, mnMx);
		if(node.right != null) 
			recurHelper(node.right, mnMx);
	}
}
```