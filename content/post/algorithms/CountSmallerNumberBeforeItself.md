+++
date = "2015-10-22T20:43:13-07:00"
levels = []
tags = ["Data Structure", "Segement Tree", "Interval Problem"]
title = "Count of Smaller Number before itself"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++


Give you an integer array (index from 0 to n-1, where n is the size of this array, value from 0 to 10000) . For each element Ai in the array, count the number of element before this element Ai is smaller than it and return count number array.
<!--more-->

### Example
For array `[1,2,7,8,5]`, return `[0,1,2,3,2]`

## Think
- Segment Tree
- Initial with the range (0 to 10000)
- Count array elements included in a certain tree node
- Dynamic count and make a query.
	- Query a value, evaluate the value and node's middle value, 
	- if larger, that means the left node's count should be included and also enter into the right node; 
	- if less, just enter the left node;
	- recursive until touch the null node;

## Solution

```java
class SegmentTree{
    Node root;
        
    public SegmentTree(){
        root = build(0, 20000);
    }
        
    public Node build(int left, int right) {
        if(right < left)
            return null;
        if(left == right)
            return new Node(left, right);
        
        int m = left + ((right - left)>>1);
        Node cur = new Node(left, right);
        cur.leftNode = build(left, m);
        cur.rightNode = build(m+1, right);
        return cur;
    }
    
    public void count(int val){
        count(root, val);
    }
    
    private void count(Node node, int val) {
        if(node == null)
            return;
        int m = node.left + ((node.right - node.left)>>1);
        node.cnt++;
        if(val > m)
            count(node.rightNode, val);
        else
            count(node.leftNode, val);
    }
    
    public int query(int val){
        return query(root, val);
    }
    
    private int query(Node node, int val) {
        int cnt = 0;
        if(node == null)
            return cnt;
        int m = node.left + ((node.right - node.left)>>1);
        cnt += (node.leftNode != null ? node.leftNode.cnt : 0);
        if(val > m) // if larger: 
            return cnt + query(node.rightNode, val);
        else // if less or equal: includes val == m
            return query(node.leftNode, val);
    }
    
}

class Node{
    int left, right;
    long cnt;
    Node leftNode, rightNode;
    public Node(int left, int right){
        this.cnt = 0;
        this.left = left;
        this.right = right;
    }
}


public class Solution {
   /**
     * @param A: An integer array
     * @return: Count the number of element before this element 'ai' is 
     *          smaller than it and return count number array
     */ 
    SegmentTree tree;
    public ArrayList<Integer> countOfSmallerNumberII(int[] A) {
        tree = new SegmentTree();
        ArrayList<Integer> res = new ArrayList<>();
        for(int i = 0; i < A.length; i++) {
            tree.count(A[i]);
            res.add(tree.query(A[i]));
        }
        return res;
    }
    
}
```

