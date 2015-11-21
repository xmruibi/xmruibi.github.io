+++
date = "2015-11-17T22:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Stack"]
title = "Determine valid parentheses"
topics = ["Leetcode","Amazon", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given a String, judge if it is a valid parenthese.
<!--more-->


## Solution 
```java
public class Solution{
	public boolean validParenthese(String str) {
		Stack<Character> stack = new Stack<>();
		int idx = 0;
		// save the parenthese pair in hashmap as a dictionary
		HashMap<Character, Character> map = new HashMap<>();
		map.put('(',')'); map.put('[',']'); map.put('{','}');

		while(idx < str.length()) {
			char cur = str.charAt(idx);
			if(map.containsKey(cur))
				// if the current character is the front parenthese
				stack.push(cur);
			else {
				// if current stack is empty or current character is not back parenthese or the peek element doesn't match with current character 
				if(stack.isEmpty() || !map.containsValue(cur) || map.get(stack.pop()) != cur)
					return false;
			}
			idx++;
		}

		return stack.isEmpty();
	}
}
```
