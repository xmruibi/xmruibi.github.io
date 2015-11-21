+++
topics = ["Algorithm"]
date = "2015-11-09T13:10:29-07:00"
levels = ["Leetcode","Medium"]
tags = ["Tree", "Divide and Conquer"]
title = "Count Univalue Subtrees"
banner = "/media/leetcode.png"
+++

Given a binary tree, count the number of uni-value subtrees.

A Uni-value subtree means all nodes of the subtree have the same value.
<!--more-->
### Example:

Given binary tree,

```
    5
   / \
  1   5
 / \   \
5   5   5
```
return `4`.

## Think
- Typical Tree problem with recursion idea
- Four cases in recursion:
    - Leaf node: if true case and increase the counter
    - Node with on one child:
        - Left Only: check return value from left child and value of left child should be the same as current node.
        - Right Only: check return value from right child and value of right child should be the same as current node.
    - Node with two children: check return value from both side and both child node value should be the same as current node.


## Solution
```java
public class CountUnivalueSubtrees {

	public int countUnivalSubtrees(TreeNode root) {
		if (root == null)
			return 0;
		int[] cnt = new int[1];
		helper(root, cnt);
		return cnt[0];
	}

	private boolean helper(TreeNode node, int[] cnt) {
		if (node.left == null && node.right == null) {
			cnt[0]++;
			return true;
		} else if (node.left == null) {
			if (helper(node.right, cnt) && node.right.val == node.val) {
				cnt[0]++;
				return true;
			} else
				return false;
		} else if (node.right == null) {
			if (helper(node.left, cnt) && node.left.val == node.val) {
				cnt[0]++;
				return true;
			} else
				return false;
		} else {
			if (helper(node.left, cnt) && helper(node.right, cnt)
					&& node.left.val == node.val && node.right.val == node.val) {
				cnt[0]++;
				return true;
			} else
				return false;
		}
	}
}
```