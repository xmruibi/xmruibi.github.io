+++
date = "2015-10-18T14:43:13-07:00"
levels = []
tags = ["Data Structure", "Segement Tree", "Interval Problem"]
title = "Segment Tree Build II"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

The structure of Segment Tree is a binary tree which each node has two attributes `start` and `end` denote an segment / interval.

start and end are both integers, they should be assigned in following rules:

- The root's start and end is given by `build` method.
- The left child of node A has `start=A.left, end=(A.left + A.right) / 2`.
- The right child of node A has `start=(A.left + A.right) / 2 + 1, end=A.right`.
- if start equals to end, there will be no children for this node.

Implement a build method with a given array, so that we can create a corresponding segment tree with every node value represent the corresponding interval max value in the array, return the root of this segment tree.
<!--more-->

### Example
Given [3,2,1,4]. The segment tree will be:
```
                 [0,  3] (max = 4)
                  /            \
        [0,  1] (max = 3)     [2, 3]  (max = 4)
        /        \               /             \
[0, 0](max = 3)  [1, 1](max = 2)[2, 2](max = 1) [3, 3] (max = 4)
```

### Clarification
Segment Tree (a.k.a Interval Tree) is an advanced data structure which can support queries like:

- which of these intervals contain a given point
- which of these points are in a given interval

## Solution

```
public class Solution {
    /**
     *@param A: a list of integer
     *@return: The root of Segment Tree
     */
    public SegmentTreeNode build(int[] A) {
        return builder(A, 0, A.length - 1);
    }
    
    private SegmentTreeNode builder(int[] A, int left, int right) {
        if(left > right)
            return null;
        if(left == right)
            return new SegmentTreeNode(left, right, A[left]);
        int m = left + ((right - left)>>1);
        SegmentTreeNode leftNode = builder(A, left, m);
        SegmentTreeNode rightNode = builder(A, m+1, right);
        SegmentTreeNode node = new SegmentTreeNode(left, right, Math.max(leftNode.max, rightNode.max));
        node.left = leftNode;
        node.right = rightNode;
        return node;
    }
}
```