+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-18T23:10:29-07:00"
levels = ["Medium"]
tags = ["Tree", "Divide and Conquer"]
title = "Lowest Common Ancestor"
banner = "/media/leetcode.png"
+++

Given the root and two nodes in a Binary Tree. Find the lowest common ancestor(LCA) of the two nodes.

The lowest common ancestor is the node with largest depth which is the ancestor of both nodes.
<!--more-->

### Example
For the following binary tree:
```
  4
 / \
3   7
   / \
  5   6
```

LCA(3, 5) = 4

LCA(5, 6) = 7

LCA(6, 7) = 7

## Think
- Recursively traversal on every tree node
- Once it touched `null` or target A node or target B node, it return it self
- Divide and conquer to get return from left branch and right branch
- Check if both return result are not null, means current node is the common ancestor
- If it is not, return the not null one or return null if both are null


## Solution
```java
public class Solution {
    /**
     * @param root: The root of the binary search tree.
     * @param A and B: two nodes in a Binary.
     * @return: Return the least common ancestor(LCA) of the two nodes.
     */
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode A, TreeNode B) {
        if(root == null || root == A || root == B)
            return root;
        TreeNode left = lowestCommonAncestor(root.left, A, B);
        TreeNode right = lowestCommonAncestor(root.right, A, B);
        if(left != null && right != null) {
            return root;
        }else{
            return left == null? right : left;
        }
    }
}
```

## Think # With Parent Node
- With Parent node we don't need the root node.
- Get the depth of each node.
- Then look like we find the intersectin of two linked list.
- Find the intersection.

## Solution # With Parent Node
```java
public class Solution {
    /**
     * @param A and B: two nodes in a Binary.
     * @return: Return the least common ancestor(LCA) of the two nodes.
     */
    public TreeNode lowestCommonAncestor(TreeNode A, TreeNode B) {
        int adepth = getDepth(A);
        int bdepth = getDepth(B);
        // make two length equal
        while(adepth > bdepth) {
            A = A.parent;
            adepth--;
        }
        while(adepth < bdepth) {
            B = B.parent;
            bdepth--;
        }
        // find intersection
        while(A != B) {
            if(A == B)
                return A;
            A = A.parent;
            B = B.parent;
        }
        return null;
    }

    private int getDepth(TreeNode node){
        if(node == null)
            return 0;
        return 1 + getDepth(node.parent);
    }
}
class TreeNode{
    int val;
    TreeNode parent, left, right;
    public TreeNode(int val){
        this.val = val;
}
}
```











