+++
date = "2015-10-22T15:43:13-07:00"
levels = []
tags = ["Backtracking", "Array"]
title = "k Sum II"
topics = ["Lintcode","Algorithm"]
banner = "/media/lintcode.png"
+++
Given n unique integers, number k (1<=k<=n)  and target. Find all possible k integers where their sum is target.
<!--more-->


### Example
Given [1,2,3,4], k=2, target=5, [1,4] and [2,3] are possible solutions.

## Think
Unlike the k Sum I, here we need to get the each solution which can achieve the `target` within `k` num. Since the solution should be shown in the result, the dynamic programming cannot be used. Thus, the backtracking should be the only way.

## Solution
```java
public class Solution {
    /**
     * @param A: an integer array.
     * @param k: a positive integer (k <= length(A))
     * @param target: a integer
     * @return a list of lists of integer 
     */ 
    public ArrayList<ArrayList<Integer>> kSumII(int A[], int k, int target) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        helper(res, new ArrayList<Integer>(), A , k, target, 0);
        return res;
    }
    
    private void helper(ArrayList<ArrayList<Integer>> res, ArrayList<Integer> cur, int[] A, int k, int target, int idx) {
        if(target < 0 || k < 0)
            return;
            
        if(target == 0 && k == 0) {
            res.add(new ArrayList<>(cur));
            return;
        }
        
        for(int i = idx; i < A.length; i++) {
            cur.add(A[i]);
            helper(res, cur, A, k - 1, target - A[i], i + 1);
            cur.remove(cur.size() - 1);
        }
    }
}
```