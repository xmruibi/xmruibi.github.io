+++
date = "2015-11-13T20:39:16-07:00"
levels = ["Hard"]
tags = ["Tree", "Recursion"]
title = "Reverse a Stack using Recursion"
topics = ["Career Cup","Algorithm"]
banner = "/media/careercup.png"
+++

Reverse a stack using recursion.
<!--more-->
You are not allowed to use loop constructs like while, for..etc, and you can only use the following ADT functions on Stack S:
- `isEmpty(S)`
- `push(S)`
- `pop(S)`

## Think
- Very very trick problem
- The idea of the solution is to hold all values in Function Call Stack until the stack becomes empty. When the stack becomes empty, insert all held items one by one at the bottom of the stack.


## Solution
```java
public static void recrusion(Stack<Integer> stack) {
		if (stack.isEmpty())
			return;
		int tmp = stack.pop();
		recrusion(stack);
		helper(stack, tmp);
	}

	private static void helper(Stack<Integer> stack, int val) {
		if (stack.isEmpty())
			stack.push(val);
		else {
			int tmp = stack.pop();
			helper(stack, val);
			stack.push(tmp);
		}
	}
```