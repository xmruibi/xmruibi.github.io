+++
date = "2015-11-14T22:43:13-07:00"
levels = ["Medium"]
tags = ["Array"]
title = "Maximum Subarray of Sum / Product"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++

Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

For example, given the array `[−2,1,−3,4,−1,2,1,−5,4]`,
the contiguous subarray `[4,−1,2,1]` has the largest sum = `6`.

## Solution
```java
    public int maxSubArray(int[] arr) {
        int maxSum = Integer.MIN_VALUE;
		int curSum = 0;
		for (int i = 0; i < arr.length; i++) {
			curSum += arr[i];
			maxSum = Math.max(maxSum, curSum);
			if (curSum < 0)
				curSum = 0;
		}
		return maxSum;
    }
```

## Solution #Record Index
```java
    public int[] maxSubArray(int[] arr) {
        int maxSum = Integer.MIN_VALUE;
		int curSum = 0;
		int prev = 0, l = 0, r = 0;
		for (int i = 0; i < arr.length; i++) {
			curSum += arr[i];
			if(curSum > maxSum) {
				maxSum = curSum;
				l = prev;
				r = i;
			}
			if (curSum < 0) {
				curSum = 0;
				prev = i + 1;
			}
		}
		return new int[]{l, r};
    }
```

Find the contiguous subarray within an array (containing at least one number) which has the largest product.

For example, given the array `[2,3,-2,4]`,
the contiguous subarray `[2,3]` has the largest product = `6`.

## Solution
```java
    public int maxProduct(int[] nums) {
        int glMax = Integer.MIN_VALUE;
        
        int localMin = 1; // record the current max
        int localMax = 1; // record the current min, since the negative number multiply with current number may leads to next product as the positive max
        for(int i = 0; i < nums.length; i++) {
            int tmp = localMax;
            localMax = Math.max(localMax*nums[i], Math.max(localMin*nums[i], nums[i]));
            localMin = Math.min(tmp*nums[i], Math.min(localMin*nums[i], nums[i]));
            glMax = Math.max(glMax, localMax);
        }
        
        return glMax;
    }
```