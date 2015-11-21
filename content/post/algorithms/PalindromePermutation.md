+++
date = "2015-11-09T19:43:13-07:00"
levels = ["Medium"]
tags = ["Permutation", "Combination", "String", "Palindrome", "Hash Map"]
title = "Palindrome Permutation"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given a string, determine if a permutation of the string could form a palindrome.
<!--more-->

## Problem I
#### Example
`"code"` -> `false`, `"aab"` -> `true`, `"carerac"` -> `true`.


### Think
The problem can be easily solved by count the frequency of each character using a hash map. The only thing need to take special care is consider the length of the string to be even or odd. 
- If the length is even. Each character should appear exactly times of 2, e.g. 2, 4, 6, etc..
- If the length is odd. One and only one character could appear odd times. 


### Solution
```java
	public boolean canPermutePalindrome(String s) {
		if (s == null || s.length() == 0)
			return true;
		HashMap<Character, Integer> map = new HashMap<>();
		for (char c : s.toCharArray())
			map.put(c, map.containsKey(c) ? map.get(c) + 1 : 1);

		int tolerent = 0;
		for (Map.Entry<Character, Integer> entry : map.entrySet()) {
			if (entry.getValue() % 2 != 0) {
				tolerent++;
			}
		}
		if (s.length() % 2 != 0)
			return tolerent == 1;
		else
			return tolerent == 0;
	}
```
---

## Problem II
Get the longest palindromical substring from permutation by given string.

### Think
- Record the frequency
- All character with even frequency can be added into final result.
- Find the largest odd frequency add it onto final result.

### Solution
```java
        private int longestSubset(String str) {
        HashMap<Character, Integer> charCnt = new HashMap<>();
        for (char c : str.toCharArray())
            charCnt.put(c, charCnt.containsKey(c) ? charCnt.get(c) + 1 : 1);
        int maxLen = 0;
        int maxsingle = 0;
        for (Map.Entry<Character, Integer> entry : charCnt.entrySet()) {
            if (entry.getValue() % 2 == 0)
                maxLen += entry.getValue();
            else
                maxsingle = Math.max(maxsingle, entry.getValue());
        }
        return maxLen + maxsingle;
    }
```
---
## Problem III
Given a string s, return all the palindromic permutations (without duplicates) of it. Return an empty list if no palindromic permutation could be form.

#### Example
Given s = `"aabb"`, return `["abba", "baab"]`.
Given s = `"abc"`, return `[]`.

### Think
- Similar with the last problem, check if the input String can form any valid palindrome
- Address the case when the length is odd
    - Record the character with odd frequency
    - Initialize the generation String with the Odd character
- Backtracking to generate the symmetry characters on the generation String

### Solution
```java
	public static List<String> generatePalindromes(String s) {
		HashSet<String> res = new HashSet<>();
		if (s == null || s.length() == 0)
			return new ArrayList<String>(res);
		HashMap<Character, Integer> map = new HashMap<>();
		for (char c : s.toCharArray())
			map.put(c, map.containsKey(c) ? map.get(c) + 1 : 1);
		
		// check if it is odd length, increase the tolerance when it is odd length
		int tolerent = 0;
		if (s.length() % 2 != 0)
			tolerent++;
		
		// record the odd item to set as the base of generate String
		char odd = '\u0000';
		for (Map.Entry<Character, Integer> entry : map.entrySet()) {
			if (entry.getValue() % 2 != 0) {
				if (tolerent > 0) {
					tolerent--;
					odd = entry.getKey(); // set it
				} else
					return new ArrayList<String>(res);
			}
		}
		// set the base String when the odd case
		String cur = "";
		if (odd != '\u0000') {
			map.put(odd, map.get(odd) - 1);
			if (map.get(odd) == 0)
				map.remove(odd);
			cur = "" + odd;
		}
		
		// generate the palindrome
		helper(res, map, cur, s);
		return new ArrayList<String>(res);
	}

	private static void helper(Set<String> res,
			HashMap<Character, Integer> map, String cur, String origin) {
		if (map.size() == 0) {
			res.add(new String(cur));
			return;
		}

		for (int i = 0; i < origin.length(); i++) {
			char c = origin.charAt(i);
			if (!map.containsKey(c))
				continue;
			cur = (c + cur + c);
			map.put(c, map.get(c) - 2);
			if (map.get(c) == 0)
				map.remove(c);
			helper(res, map, cur, origin);
			cur = cur.substring(1, cur.length() - 1);
			map.put(c, map.containsKey(c) ? map.get(c) + 2 : 2);
		}
	}
```