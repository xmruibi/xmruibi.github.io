+++
topics = ["Lintcode", "Algorithm"]
date = "2015-10-27T13:10:29-07:00"
levels = ["Medium"]
tags = ["Tree", "Divide and Conquer"]
title = "Search Range in Binary Search Tree"
banner = "/media/lintcode.png"
+++

Given two values k1 and k2 (where k1 < k2) and a root pointer to a Binary Search Tree. Find all the keys of tree in range k1 to k2. i.e. print all x such that k1<=x<=k2 and x is a key of given BST. Return all the keys in ascending order.
<!--more-->

### Example
If k1 = 10 and k2 = 22, then your function should return [12, 20, 22].
```
    20
   /  \
  8   22
 / \
4   12
```

## Think
- Recursion on each valid node.
- For invalid node, if it is less than k1, check its right child, while if it is larger than k2, check its left child
- Add the result from left and itself and right

## Solution
```java
public class Solution {
    /**
     * @param root: The root of the binary search tree.
     * @param k1 and k2: range k1 to k2.
     * @return: Return all keys that k1<=key<=k2 in ascending order.
     */
    public ArrayList<Integer> searchRange(TreeNode root, int k1, int k2) {
        ArrayList<Integer> res = new ArrayList<>();
        if(root == null)
            return res;
        ArrayList<Integer> left = searchRange(root.left, k1, k2);
        ArrayList<Integer> right = searchRange(root.right, k1, k2);
        // current value is less than k1, check its right child
        if(root.val < k1)
            return right;
        // current value is larger than k2, check its left child
        if(root.val > k2)
            return left;
        // add left branch first then itself and then right branch
        res.addAll(left);
        res.add(root.val);
        res.addAll(right);
        return res;
    }
}
```