+++
date = "2015-11-13T10:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Stack", "Hash Map"]
title = "Braces Check"
topics = ["Career Cup", "Algorithm"]
banner = "/media/careercup.png"
+++
Design a function determines if the braces ('(' and ')') in a string are properly matched. Please ignores non-brace characters.
<!--more-->

### Examples
`"()()()()"`   -> `true`
`"((45+)*a3)"` -> `true`
`"(((())())"`  -> `false`

## Think 
- Parenthese check problem three way to solve.
	- If it only contains one kind of parenthese, it can just use a counter.
	- Stack solution with hashmap assistance

## Solution
```java
	// counter method
	public boolean matched(String s) {
		if(s == null || s.length() == 0)
			return true;
		int cnt = 0;
		int idx = 0;
		while(idx < s.length()) {
			if(s.charAt(idx) == '(')
				cnt++;
			else if(s.charAt(idx) == ')') {
				if(cnt <= 0) 
					return false;
				cnt--;
			}
		}
		return cnt == 0;
	}

	// 
	public boolean matchedII(String s) {
		if(s == null || s.length() == 0)
			return true;
		Stack<Character> stack = new Stack<>();
		HashMap<Character, Character> map = new HashMap<>();
		map.put('(', ')'); map.put('{', '}'); map.put('[', ']');
		int idx = 0;
		while(idx < s.length()) {
			char c = s.charAt(idx);
			if(map.containsKey(c))
				stack.push(c);
			else if(map.values().contains(c)){
				if(!stack.isEmpty() && map.get(stack.pop()) != c)
					return false;
			}
		}
		return stack.isEmpty()
	}
```