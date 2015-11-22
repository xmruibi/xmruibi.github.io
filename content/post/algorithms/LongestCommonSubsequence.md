+++
date = "2015-10-16T09:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Subsequence", "Dynamic Programming"]
title = "Longest Common Subsequence"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given two strings, find the longest common subsequence (LCS).

Your code should return the length of LCS.
<!--more-->


### Example
For `ABCD` and `EDCA`, the LCS is `A` (or `D`, `C`), return 1.

For `ABCD` and `EACB`, the LCS is `AC`, return 2.


```
public class Solution {
    /**
     * @param A, B: Two strings.
     * @return: The length of longest common subsequence of A and B.
     */
    public int longestCommonSubsequence(String A, String B) {
        if(A == null || B == null)
            return 0;
        
        int[][] memo = new int[A.length()+1][B.length()+1];
        for(int i = 0; i <= A.length(); i ++) {
            for(int j = 0; j <= B.length(); j ++) {
                if(i == 0 || j == 0)
                    memo[i][j] = 0;
                else
                    memo[i][j] = (A.charAt(i-1) == B.charAt(j-1) ? memo[i-1][j-1] + 1 : Math.max(memo[i][j-1],memo[i-1][j]));
            }
        }
        return memo[A.length()][B.length()];
    }
}

```
