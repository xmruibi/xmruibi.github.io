+++
date = "2015-11-14T10:43:13-07:00"
levels = ["Medium"]
tags = ["Array"]
title = "Product of Array Except Self"
topics = ["Leetcode","Algorithm"]
banner = "/media/leetcode.png"
+++

Given an array of `n` integers where `n` > 1, nums, return an array output such that `output[i]` is equal to the product of all the elements of nums except `nums[i]`.

Solve it **without division** and in `O(n)`.

For example, given `[1,2,3,4]`, return `[24,12,8,6]`.
<!--more-->

Follow up:
Could you solve it with constant space complexity? (Note: The **output array does not count** as extra space for the purpose of space complexity analysis.)

## Think #1
- $$O(n)$$ Space and Two pass, recording the left part or right part product.

## Solution #1 
```java
	public int[] productExceptSelf(int[] input) {
        int[] res = new int[input.length];
		int tmp = 1;
		for (int i = 0; i < input.length; i++) {
			res[i] = tmp;
			tmp *= input[i];
		}
		tmp = 1;
		for (int i = input.length - 1; i >= 0; i--) {
			res[i] *= tmp;
			tmp *= input[i];
		}
		return res;
    }
```