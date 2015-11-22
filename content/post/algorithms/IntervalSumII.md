+++
date = "2015-10-18T15:43:13-07:00"
levels = []
tags = ["Data Structure", "Segement Tree", "Interval Problem"]
title = "Interval Sum II"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Given an integer array in the construct method, implement two methods query(start, end) and modify(index, value):

- For query(start, end), return the sum from index start to index end in the given array.
- For modify(index, value), modify the number in the given index to value.
<!--more-->

### Example
Given array A = `[1,2,7,8,5]`.

- `query(0, 2)`, return `10`.
- `modify(0, 4)`, change `A[0]` from `1` to `4`.
- `query(0, 1)`, return `6`.
- `modify(2, 1)`, change `A[2]` from `7 `to `1`.
- `query(2, 4)`, return `14`.

### Challenge
O(logN) time for query and modify.

## Solution:
```
public class Solution {
    /* you may need to use some attributes here */
    
    IntervalNode root;
    /**
     * @param A: An integer array
     */
    public Solution(int[] A) {
        root = build(A, 0, A.length - 1);
    }
    
    private IntervalNode build(int[] A, int start, int end) {
            if(start > end)
                return null;
            IntervalNode node = new IntervalNode(start, end);
            
            if(start == end) {
                node.val = (long)A[start];
                return node;
            }
                
            int m = start + ((end - start)>>1);
            node.left = build(A, start, m);
            node.right = build(A, m+1, end);
            node.val = node.left.val + node.right.val;
            return node;
    }
        
    /**
     * @param start, end: Indices
     * @return: The sum from start to end
     */
    public long query(int start, int end) {
        return query(root, start, end);
    }
        
    private long query(IntervalNode node, int start, int end) {
        if(start <= node.start && end >= node.end)
            return node.val;
            
        int m = node.start + ((node.end - node.start)>>1);
        if(m < start) {
            return query(node.right, start, end);
        }else if(m >= end){
            return query(node.left, start, end);
        }else
            return query(node.left, start, m) + query(node.right, m+1, end);
    }
    
    /**
     * @param index, value: modify A[index] to value.
     */
    public void modify(int index, int value) {
        modify(root, index, value);
    }
    
    private void modify(IntervalNode node, int index, int value) {
        if(node.start == node.end) {
            node.val = value;
            return;
        }
        
        int m = node.start + ((node.end - node.start)>>1);
         if(m < index) 
            modify(node.right, index, value);
        else
            modify(node.left, index, value);
        node.val = node.right.val + node.left.val;
    }
    
    
    
    private class IntervalNode {
	    int start, end;
	    long val;
	    IntervalNode left, right;
	    IntervalNode(int start, int end) {
	        this.start = start;
	        this.end = end;
		}
	}
}
```