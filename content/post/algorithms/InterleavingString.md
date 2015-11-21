+++
date = "2015-10-20T19:13:13-07:00"
levels = []
tags = ["String"," Subsequence","Dynamic Programming"]
title = "Interleaving String"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given three strings: s1, s2, s3, determine whether s3 is formed by the interleaving of s1 and s2.

<!--more-->

### Example
For s1 = `"aabcc"`, s2 = `"dbbca"`

When s3 = `"aadbbcbcac"`, return true.
When s3 = `"aadbbbaccc"`, return false.

### Challenge
O(n2) time or better

## Think
- Typical dynamic programming with subsequence problem.
- Set up a 2-D dp boolean table to memorized:
	- Initial: memo[0][0] = true;
	- two conditions: s1 find matched or s2 find matched;
	- `memo[i][j] = ( i > 0 && s1.charAt(i - 1) == s3.charAt(i + j - 1) && memo[i - 1][j]) || (s2.charAt(j - 1) == s3.charAt(i + j - 1) && memo[i][j - 1])`

## Solution
```java
public class Solution {
    /**
     * Determine whether s3 is formed by interleaving of s1 and s2.
     * @param s1, s2, s3: As description.
     * @return: true or false.
     */
    public boolean isInterleave(String s1, String s2, String s3) {

        if(s1 == null || s2 == null)
            return false;
        if(s1.length() + s2.length() != s3.length())
            return false;
            
        boolean[][] memo = new boolean[s1.length() + 1][s2.length() + 1];
        for(int i = 0; i <= s1.length(); i++) {
            for(int j = 0; j <= s2.length(); j++) {
                if(i == 0 && j == 0)
                    memo[i][j] = true;
                else{
                    if(i > 0 && s1.charAt(i - 1) == s3.charAt(i + j - 1))
                        memo[i][j] = memo[i - 1][j];
                    if(j > 0 &&s2.charAt(j - 1) == s3.charAt(i + j - 1))
                        memo[i][j] |= memo[i][j - 1];
                }
            }
        }
        
        return memo[s1.length()][s2.length()];
    }
}
```