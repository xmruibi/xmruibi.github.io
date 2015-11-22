+++
date = "2015-11-09T09:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Hash Map"]
title = "Group Shifted Strings"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given a string, we can “shift” each of its letter to its successive letter, for example: `“abc”` -> `“bcd”`. We can keep “shifting” which forms the sequence:

`"abc" -> "bcd" -> ... -> "xyz"`
Given a list of strings which contains only lowercase alphabets, group all strings that belong to the same shifting sequence.
<!--more-->
### Example,

given: ["abc", "bcd", "acef", "xyz", "az", "ba", "a", "z"], Return:

```
[
  ["abc","bcd","xyz"],
  ["az","ba"],
  ["acef"],
  ["a","z"]
]
```
##Note
For the return value, each inner list’s elements must follow the lexicographic order.

## Think
- There is a regular pattern: if two words are shifted, the distance between two adjacent characters are the same.

```
    2   3        2   3
    /\ /\        /\ /\
   a  c  f - >  e  g  j 
```
- So all we need to do is figure out the distance between each character in each word and make these distance as a code to represent the word.


## Solution
```java
public class GroupShiftedString {
    public List<List<String>> groupStrings(String[] strings) {
		List<List<String>> res = new ArrayList<>();
		HashMap<String, List<String>> map = new HashMap<>();
		for (String str : strings) {
			String code = getCode(str);
			List<String> val;
			if (!map.containsKey(code)) {
				val = new ArrayList<>();
			} else {
				val = map.get(code);
			}
			val.add(str);
			map.put(code, val);
		}

		for (Map.Entry<String, List<String>> entry : map.entrySet()) {
			List<String> val = entry.getValue();
			Collections.sort(val);
			res.add(val);
		}
		return res;
	}

	private String getCode(String s) {
		StringBuilder sb = new StringBuilder();
		sb.append("#");
		for (int i = 1; i < s.length(); i++) {
			int tmp = ((s.charAt(i) - s.charAt(i - 1)) + 26) % 26;
			sb.append(tmp).append("#");
		}
		return sb.toString();
	}
}
```