+++
date = "2015-11-18T12:43:13-07:00"
levels = ["Medium"]
tags = ["Array", "Hash Map"]
title = "Two Sum Count"
topics = ["Career Cup", "Amazon", "Algorithm"]
banner = "/media/careercup.png"
+++

Given an array and a target number, count how many pair in this array can sum to that target number.
<!--more-->

## Solution
```java
public class Solution{
	public int countTwoSum(int[] arr, int tar) {
		if(arr == null || arr.length == 0)
			return 0;
		int cnt = 0;
		// store all number in this array
		HashSet<Integer> set = new HashSet<>();
		for(int i = 0; i < arr.length; i++) {
			// if any number hit in hashset, that means a pair can sum to the target number
			if(set.contains(tar - arr[i]))
				cnt ++;
			set.add(arr[i]);
		}
		return cnt;
	}
}
```

## Solution #If input integers has duplicate
```java
public class Solution {
	public static int TwoSumCount(int[] nums, int target) {
		if (nums == null || nums.length < 2)	return 0;
		Map<Integer, Integer> map = new HashMap<Integer, Integer>();
		int count = 0;
		for (int i = 0; i < nums.length; i++) {
			if (map.containsKey(target - nums[i]))
				count += map.get(target - nums[i]);
			map.put(nums[i], map.containsKey(nums[i]) ? map.get(nums[i]) + 1 : 1);
		}
		return count;
	}
	
	public static void main(String[] args) {
		int rvalue = TwoSumCount(new int[] {1, 1, 2, 3, 4}, 5);
		System.out.println(rvalue);
		return;
	}
}
```