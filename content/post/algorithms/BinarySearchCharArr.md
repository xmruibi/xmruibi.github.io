+++
date = "2015-11-13T16:13:13-07:00"
levels = []
tags = ["Binary Search", "Array"]
title = "Smallest character that is strictly larger than the search character target"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++
Given a sorted list of letters, sorted in ascending order and a character for which we are searching. Return the smallest character that is strictly larger than the search character, If no such character exists, return the smallest character in the array.
<!--more-->


### Example
Given the following inputs we expect the corresponding output: 
```
['c', 'f', 'j', 'p', 'v'], 'a' => 'c' 
['c', 'f', 'j', 'p', 'v'], 'c' => 'f' 
['c', 'f', 'j', 'p', 'v'], 'k' => 'p' 
['c', 'f', 'j', 'p', 'v'], 'z' => 'c' // The wrap around case 
['c', 'f', 'k'], 'f' => 'k' 
['c', 'f', 'k'], 'c' => 'f' 
['c', 'f', 'k'], 'd' => 'f' 
```

## Think
- Typical binary Search
- Just be aware to wrapped case, use mod.

## Solution
```java
public static char search(char[] dict, char c) {

		int l = 0, r = dict.length - 1;

		while (l + 1 < r) {
			int m = l + (r - l) / 2;
			if (dict[m] < c)
				l = m;
			else
				r = m;
		}

		if (dict[l] > c)
			return dict[l];
		else if (dict[r] > c)
			return dict[r];
		else
			return dict[(r + 1) % dict.length];
	}
```

