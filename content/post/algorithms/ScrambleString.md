+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-06T22:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "String"]
title = "Scramble String"
banner = "/media/leetcode.png"
+++

Given a string s1, we may represent it as a binary tree by partitioning it to two non-empty substrings recursively. Given two strings s1 and s2 of the same length, determine if s2 is a scrambled string of s1.
<!--more-->

Below is one possible representation of s1 = `"great"`:
```
    great
   /    \
  gr    eat
 / \    /  \
g   r  e   at
           / \
          a   t
```

To scramble the string, we may choose any non-leaf node and swap its two children.

For example, if we choose the node "gr" and swap its two children, it produces a scrambled string `"rgeat"`.
```
    rgeat
   /    \
  rg    eat
 / \    /  \
r   g  e   at
           / \
          a   t
```
We say that `"rgeat"` is a scrambled string of `"great"`.

Similarly, if we continue to swap the children of nodes "eat" and "at", it produces a scrambled string `"rgtae"`.
```
    rgtae
   /    \
  rg    tae
 / \    /  \
r   g  ta  e
       / \
      t   a
```
We say that `"rgtae"` is a scrambled string of `"great"`.




## Think - DP Version
- Ignore two situations: both length not equal and the characters not the same
- Two sequence but 3-D memorized array
- `memo[i][j][k]` means state: for s1.substring(i, i + k) and s2.substring(j, j + k), if they are scramble string
- Two conditions we can regard as scramble, for range of `word1(i -> i+k)` or `word2(j -> j+k)`:
    -  `i -> i + split` = `j -> j + split` (len = split) and `split + i -> i + k` = `split + i -> j + k` (len = k - split)
    -  `i -> i + split` = `j + (k - split) -> j+k` [len = split] and `i + split -> i+k` = `j -> j + (k - split)`(len = k - split)
- Consider about the initialization:
    - for `k == 1`, we only check if `word1[i] == word2[j]`

## Solution
```java
    /**
     * @param s1 A string
     * @param s2 Another string
     * @return whether s2 is a scrambled string of s1
     */
    public boolean isScramble(String s1, String s2) {
        // check length
        if(s1==null||s2==null||s1.length()!=s2.length())
            return false;
        // check anagram
        char[] c1 = s1.toCharArray();
        char[] c2 = s2.toCharArray();
        Arrays.sort(c1);
        Arrays.sort(c2);
        if (!Arrays.equals(c1, c2))
			return false;
			
        if(s1.length() != s2.length())
            return false;
        int len = s1.length();
        
        // state: for s1.substring(i, i + k) and s2.substring(j, j + k), if they are scramble string
        boolean[][][] memo = new boolean[len][len][len+1];
        
        // initial, only check if s1[i] == s2[j] 
        for(int i=0;i<s1.length();i++)
            for(int j=0;j<s2.length();j++)
                memo[i][j][1] = (s1.charAt(i) == s2.charAt(j));
                
        for(int k = 2; k <= len; k++) {
            
            for(int i = 0; i <= len - k; i++) {
                for(int j = 0; j <= len - k; j++) {
                    // split point should start from 1 to k - 1
                    for(int split = 1; split < k; split++) {
                        memo[i][j][k] |= (memo[i][j][split]&&memo[i+split][j+split][k-split])||(memo[i][j+(k - split)][split]&&memo[i+split][j][k-split]);
                    }
                }
            }
        }
        return memo[0][0][len];
    }
```
