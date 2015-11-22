+++
date = "2015-11-11T12:43:13-07:00"
levels = ["Medium"]
tags = ["String", "Backtracking"]
title = "Flip Game I/II"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

You are playing the following Flip Game with your friend: Given a string that contains only these two characters: + and -, you and your friend take turns to flip two **consecutive** `"++"` into `"--"`. The game ends when a person can no longer make a move and therefore the other person will be the winner.
Write a function to compute all possible states of the string after one valid move.
<!--more-->

For example, given `s = "++++"`, after one move, it may become one of the following states:
```
[
  "--++",
  "+--+",
  "++--"
]
```
If there is no valid move, return an empty list `[]`.

### Think
- Only consecutive `"++"` can be flipped.

### Solution
```java
    public List<String> generatePossibleNextMoves(String s) {
		List<String> res = new ArrayList<>();
		if (s == null || s.length() < 2) {
            return res;
        }
		for (int i = 1; i < s.length(); i++) {
			StringBuilder sb = new StringBuilder(s);
			if (s.charAt(i) == '+' && s.charAt(i - 1) == s.charAt(i)) {
				sb.insert(i - 1, '-');
				sb.insert(i, '-');
			}
			res.add(sb.toString());
		}
		return res;
	}
```
## Problem II
You are playing the following Flip Game with your friend: Given a string that contains only these two characters: + and -, you and your friend take turns to flip two **consecutive** `"++"` into `"--"`. The game ends when a person can no longer make a move and therefore the other person will be the winner.

Write a function to determine if the starting player can guarantee a win.

For example, given `s = "++++"`, return true. The starting player can guarantee a win by flipping the middle `"++"` to become `"+--+"`.

#### Follow
Derive your algorithm's run-time complexity.

### Think
- Backtracking seems to be the only feasible solution to this problem.
- We can basically try every possible move for the first player (P1), and recursively check if the second player has any chance to win.

### Solution
```java
	public static boolean canWin(String s) {
		return winHelper(s.toCharArray());
	}

	private static boolean winHelper(char[] chars) {
		for (int i = 1; i < chars.length; i++) {
			if (chars[i] == '+' && chars[i] == chars[i - 1]) {
				chars[i - 1] = '-';
				chars[i] = '-';
			// if sencond player have chance to win
				boolean win = !winHelper(chars);
				chars[i - 1] = '+';
				chars[i] = '+';
				if (win) 
                    return true;
			}
		}
		return false;
	}
```





