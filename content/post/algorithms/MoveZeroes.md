+++
date = "2015-11-11T10:43:13-07:00"
levels = ["Hard"]
tags = ["Two Pointers", "Array"]
title = "Move Zeroes"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
<!--more-->

For example, given nums = `[0, 1, 0, 3, 12]`, after calling your function, nums should be `[1, 3, 12, 0, 0]`.

### Note
You must do this in-place without making a copy of the array.
Minimize the total number of operations.

## Think
- Mark an index for nonzero element

## Solution
```java
    public void moveZeroes(int[] nums) {
        int nonzeroIdx = 0;
        int idx = 0;
        while(idx < nums.length) {
            if(idx >= nonzeroIdx && nums[idx] != 0) {
                int tmp = nums[idx];
                nums[idx--] = nums[nonzeroIdx];
                nums[nonzeroIdx++] = tmp;
            }
            idx++;
        }
    }
```