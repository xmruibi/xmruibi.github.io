+++
date = "2015-11-09T10:23:13-07:00"
levels = ["Hard"]
tags = ["Binary Tree", "Binary Search Tree"]
title = "Verify Preorder Sequence in Binary Search Tree"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given an array of numbers, verify whether it is the correct preorder traversal sequence of a binary search tree.

You may assume each number in the sequence is unique.
<!--more-->

### Follow up
Could you do it using only constant space complexity?

## Think #1
- The first element should be the root node.
- Find the bound that all previous element are small than root value by checking the first larger element.
- So the left of this bound should be the left tree of root, and the rest of it should be the right tree of root.
- Check left and right recursively.
- Time Complexity: $$O(n^2)$$, Space Complexity: $$O(n)$$

## Solution #1
```java
    public boolean verifyPreorder(int[] preorder) {
		if (preorder == null || preorder.length <= 1)
			return true;
		return helper(preorder, 0, preorder.length - 1);
	}

	private boolean helper(int[] preorder, int l, int r) {
		int root = preorder[l];
		int divide = l;
		for (int i = l + 1; i <= r; i++) {
			if (preorder[i] < root && divide != l)
				return false;
			else if (preorder[i] > root && divide != l)
				divide = i;
		}
		return helper(preorder, l + 1, divide - 1)
				&& helper(preorder, divide, r);
	}
```

## Think #2
- Preorder in BST has a regular pattern: 
    - When going to left node, it must be a descending order
    - When going to right node, it should be a ascending order
- Setting a stack, to store the previous path. Iterate throught the array:
    - When it getting smaller element make it just push into stack
    - When it find the larger element (larger than the peek of stack), pop the stack and set the minimum limit as the value of popped element.
- Time Complexity: $$O(n)$$, Space Complexity: $$O(n)$$
- For Example, 10 5 2 7 6 8 12 11 -> BST
```
          10
        /    \
      5       12
     / \     /
    2   7   11
       / \
      6   8
```
The procedure in Stack:
```
10 -> 10 5 -> 10 5 2 -> 10 7 (min=5) -> 10 7 6 (min = 5) -> 10 8 (min = 7)
-> 12 (min = 10) -> 12 11 (min = 10)
```

## Solution #2
```java
    public boolean verifyPreorderII(int[] preorder) {

		Stack<Integer> stack = new Stack<Integer>();
		int min = Integer.MIN_VALUE;
		for (int num : preorder) {
			if (num < min)
				return false;
			while (!stack.isEmpty() && num > stack.peek())
				min = stack.pop();
			stack.push(num);
		}
		return true;
	}
```

## Think #3
- Optimized on the #2 solution
- Use a pointer to replace the stack peek position.
- 指针模拟栈

## Solution #3
```java
    public boolean verifyPreorderII(int[] preorder) {

		int idx = -1;
		int min = Integer.MIN_VALUE;
		for (int num : preorder) {
			if (num < min)
				return false;
			while (idx >= 0 && num > preorder[idx]) {
			    min = preorder[idx--];
			}
			preorder[++idx] = num;
		}
		return true;
	}
```