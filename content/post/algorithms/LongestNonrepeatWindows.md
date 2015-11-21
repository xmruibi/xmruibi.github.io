+++
date = "2015-10-15T09:43:13-07:00"
levels = ["easy"]
tags = ["String", "Two Pointers", "Hash Table"]
title = "Longest Substring Without Repeating Characters"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

 Given a string, find the length of the longest substring without repeating characters.

<!--more-->

### Example
For example, the longest substring without repeating letters for `abcabcbb` is `abc`, which the length is 3.

For `bbbbb` the longest substring is `b`, with the length of 1.



### Challenge
O(n) time

## Solution:
- Set two pointers as a windows for input string.
- Very simple idea, to use a hashset to store the characters in a window (substring) in string.
- While the repeat detect, move forward the previous pointer.
- Update the max window size each time.

```
public class Solution {
    /**
     * @param s: a string
     * @return: an integer 
     */
    public int lengthOfLongestSubstring(String s) {
        Set<Character> disc = new HashSet<>();
        
        int maxLen = 0;
        int prev = 0;
        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            
            while(disc.contains(c)){
                disc.remove(s.charAt(prev++));
            }
            maxLen = Math.max(maxLen, i - prev + 1);
            disc.add(c);
        }
        return maxLen;
    }
}
```