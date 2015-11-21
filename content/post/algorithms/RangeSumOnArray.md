+++
date = "2015-11-11T10:43:13-07:00"
levels = ["Easy"]
tags = ["Array", "Dynamic Programming"]
title = "Query Range Sum on Array"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.
<!--more-->
### Example:
Given nums = [-2, 0, 3, -5, 2, -1]

sumRange(0, 2) -> 1
sumRange(2, 5) -> -1
sumRange(0, 5) -> -3
Note:
You may assume that the array does not change.
There are many calls to sumRange function.

## Think
- Save the prefix sum in extra array.
- Be aware to the `sum[0]` means nothing before the first element of input array `nums`
- return the the difference on prefix index `[high] - [low - 1]`

## Solution
```java
public class NumArray {
    int[] sum;
    
    public NumArray(int[] nums) {
        sum = new int[nums.length + 1];
        for(int i = 1; i <= nums.length; i++) {
            sum[i] = nums[i-1] + sum[i-1];
        }
    }

    public int sumRange(int i, int j) {
        return sum[j+1]-sum[i];
    }
}
```
