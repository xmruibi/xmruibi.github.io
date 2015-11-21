+++
date = "2015-11-04T09:43:13-07:00"
levels = ["Medium"]
tags = ["Subsequence", "Dynamic Programming"]
title = "Longest Common Subsequence"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given two strings, find the longest common subsequence (LCS).

Your code should return the length of LCS.

<!--more-->
### Example
For `"ABCD"` and `"EDCA"`, the LCS is `"A"` (or `"D"`, `"C"`), return `1`.

For `"ABCD"` and `"EACB"`, the LCS is `"AC"`, return `2`.

## Think
- Two Sequence problem should use 2-D array
- `f[i][j]` means that for `word1(1,i)` and `word2(1,j)` has the longest common subsequence
- When `word1[i] == word2[j]` it should consider `f[i][j]`  with the value on `f[i-1][j-1]` and plus one, otherwise `f[i][j]` is max value from `f[i-1][j-1]` or `f[i][j-1]` or `f[i-1][j]`.
- Initialize `word1(0,0)` or `word2(0,0)` has no common substring with `word2(1,j)` or `word1(1,i)`.


## Solution
```java
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
```