+++
topics = ["Leetcode", "Algorithm"]
date = "2015-11-06T20:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "String"]
title = "Word Break"
banner = "/media/leetcode.png"
+++


Given a string s and a dictionary of words dict, determine if s can be break into a space-separated sequence of one or more dictionary words.
<!--more-->
### Example
Given s = `"lintcode"`, dict = `["lint", "code"]`.

Return true because "lintcode" can be break as "lint code".

## Think
- One sequence DP, a 1-D boolean array.
- `memo[i]` means from `0` to `i` has valid word break or not.
- Tricky part is when we pass at `i` position, we don't need to use `j` from `0` to `i` for checking word existed in dictionary. We can use the length of word in dictionary as an length evaluation.

## Solution
```java
    /**
     * @param s: A string s
     * @param dict: A dictionary of words dict
     */
    public boolean wordBreak(String s, Set<String> dict) {
    
        if(s == null || s.length() == 0){
            if(dict == null || dict.size() == 0)
                return true;
            return false;
        }
        
        boolean[] memo = new boolean[s.length() + 1];
        memo[0] = true;
        for(int i = 1; i <= s.length(); i ++) {
            for(String ss : dict){
                int start = i - ss.length();
                if( start >= 0 && memo[start]){
                    String str = s.substring(start, i);
                    if(dict.contains(str))
                         memo[i] = true;
                }
            }
        }
        return memo[s.length()];
    }
```