+++
date = "2015-10-18T15:43:13-07:00"
levels = []
tags = ["Data Structure", "Segement Tree", "Interval Problem"]
title = "Interval Sum"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++

Given an integer array (index from 0 to n-1, where n is the size of this array), and an query list. Each query has two integers [start, end]. For each query, calculate the sum number between index start and end in the given array, return the result list.
<!--more-->

### Example
For array `[1,2,7,8,5]`, and queries `[(0,4),(1,2),(2,4)]`, return `[23,9,20]`


### Challenge
$O(logN)$ time for each query

## Solution
```
// Segment tree for sum
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
                node.val = (long)A[start];
                return node;
            }
            
            int m = start + ((end - start)>>1);
            node.left = build(A, start, m);
            node.right = build(A, m+1, end);
            node.val = node.left.val + node.right.val;
            return node;
        }
        
        public long query(int start, int end) {
            return queryhelper(root, start, end);
        }
        
        private long queryhelper(IntervalNode node, int start, int end) {
            if(start <= node.start && end >= node.end)
                return node.val;
            
            int m = node.start + ((node.end - node.start)>>1);
            if(m < start) {
                return queryhelper(node.right, start, end);
            }else if(m >= end){
                return queryhelper(node.left, start, end);
            }else
                return queryhelper(node.left, start, m) + queryhelper(node.right, m+1, end);
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

public class Solution {
    /**
     *@param A, queries: Given an integer array and an query list
     *@return: The result list
     */
    public ArrayList<Long> intervalSum(int[] A, 
                                       ArrayList<Interval> queries) {
        IntervalTree tree = new IntervalTree(A);
        ArrayList<Long> res = new ArrayList<>();
        for(Interval interval : queries) {
            res.add(tree.query(interval.start, interval.end));
        }
        return res;
    }
}

```