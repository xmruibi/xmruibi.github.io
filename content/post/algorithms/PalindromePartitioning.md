+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-05T20:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "String", "Palindrome"]
title = "Palindrome Partitioning"
banner = "/media/leetcode.png"
+++


## Problem I
Given a string s, partition s such that every substring of the partition is a palindrome.

Return all possible palindrome partitioning of `s`.
<!--more-->
#### Example
Given s = `"aab"`, return:
```
[
  ["aa","b"],
  ["a","a","b"]
]
```

### Think 
- Set a boolean matrix for check word segment is prlindrome or not. `[i][j]` -> `word(i, j)` is palindrome
- DFS to build up all palindrome partition solutions.

### Solution
```java
    /**
     * @param s: A string
     * @return: A list of lists of string
     */
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        if(s == null || s.length() == 0)
            return res;
        // get palindrome boolean matrix [i][j] -> word(i, j) is palindrome
        boolean[][] memo = new boolean[s.length()][s.length()];
        for(int i = s.length() - 1; i >= 0; i--) 
            for(int j = i; j < s.length(); j++) 
                memo[i][j] |= (j - i < 2 || memo[i+1][j-1]) && s.charAt(i) == s.charAt(j);
        
        // setup dfs method     
        helper(res, new ArrayList<String>(), memo, s, 0);
        return res;
    }
    
    private void helper(List<List<String>> res, List<String> list, boolean[][] memo, String s, int idx) {
        if(idx >= s.length()) {
            res.add(new ArrayList<>(list));
            return;
        }
        
        for(int i = idx; i < s.length(); i++) {
            if(memo[idx][i]) {
                String substr = s.substring(idx,i+1);
                list.add(substr);
                helper(res, list, memo, s, i+1);
                list.remove(list.size() - 1);
            }
        }
    }
```


## Problem II
Given a string s, cut s into some substrings such that every substring is a palindrome.

Return the **minimum cuts** needed for a palindrome partitioning of s.

#### Example
For example, given s = `"aab"`,

Return 1 since the palindrome partitioning `["aa","b"]` could be produced using 1 cut.

### Think
- First step should be set up boolean matrix for check word segment is prlindrome or not. `[i][j]` -> `word(i, j)` is palindrome
- Then we need to have a array `res[i]` to memorize the minimum cut from `1` to `i` position.
- Initial the first element in memorized array  as `0` (no cut needed)
- Pass all position `i` from `1` to `length`
- When at `i` position, we should try `j` reversely (avoid update) from `j = i` to `j = 0` and check if `word(j, i-1)` is palindrome. 
- If `word(j, i-1)` is palindrome, and `res[j]` has valid minimum cut. Update `res[i]` is necessary.


### Solution
```java
    /**
     * @param s a string
     * @return an integer
     */
    public int minCut(String s) {
        if( s == null || s.length() == 0)
            return 0;
        // step one: boolean matrix for check word segment is prlindrome or not
        boolean[][] memo = new boolean[s.length()][s.length()];
        for(int i = s.length() - 1; i >= 0; i--) 
            for(int j = i; j < s.length(); j++) 
                memo[i][j] |= (j - i < 2 || memo[i+1][j-1]) && s.charAt(i) == s.charAt(j);
        // step two: cut[i] memorized the minimum cut from `1` to `i` position
        int[] cut = new int[s.length() + 1];
        cut[0] = 0;
        for(int i = 0; i < s.length(); i++) {
            cut[i + 1] = Integer.MAX_VALUE; 
            for(int j = i; j >= 0; j --) {
                cut[i + 1] = memo[j][i] && cut[j] != Integer.MAX_VALUE ?  Math.min(cut[i+1], cut[j] + 1) : cut[i+1];
            }
        }
        return cut[s.length()] - 1;
    }
```

