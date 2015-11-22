+++
topics = ["Leetcode","Algorithm"]
date = "2015-10-08T22:10:29-07:00"
levels = ["Medium"]
tags = ["String", "Hash Table", "Pattern Match"]
title = "Word Pattern"
banner = "/media/leetcode.png"
+++

Given a pattern and a string str, find if str follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in str.

<!--more-->

### Examples:
pattern = `abba`, str = `dog cat cat dog` should return true.
pattern = `abba`, str = `dog cat cat fish` should return false.
pattern = `aaaa`, str = `dog cat cat dog` should return false.
pattern = `abba`, str = `dog dog dog dog` should return false.

### Notes:
You may assume pattern contains only lowercase letters, and str contains lowercase letters separated by a single space.



## Solutioin
- Firstly, you need to convert `str` into string array with spliting by space.
- Check two stuffs are equal length, if not? directly return false!
- Setup a hashmap for storing element both pattern and strs. However, the key are different types: character, string. Why not just use string? Consider about this case: pattern - `abba`, str - `a a b a`.
- There is one more tricky thing: why we compare the `map.put()` return value? Here is a segment in HashMap API.
	
```
 	if (e != null) { // existing mapping for key
        V oldValue = e.value;
        if (!onlyIfAbsent || oldValue == null)
            e.value = value;
            afterNodeAccess(e);
            return oldValue;
    }
```
- That means the previous index(value) of character(key) will be returned as index reference. So we return the previous index and also update the index for next index reference!
- So if the reference index not matched for current index, it should return false.


```
public class Solution {
    public boolean wordPattern(String pattern, String str) {
        String[] strs = str.split(" ");
        if(strs.length != pattern.length())
            return false;
        Map<Object, Integer> map = new HashMap<>();
        for(int i = 0; i < strs.length; i++) {
            if(!Objects.equals(map.put(pattern.charAt(i), i), map.put(strs[i], i)))
                return false;
        }
        return true;
    }
}
```