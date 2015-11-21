+++
date = "2015-10-19T20:43:13-07:00"
levels = []
tags = ["Permutation", "Math"]
title = "Previous Permutation"
topics = ["Lintcode", "Algorithm"]
banner = "/media/lintcode.png"
+++

Given a list of integers, which denote a permutation.

Find the previous permutation in ascending order.
 <!--more-->

### Example
For `[1,3,2,3]`, the previous permutation is `[1,2,3,3]`

For `[1,2,3,4]`, the previous permutation is [`4,3,2,1]`

### Note
The list may contains duplicate integers.


## Think
- step 1: find last nums[k] > nums[k + 1];
- step 2: find last nums[i] > nums[k];
- step 3: swap i, j;
- step 4: reverse num after i;

## Solution

```java
public class Solution {
    /**
     * @param nums: A list of integers
     * @return: A list of integers that's previous permuation
     */
    public ArrayList<Integer> previousPermuation(ArrayList<Integer> nums) {
		if(nums == null || nums.size() <= 1)
		    return nums;
		    
		// step 1: find last nums[k] > nums[k + 1]
		int i = nums.size() - 2;
        for (; i >= 0; i--) {
            if (nums.get(i) > nums.get(i + 1)) {
                break;
            }
            if(i <= 0) {
		        reverse(nums, 0, nums.size() - 1);
		        return nums;
		    }
		}

		// step 2: find last nums[i] > nums[k]
        int j = nums.size() - 1;
        for (; j > i; j--) {
            if (nums.get(i) > nums.get(j)) {
                break;
            }
        }
		
		// step 3: swap i, j
		Collections.swap(nums, i, j);
		
		// step 4: reverse num after i
		reverse(nums, i + 1, nums.size() - 1);
		
		return nums;
    }
    
    private void reverse(ArrayList<Integer> nums,  int start, int end) {
        for (int i = start, j = end; i < j; i++, j--) {
            Collections.swap(nums, i, j);
        }
    }
}
```