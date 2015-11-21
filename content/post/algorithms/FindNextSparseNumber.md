+++
date = "2015-11-13T10:43:13-07:00"
levels = ["Medium"]
tags = ["Bit Manipulation"]
title = "Find Next Sparse Number"
topics = ["Career Cup", "Algorithm"]
banner = "/media/careercup.png"
+++

A number is Sparse if there are no two adjacent 1s in its binary representation. For example 5 (binary representation: 101) is sparse, but 6 (binary representation: 110) is not sparse.

Given a number x, find the smallest Sparse number which greater than or equal to x.

<!--more-->

### Examples
```
Input: x = 6
Output: Next Sparse Number is 8

Input: x = 4
Output: Next Sparse Number is 4

Input: x = 38
Output: Next Sparse Number is 40

Input: x = 44
Output: Next Sparse Number is 64
```

## Think #1
An Efficient Solution come from [Geeksforgeek](http://www.geeksforgeeks.org/given-a-number-find-next-sparse-number/) can solve this problem without checking all numbers on by one. Below are steps.
```
1) Find binary of the given number and store it in a 
   boolean array.
2) Initialize last_finalized bit position as 0.
2) Start traversing the binary from least significant bit.
    a) If we get two adjacent 1's such that next (or third) 
       bit is not 1, then 
          (i)  Make all bits after this 1 to last finalized
               bit (including last finalized) as 0. 
          (ii) Update last finalized bit as next bit. 
```
For example, let binary representation be `01010001011101`, we change it to `01010001100000` (all bits after highlighted 11 are set to 0). Again two 1’s are adjacent, so change binary representation to `01010010000000`. This is our final answer.

## Solution #1
```java
    public static long sparseNum(long num) {
		// record the original number as boolean array which contains least significant bit (LSB)
		boolean[] bits = new boolean[64];
		int shift = 0;
		// num (like 13) -> reversed { true, false, true, true}
		while (shift < 64)
			bits[shift] = ((num >> shift++) & 1) == 1;
		// The position till which all bits are finalized
		int last_final = 0;
		// search from low digit
		for (int i = 1; i < 63; i++) {
			// find two adjacent 1's such that next bits[i+1] is not 1
			if (bits[i] && bits[i - 1] && !bits[i + 1]) {
				for(int j = last_final; j <= i; j++)
					bits[j] = false;
				bits[i+1] = true;
				last_final = i+1;
			}
		}
		long res = 0L;
		while(shift > 0) 
			res += ((bits[--shift]?1:0)<<shift);
		return res;
	}
```