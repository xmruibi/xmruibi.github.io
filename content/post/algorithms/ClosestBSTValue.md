+++
date = "2015-11-09T10:23:13-07:00"
levels = ["Hard"]
tags = ["Binary Tree", "Binary Search Tree", "Stack", "Heap"]
title = "Closest Binary Search Tree Value"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++
Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.
<!--more-->
## Problem I

#### Note
Given target value is a floating point.
You are guaranteed to have only one unique value in the BST that is closest to the target.

### Solution
```java
public class ClosestBSTValue {
	double min = Double.MAX_VALUE;
	TreeNode closest = null;

	public int closestValue(TreeNode root, double target) {
		if (root == null) {
            return Integer.MAX_VALUE;
        }
		helper(root, target);
		return closest.val;
	}

	private void helper(TreeNode node, double target) {
		if (node == null)
			return;
		if (Math.abs((double) node.val - target) < min) {
			min = Math.abs((double) node.val - target);
			closest = node;
		}
		
		if((double) node.val > target) {
			helper(node.left, target);
		}else{
			helper(node.right, target);
		}
	}
}
```
---
## Problem II
Given a non-empty binary search tree and a target value, find **k values** in the BST that are closest to the target.

#### Note 
- Given target value is a floating point.
- You may assume `k` is always valid, that is:` k ≤ total` nodes.
- You are guaranteed to have only one unique set of `k` values in the BST that are closest to the target.

#### Follow up
Assume that the BST is balanced, could you solve it in less than $$O(n)$$ runtime (where n = total nodes)?

#### Hint
- Consider implement these two helper functions:
    - `getPredecessor(N)`, which returns the next smaller node to N.
    - `getSuccessor(N)`, which returns the next larger node to N.
- Try to assume that each node has a parent pointer, it makes the problem much easier.
- Without parent pointer we just need to keep track of the path from the root to the current node using a stack.
- You would need two stacks to track the path in finding predecessor and successor node separately.


### Think #1
- The straight-forward solution would be to use a **heap**. We just treat the BST just as a usual array and do a in-order traverse. Then we compare the current element with the minimum element in the heap, the same as top k problem.

### Solution #1
```java
class Solution {
    private PriorityQueue<Integer> minPQ;
    private int count = 0;
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        minPQ = new PriorityQueue<;Integer>(k);
        List<Integer> result = new ArrayList<Integer>();
         
        inorderTraverse(root, target, k);
         
        // Dump the pq into result list
        for (Integer elem : minPQ) {
            result.add(elem);
        }
         
        return result;
    }
     
    private void inorderTraverse(TreeNode root, double target, int k) {
        if (root == null) {
            return;
        }
         
        inorderTraverse(root.left, target, k);
         
        if (count < k) {
            minPQ.offer(root.val);
        } else {
            if (Math.abs((double) root.val - target) &lt; Math.abs((double) minPQ.peek() - target)) {
                minPQ.poll();
                minPQ.offer(root.val);
            }
        }
        count++;
         
        inorderTraverse(root.right, target, k);
    }
}
```
