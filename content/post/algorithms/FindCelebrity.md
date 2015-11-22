+++
date = "2015-11-12T12:43:13-07:00"
levels = ["Hard"]
tags = ["Graph", "Binary Search", "Array"]
title = "Find the Celebrity"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Suppose you are at a party with `n` people (labeled from `0` to `n - 1`) and among them, there may exist one celebrity. The definition of a celebrity is that all the other `n - 1` people know him/her but **he/she does not know any of them**.
<!--more-->
Now you want to find out who the celebrity is or verify that there is not one. The only thing you are allowed to do is to ask questions like: "Hi, A. Do you know B?" to get information of whether A knows B. You need to find out the celebrity (or verify there is not one) by asking as few questions as possible (in the asymptotic sense).

You are given a helper function `bool knows(a, b)` which tells you whether A knows B. Implement a function `int findCelebrity(n)`, your function should minimize the number of calls to `knows`.

### Note
There will be exactly one celebrity if he/she is in the party. Return the celebrity's label if there is a celebrity in the party. If there is no celebrity, return `-1`.

## Think #1
- Based graph, check the node with `n-1` in-degree and `0` out-degree.
- Becuase other `n - 1` people know him/her but **he/she does not know any of them** (`0` out-degree)
- Call times: $$O(n^2)$$

## Solution #1
```java
	public int findCelebrity(int n) {
		if (n <= 1)
			return -1;

		int[] inDegree = new int[n];
		int[] outDegree = new int[n];

		// call n^2 times
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				if (i != j && knows(i, j)) {
					outDegree[i]++;
					inDegree[j]++;
				}
			}
		}

		for (int i = 0; i < n; i++) {
			if (inDegree[i] == n - 1 && outDegree[i] == 0) {
				return i;
			}
		}

		return -1;
	}
```

## Think #2
- Iterations from head and rear to the middle(l -> m <- r).
- Two cases when check if [l] knows [r].
    - Left shouldn't be celebrity since he knows someone.
    - Right shouldn't be celebrity because one of people doesn't know him.


## Solution #2
```java
	public int findCelebrityII(int n) {
		if (n <= 1)
			return -1;
		
		int left = 0, right = n - 1;
		while (left < right) {
			if (knows(left, right))
				left++; // left shouldn't be celebrity since he knows someone
			else
				right--; // right shouldn't be celebrity because one of people doesn't know him
		}

		// check the potential candidate is celebrity
		for (int i = 0; i < n; i++) {
			if (i == right)
				continue;
			if (knows(right, i))
				return -1;
		}
		return right;
	}
```

