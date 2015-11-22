+++
date = "2015-11-14T22:43:13-07:00"
levels = ["Medium"]
tags = ["String"]
title = "Isomorphic Pair"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given two words as Strings, determine if they are isomorphic. Two words are called isomorphic if the letters in one word can be remapped to get the second word. Remapping a letter means replacing all occurrences of it with another letter while the ordering of the letters remains unchanged. No two letters may map to the same letter, but a letter may map to itself.
<!--more-->

## Think #1
- Two Hashmap for mapping A-B and B-A. 
- make sure both mapping are correct if any character appear in its corresponding mapping.

## Solution #1
```java
	public boolean isomorphicString(String str1, String str2) {
		if (str1 == null || str2 == null || str1.length() != str2.length())
			return false;
		HashMap<Character, Character> mapAB = new HashMap<>();
		HashMap<Character, Character> mapBA = new HashMap<>();
		for (int i = 0; i < str1.length(); i++) {
			char a = str1.charAt(i);
			char b = str2.charAt(i);
			if (!mapAB.containsKey(a) && !mapBA.containsKey(b)) {
				mapAB.put(a, b);
				mapBA.put(b, a);
			} else {
				if (mapAB.containsKey(a) && mapAB.get(a) != b)
					return false;
				if (mapBA.containsKey(b) && mapBA.get(b) != a)
					return false;
			}
		}
		return true;
	}
```

## Think #2
- One Hashmap

## Solution #2
```java
	public boolean isomorphicStringII(String str1, String str2) {
		if ((str1 == null && str2 == null)
				|| (str1.length() == 0 && str2.length() == 0)
				|| str1.equals(str2))
			return true;
		if (str1 == null || str2 == null || str1.length() != str2.length())
			return false;
		HashMap<Character, Character> map = new HashMap<>();
		int i = 0;
		while (i < str1.length()) {
			char a = str1.charAt(i);
			char b = str2.charAt(i);
			if (map.containsKey(a)) {
				if (map.get(a) != b)
					return false;
			} else {
				if (map.containsValue(b))
					return false;
				map.put(a, b);
			}
			i++;
		}
		return true;
	}
```

## Think #3 
- Integer Array with 512 length

## Solution #3
```java
    public boolean isIsomorphic(String s1, String s2) {
        int[] m = new int[512];
        for (int i = 0; i < s1.length(); i++) {
            if (m[s1.charAt(i)] != m[s2.charAt(i)+256]) 
                return false;
            m[s1.charAt(i)] = m[s2.charAt(i)+256] = i+1;
        }
        return true;	
    }
```


