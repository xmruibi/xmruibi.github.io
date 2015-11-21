+++
date = "2015-11-18T11:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Subarray"]
title = "Windows Sum"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

Given a list of integers and a window size, return a new list of integers where each integer is the sum of all integers in the kth window of of input list. The kth window of the input list is the integers from index k to index k + windows size - 1 (inclusive).
<!--more-->

### Example
`[4, 2, 73, 11, -5]` and windows size `2` should return `[6, 75, 84, 6]`, if windows size `3` should return `[79, 86, 79]`


## Solution #Array Version
```java
public class Solution{
	public int[] windowsSum(int[] arr, int wSize) {
		int[] res = new int[arr.length - wSize + 1];
		int curSum = 0;
		int idx = 0;
		int resIdx = 0;
		while(idx < arr.length) {
			curSum += arr[idx];
			if(idx >= wSize - 1) {
				res[resIdx++] = curSum;
				curSum -= arr[idx - wSize + 1];
			}
			idx++;
		}
		return res;
	}
}
```

## Solution #ArrayList Version
```java
public class Solution{
	public List<Integer> windowsSum(List<Integer> arr, int wSize) {
		List<Integer> res = new ArrayList<>();b
		// be careful to return new initilized array list instead of return null
		if(arr == null || arr.size() == 0)
			return res; 
		int curSum = 0;
		int idx = 0;
		int resIdx = 0;
		while(idx < arr.size()) {
			curSum += arr.get(idx);
			if(idx >= wSize - 1) {
				res.add(curSum);
				curSum -= arr.get(idx - wSize + 1);
			}
			idx++;
		}
		return res;
	}
}
```
