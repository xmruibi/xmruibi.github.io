+++
topics = ["Lintcode", "Algorithm"]
date = "2015-11-04T13:10:29-07:00"
levels = ["Medium"]
tags = ["Dynamic Programming", "Sort"]
title = "Longest Increasing Subsequence"
banner = "/media/lintcode.png"
+++

Given an unsorted array of integers, find the length of longest increasing sub-sequence.

### Example
Given `[10, 9, 2, 5, 3, 7, 101, 18]`,
The longest increasing sub-sequence is `[2, 3, 7, 101]`, therefore the length is `4`. Note that there may be more than one LIS combination, it is only necessary for you to return the length.

Your algorithm should run in $$O(n^2)$$ complexity.

### Follow up
Improve it to O(n log n) time complexity?

## Think #1
- Setup one dimensional array to memorize the longest sub-sequence on each element
- One pass on each element, 
- But it need to go through the previous indexes to check any elements less than current element and compare the maximum by `max(current, prev +1)`

## Solution #1
```java
    /**
     * @param nums: The integer array
     * @return: The length of LIS (longest increasing subsequence)
     */
    public int longestIncreasingSubsequence(int[] nums) {
        if(nums == null || nums.length == 0)
            return 0;
        int[] memo = new int[nums.length];
        int max = 0;
        for(int i = 0; i < nums.length; i ++) {
            memo[i] = 1;
            for(int j = 0; j < i; j++) {
                if(nums[j] < nums[i]) {
                    memo[i] = Math.max(memo[i], memo[j] + 1);
                }
                max = Math.max(memo[i], max);
            }
        }
        return max;
    }
```

## Think #2
- Setup an array `table` with the length of `nums`
- One pass on each element and initial max cursor is `0` in `table`
- Replace the element in `table` is just larger than current passing element
- If current element is largest, increase the cursor in `table`
- Finally, the the cursor + 1 is the max length.

## Solution #2
```java
    /**
     * @param nums: The integer array
     * @return: The length of LIS (longest increasing subsequence)
     */
    public int longestIncreasingSubsequence(int[] nums) {
        if(nums == null || nums.length == 0)
            return 0;
        int[] memo = new int[nums.length];
        int max = 0;
        memo[0] = nums[0];
        for(int i = 1; i < nums.length; i++) {
            if(nums[i] < memo[0])
                memo[0] = nums[i];
            else if(memo[max] <= nums[i])
                memo[++max] = nums[i];
            else{
                int idx = findCeil(memo, max, nums[i]);
                memo[idx] = nums[i];
            }
        }
        return ++max;
    }
    
    /**
     * @param arr: the memo array
     * @param right index: current max in the memo array
     * @param val: target value
     * @return: where should val put in memo array
     */
    private int findCeil(int[] arr, int r, int val){
        int l = 0;
        while(l + 1 < r) {
            int m = l + ((r - l)>>1);
            if(arr[m] < val)
                l = m;
            else
                r = m;
        }
        return r;
    }
```