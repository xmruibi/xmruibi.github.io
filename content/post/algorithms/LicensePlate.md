+++
topics = ["Algorithm"]
date = "2015-10-08T22:10:29-07:00"
levels = ["Medium"]
tags = ["Combination", "Array"]
title = "License Plate Number Combination"
+++

Given some rules on License plate number:
- Seven digits;
- First three should be Alphabet;
- Adjacent number shouldn't be the same;
- Last four can be alphbet or number;

## Solution
```java
public List<String> plateNumberCombination() {
	List<String> res = new ArrayList<>();
	combinatioUtil(res, "", 0, 7);
	return res; 
}

private void combinatioUtil(List<String> res, String cur, int idx, int limit) {
	if(cur.length() > 1 && cur.charAt(cur.length() - 1) == cur.charAt(cur.length() - 2))
		return;

	if(cur.length() == limit) {
		res.add(new String(cur));
		return;
	}
	if(idx > 3) {
		for(int i = 0; i <= 9; i++) {
			cur += "" + i;
			combinatioUtil(res, cur, idx + 1, limit);
			cur = cur.substring(0, cur.length() - 1);
		}
	} 

	for(int i = 0; i < 26; i++) {
		cur += (char)('a'+i);
		combinatioUtil(res, cur, idx + 1, limit);
		cur = cur.substring(0, cur.length() - 1);
	}
	for(int i = 0; i < 26; i++) {
		cur += (char)('A'+i);
		combinatioUtil(res, cur, idx + 1, limit);
		cur = cur.substring(0, cur.length() - 1);
	}
}

private boolean isNumber(char c) {
	return c <= '9' && c >= '0';
}

private boolean isAlphabet(char c) {
	return (c <= 'z' && c >= 'a') || ( <= 'Z' && c >= 'A');
}

```