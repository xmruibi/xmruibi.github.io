+++
date = "2015-11-19T12:33:13-07:00"
levels = []
tags = ["Math"]
title = "Greatest Common Divisor"
topics = ["Geeks for Geeks", "Amazon","Algorithm"]
banner = "/media/geeks.png"
+++

Write a function to find Greatest Common Divisor of an array.
<!--more-->
## Solution
```java
public class Solution{
	public int findGCD(int[] arr) {
		if (array == null || array.length == 1)	return 0;
		int gcd = array[0];
		for (int i = 1; i < array.length; i++) {
			gcd = gcd(gcd, array[i]);
		}
		return gcd;
	}

	private int gcd(int num1, int num2) {
		if (num2 > num1)
			return gcd(num2, num1);
		if (num1 == 0 || num2 == 0)	
			return 0;
		while (num1 != 0 && num2 != 0) {
			int temp = num1 % num2;
			num1 = num2;
			num2 = temp;
		}
		return num1 + num2;
	}
}
```
