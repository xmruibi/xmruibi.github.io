+++
topics = ["Leetcode","Algorithm"]
date = "2015-11-06T13:10:29-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming", "Array"]
title = "House Robber"
banner = "/media/leetcode.png"
+++


You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.
<!--more-->
Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

### Example
Given `[3, 8, 4]`, return 8.

### Challenge
$O(n)$ time and $O(1)$ memory.

## Think
- When Rob meet a house, he has two choices: taken or not taken, but if he had stolen the previous house, it cannnot taken. 
- Set two variable: `include` and `exclude`
- `include` means it has taken the previous house, while the `exclude` means it didn't take in previous house.
- So each time we consider about the `exclude + cur_value` and `include`, the max of them should be new `include` while the new `exclude` come from the max value of original `include` (last taken, current not taken) and original `exclude` (not taken in both last and current house)

## Solution
```java
    /**
     * @param A: An array of non-negative integers.
     * return: The maximum amount of money you can rob tonight
     */
    public long houseRobber(int[] A) {
        if(A == null)
            return 0L;
        long exclude = 0L;
        long include = 0L;
        
        for(int i = 0; i < A.length; i++) {
            long tmp = include;
            include = Math.max(include, exclude + A[i]);
            exclude = Math.max(tmp, exclude);
        }
        
        return Math.max(include, exclude);
    }
```
## Follow Up
After robbing those houses on that street, the thief has found himself a new place for his thievery so that he will not get too much attention. This time, all houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, the security system for these houses remain the same as for those in the previous street.

Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.

### Think
The houses are in a cycle,so that when pick up the first element we cannot pick the last element because they are adjacent. So just seperate two parts for calculating: `0` to `last second element`, and `1` to `last element`, find the maximum from them.

### Solution
```java
    public int rob(int[] nums) {
        if(nums==null||nums.length==0)
            return 0;
        if(nums.length==1)
            return nums[0];
        return Math.max(helper(0, nums.length-2, nums), helper(1,nums.length-1,nums));
    }
    
    private int helper(int l, int r, int[] nums){
        if(nums==null||nums.length==0)
            return 0;
        int incl = 0;
        int excl = 0;
        for(int i = l;i<=r;i++){
            int tmp = incl;
            incl = excl+nums[i];
            excl = Math.max(excl, tmp);
        }
        return Math.max(incl, excl);
    }
```