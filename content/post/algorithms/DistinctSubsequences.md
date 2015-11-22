+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-05T13:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "String", "Subsequence"]
title = "Distinct Subsequences"
banner = "/media/leetcode.png"
+++

Given a string S and a string T, count the number of distinct subsequences of T in S.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, "ACE" is a subsequence of "ABCDE" while "AEC" is not).
<!--more-->
### Example
Given S = "rabbbit", T = "rabbit", return 3.

### Challenge
Do it in $O(n^2)$ time and $O(n)$ memory.

$O(n^2)$ memory is also acceptable if you do not know how to optimize memory.

## Think
- Two sequence DP, setup 2-D array for memorizing
- `dp[i][j]` means the distinct count when `S(1,i)` and `T(1,j)`
- If S has non character `dp[0][j]` should be 0, while T has non character `dp[i][0]` should be 1. 
- Each time we add `S[i]` on `dp[i-1][j]`, iterate `j` from `0` to `len - 1`, if `S[i] == T[j]` we should look up the the result from `dp[i-1][j-1]` and add it on `dp[i-1][j]`, otherwise we add nothing.

## Solution
```java
    /**
     * @param S, T: Two string.
     * @return: Count the number of distinct subsequences
     */
    public int numDistinct(String S, String T) {
        int[][] memo = new int[S.length() + 1][T.length() + 1];
        for(int i = 0; i <= S.length(); i++) {
            for(int j = 0; j <= T.length(); j++) {
                if(i == 0)
                    memo[i][j] = 0;
                if(j == 0)
                    memo[i][j] = 1;
                else{
                    memo[i][j] = memo[i-1][j] + (S.charAt(i-1) == T.charAt(j-1)) ? memo[i-1][j-1] : 0;
                }
            }
        }
        return memo[S.length()][T.length()];
    }
```