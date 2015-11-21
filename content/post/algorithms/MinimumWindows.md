+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-14T22:10:29-07:00"
levels = ["Medium"]
tags = ["String", "Hash Table", "Complex Implement", "Two Pointers"]
title = "Minimum Window Substring"
banner = "/media/leetcode.png"
+++

Given a string source and a string target, find the minimum window in source which will contain all the characters in target.
<!--more-->

### Example
source = "ADOBECODEBANC" target = "ABC" Minimum window is "BANC".

### Note
If there is no such window in source that covers all characters in target, return the emtpy string "".

If there are multiple such windows, you are guaranteed that there will always be only one unique minimum window in source.

### Challenge
Can you do it in time complexity O(n) ?

### Clarification
The characters in minimum window doesn't need to has the same order in target.

## Solution:
```java
    public String minWindow(String s, String t) {
        // preload for target checking
        if(s == null || s.length() == 0 || t == null || t.length() == 0)
            return "";
        
        
        // store t into a hashmap <char, freq>
        HashMap<Character, Integer> map = new HashMap<>();
        for(char c : t.toCharArray())
            map.put(c, map.containsKey(c)?map.get(c) + 1 : 1);
        // set curidx-i, leftbound-prev, hitcharCnt-hitCnt, default max length-len
        int prev = 0, hitCnt = 0, len = s.length();
        String res = "";
        
        for(int i = 0; i<s.length();i++){
            char cur = s.charAt(i);
            // skip nonhit char
            if(!map.containsKey(cur))
                continue;
            map.put(cur, map.get(cur) - 1);
            if(map.get(cur) >= 0)
                hitCnt++;
                
            while(hitCnt == t.length()) {
                if(i - prev + 1 <= len) {
                    res = s.substring(prev, i+1);
                    len = i - prev + 1;
                }
                if(map.containsKey(s.charAt(prev))) {
                   map.put(s.charAt(prev), map.get(s.charAt(prev))+1);
                   if(map.get(s.charAt(prev)) > 0)
                      hitCnt--;
                }
                prev++;
            }
        }
        return res;
    }

```
