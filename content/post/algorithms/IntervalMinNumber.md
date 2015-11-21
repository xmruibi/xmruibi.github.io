+++
date = "2015-10-18T15:43:13-07:00"
levels = []
tags = ["Data Structure", "Segement Tree", "Interval Problem"]
title = "Interval Minimum Number"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Given an integer array (index from 0 to n-1, where n is the size of this array), and an query list. Each query has two integers [start, end]. For each query, calculate the minimum number between index start and end in the given array, return the result list.
<!--more-->

### Example
For array `[1,2,7,8,5]`, and queries `[(1,2),(0,4),(2,4)]`, return `[2,1,5]`

### Challenge
O(logN) time for each query (Segment Tree)

## Solution
```
public class Solution {
    /**
     *@param A, queries: Given an integer array and an query list
     *@return: The result list
     */
    public ArrayList<Integer> intervalMinNumber(int[] A, 
                                                ArrayList<Interval> queries) {
        IntervalTree tree = new IntervalTree(A);
        ArrayList<Integer> res = new ArrayList<>();
        for(Interval interval : queries) {
            res.add(tree.query(interval.start, interval.end));
        }
        return res;
    }
}

/**
* Build Interval Tree with Min of segment!
*
*/
class IntervalTree{
        IntervalNode root;
        
        public IntervalTree(int[] A) {
            root = build(A, 0, A.length - 1);
        }
        
        private IntervalNode build(int[] A, int start, int end) {
            if(start > end)
                return null;
            IntervalNode node = new IntervalNode(start, end);
            
            if(start == end) {
                node.min = A[start];
                return node;
            }
            
            int m = start + ((end - start)>>1);
            node.left = build(A, start, m);
            node.right = build(A, m+1, end);
            node.min = Math.min(node.left.min, node.right.min);
            return node;
        }
        
        public int query(int start, int end) {
            return queryhelper(root, start, end);
        }
        
        private int queryhelper(IntervalNode node, int start, int end) {
            if(start <= node.start && end >= node.end)
                return node.min;
            
            int m = node.start + ((node.end - node.start)>>1);
            if(m < start) {
                return queryhelper(node.right, start, end);
            }else if(m >= end){
                return queryhelper(node.left, start, end);
            }else
                return Math.min(queryhelper(node.left, start, m), queryhelper(node.right, m+1, end));
        }

        private class IntervalNode {
		    int start, end, min;
		    IntervalNode left, right;
		    IntervalNode(int start, int end) {
		        this.start = start;
		        this.end = end;
			}
		}
}


```