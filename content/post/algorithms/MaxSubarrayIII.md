+++
date = "2015-11-07T19:43:13-07:00"
levels = ["Hard"]
tags = ["Dynamic Programming"]
title = "Maximum Subarray III"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++


Given an array of integers and a number k, find k non-overlapping subarrays which have the largest sum.

The number in each subarray should be contiguous.

Return the largest sum.

### Example
Given `[-1,4,-2,3,-2,3]`, k=`2`, return `8`

### Note
The subarray should contain at least one number

## Think
- State: `memo[k][i]` means the max subarray sum value from index 0 to i-1 with taken k subarrays
- Since `k` is the amount of subarray, so at least we have to take `k` elements in array
- Initilize with two case:
    - Taken first `k` elements, each element is a subarray, so we only consider first kth element.
    - Taken only one subarray, with two cases: start from previous to current  or start from itself.
- For the rest of elements, consider two cases:
    - Taken from the previous element with no subarray amount increase (`memo[k][i-1] + current element`)
    - Taken from current element but increase `k` so `memo[k-1][n] + current element`, however, here `n` can be any number from  `k-1` to `current index - 1`
    

## Solution
```java
public class Solution {
    /**
     * @param nums: A list of integers
     * @param k: An integer denote to find k non-overlapping subarrays
     * @return: An integer denote the sum of max k non-overlapping subarrays
     */
    public int maxSubArray(ArrayList<Integer> nums, int k) {
        
        // like backpack, memo[k][i] means the max value from index 0 to i-1 with taken k subarray 
        int[][] memo = new int[k+1][nums.size()];
        
        // count previous kth num, which means the each item as a subarray
        for(int i = 1; i<= k; i++) {
            int sum = 0;
            for(int j = 0; j < i; j++) {
                sum += nums.get(j);
            }
            memo[i][i-1] = sum;
        }
        
        // when k = 1, calculate the max value has two choices:
        // 1) max value from previous index (also come from two choices) and current index
        // 2) just start from current index
        for(int i = 1; i < nums.size(); i++) {
            memo[1][i] = Math.max(memo[1][i-1] + nums.get(i), nums.get(i));
        }
        
        // also has two cases: 
        // 1) continous get from previous index to current
        // 2) not continuous but we have to scan each index between current and (k-1) position 
        for(int subarr = 2; subarr <= k; subarr++) {
            for(int j = subarr; j < nums.size(); j++) {
                // 1) continous get so directly add current number
                memo[subarr][j] =  memo[subarr][j-1] + nums.get(j);
                // 2) resume in previous index from subarr - 2 (one more minus for index)
                for(int s = subarr - 2; s < j; s++) {
                    memo[subarr][j] = Math.max(memo[subarr][j], memo[subarr-1][s] + nums.get(j));
                }
            }
        }
        
        // pass through all case from k-1 to array length
        int max = Integer.MIN_VALUE;
        for(int i = k-1; i < nums.size(); i++) {
            max = Math.max(max, memo[k][i]);
        }
        return max;
    }
}

```