+++
date = "2015-11-15T14:43:13-07:00"
levels = []
tags = ["String", "Palindrome", "Dynamic Programming"]
title = "Longest Palindromic Subsequence"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++

Given a sequence, find the length of the longest palindromic subsequence in it. For example, if the given sequence is `“BBABCBCAB”`, then the output should be 7 as `“BABCBAB”` is the longest palindromic subseuqnce in it. `“BBBBB”` and `“BBCBB”` are also palindromic subsequences of the given sequence, but not the longest ones.

<!--more-->

## Solution #Dynamic Programming
```java
private static int longestSubsequence(String str) {
		// memo[len][i] represent from index 'i' with length 'len' has how many
		// palindromic subsequence
		int[][] memo = new int[str.length() + 1][str.length() + 1];

		// initial len with 1 as 1, since for every index it has 1 len
		// palindromic subsequence
		for (int i = 0; i < str.length(); i++)
			memo[1][i] = 1;

		// iterate the str with different length setting
		for (int len = 2; len <= str.length(); len++) {
			for (int i = 0; i <= str.length() - len; i++) {
				int tar = i + len - 1;
				if (len == 2 && str.charAt(i) == str.charAt(tar))
					memo[len][i] = 2;
				else if (str.charAt(i) == str.charAt(tar))
					memo[len][i] = 2 + memo[len - 2][i + 1];
				else
					memo[len][i] = Math.max(memo[len - 1][i],
							memo[len - 1][i + 1]);
			}
		}
		return memo[str.length()][0];
	}

```

## Solution # Recursive
```java
	public int calculateRecursive(char str[],int start,int len){
        if(len == 1){
            return 1;
        }
        if(len ==0){
            return 0;
        }
        if(str[start] == str[start+len-1]){
            return 2 + calculateRecursive(str,start+1,len-2);
        }else{
            return Math.max(calculateRecursive(str, start+1, len-1), calculateRecursive(str, start, len-1));
        }
    }
```