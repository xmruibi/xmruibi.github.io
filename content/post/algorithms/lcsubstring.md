+++
date = "2015-11-04T09:43:13-07:00"
levels = ["Medium"]
tags = ["Substring", "Dynamic Programming"]
title = "Longest Common Substring"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given two strings, find the longest common substring. Return the length of it.
<!--more-->
### Example
Given A = `"ABCD"`, B = `"CBCE"`, return 2.

### Note
The characters in substring should occur continuously in original string. This is different with subsequence.

### Challenge
$O(n \times m)$ time and memory.

## Think
- Two Sequence problem should use 2-D array
- `f[i][j]` means that for `word1(1,i)` and `word2(1,j)` has the longest common substring
- When `word1[i] == word2[j]` it should consider `f[i][j]`  with the value on `f[i-1][j-1]` and plus one, otherwise `f[i][j]` is zero.
- Set a max value to update when necessary.
- Initialize `word1(0,0)` or `word2(0,0)` has no common substring with `word2(1,j)` or `word1(1,i)`.

## Solution
```java
    /**
     * @param A, B: Two string.
     * @return: the length of the longest common substring.
     */
    public int longestCommonSubstring(String A, String B) {
 
        if(A == null || B == null)
            return 0;
        
        int[][] memo = new int[A.length()+1][B.length()+1];
        int max = 0;
        for(int i = 0; i <= A.length(); i ++) {
            for(int j = 0; j <= B.length(); j ++) {
                if(i == 0 || j == 0)
                    memo[i][j] = 0;
                else
                    memo[i][j] = (A.charAt(i-1) == B.charAt(j-1) ? memo[i-1][j-1] + 1 : 0);
                max = Math.max(max, memo[i][j]);
            }
        }
        return max;
    }
```