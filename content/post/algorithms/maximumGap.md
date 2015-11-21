+++
topics = ["Leetcode", "Algorithm"]
date = "2015-11-03T23:10:29-07:00"
levels = ["Medium"]
tags = ["Sort"]
title = "Maximum Gap"
banner = "/media/leetcode.png"
+++

Given an unsorted array, find the maximum difference between the successive elements in its sorted form.

Try to solve it in linear time/space.

Return 0 if the array contains less than 2 elements.

You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.

## Think
- Get the range of array elements
- Setup the buckets size by $$(range \div len) + 1$$
- Allocate two buckets for minimum and maximum in that bucket range

## Solution
```java
    public int maximumGap(int[] nums) {
        if(nums == null || nums.length == 0)
            return 0;
            
        int max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;
        for(int i = 0; i < nums.length; i++) {
            min = Math.min(min, nums[i]);
            max = Math.max(max, nums[i]);
        }
        
        int range = max - min;
        int bucketSize = range / nums.length + 1;
        int[] mins = new int[num.length - 1];
        int[] maxs = new int[num.length - 1];
        for(int i = 0; i < nums.length; i++){
            // skip the max or min value
            if(i==min||i==max)
    		    continue;
            int idx = (nums[i] - min) / bucketSize;
            mins = Math.min(mins[idx], nums[i]);
            maxs = Math.min(maxs[idx], nums[i]);
        }
        
        // compare the prev max bucket and current min bucket
        int maxGap = Integer.MIN_VALUE;
        int prev = min;
        for(int i = 0; i < mins.length; i++) {
            // empty bucket
            if (mins[i] == Integer.MAX_VALUE && maxs[i] == Integer.MIN_VALUE)
                continue;
            maxGap = Math.max(maxGap, mins[i] - prev);
            prev = maxs[i];
        }
        maxGap = Math.max(maxGap, max - prev);
        return maxGap;
    }

```