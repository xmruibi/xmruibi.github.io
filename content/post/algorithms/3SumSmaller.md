+++
date = "2015-11-09T19:43:13-07:00"
levels = ["Medium"]
tags = ["Binary Search"]
title = "3Sum Smaller"
topics = ["Leetcode", "Algorithm"]
banner = "/media/leetcode.png"
+++


Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition `nums[i]` + `nums[j]` + `nums[k]` < `target`.
<!--more-->
## Example
given nums = `[-2, 0, 1, 3]`, and target = `2`.
Return 2. Because there are two triplets which sums are less than `2`:
```
[-2, 0, 1]
[-2, 0, 3]
```

## Think
- Set iterate from rear.
- One tricky pattern: 
    - When `nums[l] + nums[r] +nums[i] < target`, all for combinations like: `nums[l] + nums[r-1] +nums[i] < target`, `nums[l] + nums[r-2] +nums[i] < target`, ..., `nums[l] + nums[l+1] +nums[i] < target` are workable.
    - So result counter should directly add the `r - l`
- All in all, two cases: 
    - `nums[l] + nums[r] +nums[i] < target`, add the cnt and move the `l`
    - `nums[l] + nums[r] +nums[i] >= target`, just move the `r`
- It is not very similar like binary search but still has kinda idea inside.

## Solution
```java
public static int threeSumSmaller(int[] nums, int target) {
        if (nums == null || nums.length < 3) 
            return 0;
		Arrays.sort(nums);
		int resCnt = 0;
		for (int i = nums.length - 1; i > 1; i--) {
			int one = nums[i];
			int l = 0, r = i - 1;
			while (l < r) {
				if(one + nums[l] + nums[r] < target) {
					resCnt += (r - l);
					l++;
				}else
					r--;
			}
		}
		return resCnt;
	}

```