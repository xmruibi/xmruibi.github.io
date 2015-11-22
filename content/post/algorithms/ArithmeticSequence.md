+++
date = "2015-11-18T13:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Math", "Permutation"]
title = "Arithmetic Sequence"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

A sequence of numbers is called *Arithmetic* if it consists of at least three elements and if the difference between any two consecutive elements is the same. For example, `[1,3,5,7,9]`, `[7,7,7,7,7]` and `[3,-1,-5,-9]` are arithmetic. 
<!--more-->

A slice (P, Q) of Array A is called arithmetic if the sequence:
```
	A[P], A[P+1], ..., A[Q-1],A[Q]
```
is arthmetic. In particular, this means that `P+1 < Q`.

Write a function: `class Solution { public int solution(int[] A);}` that, given array `A` consisting of `N` numbers, returns the number of arithmetic slices in `A`. The function should return `-1` if the result exceeds 1,000,000,000.

### Example
```
A[0] = -1, A[1] = 1, A[2] = 3, A[3] = 3, A[4] = 3, A[5] = 2, A[6] = 1, A[7] = 0
```
It should return `5` since there are five arithmetic slices of that array, namely:
```
{0, 2}, {2, 4}, {4, 6}, {4, 7}, {5, 7}
``


## Solution
```java
public class Solution{
	public int countArithmetic(int[] array) {
		if(array.length < 3) 
			return 0;
		int total = 0;
		int idx = 1;
		int prev = 0;
		while(prev < array.length) {
			int curSlice = 2;
			int diff = array[idx] - array[idx-1];
			// if the difference between two consecutive numbers is the same
			while(++idx < array.length && array[idx] - array[idx-1] == diff) {
				curSlice++;
			}

			if(curSlice >= 3) {
				// when slice length = 3 -> count 1, = 4 -> 1*2, = 5 -> 1*2*3...
				total += ((curSlice - 2) * (curSlice - 1) / 2);
			}
			prev = idx;
		}
		return (total > 1000000000) ? -1 :total;
	}
}
```



