+++
date= "2015-10-17T17:50:34-07:00"
title = "Flatten Binary Tree to Linked List"
topics = ["Leetcode","Algorithm"]
tags = ["Binary Tree", "Two Pointers"]
banner = "/media/leetcode.png"
+++


Flatten a binary tree to a fake "linked list" in pre-order traversal.

Here we use the right pointer in TreeNode as the next pointer in ListNode.
<!--more-->

### Example
```
              1
               \
     1          2
    / \          \
   2   5    =>    3
  / \   \          \
 3   4   6          4
                     \
                      5
                       \
                        6
```

### Note
Don't forget to mark the left child of each node to null. Or you will get Time Limit Exceeded or Memory Limit Exceeded.

### Challenge
Do it in-place without any extra memory.


## Solution:
- One pass with iterate each right node.
- Put left node to right node.
- 

```
public class Solution {
    /**
     * @param root: a TreeNode, the root of the binary tree
     * @return: nothing
     */
    public void flatten(TreeNode root) {
        TreeNode node = root;
        while(node!=null) {
            if(node.left != null) {
                TreeNode left = node.left;
                while(left.right != null) {
                    left = left.right;
                }
                left.right = node.right;
                node.right = node.left;
                node.left = null;
            }
            node = node.right;
        }
    }
}
```