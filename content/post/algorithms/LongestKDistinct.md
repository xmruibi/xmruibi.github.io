+++
topics = ["Leetcode", "Algorithm"]
date = "2015-10-08T22:10:29-07:00"
levels = ["Medium"]
tags = ["String", "Hash Table", "Two Pointers"]
title = "Longest Substring with At Most K Distinct Characters Show result"
banner = "/media/leetcode.png"
+++


Given a string s, find the length of the longest substring T that contains at most k distinct characters.


### Example
For example, Given s = `eceba`, k = 3,

T is `eceb` which its length is 4.

<!--more-->

### Challenge
O(n), n is the size of the string s.

## Solution:
- Set two pointers as a windows for input string.
- Use a hashmap to store the characters in a window (substring) in string.
- However, we notice that we use hashmap for count the character appearance times.
- Remove the character as a key only if the count for this key is zero.
- Update the max window size each time.


```
public class Solution {
    /**
     * @param s : A string
     * @return : The length of the longest substring 
     *           that contains at most k distinct characters.
     */
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        if(s == null)
            return 0;
        
        HashMap<Character, Integer> dict = new HashMap<>();
        
        int prev = 0;
        int maxLen = 0;
        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if(dict.containsKey(c)) {
                dict.put(c, dict.get(c) + 1);
            }else {
                dict.put(c, 1);
                while(dict.size() > k) {
                    char prevChar = s.charAt(prev++);
                    if(dict.get(prevChar) > 1)
                        dict.put(prevChar, dict.get(prevChar) - 1);
                    else
                        dict.remove(prevChar);
                }
            }
            maxLen = Math.max(maxLen, i - prev + 1);
        }
        
        return maxLen;
    }
}
```
At the first I made a mistake by using hashset. However, like the previous mentioned, we need to count the character appearance. Why? Since there is possible when the character on index `prev` has another one in this window. But when you simply remove this element, there is still one inside this window. Tha makes the mistake happened!  

> Say, in `acdab`, pointer `prev` is on first `a`, once we do `set.remove(a)`, the `size()` become 3, but in fact, it is still 4.  

```
	// This is the wrong code!!!
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        // write your code here
        Set<Character> disc = new HashSet<>();
        
        int maxLen = 0;
        int prev = 0;
        for(int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            disc.add(c);
            while(disc.size() > k){
                disc.remove(s.charAt(prev++));
            }
            maxLen = Math.max(maxLen, i - prev + 1);
        }
        return maxLen;
    }
```