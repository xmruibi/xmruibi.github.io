+++
date = "2015-11-13T17:50:13-07:00"
levels = []
tags = ["Tree", "Recursion"]
title = "The Second Minimum in Tournament Tree"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++

Given a tournament tree try to find the second minimum value. Here the tournament tree is represented by a tree with node has the minimum value of children.
<!--more-->

### Example
By given the following tree, it should return `5` as the second minimum value.
```
                2
              /   \
            2      7
          /  \     |  \
         5    2    8   7
```
## Think
- This a full tree and each root is the min value of two children
- Each time we only concern the subtree root has the value equal to the root and record another child's value as the candidate of second minimum.


## Solution
```java
public class TournamentTree {
	static int secMin = Integer.MAX_VALUE;

	// the given tree is a minimum value tree
	public static int getSecMin(TreeNode root) {
		if (root == null)
			throw new IllegalArgumentException("Illeagal Input!");
		
		if (root.left == null && root.right == null)
			return secMin;
		
		if (root.left.val == root.val) {
			secMin = Math.min(secMin, root.right.val);
			return getSecMin(root.left);
		} else {
			secMin = Math.min(secMin, root.left.val);
			return getSecMin(root.right);
		}
	}
}
```